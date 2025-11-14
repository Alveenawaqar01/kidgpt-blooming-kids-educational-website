"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import AchievementBadge from "@/components/achievement-badge"
import { motion } from "framer-motion"

interface Badge {
  id: string
  title: string
  description: string
  icon: string
  rarity: "common" | "rare" | "epic" | "legendary"
  unlocked: boolean
}

const badges: Badge[] = [
  {
    id: "1",
    title: "First Steps",
    description: "Complete your first game",
    icon: "👣",
    rarity: "common",
    unlocked: true,
  },
  {
    id: "2",
    title: "Game Master",
    description: "Win 10 games",
    icon: "🎮",
    rarity: "rare",
    unlocked: true,
  },
  {
    id: "3",
    title: "Math Wizard",
    description: "Score 100% in 5 math challenges",
    icon: "🧙",
    rarity: "epic",
    unlocked: false,
  },
  {
    id: "4",
    title: "Story Teller",
    description: "Read 20 stories",
    icon: "📚",
    rarity: "rare",
    unlocked: true,
  },
  {
    id: "5",
    title: "Art Genius",
    description: "Create 15 artworks",
    icon: "🎨",
    rarity: "epic",
    unlocked: false,
  },
  {
    id: "6",
    title: "Learning Legend",
    description: "Earn 500 stars",
    icon: "⭐",
    rarity: "legendary",
    unlocked: false,
  },
  {
    id: "7",
    title: "Consistent Scholar",
    description: "Maintain a 7-day streak",
    icon: "🔥",
    rarity: "epic",
    unlocked: true,
  },
  {
    id: "8",
    title: "Islamic Scholar",
    description: "Complete 10 Islamic learning activities",
    icon: "🕌",
    rarity: "rare",
    unlocked: true,
  },
]

export default function AchievementsPage() {
  const [language, setLanguage] = useState<"en" | "ur">("en")

  const unlockedCount = badges.filter((b) => b.unlocked).length
  const totalCount = badges.length

  return (
    <div className="min-h-screen bg-background">
      <Navbar language={language} setLanguage={setLanguage} />
      <main className="max-w-7xl mx-auto px-4 py-20">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-4">{language === "en" ? "Achievements" : "حصول"}</h1>
          <p className="text-foreground/70 text-lg mb-6">
            {language === "en"
              ? "Unlock badges by completing amazing feats!"
              : "حیرت انگیز کام مکمل کر کے بیج غیر لاک کریں!"}
          </p>

          {/* Progress */}
          <div className="inline-block bg-white border-2 border-border rounded-full px-8 py-4 mb-12">
            <p className="text-2xl font-bold text-foreground">
              {unlockedCount} <span className="text-foreground/70 font-normal">/ {totalCount}</span>
            </p>
            <div className="w-48 h-2 bg-muted rounded-full mt-3 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-accent"
                initial={{ width: 0 }}
                animate={{ width: `${(unlockedCount / totalCount) * 100}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <AchievementBadge {...badge} />
            </motion.div>
          ))}
        </div>

        {/* Pro Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-20 bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl p-8 border-2 border-border"
        >
          <h2 className="text-2xl font-bold text-foreground mb-4">
            {language === "en" ? "How to Unlock Badges" : "بیج غیر لاک کرنے کا طریقہ"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title_en: "Play Games",
                title_ur: "گیمز کھیلیں",
                desc_en: "Win more games to unlock gaming achievements",
                desc_ur: "مزید گیمز جیتنے کے لیے کھیل کی حصول غیر لاک کریں",
              },
              {
                title_en: "Read Stories",
                title_ur: "کہانیاں پڑھیں",
                desc_en: "Complete stories and moral challenges",
                desc_ur: "کہانیاں اور اخلاقی چیلنجز مکمل کریں",
              },
              {
                title_en: "Be Consistent",
                title_ur: "مسلسل رہیں",
                desc_en: "Maintain daily streaks for rewards",
                desc_ur: "انعام کے لیے روزانہ کی حصول برقرار رکھیں",
              },
              {
                title_en: "Explore All",
                title_ur: "سب کو دریافت کریں",
                desc_en: "Try all activities for hidden achievements",
                desc_ur: "چھپی ہوئی حصول کے لیے تمام سرگرمیاں کریں",
              },
            ].map((tip, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="font-bold text-foreground">{language === "en" ? tip.title_en : tip.title_ur}</h3>
                <p className="text-foreground/70">{language === "en" ? tip.desc_en : tip.desc_ur}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
      <Footer language={language} />
    </div>
  )
}
