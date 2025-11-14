"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

interface AchievementBadgeProps {
  title: string
  description: string
  icon: string
  rarity: "common" | "rare" | "epic" | "legendary"
  unlocked: boolean
}

const rarityColors = {
  common: "from-gray-300 to-gray-400",
  rare: "from-blue-300 to-blue-500",
  epic: "from-purple-300 to-purple-600",
  legendary: "from-yellow-300 to-orange-500",
}

export default function AchievementBadge({ title, description, icon, rarity, unlocked }: AchievementBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={unlocked ? { scale: 1.05, rotate: 5 } : {}}
      transition={{ duration: 0.3 }}
    >
      <Card
        className={`relative overflow-hidden rounded-3xl border-2 ${
          unlocked ? "border-border" : "border-border/50 opacity-50"
        } bg-white`}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-br ${rarityColors[rarity]} opacity-0 group-hover:opacity-10`}
        />
        <CardContent className="p-6 text-center">
          <div className="text-5xl mb-3 filter drop-shadow-lg">{icon}</div>
          <h4 className="font-bold text-foreground mb-1">{title}</h4>
          <p className="text-xs text-foreground/70">{description}</p>
          <div className="mt-3 text-xs font-semibold">
            <span className={`px-2 py-1 rounded-full bg-gradient-to-r ${rarityColors[rarity]} text-white`}>
              {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
