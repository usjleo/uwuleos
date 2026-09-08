"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  BookOpen,
  Users,
  Award,
  Calendar,
  Image as ImageIcon,
  PhoneCall,
  Download,
  FileText,
} from "lucide-react";
import { UwuLeoOfficialLogo, UwuLeoEmblem } from "@/components/ui/BrandingLogos";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [downloadsOpen, setDownloadsOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileDownloadsOpen, setMobileDownloadsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Dynamic scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 w-full max-w-full ${
        scrolled
          ? "bg-[#F4F6FA]/90 backdrop-blur-xl border-b border-slate-200/80 shadow-xs"
          : "bg-[#F4F6FA] border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 w-full">
        <div
          className={`flex items-center justify-between gap-3 sm:gap-4 transition-all duration-300 ${
            scrolled ? "h-16" : "h-20"
          }`}
        >
          
          {/* Official Brand Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <UwuLeoOfficialLogo
              className="h-10 sm:h-12 w-auto group-hover:opacity-90 transition-opacity"
              theme="dark"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-[14px] font-semibold text-slate-700 shrink-0">
            
            {/* 1. About Us Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setAboutOpen(true)}
              onMouseLeave={() => setAboutOpen(false)}
            >
              <button
                type="button"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-slate-700 hover:text-[#003B99] hover:bg-slate-50 transition-all duration-150 whitespace-nowrap"
              >
                <span>About Us</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                    aboutOpen ? "rotate-180 text-[#003B99]" : ""
                  }`}
                />
              </button>

              {aboutOpen && (
                <div className="absolute top-full left-0 w-72 bg-white/95 backdrop-blur-xl rounded-xl shadow-xl shadow-slate-900/5 border border-slate-100 p-2 animate-in fade-in slide-in-from-top-2 duration-150 z-50 space-y-1">
                  <Link
                    href="/about"
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-50 text-slate-800 hover:text-[#003B99] transition-colors group/item"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#003B99] flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-[#003B99] group-hover/item:text-white transition-colors">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm leading-tight">Our Story &amp; Heritage</div>
                      <div className="text-[11px] text-slate-500 font-normal mt-0.5">Campus roots and history</div>
                    </div>
                  </Link>

                  <Link
                    href="/board"
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-50 text-slate-800 hover:text-[#003B99] transition-colors group/item"
                  >
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-indigo-600 group-hover/item:text-white transition-colors">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm leading-tight">Executive Board</div>
                      <div className="text-[11px] text-slate-500 font-normal mt-0.5">Leistic year leaders</div>
                    </div>
                  </Link>

                  <Link
                    href="/about#lions-history"
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-50 text-slate-800 hover:text-[#003B99] transition-colors group/item"
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-amber-600 group-hover/item:text-white transition-colors">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm leading-tight">Lions Sponsorship</div>
                      <div className="text-[11px] text-slate-500 font-normal mt-0.5">Lions Club of Badulla &amp; 306 D10</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* 2. Projects Link */}
            <Link
              href="/projects"
              className="px-3 py-2 rounded-xl text-slate-700 hover:text-[#003B99] hover:bg-slate-50 transition-all duration-150 whitespace-nowrap"
            >
              Projects
            </Link>

            {/* 3. Events Link */}
            <Link
              href="/events"
              className="px-3 py-2 rounded-xl text-slate-700 hover:text-[#003B99] hover:bg-slate-50 transition-all duration-150 whitespace-nowrap"
            >
              Events
            </Link>

            {/* 4. Downloads Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setDownloadsOpen(true)}
              onMouseLeave={() => setDownloadsOpen(false)}
            >
              <button
                type="button"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-slate-700 hover:text-[#003B99] hover:bg-slate-50 transition-all duration-150 whitespace-nowrap"
              >
                <span>Downloads</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                    downloadsOpen ? "rotate-180 text-[#003B99]" : ""
                  }`}
                />
              </button>

              {downloadsOpen && (
                <div className="absolute top-full left-0 w-72 bg-white/95 backdrop-blur-xl rounded-xl shadow-xl shadow-slate-900/5 border border-slate-100 p-2 animate-in fade-in slide-in-from-top-2 duration-150 z-50 space-y-1">
                  <Link
                    href="/magazine"
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-50 text-slate-800 hover:text-[#003B99] transition-colors group/item"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#003B99] flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-[#003B99] group-hover/item:text-white transition-colors">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm leading-tight">Leo Magazine</div>
                      <div className="text-[11px] text-slate-500 font-normal mt-0.5">Annual reviews &amp; periodicals</div>
                    </div>
                  </Link>

                  <Link
                    href="/brand-and-forms"
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-50 text-slate-800 hover:text-[#003B99] transition-colors group/item"
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-amber-600 group-hover/item:text-white transition-colors">
                      <Download className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm leading-tight">Official Brand &amp; Forms</div>
                      <div className="text-[11px] text-slate-500 font-normal mt-0.5">Logos, guidelines &amp; templates</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* 5. Contact Link */}
            <Link
              href="/contact"
              className="px-3 py-2 rounded-xl text-slate-700 hover:text-[#003B99] hover:bg-slate-50 transition-all duration-150 whitespace-nowrap"
            >
              Contact
            </Link>
          </nav>

          {/* Right Action Area */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Link
              href="/join"
              className="hidden sm:inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-[#003B99] to-[#00A3E0] hover:from-[#002D7A] hover:to-[#0092C7] text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap shrink-0"
            >
              <span>Join UWU Leos</span>
              <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              className="lg:hidden p-2.5 rounded-xl text-slate-700 hover:bg-slate-200/60 active:bg-slate-200 transition-colors shrink-0 flex items-center justify-center"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Drawer (Matches Desktop Hierarchy) */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200/80 py-4 space-y-1 animate-in fade-in slide-in-from-top-2 duration-200 bg-[#F4F6FA]/95 rounded-b-2xl pb-6">
            
            {/* 1. About Us (Accordion with sub-items) */}
            <div>
              <button
                type="button"
                onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl font-semibold text-sm text-slate-800 hover:bg-white hover:text-[#003B99] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <BookOpen className="w-4 h-4 text-leo-cyan shrink-0" />
                  <span>About Us</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                    mobileAboutOpen ? "rotate-180 text-[#003B99]" : ""
                  }`}
                />
              </button>

              {mobileAboutOpen && (
                <div className="pl-11 pr-4 py-1.5 space-y-1 bg-white/70 rounded-xl mx-3 my-1 border border-slate-200/60">
                  <Link
                    href="/about"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setMobileAboutOpen(false);
                    }}
                    className="block py-2 text-xs font-semibold text-slate-700 hover:text-[#003B99] transition-colors"
                  >
                    Our Story &amp; Heritage
                  </Link>
                  <Link
                    href="/board"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setMobileAboutOpen(false);
                    }}
                    className="block py-2 text-xs font-semibold text-slate-700 hover:text-[#003B99] transition-colors"
                  >
                    Executive Board
                  </Link>
                  <Link
                    href="/about#lions-history"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setMobileAboutOpen(false);
                    }}
                    className="block py-2 text-xs font-semibold text-slate-700 hover:text-[#003B99] transition-colors"
                  >
                    Lions Sponsorship
                  </Link>
                </div>
              )}
            </div>

            {/* 2. Projects */}
            <Link
              href="/projects"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm text-slate-800 hover:bg-white hover:text-[#003B99] transition-colors"
            >
              <Award className="w-4 h-4 text-leo-cyan shrink-0" />
              <span>Projects</span>
            </Link>

            {/* 3. Events */}
            <Link
              href="/events"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm text-slate-800 hover:bg-white hover:text-[#003B99] transition-colors"
            >
              <Calendar className="w-4 h-4 text-leo-cyan shrink-0" />
              <span>Events</span>
            </Link>

            {/* 4. Downloads (Accordion with sub-items) */}
            <div>
              <button
                type="button"
                onClick={() => setMobileDownloadsOpen(!mobileDownloadsOpen)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl font-semibold text-sm text-slate-800 hover:bg-white hover:text-[#003B99] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Download className="w-4 h-4 text-leo-cyan shrink-0" />
                  <span>Downloads</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                    mobileDownloadsOpen ? "rotate-180 text-[#003B99]" : ""
                  }`}
                />
              </button>

              {mobileDownloadsOpen && (
                <div className="pl-11 pr-4 py-1.5 space-y-1 bg-white/70 rounded-xl mx-3 my-1 border border-slate-200/60">
                  <Link
                    href="/magazine"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setMobileDownloadsOpen(false);
                    }}
                    className="block py-2 text-xs font-semibold text-slate-700 hover:text-[#003B99] transition-colors"
                  >
                    Leo Magazine
                  </Link>
                  <Link
                    href="/brand-and-forms"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setMobileDownloadsOpen(false);
                    }}
                    className="block py-2 text-xs font-semibold text-slate-700 hover:text-[#003B99] transition-colors"
                  >
                    Official Brand &amp; Forms
                  </Link>
                </div>
              )}
            </div>

            {/* 5. Contact */}
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm text-slate-800 hover:bg-white hover:text-[#003B99] transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-leo-cyan shrink-0" />
              <span>Contact</span>
            </Link>

            {/* 6. Join CTA */}
            <div className="pt-3 px-2">
              <Link
                href="/join"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3.5 bg-gradient-to-r from-[#003B99] to-[#00A3E0] hover:from-[#002D7A] hover:to-[#0092C7] text-white font-bold text-sm rounded-xl block shadow-sm transition-all duration-200"
              >
                Join UWU Leos
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
