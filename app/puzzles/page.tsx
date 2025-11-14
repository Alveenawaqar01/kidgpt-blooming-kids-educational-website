"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Zap, Trophy, Clock } from "lucide-react"

interface Puzzle {
  id: string
  title_en: string
  title_ur: string
  description_en: string
  description_ur: string
  difficulty: "easy" | "medium" | "hard"
  icon: string
  pieces: number
  timeRecord?: number
  bestScore?: number
}

const puzzles: Puzzle[] = [
  {
    id: "1",
    title_en: "Sunny Beach",
    title_ur: "دھوپ والا ساحل",
    description_en: "A beautiful beach scene with 20 pieces",
    description_ur: "20 ٹکڑوں والی ساحل کی خوبصورت تصویر",
    difficulty: "easy",
    icon: "🏖️",
    pieces: 20,
    timeRecord: 180,
    bestScore: 5,
  },
  {
    id: "2",
    title_en: "Rainbow Garden",
    title_ur: "رنگین باغ",
    description_en: "Colorful flowers in a garden with 36 pieces",
    description_ur: "باغ میں رنگین پھولوں کے 36 ٹکڑے",
    difficulty: "medium",
    icon: "🌈",
    pieces: 36,
    timeRecord: 300,
    bestScore: 4,
  },
  {
    id: "3",
    title_en: "Ocean Adventures",
    title_ur: "سمندر کی مہم",
    description_en: "Underwater world with 48 pieces",
    description_ur: "سمندر کے اندر کی دنیا کے 48 ٹکڑے",
    difficulty: "hard",
    icon: "🐠",
    pieces: 48,
    timeRecord: 450,
    bestScore: 3,
  },
  {
    id: "4",
    title_en: "Jungle Explorer",
    title_ur: "جنگل کی تلاش",
    description_en: "Wild animals in jungle with 24 pieces",
    description_ur: "جنگل میں جنگلی جانوروں کے 24 ٹکڑے",
    difficulty: "easy",
    icon: "🦁",
    pieces: 24,
    timeRecord: 200,
    bestScore: 5,
  },
  {
    id: "5",
    title_en: "City Lights",
    title_ur: "شہر کی روشنیاں",
    description_en: "Busy city skyline with 40 pieces",
    description_ur: "شہر کی روشنیوں کے 40 ٹکڑے",
    difficulty: "hard",
    icon: "🌃",
    pieces: 40,
    timeRecord: 400,
    bestScore: 3,
  },
  {
    id: "6",
    title_en: "Mountain Peak",
    title_ur: "پہاڑ کی چوٹی",
    description_en: "Snowy mountains with 32 pieces",
    description_ur: "برفانی پہاڑوں کے 32 ٹکڑے",
    difficulty: "medium",
    icon: "⛰️",
    pieces: 32,
    timeRecord: 320,
    bestScore: 4,
  },
]

const getLevelColor = (level: string) => {
  if (level === "easy") return "from-green-500 to-emerald-500"
  if (level === "medium") return "from-blue-500 to-cyan-500"
  return "from-orange-500 to-red-500"
}

const getLevelBg = (level: string) => {
  if (level === "easy") return "bg-green-50 dark:bg-green-950/30 border-green-200"
  if (level === "medium") return "bg-blue-50 dark:bg-blue-950/30 border-blue-200"
  return "bg-orange-50 dark:bg-orange-950/30 border-orange-200"
}

