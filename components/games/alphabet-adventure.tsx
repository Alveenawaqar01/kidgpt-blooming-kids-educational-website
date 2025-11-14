"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface AlphabetAdventureProps {
  onClose: () => void
  onWin: (stars: number) => void
}

interface FallingLetter {
  id: number
  letter: string
  left: number
  top: number
}

export default function AlphabetAdventure({ onClose, onWin }: AlphabetAdventureProps) {
  const [letters, setLetters] = useState<FallingLetter[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [time, setTime] = useState(30)
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

  useEffect(() => {
    if (time <= 0 || gameOver) {
      setGameOver(true)
      return
    }

    const timer = setInterval(() => setTime((t) => t - 1), 1000)
    return () => clearInterval(timer)
  }, [time, gameOver])

  useEffect(() => {
    if (gameOver) return

    const interval = setInterval(() => {
      const newLetter: FallingLetter = {
        id: Date.now(),
        letter: alphabet[Math.floor(Math.random() * alphabet.length)],
        left: Math.random() * 80,
        top: 0,
      }
      setLetters((prev) => [...prev, newLetter])
    }, 500)

    return () => clearInterval(interval)
  }, [gameOver])

  useEffect(() => {
    if (gameOver) return

    const interval = setInterval(() => {
      setLetters((prev) => prev.map((l) => ({ ...l, top: l.top + 5 })).filter((l) => l.top < 100))
    }, 30)

    return () => clearInterval(interval)
  }, [gameOver])

  const handleCatch = (id: number) => {
    setLetters((prev) => prev.filter((l) => l.id !== id))
    setScore((s) => s + 1)
  }

  const stars = Math.floor(score / 5)

  if (gameOver) {
    return (
      <Card className="w-full max-w-md p-8 text-center bg-white rounded-3xl">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Game Over!</h2>
        <p className="text-2xl text-foreground mb-2">Score: {score}</p>
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
    <Card className="w-full max-w-2xl p-6 bg-white rounded-3xl">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold">Score: {score}</div>
          <div className="text-2xl font-bold">Time: {time}s</div>
        </div>

        {/* Game Area */}
        <div className="relative w-full h-80 bg-gradient-to-b from-blue-100 to-blue-50 rounded-2xl overflow-hidden border-2 border-border">
          {letters.map((letter) => (
            <motion.div
              key={letter.id}
              className="absolute cursor-pointer text-4xl font-bold text-primary"
              style={{
                left: `${letter.left}%`,
                top: `${letter.top}%`,
              }}
              onClick={() => handleCatch(letter.id)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
            >
              {letter.letter}
            </motion.div>
          ))}

          {letters.length === 0 && (
            <div className="flex items-center justify-center h-full text-foreground/50">Catch the falling letters!</div>
          )}
        </div>

        <Button variant="outline" onClick={onClose} className="w-full bg-transparent">
          Exit Game
        </Button>
      </div>
    </Card>
  )
}
