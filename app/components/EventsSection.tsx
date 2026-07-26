"use client";
import AnimateOnScroll from "./ui/AnimateOnScroll";
import { WEDDING, makeGoogleCalendarUrl } from "@/lib/constants";

export default function EventsSection() {
  const events = [
    {
      name: "Wedding Ceremony",
      date: WEDDING.ceremony.date,
      time: WEDDING.ceremony.time,
      venue: WEDDING.ceremony.venue,
      address: WEDDING.ceremony.address,
      cardBg: "url('/assets/bg.png')",
      cardBgPosition: "center 20%",
      googleMapsUrl: WEDDING.ceremony.googleMapsUrl,
      calUrl: makeGoogleCalendarUrl({
        title: "Abhiram TK & Athira K — Wedding Ceremony",
        isoDate: WEDDING.ceremony.isoDate,
        startTime: WEDDING.ceremony.startTime,
        endTime: WEDDING.ceremony.endTime,
        venue: WEDDING.ceremony.venue,
        address: WEDDING.ceremony.address,
      }),
    },
    {
      name: "Reception",
      date: WEDDING.reception.date,
      time: WEDDING.reception.time,
      venue: WEDDING.reception.venue,
      address: WEDDING.reception.address,
      cardBg: "url('/assets/bg.png')",
      cardBgPosition: "center",
      googleMapsUrl: WEDDING.reception.googleMapsUrl,
      calUrl: makeGoogleCalendarUrl({
        title: "Abhiram TK & Athira K — Wedding Reception",
        isoDate: WEDDING.reception.isoDate,
        startTime: WEDDING.reception.startTime,
        endTime: WEDDING.reception.endTime,
        venue: WEDDING.reception.venue,
        address: WEDDING.reception.address,
      }),
    },
  ];

  return (
    <section id="events" className="h-[100svh] flex flex-col justify-center items-center overflow-y-auto py-[clamp(1.5rem,5vh,2.5rem)] px-6">
      <div className="max-w-xl mx-auto w-full rounded-2xl px-4 py-[clamp(1.25rem,4vh,2rem)] sm:px-6"
        style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: "1px solid rgba(255,249,243,0.15)" }}>
        <AnimateOnScroll>
          <p className="heading-display text-xs text-[#fff9f3] text-center mb-[clamp(0.5rem,2vh,0.75rem)]">Events</p>
        </AnimateOnScroll>

        <div className="flex flex-col gap-[clamp(0.5rem,2vh,1rem)]">
          {events.map(({ name, date, time, venue, address, cardBg, cardBgPosition, googleMapsUrl }, i) => (
            <AnimateOnScroll key={name} delay={0.1 + i * 0.1}>
              <div className="rounded-lg p-4">
                <h3 className="heading-gold heading-display text-center mb-[clamp(0.35rem,1.5vh,0.6rem)]"
                  style={{ fontSize: "clamp(1.1rem, 4.5vw, 1.5rem)", letterSpacing: "0.1em", color: "#fff9f3" }}>
                  {name}
                </h3>
                <div className="space-y-[clamp(0.35rem,1.5vh,0.6rem)]">
                  {[
                    {
                      label: "Date", value: date,
                      icon: (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <rect x="3" y="5" width="18" height="16" rx="2" stroke="#fff9f3" strokeWidth="1.5"/>
                          <path d="M3 9h18M8 3v4M16 3v4" stroke="#fff9f3" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      ),
                    },
                    {
                      label: "Time", value: time,
                      icon: (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="9" stroke="#fff9f3" strokeWidth="1.5"/>
                          <path d="M12 7v5l3 2" stroke="#fff9f3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      ),
                    },
                    {
                      label: "Venue", value: venue, sub: address,
                      icon: (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11Z" stroke="#fff9f3" strokeWidth="1.5"/>
                          <circle cx="12" cy="10" r="2.5" stroke="#fff9f3" strokeWidth="1.5"/>
                        </svg>
                      ),
                    },
                  ].map(({ label, value, icon, sub }) => (
                    <div key={label} className={`flex justify-center gap-2.5 ${sub ? "items-start" : "items-center"}`}>
                      <div className="flex-shrink-0" style={sub ? { marginTop: "0.15em" } : undefined}>{icon}</div>
                      <div className="text-center">
                        <p className="text-[#fff9f3] text-base" style={{ fontFamily: "var(--font-seasons)" }}>{value}</p>
                        {sub && <p className="text-xs text-[#fff9f3]/60 mt-0.5">{sub}</p>}
                        {label === "Venue" && (
                          <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer"
                            className="inline-block text-xs text-[#fff9f3] underline mt-1 hover:text-[#fff9f3] transition-colors">
                            Get Directions
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
