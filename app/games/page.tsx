"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import GameCard from "@/components/game-card"
import AlphabetAdventure from "@/components/games/alphabet-adventure"
import NumberNinja from "@/components/games/number-ninja"
import MemoryMatch from "@/components/games/memory-match"
import ColorSplash from "@/components/games/color-splash"
import ShapeSorter from "@/components/games/shape-sorter"
import WordBuilder from "@/components/games/word-builder"
import SpellingBee from "@/components/games/spelling-bee"
import CodeBreaker from "@/components/games/code-breaker"
import QuickMath from "@/components/games/quick-math"
import PuzzleMastery from "@/components/games/puzzle-mastery"
import TriviaBridge from "@/components/games/trivia-bridge"
import DinoRun from "@/components/games/dino-run"

interface GameInfo {
  id: string
  title_en: string
  title_ur: string
  description_en: string
  description_ur: string
  category_en: string
  category_ur: string
  icon: string
  component: React.ComponentType<{ onClose: () => void; onWin: (stars: number) => void }>
  color: string
  difficulty: "easy" | "medium" | "hard"
}

const games: GameInfo[] = [
  {
    id: "alphabet",
    title_en: "Alphabet Adventure",
    title_ur: "حروف کی مہم",
    description_en: "Catch falling letters and learn English alphabets!",
    description_ur: "گرتے ہوئے حروف کو پکڑیں!",
    category_en: "Language",
    category_ur: "زبان",
    icon: "🔤",
    component: AlphabetAdventure,
    color: "from-blue-500 to-cyan-500",
    difficulty: "easy",
  },
  {
    id: "number-ninja",
    title_en: "Number Ninja",
    title_ur: "نمبر ننجا",
    description_en: "Solve math challenges and slice answers!",
    description_ur: "ریاضی کے سوالات حل کریں!",
    category_en: "Mathematics",
    category_ur: "ریاضی",
    icon: "🥋",
    component: NumberNinja,
    color: "from-purple-500 to-pink-500",
    difficulty: "medium",
  },
  {
    id: "quick-math",
    title_en: "Quick Math",
    title_ur: "تیز ریاضی",
    description_en: "Fast-paced mental arithmetic challenges!",
    description_ur: "تیز رفتار ریاضی کے چیلنج!",
    category_en: "Mathematics",
    category_ur: "ریاضی",
    icon: "⚡",
    component: QuickMath,
    color: "from-red-500 to-orange-500",
    difficulty: "hard",
  },
  {
    id: "memory",
    title_en: "Memory Match",
    title_ur: "یادداشت کا کھیل",
    description_en: "Match pairs and boost your memory power!",
    description_ur: "جوڑے ملائیں!",
    category_en: "Brain Training",
    category_ur: "دماغی تربیت",
    icon: "🧠",
    component: MemoryMatch,
    color: "from-orange-500 to-red-500",
    difficulty: "medium",
  },
  {
    id: "word-builder",
    title_en: "Word Builder",
    title_ur: "لفظ سازی",
    description_en: "Build words from scrambled letters!",
    description_ur: "بے ترتیب حروف سے لفظ بنائیں!",
    category_en: "Language",
    category_ur: "زبان",
    icon: "📝",
    component: WordBuilder,
    color: "from-green-500 to-teal-500",
    difficulty: "medium",
  },
  {
    id: "spelling-bee",
    title_en: "Spelling Bee",
    title_ur: "الفاظ کی درستگی",
    description_en: "Listen and spell words correctly!",
    description_ur: "سنو اور لفظوں کی درستگی کریں!",
    category_en: "Language",
    category_ur: "زبان",
    icon: "🐝",
    component: SpellingBee,
    color: "from-yellow-500 to-amber-500",
    difficulty: "medium",
  },
  {
    id: "color-splash",
    title_en: "Color Splash",
    title_ur: "رنگوں کا کھیل",
    description_en: "Paint objects with the right colors!",
    description_ur: "چیزوں کو صحیح رنگوں سے رنگیں!",
    category_en: "Art & Colors",
    category_ur: "فن",
    icon: "🎨",
    component: ColorSplash,
    color: "from-green-500 to-emerald-500",
    difficulty: "easy",
  },
  {
    id: "code-breaker",
    title_en: "Code Breaker",
    title_ur: "کوڈ توڑنے والا",
    description_en: "Solve puzzles and break the code!",
    description_ur: "پہیلیاں حل کریں!",
    category_en: "Puzzle",
    category_ur: "پہیلی",
    icon: "🔐",
    component: CodeBreaker,
    color: "from-indigo-500 to-purple-500",
    difficulty: "hard",
  },
  {
    id: "shape-sorter",
    title_en: "Shape Sorter",
    title_ur: "شکلوں کی ترتیب",
    description_en: "Match shapes and learn geometry!",
    description_ur: "شکلیں ملائیں!",
    category_en: "Geometry",
    category_ur: "جومیٹری",
    icon: "🔺",
    component: ShapeSorter,
    color: "from-yellow-500 to-amber-500",
    difficulty: "easy",
  },
  {
    id: "puzzle-mastery",
    title_en: "Puzzle Mastery",
    title_ur: "پہیلی میں مہارت",
    description_en: "Complete challenging jigsaw puzzles!",
    description_ur: "مشکل پہیلیاں مکمل کریں!",
    category_en: "Puzzle",
    category_ur: "پہیلی",
    icon: "🧩",
    component: PuzzleMastery,
    color: "from-cyan-500 to-blue-500",
    difficulty: "hard",
  },
  {
    id: "trivia-bridge",
    title_en: "Trivia Bridge",
    title_ur: "معلومات کا پل",
    description_en: "Answer trivia questions and cross the bridge!",
    description_ur: "سوالات کے جوابات دیں!",
    category_en: "Brain Training",
    category_ur: "دماغی تربیت",
    icon: "🌉",
    component: TriviaBridge,
    color: "from-rose-500 to-pink-500",
    difficulty: "hard",
  },
  {
    id: "dino-run",
    title_en: "Dino Run",
    title_ur: "ڈائنو کی دوڑ",
    description_en: "Help the dinosaur jump and collect stars!",
    description_ur: "ڈائنو کو جمع کرنے میں مدد کریں!",
    category_en: "Adventure",
    category_ur: "مہم",
    icon: "🦕",
    component: DinoRun,
    color: "from-lime-500 to-green-500",
    difficulty: "medium",
  },
]

