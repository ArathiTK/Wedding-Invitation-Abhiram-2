"use client";
import AnimateOnScroll from "./ui/AnimateOnScroll";
import CountdownTimer from "./ui/CountdownTimer";

export default function CountdownTimerSection() {
  return (
    <section className="flex flex-col justify-center py-[clamp(1.5rem,5vh,2.5rem)] px-6" style={{ backgroundImage: "url('/assets/bg.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
      <AnimateOnScroll>
        <CountdownTimer />
      </AnimateOnScroll>
    </section>
  );
}
