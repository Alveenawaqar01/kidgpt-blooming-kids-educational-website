"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface MemoryMatchProps {
  onClose: () => void
  onWin: (stars: number) => void
}

interface MemoryCard {
  id: number
  emoji: string
  matched: boolean
}

const items = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"]

export default function MemoryMatch({ onClose, onWin }: MemoryMatchProps) {
  const [cards, setCards] = useState<MemoryCard[]>([])
  const [flipped, setFlipped] = useState<number[]>([])
  const [matched, setMatched] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [moves, setMoves] = useState(0)

  useEffect(() => {
    const shuffled = [...items, ...items]
      .sort(() => Math.random() - 0.5)
      .map((emoji, idx) => ({ id: idx, emoji, matched: false }))
    setCards(shuffled)
  }, [])

  useEffect(() => {
    if (matched === items.length) {
      setGameOver(true)
    }
  }, [matched])

  useEffect(() => {
    if (flipped.length !== 2) return

    const [first, second] = flipped
    if (cards[first].emoji === cards[second].emoji) {
      setCards((prev) => prev.map((card, idx) => (idx === first || idx === second ? { ...card, matched: true } : card)))
      setMatched((m) => m + 1)
    }

    setTimeout(() => setFlipped([]), 800)
    setMoves((m) => m + 1)
  }, [flipped, cards])

  const handleClick = (id: number) => {
    if (flipped.length === 2 || flipped.includes(id) || cards[id].matched) return
    setFlipped([...flipped, id])
  }

  const stars = Math.max(3 - Math.floor(moves / 5), 1)

  if (gameOver) {
    return (
      <Card className="w-full max-w-md p-8 text-center bg-white rounded-3xl">
        <div className="text-6xl mb-4">🧠</div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Complete!</h2>
        <p className="text-2xl text-foreground mb-2">Moves: {moves}</p>
        <p className="text-4xl font-bold mb-6">⭐ {stars} Stars</p>
        <div className="space-y-2">
          <Button
            onClick={() => onWin(stars)}
            className="w-full bg-gradient-to-r from-primary to-accent text-white py-3"
          >
            Done
          </Button>
          <Button variant="outline" onClick={onClose} className="w-full bg-transparent">
            Close
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md p-8 bg-white rounded-3xl">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold">Moves: {moves}</div>
          <div className="text-xl font-bold">
            Matched: {matched}/{items.length}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {cards.map((card) => (
            <motion.button
              key={card.id}
              onClick={() => handleClick(card.id)}
              className={`aspect-square rounded-xl text-3xl font-bold transition-all ${
                flipped.includes(card.id) || card.matched ? "bg-primary text-white" : "bg-muted hover:bg-primary/80"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {flipped.includes(card.id) || card.matched ? card.emoji : "?"}
            </motion.button>
          ))}
        </div>

        <Button variant="outline" onClick={onClose} className="w-full bg-transparent">
          Exit Game
        </Button>
      </div>
    </Card>
  )
}
