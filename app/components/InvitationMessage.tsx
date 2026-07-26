"use client";
import AnimateOnScroll from "./ui/AnimateOnScroll";

export default function InvitationMessage() {
  return (
    <section id="invitation" className="h-[100svh] flex flex-col justify-center items-center overflow-hidden py-[clamp(3rem,18dvh,10rem)] px-6">
      <div className="max-w-2xl w-full mx-auto text-center flex flex-col items-center gap-[clamp(0.5rem,2dvh,1.25rem)] rounded-2xl px-6 pt-[clamp(1.5rem,5dvh,2.5rem)] pb-[clamp(2.25rem,7dvh,3.5rem)] sm:px-10"
        style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: "1px solid rgba(255,249,243,0.15)" }}>

        {/* 1. Ganesh icon */}
        <AnimateOnScroll direction="none">
          <div className="flex justify-center">
            <div style={{
              width: 40, height: 61,
              backgroundColor: "#fff9f3", opacity: 0.85,
              WebkitMaskImage: "url('/assets/ornaments/ganapati.png')",
              maskImage: "url('/assets/ornaments/ganapati.png')",
              WebkitMaskSize: "contain", maskSize: "contain",
              WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat",
              WebkitMaskPosition: "center", maskPosition: "center",
            }} />
          </div>
        </AnimateOnScroll>

        {/* 2. Invitation */}
        <AnimateOnScroll direction="none">
          <p className="heading-display text-xs text-[#fff9f3]">Invitation</p>
        </AnimateOnScroll>

        {/* 3. With hearts full of joy */}
        <AnimateOnScroll delay={0.1}>
          <p className="italic text-lg text-[#fff9f3]/80" style={{ fontFamily: "var(--font-seasons)" }}>
            With hearts full of joy
          </p>
        </AnimateOnScroll>

        {/* 4. we */}
        <AnimateOnScroll delay={0.2}>
          <p className="heading-display text-xs text-[#fff9f3]">we</p>
        </AnimateOnScroll>

        {/* 5. Names */}
        <AnimateOnScroll delay={0.3}>
          <h2 className="heading-gold heading-display leading-tight"
            style={{ fontSize: "clamp(1.25rem, 5vw, 1.75rem)", letterSpacing: "0.1em", color: "#fff9f3" }}>
            Abhiram TK
          </h2>
          <div className="mx-auto my-0" style={{
            width: 110, height: 62,
            backgroundColor: "#fff9f3",
            WebkitMaskImage: "url('/assets/ornaments/and.png')",
            maskImage: "url('/assets/ornaments/and.png')",
            WebkitMaskSize: "contain", maskSize: "contain",
            WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat",
            WebkitMaskPosition: "center", maskPosition: "center",
          }} />
          <h2 className="heading-gold heading-display leading-tight"
            style={{ fontSize: "clamp(1.25rem, 5vw, 1.75rem)", letterSpacing: "0.1em", color: "#fff9f3" }}>
            Athira K
          </h2>
        </AnimateOnScroll>

        {/* 6. Together with families */}
        <AnimateOnScroll delay={0.4}>
          <p className="heading-display text-xs text-[#fff9f3] mt-[clamp(0.25rem,1dvh,0.75rem)]">
            Together with Our Families,<br />
            Invite You to Celebrate<br />
            the beginning of our<br />
            Happily Ever After
          </p>
        </AnimateOnScroll>

      </div>
    </section>
  );
}
