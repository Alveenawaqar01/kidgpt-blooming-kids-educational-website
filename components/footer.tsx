"use client"

import Link from "next/link"
import { Github, Instagram, Twitter, Mail, Heart } from "lucide-react"

interface FooterProps {
  language: "en" | "ur"
}

export default function Footer({ language }: FooterProps) {
  const content = {
    en: {
      copyright: "© 2025 bloomingkids. All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      contact: "Contact",
      madeWith: "Made with",
      followUs: "Follow Us",
      links: "Quick Links",
    },
    ur: {
      copyright: "© 2025 کڈ جی پی ٹی۔ تمام حقوق محفوظ ہیں۔",
      privacy: "رازداری کی پالیسی",
      terms: "شرائط خدمت",
      contact: "رابطہ",
      madeWith: "بنایا گیا",
      followUs: "ہمیں فالو کریں",
      links: "فوری لنکس",
    },
  }

  const text = content[language]

  return (
    <footer className="bg-gradient-to-b from-blue-50 to-purple-50 dark:from-slate-900 dark:to-purple-900 border-t border-border py-16 px-4 mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">K</span>
              </div>
              <div>
                <div className="font-bold text-lg text-foreground">bloomingkids</div>
                <div className="text-xs text-foreground/70">Learn & Grow</div>
              </div>
            </div>
            <p className="text-foreground/70 text-sm leading-relaxed">
              {language === "en"
                ? "Safe AI-powered learning platform for kids aged 5-12. Safe, fun, and educational."
                : "بچوں کے لیے محفوظ ایآئی سے چلنے والا سیکھنے والا پلیٹ فارم۔"}
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="font-bold text-foreground text-lg">{text.links}</h4>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "Games", href: "/games" },
                { label: "Quizzes", href: "/quiz" },
                { label: "Worksheets", href: "/worksheets" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-foreground/70 hover:text-primary transition-colors font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-bold text-foreground text-lg">{language === "en" ? "Support" : "معاونت"}</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-foreground/70 hover:text-primary transition-colors font-medium">
                  {text.privacy}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-foreground/70 hover:text-primary transition-colors font-medium">
                  {text.terms}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-foreground/70 hover:text-primary transition-colors font-medium">
                  {text.contact}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-foreground/70 hover:text-primary transition-colors font-medium">
                  {language === "en" ? "For Parents" : "والدین کے لیے"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="font-bold text-foreground text-lg">{text.followUs}</h4>
            <div className="flex gap-3 flex-wrap">
              {[
                { Icon: Twitter, href: "#" },
                { Icon: Instagram, href: "#" },
                { Icon: Mail, href: "#" },
                { Icon: Github, href: "#" },
              ].map(({ Icon, href }, idx) => (
                <a
                  key={idx}
                  href={href}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-foreground/70 hover:text-primary hover:from-primary/40 hover:to-accent/40 transition-all"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border my-8"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4">
          <p className="text-foreground/60 text-sm">{text.copyright}</p>
          <p className="text-foreground/60 text-sm flex items-center justify-center gap-1">
            {text.madeWith} <Heart className="w-4 h-4 text-red-500 fill-red-500" />{" "}
            {language === "en" ? "for kids worldwide" : "دنیا بھر کے بچوں کے لیے"}
          </p>
        </div>
      </div>
    </footer>
  )
}
