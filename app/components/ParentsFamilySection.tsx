"use client";
import AnimateOnScroll from "./ui/AnimateOnScroll";

export default function ParentsFamilySection() {
  return (
    <section id="family" className="min-h-[100svh] flex flex-col justify-center py-[clamp(2rem,8vh,3rem)] px-6 bg-paper-1">
      <div className="max-w-3xl mx-auto text-center">
        <AnimateOnScroll>
          <p className="heading-display text-xs text-[#c9a876] mb-[clamp(0.5rem,2vh,0.75rem)]">Families</p>
          <h2 className="heading-gold heading-display mb-[clamp(1rem,4vh,1.5rem)]"
            style={{ fontSize: "clamp(1.25rem, 5vw, 1.75rem)", letterSpacing: "0.1em" }}>
            With the Grace of Our Families
          </h2>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 gap-[clamp(1rem,5vh,2.5rem)]">
          <AnimateOnScroll delay={0.1} direction="left">
            <div className="gold-border-card rounded-lg p-5 md:p-6 h-full" style={{ backgroundColor: "#181e13" }}>
              <p className="heading-display text-xs text-[#c9a876] mb-2">Groom&apos;s Family</p>
              <h3 className="text-2xl heading-gold heading-script mb-1">Abhiram TK</h3>
              <p className="text-sm italic text-[#f0e6da]/60 mb-3" style={{ fontFamily: "var(--font-seasons)" }}>Son of</p>
              <p className="text-lg text-[#f0e6da]/90" style={{ fontFamily: "var(--font-seasons)" }}>Mrs. Sheela M &amp; Mr. Thulasidas TK</p>
              <p className="text-sm text-[#f0e6da]/50 mt-1" style={{ fontFamily: "var(--font-seasons)" }}>&ldquo;Saibaba Nilayam&rdquo;, Kokkanissery, Payyanur</p>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.2} direction="right">
            <div className="gold-border-card rounded-lg p-5 md:p-6 h-full" style={{ backgroundColor: "#181e13" }}>
              <p className="heading-display text-xs text-[#c9a876] mb-2">Bride&apos;s Family</p>
              <h3 className="text-2xl heading-gold heading-script mb-1">Athira K</h3>
              <p className="text-sm italic text-[#f0e6da]/60 mb-3" style={{ fontFamily: "var(--font-seasons)" }}>Daughter of</p>
              <p className="text-lg text-[#f0e6da]/90" style={{ fontFamily: "var(--font-seasons)" }}>Mrs. Sindhu P &amp; Mr. Anil Kumar K</p>
              <p className="text-sm text-[#f0e6da]/50 mt-1" style={{ fontFamily: "var(--font-seasons)" }}>&ldquo;Anil Nivas&rdquo;, Karimabyil, Kommeri, Kozhikode</p>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
