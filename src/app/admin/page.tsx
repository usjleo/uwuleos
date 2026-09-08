"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import projectsData from "@/data/projects.json";
import magazinesData from "@/data/magazines.json";
import leadershipData from "@/data/leadership.json";
import initialDocumentsData from "@/data/documents.json";
import {
  Layers,
  Megaphone,
  FolderKanban,
  Users,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  Trash2,
  Edit,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Award,
  Calendar,
  MapPin,
  Mail,
  Phone,
  GraduationCap,
  ShieldCheck,
  X,
  Sparkles,
  ArrowUpRight,
  Lock,
  Eye,
  EyeOff,
  LogOut,
  KeyRound,
  AlertCircle,
  UserCheck,
  BookOpen,
  HardDrive,
  Download,
  Save,
  FileText,
} from "lucide-react";
import {
  isFirebaseConfigured,
  getFirestoreCollection,
  saveFirestoreDoc,
  deleteFirestoreDoc,
} from "@/lib/firebase";

// Types
interface Announcement {
  id: string;
  title: string;
  category: string;
  priority: "normal" | "high" | "urgent";
  date: string;
  summary: string;
  linkUrl?: string;
  scope: string;
}

interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  directorate: string;
  impactMetric: string;
  date: string;
  location: string;
  status: string;
  summary: string;
  volunteers?: string;
  beneficiaries?: string;
  highlights?: string[];
}

interface MagazineItem {
  id: string;
  title: string;
  edition: string;
  category: string;
  date: string;
  pages: string;
  directorate: string;
  editor: string;
  driveUrl: string;
  summary: string;
  highlights?: string[];
  isFeatured?: boolean;
}

interface DocumentItem {
  id: string;
  title: string;
  category: string;
  description: string;
  format: string;
  size: string;
  driveUrl: string;
  updatedAt: string;
}

interface MemberApplicant {
  id: string;
  name: string;
  regNo: string;
  faculty: string;
  academicYear: string;
  email: string;
  phone: string;
  interests: string;
  appliedDate: string;
  status: "pending" | "approved" | "inducted" | "rejected";
}

// Initial Sample Data for Announcements
const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "ann-1",
    title: "Official Call for Project Sipnana Phase III Volunteers",
    category: "Youth & STEM",
    priority: "urgent",
    date: "Dec 12, 2024",
    summary: "Registration is open for undergraduates to participate in rural educational aid delivery across Passara secondary schools.",
    linkUrl: "https://forms.gle/sample-link",
    scope: "All UWU Undergraduates",
  },
  {
    id: "ann-2",
    title: "Executive Board Monthly Review Assembly (January 2025)",
    category: "Administration",
    priority: "high",
    date: "Jan 05, 2025",
    summary: "Quarterly review of project directorates, financial audit reports, and Multiple District 306 conference delegations.",
    scope: "Executive Board & Directors",
  },
  {
    id: "ann-3",
    title: "Central Highlands Tree Planting Phase II Scheduling",
    category: "Environment",
    priority: "normal",
    date: "Jan 18, 2025",
    summary: "Partnering with the Forest Conservation Department for planting 1,000 indigenous saplings along the Namunukula ridge.",
    scope: "Public & Leo Members",
  },
];

// Initial Sample Data for Member Applicants
const INITIAL_MEMBERS: MemberApplicant[] = [
  {
    id: "mem-1",
    name: "Kavindu Dilshan",
    regNo: "UWU/CST/22/045",
    faculty: "Faculty of Science & Technology",
    academicYear: "2nd Year",
    email: "kavindu.d@uwu.ac.lk",
    phone: "+94 77 123 4567",
    interests: "IT Directorates, Web Portal Development, Photography",
    appliedDate: "Dec 10, 2024",
    status: "pending",
  },
  {
    id: "mem-2",
    name: "Sanduni Perera",
    regNo: "UWU/ANS/23/018",
    faculty: "Faculty of Animal Science & Export Agriculture",
    academicYear: "1st Year",
    email: "sanduni.p@uwu.ac.lk",
    phone: "+94 71 987 6543",
    interests: "Green Uva Environment, Tree Planting Drives",
    appliedDate: "Dec 08, 2024",
    status: "approved",
  },
  {
    id: "mem-3",
    name: "Nimesh Senanayake",
    regNo: "UWU/MGT/21/089",
    faculty: "Faculty of Management",
    academicYear: "3rd Year",
    email: "nimesh.s@uwu.ac.lk",
    phone: "+94 76 555 1234",
    interests: "Treasury Management, Public Relations & Event Planning",
    appliedDate: "Dec 04, 2024",
    status: "inducted",
  },
  {
    id: "mem-4",
    name: "Thisara Bandara",
    regNo: "UWU/APS/23/102",
    faculty: "Faculty of Applied Sciences",
    academicYear: "1st Year",
    email: "thisara.b@uwu.ac.lk",
    phone: "+94 70 444 8899",
    interests: "Blood Donation Camps, Community Welfare Drives",
    appliedDate: "Dec 02, 2024",
    status: "pending",
  },
];

