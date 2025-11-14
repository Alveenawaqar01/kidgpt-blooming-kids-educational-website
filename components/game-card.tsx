"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface GameCardProps {
  game: {
    id: string
    title_en: string
    title_ur: string
    description_en: string
    description_ur: string
    icon: string
  }
  language: "en" | "ur"
  stars: number
  onPlay: () => void
}

export default function GameCard({ game, language, stars, onPlay }: GameCardProps) {
  const title = language === "en" ? game.title_en : game.title_ur
  const description = language === "en" ? game.description_en : game.description_ur

  return (
    <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.2 }}>
      <Card className="h-full bg-white border-2 border-border rounded-3xl hover:shadow-xl transition-shadow cursor-pointer overflow-hidden group">
        <CardHeader className="relative">
          <div className="absolute top-4 right-4 bg-gradient-to-r from-primary to-accent text-white px-3 py-1 rounded-full flex items-center gap-1 text-sm font-bold">
            {stars > 0 && (
              <>
                <span>⭐</span>
                <span>{stars}</span>
              </>
            )}
          </div>
          <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-200">{game.icon}</div>
          <CardTitle className="text-2xl text-foreground">{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <CardDescription className="text-foreground/70 text-base">{description}</CardDescription>
          <Button
            onClick={onPlay}
            className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white py-6 text-lg rounded-full"
          >
            {language === "en" ? "Play Now" : "ابھی کھیلیں"}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
