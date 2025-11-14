"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Sparkles } from "lucide-react"

interface CTASectionProps {
  language: "en" | "ur"
}

export default function CTA({ language }: CTASectionProps) {
  const content = {
    en: {
      heading: "KidGPT: Where Learning Meets Safety & Fun!",
      subtext: "A comprehensive platform designed specifically for young learners.",
      cta: "Start Your Child's Journey",
      parentCta: "Parent Dashboard",
    },
    ur: {
      heading: "کڈ جی پی ٹی: جہاں سیکھ محفوظیت اور مزے سے ملتی ہے!",
      subtext: "نوجوان متعلمین کے لیے خصوصی طور پر ڈیزائن کیا گیا مکمل پلیٹ فارم۔",
      cta: "اپنے بچے کا سفر شروع کریں",
      parentCta: "والدین کا ڈیش بورڈ",
    },
  }

  const text = content[language]

  return (
    <section className="py-24 px-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground text-balance">{text.heading}</h2>
          <p className="text-lg text-foreground/70">{text.subtext}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link href="/games">
              <Button className="bg-gradient-to-r from-primary to-secondary hover:shadow-xl transition-all text-white px-8 py-6 text-lg rounded-full font-semibold">
                <Sparkles className="w-5 h-5 mr-2" />
                {text.cta}
              </Button>
            </Link>
            <Link href="/parent-login">
              <Button
                variant="outline"
                className="px-8 py-6 text-lg rounded-full border-2 font-semibold hover:bg-muted transition-all bg-transparent"
              >
                {text.parentCta}
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