export default function PuzzlesPage() {
  const [language, setLanguage] = useState<"en" | "ur">("en")
  const [difficulty, setDifficulty] = useState<string>("all")

  const filtered = difficulty === "all" ? puzzles : puzzles.filter((p) => p.difficulty === difficulty)

  return (
    <div className="min-h-screen bg-background">
      <Navbar language={language} setLanguage={setLanguage} />
      <main className="max-w-7xl mx-auto px-4 py-20">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-400/30 to-blue-400/30 rounded-full mb-6 border-2 border-cyan-400/40 backdrop-blur-sm">
            <span className="text-cyan-600 dark:text-cyan-400 font-bold text-sm uppercase tracking-wider">
              🧩 6 Awesome Puzzles
            </span>
          </div>
          <h1 className="text-6xl lg:text-7xl font-black text-foreground mb-6 text-balance bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 text-transparent bg-clip-text">
            {language === "en" ? "Puzzle Master" : "پہیلی ماسٹر"}
          </h1>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            {language === "en"
              ? "Solve 6 amazing puzzles with different difficulty levels. Complete puzzles, earn stars, and become a puzzle master!"
              : "6 حیرت انگیز پہیلیوں کو حل کریں اور ستارے حاصل کریں!"}
          </p>
        </motion.div>

        {/* Difficulty Filter */}
        <div className="flex flex-wrap gap-3 mb-16 justify-center">
          {["all", "easy", "medium", "hard"].map((level) => (
            <motion.button
              key={level}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setDifficulty(level)}
              className={`px-6 py-3 rounded-full font-bold transition-all whitespace-nowrap ${
                difficulty === level
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg"
                  : "bg-gradient-to-r from-muted to-muted/80 text-foreground hover:shadow-md"
              }`}
            >
              {level === "all" ? (language === "en" ? "All Puzzles" : "تمام پہیلیاں") : level.toUpperCase()}
            </motion.button>
          ))}
        </div>

        {/* Puzzles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((puzzle, index) => (
            <motion.div
              key={puzzle.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <Card
                className={`h-full bg-white border-2 rounded-3xl hover:shadow-2xl transition-all overflow-hidden ${getLevelBg(puzzle.difficulty)}`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-5xl">{puzzle.icon}</div>
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full text-white bg-gradient-to-r ${getLevelColor(puzzle.difficulty)}`}
                    >
                      {puzzle.difficulty.toUpperCase()}
                    </span>
                  </div>
                  <CardTitle className="text-2xl text-foreground">
                    {language === "en" ? puzzle.title_en : puzzle.title_ur}
                  </CardTitle>
                  <p className="text-sm text-foreground/70 mt-2">
                    {language === "en" ? puzzle.description_en : puzzle.description_ur}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-lg p-3 text-center">
                        <p className="text-xs text-foreground/70 font-semibold mb-1">Pieces</p>
                        <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{puzzle.pieces}</p>
                      </div>
                      <div className="bg-gradient-to-br from-cyan-100 to-blue-100 dark:from-cyan-900/30 dark:to-blue-900/30 rounded-lg p-3 text-center">
                        <Clock className="w-5 h-5 mx-auto mb-1 text-cyan-600 dark:text-cyan-400" />
                        <p className="text-xs text-foreground/70 font-semibold">{puzzle.timeRecord}s</p>
                      </div>
                      <div className="bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-lg p-3 text-center">
                        <Trophy className="w-5 h-5 mx-auto mb-1 text-yellow-600 dark:text-yellow-400" />
                        <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{puzzle.bestScore}⭐</p>
                      </div>
                    </div>

                    {/* Play Button */}
                    <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-lg text-white py-6 rounded-xl font-bold text-lg">
                      <Zap className="w-5 h-5 mr-2" />
                      {language === "en" ? "Solve Puzzle" : "پہیلی حل کریں"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Achievement Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="mt-20 bg-gradient-to-r from-cyan-50 via-blue-50 to-purple-50 dark:from-cyan-950/20 dark:via-blue-950/20 dark:to-purple-950/20 rounded-3xl p-12 text-center border-2 border-cyan-400/30"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="text-7xl mb-6 inline-block"
          >
            🧩
          </motion.div>
          <h3 className="text-3xl font-bold text-foreground mb-4">
            {language === "en" ? "Master All Puzzles!" : "تمام پہیلیوں میں مہارت حاصل کریں!"}
          </h3>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            {language === "en"
              ? "Complete all 6 puzzles to unlock the legendary 'Puzzle Master' badge and earn exclusive rewards!"
              : "تمام 6 پہیلیوں کو مکمل کریں اور خصوصی انعامات حاصل کریں!"}
          </p>
        </motion.div>
      </main>

      <Footer language={language} />
    </div>
  )
}
