"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  HeartHandshake,
  Sparkles,
  Users,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
} from "lucide-react";
import { useClub } from "@/context/ClubContext";

const HERO_SLIDES = [
  {
    id: 1,
    image: "/images/home/general-meeting.jpeg",
    position: "center 35%",
    tag: "UVA WELLASSA UNIVERSITY",
    title: "Undergraduates Leading Through Service",
    subtitle: "Fostering leadership, fellowship, and social responsibility",
  },
  {
    id: 2,
    image: "/images/home/school-session.jpeg",
    position: "center 30%",
    tag: "SCHOOL OUTREACH",
    title: "Learning Alongside Uva's Students",
    subtitle: "Leos engaging school students with interactive sessions",
  },
  {
    id: 3,
    image: "/images/home/community-volunteers.jpeg",
    position: "center 55%",
    tag: "COMMUNITY SERVICE",
    title: "Volunteers Serving Together",
    subtitle: "UWU Leos on the ground for community service projects",
  },
  {
    id: 4,
    image: "/images/home/st-thomas-bandarawela.jpeg",
    position: "center 45%",
    tag: "LEO CLUB FELLOWSHIP",
    title: "Partnering with Leo Club of S. Thomas' College",
    subtitle: "Building bonds with fellow Leo clubs in Bandarawela",
  },
];

