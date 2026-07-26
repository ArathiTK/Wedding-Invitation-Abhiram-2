import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://wedding-invitation-abhiram-athira.vercel.app"),
  title: "Abhiram TK & Athira K — Wedding Invitation",
  description:
    "You are cordially invited to the wedding of Abhiram TK & Athira K. Ceremony on 06 November 2026 at Nova Auditorium Palazhi, Kozhikode. Reception on 07 November 2026 at Sreevalsam Auditorium Payyanur.",
  openGraph: {
    title: "Abhiram TK & Athira K — Wedding Invitation",
    description: "Join us to celebrate the wedding of Abhiram TK & Athira K, November 2026.",
    type: "website",
    images: [{ url: "/assets/og-image.png?v=5", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhiram TK & Athira K — Wedding Invitation",
    description: "Join us to celebrate the wedding of Abhiram TK & Athira K, November 2026.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} h-full`}>
      <body className="min-h-full antialiased" style={{ backgroundColor: "#1f2519" }}>
        {/* Mobile-width container — centred on desktop, full-width on mobile */}
        <div
          className="relative mx-auto overflow-x-hidden w-full md:max-w-[430px]"
          style={{ minHeight: "100svh", backgroundColor: "#1f2519" }}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
