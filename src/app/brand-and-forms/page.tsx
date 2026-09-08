"use client";

import React, { useState, useEffect } from "react";
import initialDocumentsData from "@/data/documents.json";
import {
  Download,
  FileText,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Palette,
  FileSpreadsheet,
  FileCheck2,
  Scroll,
  Image as ImageIcon,
  Sparkles,
  HardDrive,
} from "lucide-react";
import {
  UwuLeoOfficialLogo,
  UwuLeoEmblem,
  LionsEmblemSvg,
  DistrictEmblemSvg,
} from "@/components/ui/BrandingLogos";
import { isFirebaseConfigured, getFirestoreCollection } from "@/lib/firebase";

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

export default function BrandAndFormsPage() {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [documents, setDocuments] = useState<DocumentItem[]>(initialDocumentsData);

  useEffect(() => {
    // Load documents from localStorage and Firestore
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("uwu_leos_documents");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setDocuments(parsed);
          }
        } catch (e) {
          console.error("Error loading stored documents:", e);
        }
      }

      if (isFirebaseConfigured()) {
        getFirestoreCollection<DocumentItem>("documents", initialDocumentsData).then((docs) => {
          if (docs && docs.length > 0) {
            setDocuments(docs);
            localStorage.setItem("uwu_leos_documents", JSON.stringify(docs));
          }
        });
      }
    }
  }, []);

  const copyHex = (hex: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(hex);
      setCopiedColor(hex);
      setTimeout(() => setCopiedColor(null), 2000);
    }
  };

  const brandColors = [
    { name: "Leo Blue", hex: "#003399", cmyk: "100 80 0 0", desc: "Primary brand & header color" },
    { name: "Leo Dark", hex: "#061838", cmyk: "90 70 40 60", desc: "Deep text & contrast background" },
    { name: "Leo Cyan", hex: "#00A3E0", cmyk: "75 15 0 0", desc: "Digital accent & highlights" },
    { name: "Leo Gold", hex: "#F5A800", cmyk: "0 35 100 0", desc: "Heritage & recognition accent" },
    { name: "Leo Pearl", hex: "#F4F6FA", cmyk: "3 1 0 2", desc: "Soft surface card backdrop" },
  ];

  const brandAssets = [
    {
      id: "full-logo-dark",
      title: "Official UWU Leo Logo (Full Lockup)",
      type: "Dark Theme (For light backgrounds)",
      preview: <UwuLeoOfficialLogo className="h-10 w-auto" theme="dark" />,
      fileUrl: "/logos/uwu-leo-logo.png",
      format: "PNG (Transparent)",
      resolution: "987 × 235 px",
    },
    {
      id: "full-logo-white",
      title: "Official UWU Leo Logo (White Lockup)",
      type: "Light Theme (For dark backgrounds)",
      preview: (
        <div className="bg-[#061838] p-3 rounded-lg flex items-center justify-center">
          <UwuLeoOfficialLogo className="h-8 w-auto" theme="light" />
        </div>
      ),
      fileUrl: "/logos/uwu-leo-logo-white.png",
      format: "PNG (Transparent)",
      resolution: "987 × 235 px",
    },
    {
      id: "seal-dark",
      title: "Official UWU Leo Circular Seal",
      type: "Dark Lion Crest & Arcs",
      preview: <UwuLeoEmblem className="w-14 h-14" theme="dark" />,
      fileUrl: "/logos/uwu-leo-seal.png",
      format: "PNG (Transparent)",
      resolution: "512 × 512 px",
    },
    {
      id: "seal-white",
      title: "Official UWU Leo Circular Seal (White)",
      type: "Light Lion Crest for dark backgrounds",
      preview: (
        <div className="bg-[#061838] p-3 rounded-lg flex items-center justify-center">
          <UwuLeoEmblem className="w-10 h-10" theme="light" />
        </div>
      ),
      fileUrl: "/logos/uwu-leo-seal-white.png",
      format: "PNG (Transparent)",
      resolution: "512 × 512 px",
    },
    {
      id: "lions-intl",
      title: "Lions International Official Emblem",
      type: "Parent International Organization Badge",
      preview: <LionsEmblemSvg className="w-14 h-14" />,
      fileUrl: "/logos/lions-international.png",
      format: "PNG (High-Res)",
      resolution: "512 × 512 px",
    },
    {
      id: "district-badge",
      title: "Leo District 306 D10 Official Emblem",
      type: "District Administration Circular Crest",
      preview: <DistrictEmblemSvg className="w-14 h-14" />,
      fileUrl: "/logos/district-306-d10.png",
      format: "PNG (Transparent)",
      resolution: "512 × 512 px",
    },
  ];

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "governance & statutes":
      case "governance":
        return <Scroll className="w-6 h-6 text-[#003B99]" />;
      case "membership & induction":
      case "membership":
        return <FileCheck2 className="w-6 h-6 text-[#00A3E0]" />;
      case "project management":
        return <FileSpreadsheet className="w-6 h-6 text-[#F5A800]" />;
      case "safety & compliance":
        return <ShieldCheck className="w-6 h-6 text-indigo-600" />;
      default:
        return <FileText className="w-6 h-6 text-emerald-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFC] text-slate-900 pb-20">
      
      {/* 1. Header */}
      <section className="bg-white border-b border-slate-200/80 pt-14 pb-10 sm:pt-16 sm:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-100 text-[11px] font-medium text-slate-600">
              <span className="w-1.5 h-1.5 rounded-full bg-[#003B99]" />
              <span>District 306 D10 • Official Downloads</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-heading">
              Brand Assets &amp; Official Forms
            </h1>

            <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-normal">
              Download high-resolution official logos, visual identity assets, club constitution guidelines, and project administration templates directly via verified Google Drive links.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 pt-10 sm:pt-14 space-y-16">
        
        {/* 2. Official Brand Logos Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div className="flex items-center gap-2.5">
              <ImageIcon className="w-5 h-5 text-[#003B99]" />
              <h2 className="text-xl font-bold text-slate-900 font-heading">
                Official Logos &amp; Crests
              </h2>
            </div>
            <span className="text-xs text-slate-500 font-medium">Transparent PNG Assets</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brandAssets.map((asset) => (
              <div
                key={asset.id}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-slate-300 hover:shadow-xs transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Asset Preview Frame */}
                  <div className="h-28 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-4 mb-4">
                    {asset.preview}
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                      {asset.type}
                    </span>
                    <h3 className="font-bold text-sm text-slate-900 leading-snug">
                      {asset.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-2.5">
                    <span>{asset.format}</span>
                    <span>•</span>
                    <span>{asset.resolution}</span>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100">
                  <a
                    href={asset.fileUrl}
                    download
                    className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-100 hover:bg-[#003B99] text-slate-700 hover:text-white text-xs font-semibold transition-all duration-150"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Image</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Color Palette & Typography Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div className="flex items-center gap-2.5">
              <Palette className="w-5 h-5 text-[#003B99]" />
              <h2 className="text-xl font-bold text-slate-900 font-heading">
                Official Color Palette
              </h2>
            </div>
            <span className="text-xs text-slate-500 font-medium">Click to copy HEX code</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {brandColors.map((color) => {
              const isCopied = copiedColor === color.hex;
              return (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => copyHex(color.hex)}
                  className="bg-white rounded-2xl p-4 border border-slate-200/80 hover:border-slate-300 hover:shadow-xs text-left transition-all group"
                >
                  <div
                    className="h-14 rounded-xl border border-black/5 mb-3 flex items-end justify-end p-2 transition-transform group-hover:scale-[1.02]"
                    style={{ backgroundColor: color.hex }}
                  >
                    {isCopied ? (
                      <span className="p-1 rounded-md bg-white/90 text-emerald-700 text-[10px] font-bold flex items-center gap-1 shadow-xs">
                        <Check className="w-3 h-3" />
                      </span>
                    ) : (
                      <span className="p-1 rounded-md bg-white/80 text-slate-800 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity shadow-xs">
                        <Copy className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                  <div className="font-bold text-xs text-slate-900">{color.name}</div>
                  <div className="font-mono text-[11px] font-semibold text-[#003B99] mt-0.5">{color.hex}</div>
                  <div className="text-[10px] text-slate-400 mt-1 leading-tight">{color.desc}</div>
                </button>
              );
            })}
          </div>
        </section>

        {/* 4. Official Administrative Forms & Documents */}
        <section className="space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div className="flex items-center gap-2.5">
              <FileText className="w-5 h-5 text-[#003B99]" />
              <h2 className="text-xl font-bold text-slate-900 font-heading">
                Administrative Documents &amp; Forms
              </h2>
            </div>
            <span className="text-xs text-slate-500 font-medium">{documents.length} Available Documents</span>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {documents.map((form) => (
              <div
                key={form.id}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 hover:border-slate-300 hover:shadow-xs transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                    {getCategoryIcon(form.category)}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-[#003B99] uppercase tracking-wider">
                        {form.category}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-[11px] text-slate-400 font-medium">
                        {form.format} ({form.size})
                      </span>
                    </div>

                    <h3 className="font-bold text-sm sm:text-base text-slate-900">
                      {form.title}
                    </h3>

                    <p className="text-xs text-slate-500 leading-relaxed max-w-2xl font-normal">
                      {form.description}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <a
                    href={form.driveUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-900 hover:bg-[#003B99] text-white text-xs font-semibold shadow-2xs transition-all duration-150"
                  >
                    <HardDrive className="w-3.5 h-3.5 text-[#00A3E0]" />
                    <span>Download via Google Drive</span>
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

    </div>
  );
}
