"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import projectsData from "@/data/projects.json";
import { isFirebaseConfigured, getFirestoreCollection } from "@/lib/firebase";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Award,
  Users,
  CheckCircle2,
  Heart,
  Share2,
  Building2,
  BookOpen,
  Activity,
  Trees,
  HeartHandshake,
  Laptop,
  ArrowRight,
  ShieldCheck,
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
  icon?: string;
  volunteers?: string;
  beneficiaries?: string;
  highlights?: string[];
  image?: string;
  chairperson?: string;
  secretary?: string;
  treasurer?: string;
  budget?: string;
}

export default function SingleProjectPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [projectsList, setProjectsList] = useState<ProjectItem[]>(projectsData);

  useEffect(() => {
    if (isFirebaseConfigured()) {
      getFirestoreCollection<ProjectItem>("projects", projectsData).then((data) => {
        if (data && data.length > 0) {
          setProjectsList(data);
        }
      });
    }
  }, []);

  const project = projectsList.find((p) => p.slug === slug) || projectsData.find((p) => p.slug === slug) || projectsList[0];

  return (
    <div className="min-h-screen bg-[#FAFAFC] text-slate-900">
      
      {/* Top Breadcrumb Navigation */}
      <section className="bg-white py-4 border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#003B99] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Projects</span>
          </Link>
        </div>
      </section>

      {/* Main Project Hero & Case Study */}
      <section className="py-10 sm:py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Header Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
            
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#003B99] border border-blue-100 flex items-center justify-center shrink-0">
                  <CategoryIcon name={project.icon} className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {project.directorate}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
                  {project.category}
                </span>
                <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {project.status}
                </span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 font-heading leading-tight tracking-tight">
              {project.title}
            </h1>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2.5 text-xs text-slate-600">
                <Calendar className="w-4 h-4 text-[#003B99] shrink-0" />
                <div>
                  <div className="text-[10px] text-slate-400 font-mono uppercase">Execution Date</div>
                  <div className="font-semibold text-slate-800">{project.date}</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-xs text-slate-600">
                <MapPin className="w-4 h-4 text-[#003B99] shrink-0" />
                <div>
                  <div className="text-[10px] text-slate-400 font-mono uppercase">Location</div>
                  <div className="font-semibold text-slate-800 truncate">{project.location}</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-xs text-slate-600">
                <Award className="w-4 h-4 text-[#003B99] shrink-0" />
                <div>
                  <div className="text-[10px] text-slate-400 font-mono uppercase">Key Impact</div>
                  <div className="font-bold text-[#003B99]">{project.impactMetric}</div>
                </div>
              </div>
            </div>

            {/* Optional Image (Only rendered if image URL exists) */}
            {project.image && (
              <div className="rounded-xl overflow-hidden border border-slate-200/80 bg-slate-900 h-64 sm:h-80">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

          </div>

          {/* Narrative & Impact Highlights Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Left 2 Cols: Body Narrative & Key Highlights */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
              
              <div>
                <h2 className="text-base font-bold text-slate-900 font-heading mb-2">
                  Project Overview &amp; Community Scope
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {project.summary}
                </p>
              </div>

              {project.highlights && project.highlights.length > 0 && (
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Key Accomplishments
                  </h3>
                  <div className="space-y-2.5">
                    {project.highlights.map((highlight: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Organized by Uva Wellassa University Leos</span>
                <span className="font-medium text-[#003B99]">District 306 D10</span>
              </div>

            </div>

            {/* Right 1 Col: Quick Stats & Sponsoring Info */}
            <div className="space-y-4">
              
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4 text-xs">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Execution Metrics
                </h3>

                <div className="space-y-3">
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500">Volunteers Mobilized</span>
                    <strong className="text-slate-800">{project.volunteers}</strong>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500">Beneficiary Group</span>
                    <strong className="text-slate-800">{project.beneficiaries}</strong>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500">Project Status</span>
                    <strong className="text-emerald-700">{project.status}</strong>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-slate-500">Parent District</span>
                    <strong className="text-slate-800">Leo District 306 D10</strong>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/contact"
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-[#003B99] hover:bg-[#002D7A] text-white font-bold text-xs shadow-xs transition-colors"
                  >
                    <span>Partner / Sponsor Initiatives</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Other Projects Quick Nav */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs text-xs space-y-3">
                <div className="text-xs font-bold text-slate-700">Other Recent Initiatives</div>
                <div className="space-y-2">
                  {projectsData
                    .filter((p) => p.slug !== project.slug)
                    .slice(0, 3)
                    .map((other) => (
                      <Link
                        key={other.id}
                        href={`/projects/${other.slug}`}
                        className="block p-2 rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        <div className="font-semibold text-slate-800 hover:text-[#003B99] line-clamp-1">
                          {other.title}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          {other.category} • {other.impactMetric}
                        </div>
                      </Link>
                    ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
