"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ShapeSorterProps {
  onClose: () => void
  onWin: (stars: number) => void
}

const shapes = [
  { name: "Circle", emoji: "⭕", svg: "circle" },
  { name: "Square", emoji: "⬜", svg: "square" },
  { name: "Triangle", emoji: "🔺", svg: "triangle" },
  { name: "Star", emoji: "⭐", svg: "star" },
  { name: "Heart", emoji: "❤️", svg: "heart" },
]

export default function ShapeSorter({ onClose, onWin }: ShapeSorterProps) {
  const [score, setScore] = useState(0)
  const [currentIdx, setCurrentIdx] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  const current = shapes[currentIdx]
  const options = shapes.sort(() => Math.random() - 0.5)

  const handleShapeSelect = (shape: (typeof shapes)[0]) => {
    if (shape.name === current.name) {
      setScore((s) => s + 1)
      if (currentIdx < shapes.length - 1) {
        setCurrentIdx((idx) => idx + 1)
      } else {
        setGameOver(true)
      }
    }
  }

  const stars = Math.floor(score / 2)

  if (gameOver) {
    return (
      <Card className="w-full max-w-md p-8 text-center bg-white rounded-3xl">
        <div className="text-6xl mb-4">🔺</div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Complete!</h2>
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
    <Card className="w-full max-w-md p-8 bg-white rounded-3xl text-center">
      <div className="space-y-6">
        <div className="text-xl font-bold">
          Score: {score}/{shapes.length}
        </div>

        <div className="text-8xl mb-4">{current.emoji}</div>

        <div className="text-2xl font-bold text-foreground mb-4">Find: {current.name}</div>

        <div className="grid grid-cols-3 gap-4">
          {options.map((shape, idx) => (
            <button
              key={idx}
              onClick={() => handleShapeSelect(shape)}
              className="text-6xl p-4 rounded-2xl hover:bg-primary/10 transition-colors"
            >
              {shape.emoji}
            </button>
          ))}
        </div>

        <Button variant="outline" onClick={onClose} className="w-full bg-transparent">
          Exit Game
        </Button>
      </div>
    </Card>
  )
}
