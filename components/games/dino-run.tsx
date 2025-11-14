"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface DinoRunProps {
  onClose: () => void
  onWin: (stars: number) => void
}

interface Obstacle {
  id: number
  position: number
}

interface Collectible {
  id: number
  position: number
  collected: boolean
}

export default function DinoRun({ onClose, onWin }: DinoRunProps) {
  const [dinoHeight, setDinoHeight] = useState(0)
  const [isJumping, setIsJumping] = useState(false)
  const [obstacles, setObstacles] = useState<Obstacle[]>([])
  const [collectibles, setCollectibles] = useState<Collectible[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  // Gravity and jumping
  useEffect(() => {
    if (gameOver) return

    const interval = setInterval(() => {
      setDinoHeight((h) => {
        if (h > 0) return h - 5
        setIsJumping(false)
        return 0
      })
    }, 20)

    return () => clearInterval(interval)
  }, [gameOver])

  // Spawn obstacles
  useEffect(() => {
    if (gameOver) return

    const interval = setInterval(() => {
      setObstacles((prev) => [
        ...prev,
        {
          id: Date.now(),
          position: 100,
        },
      ])
    }, 1500)

    return () => clearInterval(interval)
  }, [gameOver])

  // Spawn collectibles
  useEffect(() => {
    if (gameOver) return

    const interval = setInterval(() => {
      setCollectibles((prev) => [
        ...prev,
        {
          id: Date.now(),
          position: 100,
          collected: false,
        },
      ])
    }, 2000)

    return () => clearInterval(interval)
  }, [gameOver])

  // Move obstacles and collectibles
  useEffect(() => {
    if (gameOver) return

    const interval = setInterval(() => {
      setObstacles((prev) => {
        const updated = prev.map((o) => ({ ...o, position: o.position - 8 }))
        const collision = updated.find((o) => o.position < 15 && o.position > 5 && dinoHeight === 0)
        if (collision) setGameOver(true)
        return updated.filter((o) => o.position > 0)
      })

      setCollectibles((prev) => {
        const updated = prev.map((c) => ({ ...c, position: c.position - 8 }))
        updated.forEach((c) => {
          if (c.position < 15 && c.position > 5 && !c.collected && dinoHeight > 20) {
            c.collected = true
            setScore((s) => s + 1)
          }
        })
        return updated.filter((c) => c.position > 0)
      })
    }, 30)

    return () => clearInterval(interval)
  }, [gameOver, dinoHeight])

  const handleJump = () => {
    if (!isJumping && !gameOver) {
      setIsJumping(true)
      setDinoHeight(120)
    }
  }

  const stars = Math.min(3, Math.floor(score / 2) + 1)

  if (gameOver) {
    return (
      <Card className="w-full max-w-md p-8 text-center bg-white rounded-3xl">
        <div className="text-6xl mb-4">🦕</div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Game Over!</h2>
        <p className="text-2xl text-foreground mb-2">Stars Collected: {score}</p>
        <p className="text-4xl font-bold mb-6">⭐ {stars} Stars</p>
        <div className="space-y-2">
          <Button
            onClick={() => onWin(stars)}
            className="w-full bg-gradient-to-r from-lime-500 to-green-500 text-white py-3"
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
    <Card className="w-full max-w-3xl p-6 bg-white rounded-3xl">
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-4">
          <div className="text-2xl font-bold">Stars: {score}</div>
          <Button onClick={handleJump} className="bg-gradient-to-r from-lime-500 to-green-500 text-white py-2">
            Jump!
          </Button>
        </div>

        {/* Game Area */}
        <div className="relative w-full h-80 bg-gradient-to-b from-sky-100 to-green-100 rounded-2xl overflow-hidden border-2 border-border">
          {/* Ground */}
          <div className="absolute bottom-0 w-full h-20 bg-green-400 opacity-50" />

          {/* Dinosaur */}
          <motion.div
            className="absolute left-10 bottom-20 text-5xl"
            animate={{ y: -dinoHeight }}
            transition={{ type: "linear" }}
          >
            🦕
          </motion.div>

          {/* Obstacles */}
          {obstacles.map((obstacle) => (
            <motion.div
              key={obstacle.id}
              className="absolute top-1/2 text-4xl"
              style={{ right: `${obstacle.position}%` }}
            >
              🌵
            </motion.div>
          ))}

          {/* Collectibles */}
          {collectibles.map((collectible) => (
            <motion.div
              key={collectible.id}
              className={`absolute top-1/3 text-3xl transition-opacity ${collectible.collected ? "opacity-50" : ""}`}
              style={{ right: `${collectible.position}%` }}
            >
              ⭐
            </motion.div>
          ))}
        </div>

        <Button variant="outline" onClick={onClose} className="w-full bg-transparent">
          Exit Game
        </Button>
      </div>
    </Card>
  )
}
