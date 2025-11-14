"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ColorSplashProps {
  onClose: () => void
  onWin: (stars: number) => void
}

const colorPairs = [
  { name: "Red", correct: "#ef4444", wrong: ["#3b82f6", "#10b981"] },
  { name: "Blue", correct: "#3b82f6", wrong: ["#ef4444", "#eab308"] },
  { name: "Green", correct: "#10b981", wrong: ["#ef4444", "#8b5cf6"] },
  { name: "Yellow", correct: "#eab308", wrong: ["#3b82f6", "#ef4444"] },
  { name: "Purple", correct: "#8b5cf6", wrong: ["#10b981", "#ef4444"] },
]

export default function ColorSplash({ onClose, onWin }: ColorSplashProps) {
  const [score, setScore] = useState(0)
  const [currentIdx, setCurrentIdx] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  const current = colorPairs[currentIdx]
  const options = [current.correct, ...current.wrong].sort(() => Math.random() - 0.5)

  const handleColorSelect = (color: string) => {
    if (color === current.correct) {
      setScore((s) => s + 1)
      if (currentIdx < colorPairs.length - 1) {
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
        <div className="text-6xl mb-4">🎨</div>
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
          Score: {score}/{colorPairs.length}
        </div>

        <div className="text-3xl font-bold text-foreground mb-4">Which color is {current.name}?</div>

        <div className="grid grid-cols-3 gap-4">
          {options.map((color) => (
            <button
              key={color}
              onClick={() => handleColorSelect(color)}
              className="w-full aspect-square rounded-2xl hover:scale-110 transition-transform border-4 border-transparent hover:border-foreground/50"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        <Button variant="outline" onClick={onClose} className="w-full bg-transparent">
          Exit Game
        </Button>
      </div>
    </Card>
  )
}