export default function AdminPage() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);

  // Login Form State
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Navigation Tab State
  const [activeTab, setActiveTab] = useState<"overview" | "announcements" | "projects" | "magazines" | "members" | "documents">("overview");

  // App Data State
  const [announcements, setAnnouncements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);
  const [projects, setProjects] = useState<ProjectItem[]>(projectsData);
  const [magazines, setMagazines] = useState<MagazineItem[]>(magazinesData);
  const [documents, setDocuments] = useState<DocumentItem[]>(initialDocumentsData);
  const [members, setMembers] = useState<MemberApplicant[]>(INITIAL_MEMBERS);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [memberStatusFilter, setMemberStatusFilter] = useState<string>("all");

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Modals State
  const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isMagazineModalOpen, setIsMagazineModalOpen] = useState(false);
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);

  // Editing state for documents
  const [editingDoc, setEditingDoc] = useState<DocumentItem | null>(null);

  // New Announcement Form State
  const [newAnnTitle, setNewAnnTitle] = useState("");
  const [newAnnCategory, setNewAnnCategory] = useState("Youth & STEM");
  const [newAnnPriority, setNewAnnPriority] = useState<"normal" | "high" | "urgent">("normal");
  const [newAnnDate, setNewAnnDate] = useState("");
  const [newAnnSummary, setNewAnnSummary] = useState("");
  const [newAnnLink, setNewAnnLink] = useState("");
  const [newAnnScope, setNewAnnScope] = useState("All Undergraduates");

  // New Project Form State
  const [newProjTitle, setNewProjTitle] = useState("");
  const [newProjCategory, setNewProjCategory] = useState("Education");
  const [newProjDirectorate, setNewProjDirectorate] = useState("Directorate of Education & STEM");
  const [newProjMetric, setNewProjMetric] = useState("");
  const [newProjDate, setNewProjDate] = useState("");
  const [newProjLocation, setNewProjLocation] = useState("");
  const [newProjStatus, setNewProjStatus] = useState("Active");
  const [newProjSummary, setNewProjSummary] = useState("");
  const [newProjHighlights, setNewProjHighlights] = useState("");

  // New Magazine Form State
  const [newMagTitle, setNewMagTitle] = useState("");
  const [newMagEdition, setNewMagEdition] = useState("");
  const [newMagCategory, setNewMagCategory] = useState("Annual Flagship");
  const [newMagDate, setNewMagDate] = useState("");
  const [newMagPages, setNewMagPages] = useState("");
  const [newMagDirectorate, setNewMagDirectorate] = useState("Directorate of PR & Media");
  const [newMagEditor, setNewMagEditor] = useState("Leo Editorial Board — UWU");
  const [newMagDriveUrl, setNewMagDriveUrl] = useState("");
  const [newMagSummary, setNewMagSummary] = useState("");
  const [newMagHighlights, setNewMagHighlights] = useState("");

  // New Document / Form State
  const [newDocTitle, setNewDocTitle] = useState("");
  const [newDocCategory, setNewDocCategory] = useState("Governance & Statutes");
  const [newDocFormat, setNewDocFormat] = useState("PDF Document");
  const [newDocSize, setNewDocSize] = useState("");
  const [newDocDriveUrl, setNewDocDriveUrl] = useState("");
  const [newDocDescription, setNewDocDescription] = useState("");

  // Dynamic inline Google Drive URLs editor map
  const [driveUrlEdits, setDriveUrlEdits] = useState<Record<string, string>>({});
  const [driveUrlDocEdits, setDriveUrlDocEdits] = useState<Record<string, string>>({});

  // Check saved session, stored documents, and fetch Firestore cloud data on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("uwu_leo_admin_auth");
      if (stored === "true") {
        setIsAuthenticated(true);
      }
      setIsCheckingAuth(false);

      const storedDocs = localStorage.getItem("uwu_leos_documents");
      if (storedDocs) {
        try {
          const parsed = JSON.parse(storedDocs);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setDocuments(parsed);
          }
        } catch (e) {
          console.error("Error loading stored documents:", e);
        }
      }

      // If Firebase environment variables are provided (on Vercel or locally), fetch live cloud data
      if (isFirebaseConfigured()) {
        getFirestoreCollection<Announcement>("announcements", INITIAL_ANNOUNCEMENTS).then((data) => {
          if (data && data.length > 0) setAnnouncements(data);
        });
        getFirestoreCollection<ProjectItem>("projects", projectsData).then((data) => {
          if (data && data.length > 0) setProjects(data);
        });
        getFirestoreCollection<MagazineItem>("magazines", magazinesData).then((data) => {
          if (data && data.length > 0) setMagazines(data);
        });
        getFirestoreCollection<DocumentItem>("documents", initialDocumentsData).then((docs) => {
          if (docs && docs.length > 0) {
            setDocuments(docs);
            localStorage.setItem("uwu_leos_documents", JSON.stringify(docs));
          }
        });
        getFirestoreCollection<MemberApplicant>("membership_applicants", INITIAL_MEMBERS).then((data) => {
          if (data && data.length > 0) setMembers(data);
        });
      }
    }
  }, []);

  const saveDocuments = (newDocs: DocumentItem[]) => {
    setDocuments(newDocs);
    if (typeof window !== "undefined") {
      localStorage.setItem("uwu_leos_documents", JSON.stringify(newDocs));
    }
  };

  // Handle Login Authentication
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsLoggingIn(true);

    setTimeout(() => {
      const validEmails = ["admin@uwuleos.org", "admin", "president.uwuleos@gmail.com"];
      const validPasswords = ["uwuleos2024", "admin123", "leo306c2"];

      const inputUser = loginEmail.trim().toLowerCase();
      const inputPass = loginPassword.trim();

      if (validEmails.includes(inputUser) && validPasswords.includes(inputPass)) {
        setIsAuthenticated(true);
        sessionStorage.setItem("uwu_leo_admin_auth", "true");
        showToast("Welcome back, Officer Admin!");
      } else {
        setLoginError("Invalid email or password. Use demo login: admin@uwuleos.org / uwuleos2024");
      }
      setIsLoggingIn(false);
    }, 400);
  };

  // Handle Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("uwu_leo_admin_auth");
    setLoginEmail("");
    setLoginPassword("");
    showToast("Logged out of Admin Portal.");
  };

  // Document Handlers
  const handleCreateOrUpdateDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocTitle || !newDocDriveUrl) return;

    if (editingDoc) {
      const updatedDoc = {
        ...editingDoc,
        title: newDocTitle,
        category: newDocCategory,
        format: newDocFormat,
        size: newDocSize || "1.0 MB",
        driveUrl: newDocDriveUrl,
        description: newDocDescription,
        updatedAt: "Updated Just Now",
      };
      const updated = documents.map((doc) => (doc.id === editingDoc.id ? updatedDoc : doc));
      saveDocuments(updated);
      saveFirestoreDoc("documents", editingDoc.id, updatedDoc);
      showToast("Official document updated successfully!");
    } else {
      const newEntry: DocumentItem = {
        id: `doc-${Date.now()}`,
        title: newDocTitle,
        category: newDocCategory,
        format: newDocFormat,
        size: newDocSize || "1.0 MB",
        driveUrl: newDocDriveUrl,
        description: newDocDescription,
        updatedAt: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      };
      saveDocuments([newEntry, ...documents]);
      saveFirestoreDoc("documents", newEntry.id, newEntry);
      showToast("New official document published with Google Drive link!");
    }

    setIsDocumentModalOpen(false);
    setEditingDoc(null);
    setNewDocTitle("");
    setNewDocCategory("Governance & Statutes");
    setNewDocFormat("PDF Document");
    setNewDocSize("");
    setNewDocDriveUrl("");
    setNewDocDescription("");
  };

  const handleOpenEditDoc = (doc: DocumentItem) => {
    setEditingDoc(doc);
    setNewDocTitle(doc.title);
    setNewDocCategory(doc.category);
    setNewDocFormat(doc.format);
    setNewDocSize(doc.size);
    setNewDocDriveUrl(doc.driveUrl);
    setNewDocDescription(doc.description);
    setIsDocumentModalOpen(true);
  };

  const handleDeleteDocument = (id: string) => {
    const filtered = documents.filter((d) => d.id !== id);
    saveDocuments(filtered);
    deleteFirestoreDoc("documents", id);
    showToast("Official document removed.");
  };

  const handleUpdateDocDriveUrl = (docId: string) => {
    const updatedUrl = driveUrlDocEdits[docId];
    if (!updatedUrl) return;

    const updated = documents.map((d) => (d.id === docId ? { ...d, driveUrl: updatedUrl } : d));
    saveDocuments(updated);
    saveFirestoreDoc("documents", docId, { driveUrl: updatedUrl });
    showToast("Document Google Drive link updated!");
  };

  // Update Magazine Google Drive URL
  const handleUpdateDriveUrl = (magId: string) => {
    const updatedUrl = driveUrlEdits[magId];
    if (!updatedUrl) return;

    setMagazines(
      magazines.map((m) => (m.id === magId ? { ...m, driveUrl: updatedUrl } : m))
    );
    saveFirestoreDoc("magazines", magId, { driveUrl: updatedUrl });
    showToast("Google Drive link updated successfully!");
  };

  // Submit Handlers
  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnTitle || !newAnnSummary) return;

    const newEntry: Announcement = {
      id: `ann-${Date.now()}`,
      title: newAnnTitle,
      category: newAnnCategory,
      priority: newAnnPriority,
      date: newAnnDate || new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      summary: newAnnSummary,
      linkUrl: newAnnLink || undefined,
      scope: newAnnScope,
    };

    setAnnouncements([newEntry, ...announcements]);
    saveFirestoreDoc("announcements", newEntry.id, newEntry);
    setIsAnnouncementModalOpen(false);
    setNewAnnTitle("");
    setNewAnnSummary("");
    setNewAnnLink("");
    showToast("Announcement published successfully!");
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjTitle || !newProjSummary) return;

    const slug = newProjTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const newEntry: ProjectItem = {
      id: `proj-${Date.now()}`,
      slug: slug || `project-${Date.now()}`,
      title: newProjTitle,
      category: newProjCategory,
      directorate: newProjDirectorate,
      impactMetric: newProjMetric || "Impact Underway",
      date: newProjDate || "2025",
      location: newProjLocation || "UWU Campus, Badulla",
      status: newProjStatus,
      summary: newProjSummary,
      highlights: newProjHighlights ? newProjHighlights.split("\n").filter((h) => h.trim().length > 0) : [],
    };

    setProjects([newEntry, ...projects]);
    saveFirestoreDoc("projects", newEntry.id, newEntry);
    setIsProjectModalOpen(false);
    setNewProjTitle("");
    setNewProjSummary("");
    setNewProjMetric("");
    setNewProjHighlights("");
    showToast("New project registered successfully!");
  };

  const handleCreateMagazine = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMagTitle || !newMagSummary) return;

    const newEntry: MagazineItem = {
      id: `mag-${Date.now()}`,
      title: newMagTitle,
      edition: newMagEdition || "Leistic Year 2024/2025",
      category: newMagCategory,
      date: newMagDate || "2025",
      pages: newMagPages ? `${newMagPages} Pages` : "32 Pages",
      directorate: newMagDirectorate,
      editor: newMagEditor || "Leo Editorial Board",
      driveUrl: newMagDriveUrl || "https://drive.google.com",
      summary: newMagSummary,
      highlights: newMagHighlights ? newMagHighlights.split("\n").filter((h) => h.trim().length > 0) : [],
      isFeatured: false,
    };

    setMagazines([newEntry, ...magazines]);
    saveFirestoreDoc("magazines", newEntry.id, newEntry);
    setIsMagazineModalOpen(false);
    setNewMagTitle("");
    setNewMagEdition("");
    setNewMagDriveUrl("");
    setNewMagSummary("");
    setNewMagHighlights("");
    showToast("New magazine issue added with Google Drive link!");
  };

  const handleDeleteMagazine = (id: string) => {
    setMagazines(magazines.filter((m) => m.id !== id));
    deleteFirestoreDoc("magazines", id);
    showToast("Magazine issue removed.");
  };

  const [newMemName, setNewMemName] = useState("");
  const [newMemRegNo, setNewMemRegNo] = useState("");
  const [newMemFaculty, setNewMemFaculty] = useState("Faculty of Science & Technology");
  const [newMemYear, setNewMemYear] = useState("1st Year");
  const [newMemEmail, setNewMemEmail] = useState("");
  const [newMemPhone, setNewMemPhone] = useState("");
  const [newMemInterests, setNewMemInterests] = useState("");

  const handleCreateMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemName || !newMemEmail) return;

    const newEntry: MemberApplicant = {
      id: `mem-${Date.now()}`,
      name: newMemName,
      regNo: newMemRegNo || "UWU/GEN/24/000",
      faculty: newMemFaculty,
      academicYear: newMemYear,
      email: newMemEmail,
      phone: newMemPhone || "—",
      interests: newMemInterests || "Community Service & Youth Leadership",
      appliedDate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      status: "pending",
    };

    setMembers([newEntry, ...members]);
    saveFirestoreDoc("membership_applicants", newEntry.id, newEntry);
    setIsMemberModalOpen(false);
    setNewMemName("");
    setNewMemEmail("");
    setNewMemRegNo("");
    setNewMemPhone("");
    setNewMemInterests("");
    showToast("New member application added!");
  };

  const handleUpdateMemberStatus = (id: string, newStatus: MemberApplicant["status"]) => {
    setMembers(members.map((m) => (m.id === id ? { ...m, status: newStatus } : m)));
    saveFirestoreDoc("membership_applicants", id, { status: newStatus });
    showToast(`Applicant status updated to ${newStatus.toUpperCase()}`);
  };

  const handleDeleteAnnouncement = (id: string) => {
    setAnnouncements(announcements.filter((a) => a.id !== id));
    deleteFirestoreDoc("announcements", id);
    showToast("Announcement removed.");
  };

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id));
    deleteFirestoreDoc("projects", id);
    showToast("Project removed.");
  };

  // Filtered lists
  const filteredAnnouncements = announcements.filter(
    (a) =>
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredProjectsList = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMagazinesList = magazines.filter(
    (m) =>
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.edition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMembersList = members.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.regNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.faculty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = memberStatusFilter === "all" || m.status === memberStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredDocumentsList = documents.filter(
    (d) =>
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.format.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // If checking session on initial load, show minimal spinner
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#003B99]" />
      </div>
    );
  }

  // =========================================================================
  // VIEW 1: OFFICER LOGIN SCREEN (If not authenticated)
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2.5 text-xs font-semibold animate-in fade-in duration-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <div className="w-12 h-12 rounded-2xl bg-[#003B99] text-white flex items-center justify-center font-heading font-extrabold text-xl shadow-md">
              U
            </div>
          </div>
          
          <h2 className="mt-4 text-center text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading tracking-tight">
            Officer Admin Portal
          </h2>
          <p className="mt-1.5 text-center text-xs text-slate-500 max-w-sm mx-auto">
            Leo Club of Uva Wellassa University • District 306 D10
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
          <div className="bg-white py-8 px-6 sm:px-8 shadow-xs rounded-2xl border border-slate-200/80 space-y-6">
            
            {loginError && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2.5 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1.5">
                  Officer Email / Username
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="admin@uwuleos.org"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#003B99] focus:bg-white text-slate-900 placeholder:text-slate-400 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#003B99] focus:bg-white text-slate-900 placeholder:text-slate-400 font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Sample Credentials Card for ease of use */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-600 text-[11px] space-y-1">
                <div className="font-bold text-slate-700 flex items-center gap-1">
                  <KeyRound className="w-3.5 h-3.5 text-[#003B99]" />
                  <span>Demo Access Credentials</span>
                </div>
                <div className="font-mono text-slate-500">Email: <strong className="text-slate-800">admin@uwuleos.org</strong></div>
                <div className="font-mono text-slate-500">Password: <strong className="text-slate-800">uwuleos2024</strong></div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full py-2.5 px-4 bg-[#003B99] hover:bg-[#002D7A] text-white font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isLoggingIn ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                  ) : (
                    <>
                      <span>Sign In to Admin Workspace</span>
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="pt-4 border-t border-slate-100 text-center">
              <Link
                href="/"
                className="text-xs text-slate-500 hover:text-[#003B99] transition-colors font-medium inline-flex items-center gap-1"
              >
                <span>← Back to Public Website</span>
              </Link>
            </div>

          </div>
        </div>

      </div>
    );
  }

  // =========================================================================
  // VIEW 2: AUTHENTICATED ADMIN DASHBOARD
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2.5 text-xs font-semibold animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Admin Top Navigation Bar */}
      <header className="bg-white border-b border-slate-200/90 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Brand Logo & Portal Tag */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#003B99] text-white flex items-center justify-center font-heading font-extrabold text-sm shadow-xs">
                U
              </div>
              <div>
                <div className="font-heading font-bold text-sm text-slate-900 leading-tight">
                  Leo Club of UWU
                </div>
                <div className="text-[10px] font-mono text-[#003B99] font-semibold">
                  Executive Admin Workspace • 2024/2025
                </div>
              </div>
            </div>

            {/* Officer Profile & Sign Out Button */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Firebase Cloud Status Indicator */}
              {isFirebaseConfigured() ? (
                <div
                  className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold"
                  title="Firebase cloud database is connected and active"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  <span>Firebase Cloud Active</span>
                </div>
              ) : (
                <div
                  className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-600 text-xs font-semibold"
                  title="Local storage mode. Add Firebase environment variables in Vercel to sync cloud."
                >
                  <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                  <span>Local Mode (Connect Firebase in Vercel)</span>
                </div>
              )}

              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-xs">
                <UserCheck className="w-3.5 h-3.5 text-[#003B99]" />
                <span className="font-bold text-slate-700">Officer Admin</span>
              </div>

              <Link
                href="/"
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:text-[#003B99] hover:bg-slate-50 transition-colors"
                target="_blank"
              >
                <span>Live Site</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>

              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition-colors"
                title="Sign out of admin"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>

          </div>
        </div>

        {/* Tab Navigation Bar */}
        <div className="border-t border-slate-100 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-1 sm:space-x-3 overflow-x-auto no-scrollbar py-2">
              <button
                onClick={() => { setActiveTab("overview"); setSearchQuery(""); }}
                className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  activeTab === "overview"
                    ? "bg-[#003B99] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Overview</span>
              </button>

              <button
                onClick={() => { setActiveTab("announcements"); setSearchQuery(""); }}
                className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  activeTab === "announcements"
                    ? "bg-[#003B99] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                }`}
              >
                <Megaphone className="w-3.5 h-3.5" />
                <span>Announcements ({announcements.length})</span>
              </button>

              <button
                onClick={() => { setActiveTab("projects"); setSearchQuery(""); }}
                className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  activeTab === "projects"
                    ? "bg-[#003B99] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                }`}
              >
                <FolderKanban className="w-3.5 h-3.5" />
                <span>Projects ({projects.length})</span>
              </button>

              <button
                onClick={() => { setActiveTab("magazines"); setSearchQuery(""); }}
                className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  activeTab === "magazines"
                    ? "bg-[#003B99] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Magazines &amp; Google Drive ({magazines.length})</span>
              </button>

              <button
                onClick={() => { setActiveTab("members"); setSearchQuery(""); }}
                className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  activeTab === "members"
                    ? "bg-[#003B99] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Membership Applicants ({members.length})</span>
              </button>

              <button
                onClick={() => { setActiveTab("documents"); setSearchQuery(""); }}
                className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  activeTab === "documents"
                    ? "bg-[#003B99] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Documents &amp; Forms ({documents.length})</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-8">

        {/* ===================================================================== */}
        {/* 1. OVERVIEW DASHBOARD TAB                                             */}
        {/* ===================================================================== */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            
            {/* Welcome Banner */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-1.5 max-w-xl">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#003B99]">
                  District 306 D10 • Administrative Portal
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                  Officer Management Hub
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Manage club circulars, add new community projects, update magazine Google Drive links, review undergraduate membership applicants, and manage official forms.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={() => setIsAnnouncementModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
                >
                  <Megaphone className="w-3.5 h-3.5 text-[#003B99]" />
                  <span>+ Announcement</span>
                </button>
                <button
                  onClick={() => setIsProjectModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
                >
                  <FolderKanban className="w-3.5 h-3.5 text-[#00A3E0]" />
                  <span>+ Project</span>
                </button>
                <button
                  onClick={() => {
                    setEditingDoc(null);
                    setNewDocTitle("");
                    setNewDocCategory("Governance & Statutes");
                    setNewDocFormat("PDF Document");
                    setNewDocSize("");
                    setNewDocDriveUrl("");
                    setNewDocDescription("");
                    setIsDocumentModalOpen(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-[#F5A800]" />
                  <span>+ Document Form</span>
                </button>
                <button
                  onClick={() => setIsMagazineModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#003B99] hover:bg-[#002D7A] text-white text-xs font-bold shadow-xs transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Magazine Drive Link</span>
                </button>
              </div>
            </div>

            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div
                onClick={() => setActiveTab("announcements")}
                className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs hover:border-blue-200 hover:shadow-xs transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span className="font-semibold">Active Announcements</span>
                  <Megaphone className="w-4 h-4 text-[#003B99]" />
                </div>
                <div className="text-3xl font-extrabold text-slate-900 font-heading">
                  {announcements.length}
                </div>
                <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                  <span>Manage Dispatches</span>
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>

              <div
                onClick={() => setActiveTab("projects")}
                className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs hover:border-blue-200 hover:shadow-xs transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span className="font-semibold">Published Projects</span>
                  <FolderKanban className="w-4 h-4 text-[#00A3E0]" />
                </div>
                <div className="text-3xl font-extrabold text-slate-900 font-heading">
                  {projects.length}
                </div>
                <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                  <span>Across 5 Directorates</span>
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>

              <div
                onClick={() => setActiveTab("magazines")}
                className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs hover:border-blue-200 hover:shadow-xs transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span className="font-semibold">Magazine Editions</span>
                  <BookOpen className="w-4 h-4 text-[#003B99]" />
                </div>
                <div className="text-3xl font-extrabold text-slate-900 font-heading">
                  {magazines.length}
                </div>
                <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                  <span>Manage Drive Links</span>
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>

              <div
                onClick={() => setActiveTab("documents")}
                className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs hover:border-blue-200 hover:shadow-xs transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span className="font-semibold">Official Documents</span>
                  <FileText className="w-4 h-4 text-[#F5A800]" />
                </div>
                <div className="text-3xl font-extrabold text-slate-900 font-heading">
                  {documents.length}
                </div>
                <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                  <span>Google Drive Links</span>
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>

              <div
                onClick={() => setActiveTab("members")}
                className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs hover:border-blue-200 hover:shadow-xs transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span className="font-semibold">Membership Applicants</span>
                  <Users className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-3xl font-extrabold text-slate-900 font-heading">
                  {members.length}
                </div>
                <div className="text-[11px] text-amber-600 font-semibold mt-1 flex items-center gap-1">
                  <span>{members.filter((m) => m.status === "pending").length} Pending Review</span>
                </div>
              </div>
            </div>

            {/* Quick Overview Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Recent Announcements */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="font-bold text-sm text-slate-900 font-heading flex items-center gap-2">
                    <Megaphone className="w-4 h-4 text-[#003B99]" />
                    <span>Recent Dispatches &amp; Circulars</span>
                  </div>
                  <button
                    onClick={() => setActiveTab("announcements")}
                    className="text-xs font-semibold text-[#003B99] hover:underline"
                  >
                    View All →
                  </button>
                </div>

                <div className="space-y-3">
                  {announcements.slice(0, 3).map((ann) => (
                    <div key={ann.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-bold text-[#003B99] uppercase tracking-wider">
                          {ann.category}
                        </span>
                        <span className="text-[10px] text-slate-400">{ann.date}</span>
                      </div>
                      <h4 className="font-bold text-xs text-slate-900 line-clamp-1">{ann.title}</h4>
                      <p className="text-[11px] text-slate-500 line-clamp-2">{ann.summary}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Magazines Drive Links Quick Overview */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="font-bold text-sm text-slate-900 font-heading flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#003B99]" />
                    <span>Magazine Google Drive Links</span>
                  </div>
                  <button
                    onClick={() => setActiveTab("magazines")}
                    className="text-xs font-semibold text-[#003B99] hover:underline"
                  >
                    Edit Drive Links →
                  </button>
                </div>

                <div className="space-y-3">
                  {magazines.slice(0, 3).map((mag) => (
                    <div key={mag.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="font-bold text-xs text-slate-900 truncate">{mag.title}</div>
                        <div className="text-[10px] text-slate-500 truncate">{mag.edition}</div>
                      </div>
                      <a
                        href={mag.driveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-[#003B99] hover:underline shrink-0"
                      >
                        <HardDrive className="w-3.5 h-3.5" />
                        <span>Drive Link</span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ===================================================================== */}
        {/* 2. ANNOUNCEMENTS TAB                                                  */}
        {/* ===================================================================== */}
        {activeTab === "announcements" && (
          <div className="space-y-6">
            
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h2 className="text-xl font-extrabold text-slate-900 font-heading">
                  Announcements &amp; Circulars
                </h2>
                <p className="text-xs text-slate-500">
                  Publish meeting circulars, volunteer calls, and district notices.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search announcements..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#003B99]"
                  />
                </div>

                <button
                  onClick={() => setIsAnnouncementModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#003B99] hover:bg-[#002D7A] text-white text-xs font-bold shadow-xs whitespace-nowrap transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Announcement</span>
                </button>
              </div>
            </div>

            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredAnnouncements.map((ann) => (
                <div
                  key={ann.id}
                  className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs flex flex-col justify-between group space-y-4"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-blue-50 text-[#003B99] border border-blue-100">
                        {ann.category}
                      </span>
                      <span className="text-xs text-slate-400">{ann.date}</span>
                    </div>

                    <h3 className="font-bold text-base text-slate-900 leading-snug font-heading">
                      {ann.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {ann.summary}
                    </p>

                    <div className="text-[11px] text-slate-400 pt-1">
                      Audience: <strong className="text-slate-600">{ann.scope}</strong>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    {ann.linkUrl ? (
                      <a
                        href={ann.linkUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[#003B99] hover:underline font-semibold text-xs"
                      >
                        <span>Document / Form Link</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-slate-400 text-[11px]">Internal Circular</span>
                    )}

                    <button
                      onClick={() => handleDeleteAnnouncement(ann.id)}
                      className="text-slate-400 hover:text-rose-600 p-1 rounded transition-colors"
                      title="Delete Announcement"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ===================================================================== */}
        {/* 3. PROJECTS TAB                                                       */}
        {/* ===================================================================== */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h2 className="text-xl font-extrabold text-slate-900 font-heading">
                  Project Initiatives Directory
                </h2>
                <p className="text-xs text-slate-500">
                  Manage signature projects, impact metrics, and directorate assignments.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#003B99]"
                  />
                </div>

                <button
                  onClick={() => setIsProjectModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#003B99] hover:bg-[#002D7A] text-white text-xs font-bold shadow-xs whitespace-nowrap transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Register Project</span>
                </button>
              </div>
            </div>

            {/* Projects Table / Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProjectsList.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs flex flex-col justify-between group space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-100 text-slate-700">
                        {p.category}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700">
                        {p.status}
                      </span>
                    </div>

                    <h3 className="font-bold text-base text-slate-900 font-heading leading-snug">
                      {p.title}
                    </h3>

                    <div className="text-[11px] text-slate-500 font-medium">
                      {p.directorate}
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-normal">
                      {p.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-50 text-[#003B99] font-bold text-[11px]">
                      <Award className="w-3.5 h-3.5" />
                      <span>{p.impactMetric}</span>
                    </div>

                    <button
                      onClick={() => handleDeleteProject(p.id)}
                      className="text-slate-400 hover:text-rose-600 p-1 rounded transition-colors"
                      title="Delete Project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ===================================================================== */}
        {/* 4. MAGAZINES & GOOGLE DRIVE MANAGER TAB                               */}
        {/* ===================================================================== */}
        {activeTab === "magazines" && (
          <div className="space-y-6">
            
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h2 className="text-xl font-extrabold text-slate-900 font-heading">
                  Leo Magazine Publications &amp; Google Drive Links
                </h2>
                <p className="text-xs text-slate-500">
                  Update Google Drive download links, add new periodicals, and manage publication archives.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search magazines..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#003B99]"
                  />
                </div>

                <button
                  onClick={() => setIsMagazineModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#003B99] hover:bg-[#002D7A] text-white text-xs font-bold shadow-xs whitespace-nowrap transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ New Magazine Issue</span>
                </button>
              </div>
            </div>

            {/* Magazines List with Editable Google Drive Links */}
            <div className="space-y-4">
              {filteredMagazinesList.map((mag) => {
                const currentEditValue = driveUrlEdits[mag.id] !== undefined ? driveUrlEdits[mag.id] : mag.driveUrl;

                return (
                  <div
                    key={mag.id}
                    className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                  >
                    <div className="space-y-2 max-w-xl min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-blue-50 text-[#003B99] border border-blue-100">
                          {mag.category}
                        </span>
                        <span className="text-xs text-slate-400">
                          {mag.date} • {mag.pages}
                        </span>
                      </div>

                      <h3 className="font-bold text-base text-slate-900 font-heading leading-snug">
                        {mag.title}
                      </h3>

                      <div className="text-[11px] text-slate-500">
                        {mag.edition} • {mag.editor}
                      </div>

                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {mag.summary}
                      </p>
                    </div>

                    {/* Google Drive Link Input & Action Bar */}
                    <div className="lg:w-96 space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200/80 shrink-0">
                      <label className="block text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
                        <HardDrive className="w-3.5 h-3.5 text-[#003B99]" />
                        <span>Google Drive PDF Download URL:</span>
                      </label>

                      <div className="flex items-center gap-2">
                        <input
                          type="url"
                          value={currentEditValue}
                          onChange={(e) => setDriveUrlEdits({ ...driveUrlEdits, [mag.id]: e.target.value })}
                          placeholder="https://drive.google.com/file/d/..."
                          className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#003B99] text-slate-800 font-mono text-[11px]"
                        />

                        <button
                          onClick={() => handleUpdateDriveUrl(mag.id)}
                          className="px-3 py-1.5 bg-[#003B99] hover:bg-[#002D7A] text-white rounded-lg text-xs font-bold shrink-0 transition-colors inline-flex items-center gap-1 shadow-xs"
                          title="Save Google Drive URL"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>Save</span>
                        </button>
                      </div>

                      <div className="flex items-center justify-between text-[11px] pt-1 text-slate-500">
                        <a
                          href={mag.driveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-[#003B99] hover:underline font-semibold"
                        >
                          <span>Test Drive Link</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>

                        <button
                          onClick={() => handleDeleteMagazine(mag.id)}
                          className="text-slate-400 hover:text-rose-600 inline-flex items-center gap-1 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* ===================================================================== */}
        {/* 5. MEMBERSHIP APPLICANTS TAB                                          */}
        {/* ===================================================================== */}
        {activeTab === "members" && (
          <div className="space-y-6">
            
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h2 className="text-xl font-extrabold text-slate-900 font-heading">
                  Membership Applications &amp; Onboarding
                </h2>
                <p className="text-xs text-slate-500">
                  Review student membership forms, approve applications, and mark for induction.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
                  {["all", "pending", "approved", "inducted"].map((st) => (
                    <button
                      key={st}
                      onClick={() => setMemberStatusFilter(st)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all ${
                        memberStatusFilter === st
                          ? "bg-white text-slate-900 shadow-xs"
                          : "text-slate-500 hover:text-slate-900"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setIsMemberModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#003B99] hover:bg-[#002D7A] text-white text-xs font-bold shadow-xs whitespace-nowrap transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Member Record</span>
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-mono text-[10px]">
                    <tr>
                      <th className="py-3.5 px-4 font-bold">Applicant Name</th>
                      <th className="py-3.5 px-4 font-bold">Faculty &amp; Reg No</th>
                      <th className="py-3.5 px-4 font-bold">Contact</th>
                      <th className="py-3.5 px-4 font-bold">Interests / Motivation</th>
                      <th className="py-3.5 px-4 font-bold">Status</th>
                      <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredMembersList.map((m) => (
                      <tr key={m.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-900 text-xs">{m.name}</div>
                          <div className="text-[10px] text-slate-400">Applied: {m.appliedDate}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-medium text-slate-800">{m.faculty}</div>
                          <div className="text-[11px] text-slate-400 font-mono">{m.regNo} • {m.academicYear}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="text-slate-700 font-medium">{m.email}</div>
                          <div className="text-[11px] text-slate-400">{m.phone}</div>
                        </td>
                        <td className="py-3.5 px-4 max-w-xs text-slate-600">
                          <span className="line-clamp-2">{m.interests}</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-block px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                              m.status === "approved"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : m.status === "inducted"
                                ? "bg-blue-50 text-[#003B99] border border-blue-200"
                                : "bg-amber-50 text-amber-700 border border-amber-200"
                            }`}
                          >
                            {m.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="inline-flex items-center gap-1.5 justify-end">
                            {m.status === "pending" && (
                              <button
                                onClick={() => handleUpdateMemberStatus(m.id, "approved")}
                                className="px-2.5 py-1 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-[11px] font-bold transition-colors"
                              >
                                Approve
                              </button>
                            )}
                            {m.status === "approved" && (
                              <button
                                onClick={() => handleUpdateMemberStatus(m.id, "inducted")}
                                className="px-2.5 py-1 rounded bg-blue-50 hover:bg-blue-100 text-[#003B99] text-[11px] font-bold transition-colors"
                              >
                                Mark Inducted
                              </button>
                            )}
                            <button
                              onClick={() => setMembers(members.filter((item) => item.id !== m.id))}
                              className="p-1 rounded text-slate-400 hover:text-rose-600 transition-colors"
                              title="Delete Record"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ===================================================================== */}
        {/* 6. DOCUMENTS & FORMS MANAGEMENT TAB                                  */}
        {/* ===================================================================== */}
        {activeTab === "documents" && (
          <div className="space-y-6">
            
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h2 className="text-xl font-extrabold text-slate-900 font-heading">
                  Administrative Documents &amp; Official Forms
                </h2>
                <p className="text-xs text-slate-500">
                  Manage official templates, club constitution, and administrative guidelines with Google Drive links synced to /brand-and-forms.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => {
                    setEditingDoc(null);
                    setNewDocTitle("");
                    setNewDocCategory("Governance & Statutes");
                    setNewDocFormat("PDF Document");
                    setNewDocSize("");
                    setNewDocDriveUrl("");
                    setNewDocDescription("");
                    setIsDocumentModalOpen(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#003B99] hover:bg-[#002D7A] text-white text-xs font-bold shadow-xs whitespace-nowrap transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Official Document</span>
                </button>
              </div>
            </div>

            {/* Document Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredDocumentsList.map((doc) => {
                const currentEditUrl = driveUrlDocEdits[doc.id] !== undefined ? driveUrlDocEdits[doc.id] : doc.driveUrl;

                return (
                  <div
                    key={doc.id}
                    className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-slate-300 transition-all"
                  >
                    <div className="space-y-3">
                      
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-block px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-[#003B99] border border-blue-200">
                          {doc.category}
                        </span>
                        <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                          <span>{doc.format}</span>
                          <span>•</span>
                          <span>{doc.size}</span>
                        </div>
                      </div>

                      {/* Title & Description */}
                      <div>
                        <h3 className="font-heading font-extrabold text-base text-slate-900 leading-snug">
                          {doc.title}
                        </h3>
                        <p className="text-xs text-slate-500 font-normal leading-relaxed mt-1.5 line-clamp-3">
                          {doc.description}
                        </p>
                      </div>

                      {/* Google Drive Link Manager */}
                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-bold text-slate-700 flex items-center gap-1.5">
                            <HardDrive className="w-3.5 h-3.5 text-[#003B99]" />
                            <span>Google Drive Link</span>
                          </span>
                          <span className="text-slate-400 text-[10px]">{doc.updatedAt}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <input
                            type="url"
                            value={currentEditUrl}
                            onChange={(e) =>
                              setDriveUrlDocEdits({
                                ...driveUrlDocEdits,
                                [doc.id]: e.target.value,
                              })
                            }
                            placeholder="https://drive.google.com/file/d/..."
                            className="flex-1 px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#003B99]"
                          />
                          <button
                            type="button"
                            onClick={() => handleUpdateDocDriveUrl(doc.id)}
                            className="px-3 py-1.5 bg-[#003B99] hover:bg-[#002D7A] text-white text-xs font-bold rounded-lg transition-colors shrink-0 shadow-2xs"
                          >
                            Save
                          </button>
                        </div>
                      </div>

                    </div>

                    {/* Bottom Actions */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <a
                        href={doc.driveUrl || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[#003B99] hover:underline font-bold text-xs"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Open Drive URL</span>
                      </a>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenEditDoc(doc)}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors inline-flex items-center gap-1"
                        >
                          <Edit className="w-3 h-3" />
                          <span>Edit</span>
                        </button>

                        <button
                          onClick={() => handleDeleteDocument(doc.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete Document"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        )}

      </main>

      {/* ======================================================================= */}
      {/* MODAL 1: NEW ANNOUNCEMENT                                               */}
      {/* ======================================================================= */}
      {isAnnouncementModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-lg w-full p-6 shadow-xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900 font-heading">
                Publish New Announcement
              </h3>
              <button onClick={() => setIsAnnouncementModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAnnouncement} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Call for Volunteers - Project Sipnana Phase III"
                  value={newAnnTitle}
                  onChange={(e) => setNewAnnTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-[#003B99] focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={newAnnCategory}
                    onChange={(e) => setNewAnnCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-[#003B99]"
                  >
                    <option>Youth &amp; STEM</option>
                    <option>Healthcare</option>
                    <option>Environment</option>
                    <option>Administration</option>
                    <option>General Assembly</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Target Audience</label>
                  <input
                    type="text"
                    placeholder="e.g. All UWU Undergraduates"
                    value={newAnnScope}
                    onChange={(e) => setNewAnnScope(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-[#003B99]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Announcement Body / Summary *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Provide key details, dates, and instructions for undergraduates..."
                  value={newAnnSummary}
                  onChange={(e) => setNewAnnSummary(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-[#003B99] focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Attachment / Registration Link (Optional)</label>
                <input
                  type="url"
                  placeholder="https://forms.gle/..."
                  value={newAnnLink}
                  onChange={(e) => setNewAnnLink(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-[#003B99]"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAnnouncementModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 font-semibold hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#003B99] text-white font-bold hover:bg-[#002D7A] shadow-xs"
                >
                  Publish Announcement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================================= */}
      {/* MODAL 2: NEW PROJECT REGISTRATION                                       */}
      {/* ======================================================================= */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-lg w-full p-6 shadow-xl space-y-5 animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900 font-heading">
                Register New Club Project
              </h3>
              <button onClick={() => setIsProjectModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Project Sipnana: School Library Renovation"
                  value={newProjTitle}
                  onChange={(e) => setNewProjTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-[#003B99]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={newProjCategory}
                    onChange={(e) => setNewProjCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option>Education</option>
                    <option>Healthcare</option>
                    <option>Environment</option>
                    <option>Community</option>
                    <option>Youth Development</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Directorate</label>
                  <input
                    type="text"
                    value={newProjDirectorate}
                    onChange={(e) => setNewProjDirectorate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Impact Metric</label>
                  <input
                    type="text"
                    placeholder="e.g. 350+ Students Supported"
                    value={newProjMetric}
                    onChange={(e) => setNewProjMetric(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Passara, Badulla"
                    value={newProjLocation}
                    onChange={(e) => setNewProjLocation(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Summary / Scope *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe the initiative, beneficiaries, and objectives..."
                  value={newProjSummary}
                  onChange={(e) => setNewProjSummary(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Key Accomplishments (One per line)</label>
                <textarea
                  rows={2}
                  placeholder="Distributed 500+ books&#10;Renovated 2 classrooms"
                  value={newProjHighlights}
                  onChange={(e) => setNewProjHighlights(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-[11px]"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 font-semibold hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#003B99] text-white font-bold hover:bg-[#002D7A] shadow-xs"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================================= */}
      {/* MODAL 3: NEW MAGAZINE / ISSUE REGISTRATION                              */}
      {/* ======================================================================= */}
      {isMagazineModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-lg w-full p-6 shadow-xl space-y-5 animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900 font-heading">
                Add Magazine Edition &amp; Google Drive Link
              </h3>
              <button onClick={() => setIsMagazineModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateMagazine} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Magazine Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ROAR: Volume 07 (2025 Special Edition)"
                  value={newMagTitle}
                  onChange={(e) => setNewMagTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-[#003B99]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Volume / Edition</label>
                  <input
                    type="text"
                    placeholder="Volume 07 • 2025"
                    value={newMagEdition}
                    onChange={(e) => setNewMagEdition(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={newMagCategory}
                    onChange={(e) => setNewMagCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option>Annual Flagship</option>
                    <option>Special Issue</option>
                    <option>Environment</option>
                    <option>Quarterly Bulletin</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Google Drive PDF / Download URL *</label>
                <input
                  type="url"
                  required
                  placeholder="https://drive.google.com/file/d/..."
                  value={newMagDriveUrl}
                  onChange={(e) => setNewMagDriveUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-[#003B99] font-mono text-[11px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Publication Date</label>
                  <input
                    type="text"
                    placeholder="e.g. January 2025"
                    value={newMagDate}
                    onChange={(e) => setNewMagDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Page Count</label>
                  <input
                    type="text"
                    placeholder="e.g. 48"
                    value={newMagPages}
                    onChange={(e) => setNewMagPages(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Magazine Summary *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Brief synopsis of this edition's articles and themes..."
                  value={newMagSummary}
                  onChange={(e) => setNewMagSummary(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Featured Article Highlights (One per line)</label>
                <textarea
                  rows={2}
                  placeholder="Presidential Address&#10;Passara Field Trip Photos"
                  value={newMagHighlights}
                  onChange={(e) => setNewMagHighlights(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-[11px]"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsMagazineModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 font-semibold hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#003B99] text-white font-bold hover:bg-[#002D7A] shadow-xs"
                >
                  Save Publication
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================================= */}
      {/* MODAL 4: ADD NEW MEMBER RECORD                                          */}
      {/* ======================================================================= */}
      {isMemberModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-lg w-full p-6 shadow-xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900 font-heading">
                Add Member / Applicant Record
              </h3>
              <button onClick={() => setIsMemberModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateMember} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Student Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kasun Jayawardena"
                  value={newMemName}
                  onChange={(e) => setNewMemName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Registration No</label>
                  <input
                    type="text"
                    placeholder="UWU/CST/23/001"
                    value={newMemRegNo}
                    onChange={(e) => setNewMemRegNo(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-[11px]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Academic Year</label>
                  <select
                    value={newMemYear}
                    onChange={(e) => setNewMemYear(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option>1st Year</option>
                    <option>2nd Year</option>
                    <option>3rd Year</option>
                    <option>4th Year</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Faculty</label>
                <select
                  value={newMemFaculty}
                  onChange={(e) => setNewMemFaculty(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  <option>Faculty of Science &amp; Technology</option>
                  <option>Faculty of Applied Sciences</option>
                  <option>Faculty of Management</option>
                  <option>Faculty of Animal Science &amp; Export Agriculture</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="student@uwu.ac.lk"
                    value={newMemEmail}
                    onChange={(e) => setNewMemEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    placeholder="+94 77 000 0000"
                    value={newMemPhone}
                    onChange={(e) => setNewMemPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Interests / Directorates</label>
                <input
                  type="text"
                  placeholder="e.g. IT, Education &amp; STEM, Blood Aid"
                  value={newMemInterests}
                  onChange={(e) => setNewMemInterests(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsMemberModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 font-semibold hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#003B99] text-white font-bold hover:bg-[#002D7A] shadow-xs"
                >
                  Add Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================================= */}
      {/* MODAL 5: ADD / EDIT OFFICIAL DOCUMENT & DRIVE LINK                      */}
      {/* ======================================================================= */}
      {isDocumentModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-lg w-full p-6 shadow-xl space-y-5 animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900 font-heading">
                {editingDoc ? "Edit Official Document & Drive Link" : "Publish Official Document & Drive Link"}
              </h3>
              <button
                onClick={() => {
                  setIsDocumentModalOpen(false);
                  setEditingDoc(null);
                }}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateOrUpdateDocument} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Document Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Project Proposal & Budget Approval Template"
                  value={newDocTitle}
                  onChange={(e) => setNewDocTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-[#003B99]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={newDocCategory}
                    onChange={(e) => setNewDocCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option>Governance &amp; Statutes</option>
                    <option>Membership &amp; Induction</option>
                    <option>Project Management</option>
                    <option>Reporting &amp; Auditing</option>
                    <option>Safety &amp; Compliance</option>
                    <option>Official Templates</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Format</label>
                  <select
                    value={newDocFormat}
                    onChange={(e) => setNewDocFormat(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option>PDF Document</option>
                    <option>DOCX Document</option>
                    <option>PDF / DOCX</option>
                    <option>Excel Spreadsheet</option>
                    <option>ZIP Archive</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Approx. File Size</label>
                  <input
                    type="text"
                    placeholder="e.g. 1.2 MB or 450 KB"
                    value={newDocSize}
                    onChange={(e) => setNewDocSize(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Status</label>
                  <input
                    type="text"
                    disabled
                    value="Synced to /brand-and-forms"
                    className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 font-mono text-[11px]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Google Drive Direct Link *</label>
                <input
                  type="url"
                  required
                  placeholder="https://drive.google.com/file/d/.../view?usp=sharing"
                  value={newDocDriveUrl}
                  onChange={(e) => setNewDocDriveUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-[#003B99] font-mono text-[11px]"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Paste the shareable Google Drive link. Ensure permissions are set to &quot;Anyone with the link can view&quot;.
                </span>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Document Description &amp; Instructions</label>
                <textarea
                  rows={3}
                  placeholder="Explain who must fill this document and how to submit it to the Secretariat..."
                  value={newDocDescription}
                  onChange={(e) => setNewDocDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsDocumentModalOpen(false);
                    setEditingDoc(null);
                  }}
                  className="px-4 py-2 rounded-xl text-slate-600 font-semibold hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#003B99] text-white font-bold hover:bg-[#002D7A] shadow-xs"
                >
                  {editingDoc ? "Update Document" : "Publish Document"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
