"use client";

import React, { useState } from "react";
import { useClub } from "@/context/ClubContext";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  ChevronDown,
  Building2,
  ShieldCheck,
  ExternalLink,
  MessageSquare,
} from "lucide-react";

import { submitContactForm } from "@/lib/firebase";

export default function ContactPage() {
  const { club } = useClub();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "General Inquiry",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await submitContactForm({
      name: formData.name,
      email: formData.email,
      subject: `[${formData.inquiryType}] ${formData.subject || "Contact Form Inquiry"} (Phone: ${formData.phone || "N/A"})`,
      message: formData.message,
    });

    setIsSubmitting(false);
    setSubmitted(true);
  };

  const FAQS = [
    {
      q: "How can corporations or sponsors collaborate with UWU Leos for CSR?",
      a: "We collaborate with companies, NGOs, and foundations on impactful community initiatives. We offer end-to-end project planning, student volunteer mobilization across 4 faculties, transparent accounting, and media coverage across Leo District 306 D10.",
    },
    {
      q: "How quickly does the Secretariat respond to messages?",
      a: "Our Secretariat and Executive Council check official correspondence daily. Standard inquiries receive a response within 24 to 48 hours. For urgent matters, you can reach us on our hotline.",
    },
    {
      q: "Can other Leo or Lions clubs organize joint twinning projects?",
      a: "Yes! We welcome national and international twinning partnerships. Select 'Project Collaboration' in the form or email our secretariat directly.",
    },
    {
      q: "Where and when are regular club meetings conducted?",
      a: "General meetings are held bi-weekly on the 1st & 3rd Sundays at the Uva Wellassa University main campus auditorium or student center, with hybrid Zoom access for alumni and remote members.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFC] text-slate-900">
      
      {/* 1. Header Section */}
      <section className="bg-white border-b border-slate-200/80 pt-12 pb-8 sm:pt-16 sm:pb-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-2.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-100 text-[11px] font-medium text-slate-600">
              <span className="w-1.5 h-1.5 rounded-full bg-[#003B99]" />
              <span>{club.district} • Official Secretariat</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-heading">
              Contact Us
            </h1>

            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              Have a question, collaboration proposal, or CSR partnership inquiry? Reach out to the executive secretariat of the {club.name}.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main 2-Column Content Grid */}
      <section className="py-10 sm:py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Direct Contact Info (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Contact Info Card */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-xs space-y-6">
                <h2 className="text-base font-bold text-slate-900 font-heading border-b border-slate-100 pb-3">
                  Secretariat &amp; Office Info
                </h2>

                <div className="space-y-5">
                  {/* Email */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#003B99] flex items-center justify-center shrink-0 mt-0.5 border border-blue-100">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Official Email
                      </span>
                      <a
                        href={`mailto:${club.contact.email}`}
                        className="text-sm font-bold text-slate-900 hover:text-[#003B99] transition-colors truncate block"
                      >
                        {club.contact.email}
                      </a>
                      <span className="text-xs text-slate-500">Official inquiries &amp; proposals</span>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-cyan-50 text-leo-cyan flex items-center justify-center shrink-0 mt-0.5 border border-cyan-100">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Hotline &amp; WhatsApp
                      </span>
                      <a
                        href={`tel:${club.contact.phone}`}
                        className="text-sm font-bold text-slate-900 hover:text-[#003B99] transition-colors truncate block"
                      >
                        {club.contact.phone}
                      </a>
                      <span className="text-xs text-slate-500">Weekdays: 9:00 AM – 5:00 PM</span>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5 border border-indigo-100">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Campus Office
                      </span>
                      <span className="text-sm font-bold text-slate-900 block">
                        Uva Wellassa University
                      </span>
                      <span className="text-xs text-slate-500 block">
                        {club.contact.address}
                      </span>
                    </div>
                  </div>

                  {/* Meetings */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-100">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Meeting Schedule
                      </span>
                      <span className="text-sm font-bold text-slate-900 block">
                        Bi-weekly General Assembly
                      </span>
                      <span className="text-xs text-slate-500 block">
                        {club.contact.meetingSchedule}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Sponsoring Lions Tag */}
                <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-[#003B99] shrink-0" />
                  <span>Sponsoring: <strong className="text-slate-700">{club.sponsoringLionsClub}</strong></span>
                </div>
              </div>

            </div>

            {/* Right Column: Simple 1-Step Contact Form (7 cols) */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
                {submitted ? (
                  <div className="text-center py-10 space-y-4">
                    <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 font-heading">
                      Message Dispatched!
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                      Thank you, <strong>{formData.name || "friend"}</strong>. Your message has been routed to the Secretariat of {club.name}. We will get back to you within 24–48 hours.
                    </p>
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({
                            name: "",
                            email: "",
                            phone: "",
                            inquiryType: "General Inquiry",
                            subject: "",
                            message: "",
                          });
                        }}
                        className="px-5 py-2.5 bg-[#003B99] hover:bg-[#002D7A] text-white rounded-xl font-bold text-xs shadow-xs transition-colors"
                      >
                        Send Another Message
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <h2 className="text-lg font-bold text-slate-900 font-heading">
                        Send a Message
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Fill in your details and our team will get back to you promptly.
                      </p>
                    </div>

                    {/* Name & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Your Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          required
                          type="text"
                          placeholder="e.g. Kasun Fernando"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#003B99] focus:border-[#003B99] transition-all font-medium text-slate-800 placeholder:text-slate-400"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Email Address <span className="text-rose-500">*</span>
                        </label>
                        <input
                          required
                          type="email"
                          placeholder="kasun@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#003B99] focus:border-[#003B99] transition-all font-medium text-slate-800 placeholder:text-slate-400"
                        />
                      </div>
                    </div>

                    {/* Phone & Inquiry Type */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Phone / WhatsApp
                        </label>
                        <input
                          type="tel"
                          placeholder="+94 77 123 4567"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#003B99] focus:border-[#003B99] transition-all font-medium text-slate-800 placeholder:text-slate-400"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                          Inquiry Purpose
                        </label>
                        <select
                          value={formData.inquiryType}
                          onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#003B99] focus:border-[#003B99] transition-all font-medium text-slate-800 cursor-pointer"
                        >
                          <option>General Inquiry</option>
                          <option>Corporate CSR &amp; Sponsorship</option>
                          <option>Project Joint Collaboration</option>
                          <option>Media &amp; Publications</option>
                          <option>Membership Question</option>
                        </select>
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Subject <span className="text-rose-500">*</span>
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. CSR Partnership for Rural School Aid Project"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#003B99] focus:border-[#003B99] transition-all font-medium text-slate-800 placeholder:text-slate-400"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Message Content <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Please describe your proposal, question, or message..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#003B99] focus:border-[#003B99] transition-all font-medium text-slate-800 placeholder:text-slate-400 leading-relaxed"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#003B99] hover:bg-[#002D7A] text-white rounded-xl font-bold text-xs shadow-xs transition-colors cursor-pointer w-full sm:w-auto"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Message</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Frequently Asked Questions (Accordion) */}
      <section className="py-12 border-t border-slate-200/80 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center space-y-1.5">
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading">
              Frequently Asked Questions
            </h3>
            <p className="text-xs text-slate-500">
              Quick answers to common questions about partnerships and communication.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50 hover:bg-slate-50 transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-4 text-left font-heading font-bold text-sm text-slate-800 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ml-2 ${
                      openFaq === idx ? "rotate-180 text-[#003B99]" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
