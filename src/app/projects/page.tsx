"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import projectsData from "@/data/projects.json";
import { isFirebaseConfigured, getFirestoreCollection } from "@/lib/firebase";
import {
  Search,
  MapPin,
  Calendar,
  Award,
  ArrowRight,
  BookOpen,
  Activity,
  Trees,
  HeartHandshake,
  Laptop,
  Users,
  CheckCircle2,
  Sparkles,
  Layers,
  ArrowUpRight,
} from "lucide-react";

// Project Category Icon Mapper
function CategoryIcon({ name, className }: { name?: string; className?: string }) {
  switch (name) {
    case "BookOpen":
      return <BookOpen className={className} />;
    case "Activity":
      return <Activity className={className} />;
    case "Trees":
      return <Trees className={className} />;
    case "HeartHandshake":
      return <HeartHandshake className={className} />;
    case "Laptop":
      return <Laptop className={className} />;
    case "Users":
      return <Users className={className} />;
    default:
      return <Award className={className} />;
  }
}

export default function ProjectsPage() {
  const [projectsList, setProjectsList] = useState<any[]>(projectsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    if (isFirebaseConfigured()) {
      getFirestoreCollection<any>("projects", projectsData).then((data) => {
        if (data && data.length > 0) {
          setProjectsList(data);
        }
      });
    }
  }, []);

  const categories = ["all", ...Array.from(new Set(projectsList.map((p) => p.category)))];

  const filteredProjects = projectsList.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.directorate.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === "all" || p.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCat;
  });

  return (
    <div className="min-h-screen bg-[#FAFAFC] text-slate-900">
      
      {/* 1. Minimal Header */}
      <section className="bg-white border-b border-slate-200/80 pt-14 pb-8 sm:pt-16 sm:pb-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-100 text-[11px] font-medium text-slate-600">
              <span className="w-1.5 h-1.5 rounded-full bg-[#003B99]" />
              <span>District 306 D10 • Uva Wellassa University</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-heading">
              Impact Initiatives &amp; Projects
            </h1>

            <p className="text-slate-500 text-sm leading-relaxed">
              Explore sustainable humanitarian service, environmental conservation, educational upliftment, and community aid driven by university undergraduates across Uva Province.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Filter & Search Toolbar */}
      <section className="py-4 bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-16 sm:top-20 z-30 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap capitalize ${
                    selectedCategory.toLowerCase() === cat.toLowerCase()
                      ? "bg-[#003B99] text-white shadow-xs font-semibold"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900"
                  }`}
                >
                  {cat === "all" ? `All Projects (${projectsData.length})` : cat}
                </button>
              ))}
            </div>

            {/* Search Box */}
            <div className="relative w-full md:w-64 shrink-0">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search projects or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#003B99] focus:bg-white text-slate-800 placeholder:text-slate-400"
              />
            </div>

          </div>
        </div>
      </section>

      {/* 3. Projects Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200/80 p-8 space-y-3">
            <p className="text-sm font-semibold text-slate-700">No projects match your search criteria.</p>
            <p className="text-xs text-slate-400">Try changing keywords or clearing category filters.</p>
            <button
              onClick={() => { setSelectedCategory("all"); setSearchTerm(""); }}
              className="px-4 py-2 rounded-lg bg-[#003B99] text-white text-xs font-bold hover:bg-[#002D7A] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs hover:border-slate-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  
                  {/* Top Bar: Category Icon Badge + Status */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#003B99] border border-blue-100 flex items-center justify-center shrink-0 group-hover:bg-[#003B99] group-hover:text-white transition-colors duration-200">
                      <CategoryIcon name={project.icon} className="w-5 h-5" />
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
                        {project.category}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {project.status}
                      </span>
                    </div>
                  </div>

                  {/* Title & Directorate */}
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      {project.directorate}
                    </span>
                    <h2 className="text-base font-bold text-slate-900 font-heading leading-snug group-hover:text-[#003B99] transition-colors">
                      <Link href={`/projects/${project.slug}`}>
                        {project.title}
                      </Link>
                    </h2>
                  </div>

                  {/* Location & Date */}
                  <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-slate-500 font-medium pt-1 pb-3 border-b border-slate-100">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{project.date}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 truncate max-w-[180px]">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span className="truncate">{project.location}</span>
                    </span>
                  </div>

                  {/* Summary */}
                  <p className="text-xs text-slate-600 leading-relaxed font-normal line-clamp-3">
                    {project.summary}
                  </p>

                  {/* Key Highlights */}
                  {project.highlights && project.highlights.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      {project.highlights.slice(0, 2).map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-500 leading-tight">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{item}</span>
                        </div>
                      ))}
                    </div>
                  )}

                </div>

                {/* Bottom Impact Metric & Link */}
                <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 text-[#003B99] font-bold text-[11px] border border-blue-100">
                    <Award className="w-3.5 h-3.5 text-[#00A3E0]" />
                    <span>{project.impactMetric}</span>
                  </div>

                  <Link
                    href={`/projects/${project.slug}`}
                    className="font-semibold text-slate-700 group-hover:text-[#003B99] inline-flex items-center gap-1 transition-colors"
                  >
                    <span>Details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>

              </article>
            ))}
          </div>
        )}

      </div>

    </div>
  );
}
