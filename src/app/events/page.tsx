"use client";

import React, { useState } from "react";
import { useClub } from "@/context/ClubContext";
import { Calendar, Clock, MapPin, CalendarPlus } from "lucide-react";

export default function EventsPage() {
  const { club } = useClub();

  const events = [
    {
      id: "ev-1",
      title: "UWU Leos Annual Leadership Training & Induction 2025",
      date: "March 28, 2025",
      day: "28",
      month: "MAR",
      time: "03:30 PM - 06:30 PM",
      venue: "Management Auditorium, UWU Campus, Badulla",
      category: "Leadership",
      description:
        "Induction of prospective undergraduate members, executive leadership training, and team-building workshops.",
    },
    {
      id: "ev-2",
      title: "Project Sipnana Phase II – Monaragala School Upliftment",
      date: "April 19, 2025",
      day: "19",
      month: "APR",
      time: "08:00 AM - 04:00 PM",
      venue: "Monaragala Rural Primary School",
      category: "Community",
      description:
        "Delivering essential school stationery, conducting interactive creative workshops, and renovating library facilities for rural students.",
    },
    {
      id: "ev-3",
      title: "Uva Youth Clean-Up & Environmental Trek",
      date: "May 10, 2025",
      day: "10",
      month: "MAY",
      time: "07:00 AM - 02:00 PM",
      venue: "Ella & Dunhinda Conservation Area",
      category: "Environment",
      description:
        "Promoting eco-tourism, removing plastic waste from natural catchment areas, and installing trail conservation signage.",
    },
    {
      id: "ev-4",
      title: "Leo District 306 D10 Mid-Year Youth Summit",
      date: "June 14, 2025",
      day: "14",
      month: "JUN",
      time: "09:00 AM - 05:00 PM",
      venue: "Provincial Council Auditorium, Badulla",
      category: "Leadership",
      description:
        "Regional youth leadership congress connecting undergraduates with provincial changemakers and community leaders.",
    },
    {
      id: "ev-5",
      title: "Annual Leistic Installation & Fellowship Gala",
      date: "July 26, 2025",
      day: "26",
      month: "JUL",
      time: "04:30 PM - 09:30 PM",
      venue: "Heritage Grand Ballroom, Bandarawela",
      category: "Fellowship",
      description:
        "Official installation ceremony of the incoming Executive Board and recognition of outstanding undergraduate project leaders.",
    },
  ];

  const getGoogleCalendarUrl = (ev: (typeof events)[0]) => {
    const title = encodeURIComponent(`${ev.title} - Leo Club of UWU`);
    const details = encodeURIComponent(
      `${ev.description}\n\nOrganized by Leo Club of Uva Wellassa University`
    );
    const location = encodeURIComponent(ev.venue);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  };

  return (
    <div className="min-h-screen bg-[#FAFAFC] text-slate-900 pb-20">
      
      {/* 1. Minimal Header */}
      <section className="bg-white border-b border-slate-200/80 pt-14 pb-10 sm:pt-16 sm:pb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-100 text-[11px] font-medium text-slate-600">
              <span className="w-1.5 h-1.5 rounded-full bg-[#003B99]" />
              <span>District 306 D10 • Uva Wellassa University</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-heading">
              Events &amp; Calendar
            </h1>

            <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-normal">
              Explore upcoming leadership workshops, community outreach initiatives, and university fellowship gatherings.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Minimalist Events List */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="space-y-4">
          {events.map((event) => {
            return (
              <div
                key={event.id}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 hover:border-slate-300 hover:shadow-xs transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                {/* Left: Date + Event Details */}
                <div className="flex items-start gap-4 sm:gap-6">
                  
                  {/* Minimal Date Block */}
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-slate-100 border border-slate-200/70 flex flex-col items-center justify-center shrink-0">
                    <span className="text-lg sm:text-xl font-extrabold text-slate-900 leading-none">
                      {event.day}
                    </span>
                    <span className="text-[10px] font-bold tracking-wider uppercase text-slate-500 mt-1">
                      {event.month}
                    </span>
                  </div>

                  {/* Text Details */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5">
                      <span className="text-[11px] font-semibold text-[#003B99] uppercase tracking-wider">
                        {event.category}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-[11px] text-slate-400 font-medium">
                        {event.date}
                      </span>
                    </div>

                    <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      {event.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-2xl">
                      {event.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1.5">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {event.time}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {event.venue}
                      </span>
                    </div>
                  </div>

                </div>

                {/* Right: Calendar Action */}
                <div className="flex items-center sm:self-center shrink-0 gap-2.5 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                  <a
                    href={getGoogleCalendarUrl(event)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-[#003B99] text-xs font-semibold transition-all duration-150 shadow-2xs"
                  >
                    <CalendarPlus className="w-3.5 h-3.5 text-[#003B99]" />
                    <span>Add to Calendar</span>
                  </a>
                </div>

              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
