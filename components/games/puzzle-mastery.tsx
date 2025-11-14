"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface PuzzleMasteryProps {
  onClose: () => void
  onWin: (stars: number) => void
}

interface PuzzlePiece {
  id: number
  correctPosition: number
  currentPosition: number
  isPlaced: boolean
}

export default function PuzzleMastery({ onClose, onWin }: PuzzleMasteryProps) {
  const [pieces, setPieces] = useState<PuzzlePiece[]>([])
  const [placed, setPlaced] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [time, setTime] = useState(45)
  const totalPieces = 12

  useEffect(() => {
    const initialPieces = Array.from({ length: totalPieces }, (_, i) => ({
      id: i,
      correctPosition: i,
      currentPosition: Math.floor(Math.random() * totalPieces),
      isPlaced: false,
    }))
    setPieces(initialPieces)
  }, [])

  useEffect(() => {
    if (time <= 0 || placed === totalPieces) {
      setGameOver(true)
      return
    }

    const timer = setInterval(() => setTime((t) => t - 1), 1000)
    return () => clearInterval(timer)
  }, [time, placed])

  const handlePlacePiece = (id: number) => {
    setPieces((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const newPlaced = p.isPlaced ? placed - 1 : placed + 1
          setPlaced(newPlaced)
          return { ...p, isPlaced: !p.isPlaced }
        }
        return p
      }),
    )
  }

  const stars = Math.floor((placed / totalPieces) * 3) + (time > 30 ? 1 : 0)

  if (gameOver) {
    return (
      <Card className="w-full max-w-md p-8 text-center bg-white rounded-3xl">
        <div className="text-6xl mb-4">🧩</div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Puzzle Complete!</h2>
        <p className="text-2xl text-foreground mb-2">
          Pieces Placed: {placed}/{totalPieces}
        </p>
        <p className="text-4xl font-bold mb-6">⭐ {Math.max(stars, 1)} Stars</p>
        <div className="space-y-2">
          <Button
            onClick={() => onWin(Math.max(stars, 1))}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3"
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
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold">
            Pieces: {placed}/{totalPieces}
          </div>
          <div className="text-2xl font-bold">Time: {time}s</div>
        </div>

        {/* Puzzle Grid */}
        <div className="grid grid-cols-4 gap-3 bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-border">
          {pieces.map((piece) => (
            <motion.button
              key={piece.id}
              onClick={() => handlePlacePiece(piece.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`aspect-square rounded-xl font-bold text-2xl transition-all ${
                piece.isPlaced
                  ? "bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg"
                  : "bg-white border-2 border-purple-300 text-purple-600 hover:shadow-md"
              }`}
            >
              {piece.isPlaced ? "✓" : piece.id + 1}
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
