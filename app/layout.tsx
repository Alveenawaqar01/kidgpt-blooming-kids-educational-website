import type React from "react"
import type { Metadata } from "next"
import { Plus_Jakarta_Sans, Fredoka } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] })
const fredoka = Fredoka({ subsets: ["latin"], weight: ["400", "500", "600", "700"] })

export const metadata: Metadata = {
  title: "KidGPT - Learn, Play & Grow!",
  description:
    "Safe AI-powered learning and entertainment platform for kids aged 5-12. Bilingual (Urdu + English) educational games, stories, and worksheets.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${plusJakarta.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
