"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import CyanBar from "@/components/ui/CyanBar";
import projectsData from "@/data/projects.json";
import { isFirebaseConfigured, getFirestoreCollection } from "@/lib/firebase";
import {
  ArrowRight,
  MapPin,
  Award,
  Calendar,
  BookOpen,
  Activity,
  Trees,
  HeartHandshake,
  Laptop,
  Users,
  CheckCircle2,
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

export default function FeaturedProjects() {
  const [projectsList, setProjectsList] = useState<any[]>(projectsData);

  useEffect(() => {
    if (isFirebaseConfigured()) {
      getFirestoreCollection<any>("projects", projectsData).then((data) => {
        if (data && data.length > 0) {
          setProjectsList(data);
        }
      });
    }
  }, []);

  const projects = projectsList.slice(0, 3);
  const mainProject = projects[0];
  const secondaryProjects = projects.slice(1);

  if (!mainProject) return null;

  return (
    <section className="py-14 sm:py-20 bg-white border-t border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-6 border-b border-slate-100">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#003B99] uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#003B99]" />
              <span>SERVICE IN ACTION</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading tracking-tight">
              Signature Humanitarian Projects
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
              Sustainable undergraduate-led community welfare, STEM education, and ecological initiatives across Uva Province.
            </p>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#003B99] hover:text-[#00A3E0] transition-colors shrink-0 group py-1"
          >
            <span>Explore All Initiatives</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Clean Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <article
              key={project.id}
              className={`bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs hover:border-slate-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between group ${
                idx === 0 ? "border-[#003B99]/30 bg-gradient-to-b from-blue-50/20 to-white" : ""
              }`}
            >
              <div className="space-y-4">
                
                {/* Header Icon + Category Badges */}
                <div className="flex items-center justify-between gap-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#003B99] border border-blue-100 flex items-center justify-center shrink-0 group-hover:bg-[#003B99] group-hover:text-white transition-colors duration-200">
                    <CategoryIcon name={project.icon} className="w-5 h-5" />
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
                      {project.category}
                    </span>
                    {idx === 0 && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-blue-50 text-[#003B99] border border-blue-200">
                        FLAGSHIP
                      </span>
                    )}
                  </div>
                </div>

                {/* Title */}
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1 truncate">
                    {project.directorate}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 font-heading leading-snug group-hover:text-[#003B99] transition-colors">
                    <Link href={`/projects/${project.slug}`}>
                      {project.title}
                    </Link>
                  </h3>
                </div>

                {/* Location & Date */}
                <div className="flex items-center gap-3 text-xs text-slate-500 font-medium pt-1 pb-2 border-b border-slate-100">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{project.date}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 truncate max-w-[140px]">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate">{project.location}</span>
                  </span>
                </div>

                {/* Summary */}
                <p className="text-xs text-slate-600 leading-relaxed font-normal line-clamp-3">
                  {project.summary}
                </p>

                {/* Highlights */}
                {project.highlights && project.highlights.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    {project.highlights.slice(0, 1).map((item, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-[11px] text-slate-500 leading-tight">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{item}</span>
                      </div>
                    ))}
                  </div>
                )}

              </div>

              {/* Bottom Impact & Action */}
              <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 text-[#003B99] font-bold text-[11px] border border-blue-100">
                  <Award className="w-3.5 h-3.5 text-[#00A3E0]" />
                  <span>{project.impactMetric}</span>
                </div>

                <Link
                  href={`/projects/${project.slug}`}
                  className="font-semibold text-slate-700 group-hover:text-[#003B99] inline-flex items-center gap-1 transition-colors"
                >
                  <span>Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>

            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