export default function HeroSection() {
  const { club } = useClub();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance carousel
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F4F6FA] via-[#FAFBFC] to-white pt-4 pb-12 sm:pb-16 lg:pt-8 lg:pb-24 border-b border-[#E9EDF5] w-full max-w-full">
      
      {/* Ambient background glows */}
      <div className="absolute -top-24 right-0 w-64 sm:w-[450px] h-64 sm:h-[450px] bg-leo-cyan/10 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-12 left-0 w-60 sm:w-[350px] h-60 sm:h-[350px] bg-[#003B99]/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200/80 shadow-xs text-[11px] sm:text-xs font-bold tracking-wider text-[#003B99] uppercase">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-leo-cyan opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-leo-cyan"></span>
              </span>
              <span>UWU Leos • District 306 D10</span>
            </div>

            {/* Headline */}
            <h1 className="font-heading font-extrabold text-2xl sm:text-4xl lg:text-[48px] text-[#111827] tracking-tight leading-[1.18] sm:leading-[1.15]">
              Empowering Youth,{" "}
              <span className="text-[#003B99]">
                Serving Communities.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xs sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-xl font-normal">
              The official youth service movement of Uva Wellassa University. Uniting undergraduates to lead impactful initiatives, build leadership skills, and serve our communities.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <Link
                href="/join"
                className="group inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 text-sm sm:text-base font-bold text-white bg-gradient-to-r from-[#003B99] to-[#00A3E0] hover:from-[#002D7A] hover:to-[#0092C7] rounded-xl shadow-xs hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 text-center w-full sm:w-auto"
              >
                <span>Join UWU Leos</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                href="/projects"
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 text-sm sm:text-base font-bold text-[#111827] bg-white hover:bg-slate-50 rounded-xl border border-slate-300 shadow-xs transition-all duration-200 text-center w-full sm:w-auto"
              >
                <span>Explore Projects</span>
              </Link>
            </div>

            {/* Trust Highlights & Faculty Representation */}
            <div className="pt-5 sm:pt-6 border-t border-slate-200/80 space-y-3 sm:space-y-4">
              <div className="flex flex-wrap items-center gap-3 sm:gap-6 lg:gap-8 text-xs text-slate-600">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#003B99] shrink-0" />
                  <span className="font-semibold text-slate-800">District 306 D10</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <GraduationCap className="w-4 h-4 text-leo-cyan shrink-0" />
                  <span className="font-semibold text-slate-800">100% University Undergrads</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Sparkles className="w-4 h-4 text-[#F5A800] shrink-0" />
                  <span className="font-semibold text-slate-800">60+ Community Projects</span>
                </div>
              </div>

              {/* 4 UWU Faculties Tag */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] text-slate-500 font-medium">
                <span className="text-slate-400">Faculties:</span>
                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold">Applied Sciences</span>
                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold">Science &amp; Tech</span>
                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold">Management</span>
                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold">Animal Science</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Image Carousel */}
          <div
            className="lg:col-span-5 relative mt-4 lg:mt-0"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Carousel Container */}
            <div className="relative mx-auto rounded-xl overflow-hidden shadow-xl border-2 sm:border-4 border-white bg-[#082E6E] w-full max-w-md lg:max-w-none h-[290px] sm:h-[400px] lg:h-[480px]">
              
              {/* Slides */}
              {HERO_SLIDES.map((slide, idx) => (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    idx === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                  }`}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    style={{ objectPosition: slide.position }}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#082E6E]/95 via-[#082E6E]/30 to-transparent" />
                </div>
              ))}

              {/* Prev / Next Navigation Arrows */}
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous Slide"
                className="absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-10 sm:h-10 rounded-lg bg-black/40 hover:bg-black/70 text-white backdrop-blur-md flex items-center justify-center transition-all duration-200 border border-white/20 shadow-sm"
              >
                <ChevronLeft className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
              </button>

              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next Slide"
                className="absolute right-2.5 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-10 sm:h-10 rounded-lg bg-black/40 hover:bg-black/70 text-white backdrop-blur-md flex items-center justify-center transition-all duration-200 border border-white/20 shadow-sm"
              >
                <ChevronRight className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
              </button>

              {/* Top Slide Counter Badge */}
              <div className="absolute top-2.5 sm:top-4 right-2.5 sm:right-4 z-20 px-2 py-0.5 sm:px-3 sm:py-1 rounded-md bg-black/40 backdrop-blur-md border border-white/20 text-white text-[9px] sm:text-[11px] font-bold tracking-widest">
                0{currentSlide + 1} / 0{HERO_SLIDES.length}
              </div>

              {/* Bottom Glass Caption Card */}
              <div className="absolute bottom-2.5 sm:bottom-4 left-2.5 sm:left-4 right-2.5 sm:right-4 z-20 p-2.5 sm:p-4 rounded-lg bg-white/95 backdrop-blur-md shadow-md border border-white/80">
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-leo-cyan truncate">
                      {HERO_SLIDES[currentSlide].tag}
                    </div>
                    <div className="font-heading font-extrabold text-xs sm:text-base text-[#111827] truncate">
                      {HERO_SLIDES[currentSlide].title}
                    </div>
                    <div className="text-[10px] sm:text-xs text-slate-500 truncate">
                      {HERO_SLIDES[currentSlide].subtitle}
                    </div>
                  </div>

                  <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg bg-[#003B99] text-white flex items-center justify-center font-bold text-[10px] sm:text-xs shrink-0 shadow-xs">
                    UWU
                  </div>
                </div>

                {/* Carousel Indicator Dots */}
                <div className="flex items-center gap-1.5 pt-2 sm:pt-3 mt-2 border-t border-slate-100">
                  {HERO_SLIDES.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      type="button"
                      onClick={() => setCurrentSlide(dotIdx)}
                      aria-label={`Go to slide ${dotIdx + 1}`}
                      className={`h-1 sm:h-1.5 rounded-sm transition-all duration-300 ${
                        dotIdx === currentSlide
                          ? "w-6 sm:w-7 bg-leo-cyan"
                          : "w-2 bg-slate-300 hover:bg-slate-400"
                      }`}
                    />
                  ))}
                </div>
              </div>

            </div>

            {/* Overlapping Bottom-Right Floating Badge */}
            <div className="absolute -bottom-3 -right-2 hidden sm:flex items-center gap-3 bg-[#003B99] text-white px-4 py-3 rounded-lg shadow-lg border border-white/20 z-30">
              <Users className="w-5 h-5 text-leo-cyan" />
              <div>
                <div className="font-heading font-extrabold text-sm leading-none">150+</div>
                <div className="text-[10px] text-slate-200 mt-0.5">Active Undergraduates</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
