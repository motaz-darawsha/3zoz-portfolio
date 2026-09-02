import type { Metadata, Viewport } from "next";
import { Instrument_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

/*
  The brief specifies Untitled Sans and Aeonik Pro, both commercial and not
  licensable here. Instrument Sans is the substitution chosen on character
  rather than convenience: the same neutral-but-slightly-humanist grotesque
  proportion Untitled Sans has, and deliberately not Inter.
*/
const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Motaz Darawsha — I build things to understand how they work",
  description:
    "Developer working on Discord bots, game-server infrastructure and integrations. Case studies of 0xMUSIC, Haweah and earlier builds.",
  openGraph: {
    title: "Motaz Darawsha",
    description:
      "I build things to understand how they work. Discord bots, game-server infrastructure, integrations.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#05060f",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${instrument.variable} ${plexMono.variable} h-full`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
