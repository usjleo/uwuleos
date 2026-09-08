"use client";

import React from "react";
import Link from "next/link";
import { UwuLeoOfficialLogo, LionsEmblemSvg } from "@/components/ui/BrandingLogos";
import { Mail, Phone, MapPin, ArrowUpRight, Heart } from "lucide-react";
import { useClub } from "@/context/ClubContext";

export default function Footer() {
  const { club } = useClub();

  return (
    <footer className="bg-[#050E21] text-slate-400 border-t border-white/10 pt-10 sm:pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        
        {/* Main 3-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 pb-8 sm:pb-10 border-b border-white/10">
          
          {/* Brand Col (6 Cols) */}
          <div className="sm:col-span-2 lg:col-span-6 space-y-3.5 sm:space-y-4">
            <div>
              <UwuLeoOfficialLogo
                className="h-11 sm:h-12 w-auto"
                theme="light"
              />
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md">
              The official youth service movement of Uva Wellassa University of Sri Lanka, empowering undergraduates to lead through service, fellowship, and community development.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <span className="text-[10px] sm:text-[11px] font-medium text-slate-500">
                Sponsoring Lions Club: <strong className="text-slate-300 font-semibold">{club.sponsoringLionsClub}</strong>
              </span>
            </div>
          </div>

          {/* Quick Links (3 Cols) */}
          <div className="lg:col-span-3">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-white mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us &amp; Heritage
                </Link>
              </li>
              <li>
                <Link href="/board" className="hover:text-white transition-colors">
                  Executive Board
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-white transition-colors">
                  Humanitarian Projects
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-white transition-colors">
                  News &amp; Events
                </Link>
              </li>
              <li>
                <Link href="/magazine" className="hover:text-white transition-colors">
                  Downloads &amp; Publications
                </Link>
              </li>
              <li>
                <Link href="/join" className="text-leo-cyan hover:underline inline-flex items-center gap-1 font-semibold pt-1">
                  <span>Join as Undergrad</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact (3 Cols) */}
          <div className="lg:col-span-3">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-white mb-3">
              Contact Us
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-leo-cyan shrink-0" />
                <a href={`mailto:${club.contact.email}`} className="hover:text-white transition-colors">
                  {club.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-leo-cyan shrink-0" />
                <span>{club.contact.phone}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-leo-cyan mt-0.5 shrink-0" />
                <span className="leading-relaxed">
                  {club.contact.address}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 text-center sm:text-left">
          <div>
            &copy; {new Date().getFullYear()} {club.name} • {club.district}
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 text-[11px]">
            <Link href="/about" className="hover:text-slate-300 transition-colors">About</Link>
            <Link href="/contact" className="hover:text-slate-300 transition-colors">Contact</Link>
            <Link href="/join" className="hover:text-slate-300 transition-colors">Join</Link>
            <Link href="/admin" className="text-slate-400 hover:text-white transition-colors font-medium">Officer Admin</Link>
            <span className="flex items-center gap-1 text-slate-500">
              <span>Made for UWU Leos</span>
              <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
