"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import AnimateOnScroll from "./ui/AnimateOnScroll";
import { submitRSVP, type RSVPData } from "@/lib/api";
import { WEDDING } from "@/lib/constants";

const inputClass = "w-full px-0 pt-0 pb-1 bg-transparent border-0 border-b border-[#fff9f3]/40 text-[#fff9f3] text-sm placeholder:text-[#fff9f3]/30 focus:outline-none focus:border-[#fff9f3] transition-colors rounded-none";
const numberInputClass = inputClass + " [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";
const labelClass = "block heading-display text-xs text-[#fff9f3] mb-0.5";

export default function RSVPForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm<RSVPData>();

  async function onSubmit(data: RSVPData) {
    setSubmitting(true); setError("");
    try { await submitRSVP(data); setSubmitted(true); }
    catch (e) { setError(e instanceof Error ? e.message : "Something went wrong."); }
    finally { setSubmitting(false); }
  }

  if (submitted) {
    return (
      <section id="rsvp" className="h-[100svh] flex flex-col justify-center overflow-y-auto py-10 px-6">
        <div className="max-w-3xl mx-auto w-full text-center">
          <div className="gold-border-card rounded-lg p-12"
            style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: "1px solid rgba(255,249,243,0.15)" }}>
            <div className="flex justify-center mb-6">
              <div className="w-14 h-14 rounded-full border-2 border-[#fff9f3] flex items-center justify-center">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path d="M5 12l5 5L19 7" stroke="#fff9f3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <h3 className="text-2xl heading-gold heading-display mb-3" style={{ color: "#fff9f3" }}>Thank You!</h3>
            <p className="text-[#fff9f3]/60 text-sm leading-relaxed">Your RSVP has been received. We look forward to celebrating with you.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="h-[100svh] flex flex-col justify-center overflow-y-auto py-[clamp(1.5rem,5vh,2.5rem)] px-6">
      <div className="max-w-3xl mx-auto w-full rounded-2xl px-6 py-8 md:px-8"
        style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: "1px solid rgba(255,249,243,0.15)" }}>
        <AnimateOnScroll>
          <p className="heading-display text-xs text-[#fff9f3] text-center mb-[clamp(0.5rem,2vh,0.75rem)]">RSVP</p>
          <h2 className="heading-gold heading-display text-center mb-[clamp(0.5rem,2vh,0.75rem)]"
            style={{ fontSize: "clamp(1.25rem, 5vw, 1.75rem)", letterSpacing: "0.1em", color: "#fff9f3" }}>
            Will You Join Us?
          </h2>
          <p className="text-center text-[#fff9f3]/60 text-sm mb-[clamp(1rem,4vh,1.5rem)]">
            Please let us know by <strong className="text-[#fff9f3]/80">October 15, 2026</strong>
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.15}>
          <div className="w-full mt-[clamp(2rem,7vh,3rem)]">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-[clamp(1.25rem,4vh,1.75rem)]" noValidate>
              <div>
                <label className={labelClass}>Full Name *</label>
                <input type="text" placeholder="Your name" className={inputClass}
                  {...register("name", { required: "Name is required" })} />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label className={labelClass}>Total Number of Guests *</label>
                <input type="number" min={1} max={20} placeholder="Including yourself" className={numberInputClass}
                  {...register("guestCount", { required: "Please enter the number of guests", min: { value: 1, message: "At least 1 guest" }, max: { value: 20, message: "Maximum 20 guests" }, valueAsNumber: true })} />
                {errors.guestCount && <p className="text-red-400 text-xs mt-1">{errors.guestCount.message}</p>}
              </div>
              <div>
                <label className={labelClass}>Are You Attending? *</label>
                <div className="flex flex-col gap-2">
                  {[
                    { value: "both", label: "Wedding & Reception" },
                    { value: "ceremony", label: "Wedding Only" },
                    { value: "reception", label: "Reception Only" },
                    { value: "decline", label: "Regretfully Decline" },
                  ].map(({ value, label }) => (
                    <label key={value} className="flex items-center gap-3 text-[#fff9f3] text-sm cursor-pointer">
                      <input type="radio" value={value} className="appearance-none w-3 h-3 rounded-full border border-[#fff9f3] checked:bg-[#fff9f3] cursor-pointer transition-colors"
                        {...register("attendance", { required: "Please select an option" })} />
                      {label}
                    </label>
                  ))}
                </div>
                {errors.attendance && <p className="text-red-400 text-xs mt-1">{errors.attendance.message}</p>}
              </div>
              {error && <p className="text-red-400 text-sm text-center">{error}</p>}
              <div className="flex justify-center">
                <button type="submit" disabled={submitting}
                  className="px-8 py-2 text-[#fff9f3] text-sm tracking-wide rounded-full font-semibold shadow-md transition-all duration-300 disabled:opacity-60"
                  style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: "none" }}>
                  {submitting ? "Sending..." : "Confirm"}
                </button>
              </div>
            </form>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