export default function GamesPage() {
  const [language, setLanguage] = useState<"en" | "ur">("en")
  const [activeGame, setActiveGame] = useState<string | null>(null)
  const [stars, setStars] = useState<Record<string, number>>({})
  const [filter, setFilter] = useState<string>("all")

  const activeGameInfo = games.find((g) => g.id === activeGame)
  const ActiveGameComponent = activeGameInfo?.component

  const handleWin = (gameId: string, starCount: number) => {
    setStars((prev) => ({
      ...prev,
      [gameId]: Math.max(prev[gameId] || 0, starCount),
    }))
    playSound()
    setActiveGame(null)
  }

  const playSound = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gain = audioContext.createGain()

    oscillator.connect(gain)
    gain.connect(audioContext.destination)

    oscillator.frequency.value = 523.25
    oscillator.type = "sine"

    gain.gain.setValueAtTime(0.3, audioContext.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.2)
  }

  const totalStars = Object.values(stars).reduce((a, b) => a + b, 0)

  const categories = [
    "all",
    "Language",
    "Mathematics",
    "Brain Training",
    "Art & Colors",
    "Puzzle",
    "Geometry",
    "Adventure",
  ]
  const filteredGames = filter === "all" ? games : games.filter((g) => g.category_en === filter)

  if (activeGame && ActiveGameComponent) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar language={language} setLanguage={setLanguage} />
        <div className="flex-1 flex items-center justify-center p-4">
          <ActiveGameComponent
            onClose={() => setActiveGame(null)}
            onWin={(starCount) => handleWin(activeGame, starCount)}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar language={language} setLanguage={setLanguage} />
      <main className="max-w-7xl mx-auto px-4 py-20">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-primary/30 to-accent/30 rounded-full mb-6 border-2 border-primary/40 backdrop-blur-sm">
            <span className="text-primary font-bold text-sm uppercase tracking-wider">
              {language === "en" ? "🎮 12 Educational Games" : "🎮 12 تعلیمی کھیلیں"}
            </span>
          </div>
          <h1 className="text-6xl lg:text-7xl font-black text-foreground mb-6 text-balance bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            {language === "en" ? "Play & Learn Games" : "کھیلیں اور سیکھیں"}
          </h1>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            {language === "en"
              ? "Challenge yourself with 12 fun games and earn stars! Each game is designed to boost your learning and have amazing fun."
              : "12 مزے دار کھیلوں کے ساتھ چیلنج کریں اور ستارے جیتیں!"}
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-16 px-2">
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(category)}
              className={`px-6 py-3 rounded-full font-bold transition-all whitespace-nowrap ${
                filter === category
                  ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg scale-105"
                  : "bg-gradient-to-r from-muted to-muted/80 text-foreground hover:from-muted/80 hover:to-muted/60 hover:shadow-md"
              }`}
            >
              {category === "all" ? (language === "en" ? "All Games" : "تمام کھیلیں") : category}
            </motion.button>
          ))}
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredGames.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <GameCard
                game={game}
                language={language}
                stars={stars[game.id] || 0}
                onPlay={() => setActiveGame(game.id)}
              />
            </motion.div>
          ))}
        </div>

        {/* Stars Summary with Enhanced Styling */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-pink-950/20 rounded-3xl p-8 md:p-16 text-center border-2 border-primary/30 shadow-xl overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 pointer-events-none" />
          <div className="relative z-10">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="text-7xl mb-6 inline-block"
            >
              ⭐
            </motion.div>
            <p className="text-3xl font-bold text-foreground mb-3">
              {language === "en" ? "Total Stars Earned" : "کل حاصل شدہ ستارے"}
            </p>
            <p className="text-6xl font-black bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mb-6">
              {totalStars}
            </p>
            <p className="text-lg text-foreground/70 max-w-xl mx-auto">
              {language === "en"
                ? "Keep playing to earn more stars, unlock achievements, and become a learning champion!"
                : "مزید ستارے حاصل کرنے اور انعامات کو الاک کرنے کے لیے کھیلتے رہیں!"}
            </p>
          </div>
        </motion.div>
      </main>

      <Footer language={language} />
    </div>
  )
}
