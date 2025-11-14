"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Gamepad2, BookOpen, PenTool, Sparkles, Heart } from "lucide-react"

interface FeaturedSectionProps {
  language: "en" | "ur"
}

const features = {
  en: [
    {
      title: "Games",
      description: "10+ interactive educational games",
      icon: Gamepad2,
      href: "/games",
      color: "from-blue-500 to-purple-500",
    },
    {
      title: "Duas",
      description: "Daily Islamic duas & prayers",
      icon: Heart,
      href: "/duas",
      color: "from-pink-500 to-red-500",
    },
    {
      title: "Stories",
      description: "Moral & Islamic stories",
      icon: BookOpen,
      href: "/stories",
      color: "from-green-500 to-teal-500",
    },
    {
      title: "Art & Craft",
      description: "Creative drawing & crafting",
      icon: PenTool,
      href: "/art",
      color: "from-yellow-500 to-orange-500",
    },
  ],
  ur: [
    {
      title: "گیمز",
      description: "10 سے زیادہ تعلیمی کھیلیں",
      icon: Gamepad2,
      href: "/games",
      color: "from-blue-500 to-purple-500",
    },
    {
      title: "دعائیں",
      description: "روزانہ اسلامی دعائیں",
      icon: Heart,
      href: "/duas",
      color: "from-pink-500 to-red-500",
    },
    {
      title: "کہانیاں",
      description: "اخلاقی اور اسلامی کہانیاں",
      icon: BookOpen,
      href: "/stories",
      color: "from-green-500 to-teal-500",
    },
    {
      title: "آرٹ",
      description: "تخلیقی ڈرائنگ اور کاری گری",
      icon: PenTool,
      href: "/art",
      color: "from-yellow-500 to-orange-500",
    },
  ],
}

export default function FeaturedSection({ language }: FeaturedSectionProps) {
  const items = features[language]

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-2 mb-4 text-primary font-semibold">
            <Sparkles className="w-5 h-5" />
            <span>{language === "en" ? "Explore Learning" : "سیکھنے کی دریافت"}</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground text-balance">
            {language === "en" ? "Everything Your Child Needs" : "آپ کے بچے کے لیے سب کچھ"}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -12 }}
              >
                <Link href={feature.href}>
                  <Card className="h-full cursor-pointer hover:shadow-2xl transition-all bg-white border border-border/50 rounded-3xl overflow-hidden group">
                    <div
                      className={`h-20 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity`}
                    />
                    <CardHeader className="pb-3">
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-shadow`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-foreground text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-foreground/70 text-base">{feature.description}</CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
