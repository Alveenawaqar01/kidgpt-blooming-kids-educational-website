"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Sparkles } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface NavbarProps {
  language: "en" | "ur"
  setLanguage: (lang: "en" | "ur") => void
}

const navItems = {
  en: [
    { label: "Home", href: "/" },
    { label: "Games", href: "/games" },
    { label: "Duas", href: "/duas" },
    { label: "Worksheets", href: "/worksheets" },
    { label: "Art & Craft", href: "/art" },
    { label: "Stories", href: "/stories" },
    { label: "Islamic Learning", href: "/islamic" },
    { label: "For Parents", href: "/parents" },
  ],
  ur: [
    { label: "ہوم", href: "/" },
    { label: "گیمز", href: "/games" },
    { label: "دعائیں", href: "/duas" },
    { label: "ورک شیٹس", href: "/worksheets" },
    { label: "آرٹ", href: "/art" },
    { label: "کہانیاں", href: "/stories" },
    { label: "اسلامی سیکھ", href: "/islamic" },
    { label: "والدین کے لیے", href: "/parents" },
  ],
}

export default function Navbar({ language, setLanguage }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-gradient-to-r from-white to-blue-50/30 backdrop-blur-md border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity">
          <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-primary via-secondary to-accent rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow flex-shrink-0">
            <Sparkles className="text-white w-5 sm:w-6 h-5 sm:h-6" />
          </div>
          <div>
            <div className="font-bold text-lg sm:text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent leading-tight">
            Blomming kids
              
            </div>
            <div className="text-xs sm:text-xs text-muted-foreground font-medium leading-tight">Learn & Grow</div>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-1 items-center flex-wrap justify-center">
          {navItems[language].map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className="text-foreground hover:bg-primary/10 hover:text-primary transition-all font-medium"
              >
                {item.label}
              </Button>
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLanguage(language === "en" ? "ur" : "en")}
            className="hidden sm:flex border-border hover:bg-muted transition-colors"
          >
            {language === "en" ? "اردو" : "English"}
          </Button>

          <Link href="/parent-login">
            <Button className="bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all text-white hidden sm:block font-semibold">
              Parents
            </Button>
          </Link>

          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-foreground">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur border-t border-border">
          <div className="px-4 py-3 space-y-2 max-h-96 overflow-y-auto">
            {navItems[language].map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-foreground hover:bg-primary/10 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
            <div className="pt-2 space-y-2 border-t border-border">
              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={() => setLanguage(language === "en" ? "ur" : "en")}
              >
                {language === "en" ? "اردو" : "English"}
              </Button>
              <Link href="/parent-login" className="block">
                <Button className="w-full bg-gradient-to-r from-primary to-accent text-white font-semibold">
                  {language === "en" ? "Parent Login" : "والدین کا لاگ ان"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
