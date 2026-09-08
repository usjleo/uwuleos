"use client";

import React, { useState } from "react";
import { useClub } from "@/context/ClubContext";
import {
  CheckCircle2,
  Sparkles,
  Award,
  Users,
  Globe,
  HeartHandshake,
  Send,
  ChevronDown,
  MessageSquare,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";

import { submitMembershipApplicant } from "@/lib/firebase";

export default function JoinPage() {
  const { club } = useClub();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    faculty: "Applied Sciences",
    academicYear: "1st Year (Fresher)",
    regNo: "",
    interests: [] as string[],
    motivation: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleInterest = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await submitMembershipApplicant({
      name: formData.fullName,
      regNo: formData.regNo || "UWU/GEN/24/000",
      faculty: formData.faculty,
      academicYear: formData.academicYear,
      email: formData.email,
      phone: formData.phone,
      interests: formData.interests.join(", ") + (formData.motivation ? ` | Motivation: ${formData.motivation}` : ""),
    });

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const INTEREST_OPTIONS = [
    "Community Service & Relief",
    "Environment & Green Uva",
    "Education & School Aid",
    "Healthcare & Blood Drives",
    "Media, Photography & Design",
    "IT, Web & Digital Systems",
    "Event Management & Sports",
  ];

  const FAQS = [
    {
      q: "Do I need prior experience to join UWU Leos?",
      a: "No! Most members join in their 1st year with zero prior experience. We provide full training in project management, leadership, and public speaking.",
    },
    {
      q: "How will club activities affect my academic studies?",
      a: "Academics always come first. Projects and meetings are held on weekends with flexible shifts so lectures and exam prep are never compromised.",
    },
    {
      q: "What do I receive as an official Leo member?",
      a: "You receive an official Lions International membership kit, gilded Leo lapel pin, verified leadership certificates, and access to national youth conferences.",
    },
    {
      q: "Is there an orientation for new recruits?",
      a: "Yes! After submitting this form, you will be invited to our New Recruits Orientation Mixer to meet senior mentors and fellow batchmates.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFC] text-slate-900">
      
      {/* 1. Clean Header */}
      <section className="bg-white border-b border-slate-200/80 pt-12 pb-8 sm:pt-16 sm:pb-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2.5">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-100 text-[11px] font-medium text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-[#003B99]" />
            <span>District 306 D10 • Uva Wellassa University</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-heading">
            Join the Leo Club of UWU
          </h1>

          <p className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Open to all undergraduates across all 4 faculties. Build leadership skills, connect with fellow students, and make a lasting impact.
          </p>
        </div>
      </section>

      {/* 2. Main Simple Registration Form */}
      <section className="py-10 sm:py-14">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
            
            {isSubmitted ? (
              /* Simple Confirmation State */
              <div className="text-center py-8 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                
                <h2 className="text-xl font-bold text-slate-900 font-heading">
                  Welcome to the Pride, {formData.fullName.split(" ")[0] || "Friend"}!
                </h2>

                <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                  Your application has been received. Our Membership Directorate will contact you via WhatsApp with details for the upcoming Recruits Orientation.
                </p>

                <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-2.5">
                  <a
                    href="https://chat.whatsapp.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-xs transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Join Recruits WhatsApp Group</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        fullName: "",
                        email: "",
                        phone: "",
                        faculty: "Applied Sciences",
                        academicYear: "1st Year (Fresher)",
                        regNo: "",
                        interests: [],
                        motivation: "",
                      });
                    }}
                    className="w-full sm:w-auto px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs transition-colors"
                  >
                    Submit Another
                  </button>
                </div>
              </div>
            ) : (
              /* Simple 1-Page Form */
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="border-b border-slate-100 pb-3">
                  <h2 className="text-base font-bold text-slate-900 font-heading">
                    Membership Registration
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Fill in your details below to begin your journey.
                  </p>
                </div>

                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Kasun Mihiran Fernando"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#003B99] focus:border-[#003B99] font-medium text-slate-800 placeholder:text-slate-400"
                  />
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="kasun@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#003B99] focus:border-[#003B99] font-medium text-slate-800 placeholder:text-slate-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      WhatsApp Mobile Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="+94 77 123 4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#003B99] focus:border-[#003B99] font-medium text-slate-800 placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* Faculty & Academic Year (Simple Dropdowns!) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Your Faculty <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={formData.faculty}
                      onChange={(e) => setFormData({ ...formData, faculty: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#003B99] focus:border-[#003B99] font-medium text-slate-800 cursor-pointer"
                    >
                      <option>Faculty of Applied Sciences</option>
                      <option>Faculty of Science &amp; Technology</option>
                      <option>Faculty of Management</option>
                      <option>Faculty of Animal Science &amp; Export Agriculture</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Academic Year <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={formData.academicYear}
                      onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#003B99] focus:border-[#003B99] font-medium text-slate-800 cursor-pointer"
                    >
                      <option>1st Year (Fresher)</option>
                      <option>2nd Year</option>
                      <option>3rd Year</option>
                      <option>4th Year / Finalist</option>
                    </select>
                  </div>
                </div>

                {/* Student Reg Number or Degree (Optional) */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Degree Program or Student ID (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. BSc in Computer Science / UWU/CST/22/045"
                    value={formData.regNo}
                    onChange={(e) => setFormData({ ...formData, regNo: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#003B99] focus:border-[#003B99] font-medium text-slate-800 placeholder:text-slate-400"
                  />
                </div>

                {/* Interests (Simple Toggle Pills) */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Areas You Are Interested In (Optional)
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {INTEREST_OPTIONS.map((item) => {
                      const isSelected = formData.interests.includes(item);
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => toggleInterest(item)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                            isSelected
                              ? "bg-[#003B99] text-white border-[#003B99] font-semibold"
                              : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Short Motivation */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Why do you want to join? (Short note)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us briefly what inspires you or what you hope to achieve as a Leo..."
                    value={formData.motivation}
                    onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#003B99] focus:border-[#003B99] font-medium text-slate-800 placeholder:text-slate-400 leading-relaxed"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-3">
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#003B99] hover:bg-[#002D7A] text-white rounded-xl font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Membership Application</span>
                  </button>
                </div>

              </form>
            )}

          </div>

        </div>
      </section>

      {/* 3. 4 Clean Benefits Cards */}
      <section className="py-12 bg-white border-t border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: <Sparkles className="w-5 h-5 text-[#003B99]" />,
                title: "Leadership Skills",
                desc: "Project management, public speaking, and team leadership.",
              },
              {
                icon: <Globe className="w-5 h-5 text-[#00A3E0]" />,
                title: "Global Network",
                desc: "Connect with 1.4M Lions and Leos across 200+ countries.",
              },
              {
                icon: <HeartHandshake className="w-5 h-5 text-emerald-600" />,
                title: "Community Service",
                desc: "Lead tree planting, healthcare camps, and rural school aid.",
              },
              {
                icon: <Award className="w-5 h-5 text-amber-500" />,
                title: "Certified Recognition",
                desc: "Official certificates signed by Lions Clubs International.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2"
              >
                <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center shadow-xs">
                  {item.icon}
                </div>
                <h3 className="font-heading font-bold text-xs sm:text-sm text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Frequently Asked Questions */}
      <section className="py-12 bg-[#FAFAFC] border-t border-slate-200/80">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-6 text-center space-y-1">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-heading">
              Frequently Asked Questions
            </h3>
            <p className="text-xs text-slate-500">
              Quick answers for new recruits.
            </p>
          </div>

          <div className="space-y-2.5">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-4 text-left font-heading font-bold text-xs sm:text-sm text-slate-800 cursor-pointer"
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
