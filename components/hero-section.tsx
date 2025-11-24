"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Sparkles, Zap, Heart } from "lucide-react"

interface HeroSectionProps {
  language: "en" | "ur"
}

export default function HeroSection({ language }: HeroSectionProps) {
  const content = {
    en: {
      heading: "Learn, Play & Grow with AI",
      subtext:
        "blomming kids is a safe, interactive platform where kids master English, Urdu, Maths, and Islamic values through engaging games, creative activities, and inspiring stories.",
      cta1: "Explore Games",
      cta2: "Parent Dashboard",
    },
    ur: {
      heading: "AI کے ساتھ سیکھو، کھیلو اور بڑھو",
      subtext:
        "کڈ جی پی ٹی ایک محفوظ، انٹرایکٹو پلیٹ فارم ہے جہاں بچے مزے دار کھیلوں، تخلیقی سرگرمیوں اور متاثر کن کہانیوں کے ذریعے انگریزی، اردو، ریاضی اور اسلامی اقدار میں مہارت حاصل کرتے ہیں۔",
      cta1: "گیمز دیکھیں",
      cta2: "والدین کا ڈیش بورڈ",
    },
  }

  const text = content[language]

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-accent/10 to-transparent rounded-full blur-3xl animate-pulse delay-700" />

      <div className="relative max-w-7xl mx-auto px-4 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8 z-10"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary font-semibold text-sm">
              <Sparkles className="w-4 h-4" />
              <span>{language === "en" ? "AI-Powered Learning" : "ایآئی سے چلنے والی سیکھ"}</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
              {text.heading}
            </h1>
          </div>

          <p className="text-lg lg:text-xl text-foreground/70 leading-relaxed text-pretty max-w-lg">{text.subtext}</p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="/games">
              <Button className="bg-gradient-to-r from-primary to-secondary hover:shadow-xl transition-all text-white px-8 py-6 text-lg rounded-full font-semibold w-full sm:w-auto">
                <Zap className="w-5 h-5 mr-2" />
                {text.cta1}
              </Button>
            </Link>
            <Link href="/parent-login">
              <Button
                variant="outline"
                className="px-8 py-6 text-lg rounded-full border-2 font-semibold hover:bg-muted transition-all w-full sm:w-auto bg-transparent"
              >
                <Heart className="w-5 h-5 mr-2" />
                {text.cta2}
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap gap-6 pt-8 border-t border-border">
            <div>
              <div className="text-2xl font-bold text-primary">50K+</div>
              <div className="text-sm text-muted-foreground">
                {language === "en" ? "Kids Learning" : "بچوں کی سیکھ"}
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent">100%</div>
              <div className="text-sm text-muted-foreground">{language === "en" ? "Safe & Secure" : "محفوظ"}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-secondary">10+</div>
              <div className="text-sm text-muted-foreground">{language === "en" ? "Fun Games" : "مزے دار کھیلیں"}</div>
            </div>
          </div>
        </motion.div>

        {/* Right Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative h-96 lg:h-full min-h-96 order-first lg:order-last"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-2xl" />
          <div className="relative h-full flex items-center justify-center">
            <img
              src="/happy-kids-learning-with-ai-technology-illustratio.jpg"
              alt="Kids learning"
              className="w-full h-full object-cover rounded-3xl shadow-2xl"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
