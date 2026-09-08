"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import magazinesData from "@/data/magazines.json";
import { isFirebaseConfigured, getFirestoreCollection } from "@/lib/firebase";
import {
  BookOpen,
  Download,
  ExternalLink,
  Calendar,
  FileText,
  Search,
  CheckCircle2,
  ArrowRight,
  Share2,
  Send,
  Feather,
  HardDrive,
} from "lucide-react";

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

export default function MagazinePage() {
  const [magazinesList, setMagazinesList] = useState<MagazineItem[]>(magazinesData);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    if (isFirebaseConfigured()) {
      getFirestoreCollection<MagazineItem>("magazines", magazinesData).then((data) => {
        if (data && data.length > 0) {
          setMagazinesList(data);
        }
      });
    }
  }, []);

  const filteredMagazines = magazinesList.filter((mag) => {
    const matchesSearch =
      mag.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mag.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mag.edition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mag.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const handleShare = (id: string, driveUrl: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(driveUrl || window.location.href);
    }
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFC] text-slate-900">
      
      {/* 1. Header */}
      <section className="bg-white border-b border-slate-200/80 pt-14 pb-8 sm:pt-16 sm:pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-100 text-[11px] font-medium text-slate-600">
                <span className="w-1.5 h-1.5 rounded-full bg-[#003B99]" />
                <span>District 306 D10 • Publications &amp; Editorial</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-heading">
                Leo Magazine &amp; Publications
              </h1>

              <p className="text-slate-500 text-sm leading-relaxed">
                Explore official annual periodicals, special project gazettes, and environmental bulletins published by the Leo Club of Uva Wellassa University. Download high-resolution editions directly via Google Drive.
              </p>
            </div>

            {/* Clean search bar */}
            <div className="relative w-full md:w-72 shrink-0">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search publications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#003B99] focus:bg-white text-slate-800 placeholder:text-slate-400 font-medium transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. 3-Per-Row Grid (3 Magazines in Same Line on Desktop) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 py-10 sm:py-14 space-y-12">
        
        {/* 3-Column Magazine Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMagazines.map((mag) => (
            <article
              key={mag.id}
              className={`bg-white rounded-2xl border p-6 shadow-xs hover:border-slate-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between group ${
                mag.isFeatured ? "border-[#003B99]/30 bg-gradient-to-b from-blue-50/20 to-white" : "border-slate-200/80"
              }`}
            >
              <div className="space-y-4">
                
                {/* Header Badge Row */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#003B99] border border-blue-100 flex items-center justify-center shrink-0 group-hover:bg-[#003B99] group-hover:text-white transition-colors duration-200">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#003B99] block">
                        {mag.category}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">
                        {mag.date} • {mag.pages}
                      </span>
                    </div>
                  </div>

                  {mag.isFeatured && (
                    <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider bg-blue-50 text-[#003B99] border border-blue-200">
                      FLAGSHIP
                    </span>
                  )}
                </div>

                {/* Title & Volume */}
                <div>
                  <h2 className="text-base font-bold text-slate-900 font-heading leading-snug group-hover:text-[#003B99] transition-colors">
                    {mag.title}
                  </h2>
                  <p className="text-xs font-semibold text-slate-500 mt-0.5">
                    {mag.edition}
                  </p>
                </div>

                {/* Editorial Credit */}
                <div className="text-[11px] text-slate-500 font-medium pb-2 border-b border-slate-100 flex items-center gap-1.5">
                  <Feather className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{mag.editor}</span>
                </div>

                {/* Summary */}
                <p className="text-xs text-slate-600 leading-relaxed font-normal line-clamp-3">
                  {mag.summary}
                </p>

                {/* Key Articles Checklist */}
                {mag.highlights && mag.highlights.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                      Featured Highlights
                    </span>
                    {mag.highlights.slice(0, 3).map((item: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-600 leading-tight">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#003B99] shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{item}</span>
                      </div>
                    ))}
                  </div>
                )}

              </div>

              {/* Bottom Action Bar: Google Drive Download Button */}
              <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                
                <a
                  href={mag.driveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#003B99] hover:bg-[#002D7A] text-white font-bold text-xs shadow-xs transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Google Drive PDF</span>
                </a>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleShare(mag.id, mag.driveUrl)}
                    className="text-slate-400 hover:text-[#003B99] p-2 rounded-lg hover:bg-slate-50 transition-colors text-xs inline-flex items-center gap-1 font-medium"
                    title="Copy Google Drive Link"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span className="text-[11px]">{copiedId === mag.id ? "Copied!" : "Share"}</span>
                  </button>
                </div>

              </div>

            </article>
          ))}
        </div>

        {/* 4. Undergrad Article Submission Callout */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-[#003B99]">
              <Feather className="w-3.5 h-3.5" />
              <span>Call for Undergraduate Submissions</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-heading">
              Write for the Next Edition of ROAR Magazine
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Are you a UWU undergraduate with a passion for creative writing, community research, poetry, or photography? Submit your drafts to the Leo Editorial Board for the upcoming Leistic issue.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submit Draft / Article</span>
          </Link>
        </div>

      </div>

    </div>
  );
}
