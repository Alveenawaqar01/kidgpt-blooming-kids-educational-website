"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface NumberNinjaProps {
  onClose: () => void
  onWin: (stars: number) => void
}

export default function NumberNinja({ onClose, onWin }: NumberNinjaProps) {
  const [score, setScore] = useState(0)
  const [currentProblem, setCurrentProblem] = useState<{ a: number; b: number; op: "+" | "-" | "*" }>()
  const [gameOver, setGameOver] = useState(false)
  const [time, setTime] = useState(30)
  const [answered, setAnswered] = useState(false)

  useEffect(() => {
    generateProblem()
  }, [])

  useEffect(() => {
    if (time <= 0 || gameOver) {
      setGameOver(true)
      return
    }
    const timer = setInterval(() => setTime((t) => t - 1), 1000)
    return () => clearInterval(timer)
  }, [time, gameOver])

  const generateProblem = () => {
    const a = Math.floor(Math.random() * 20) + 1
    const b = Math.floor(Math.random() * 20) + 1
    const op = ["+", "-", "*"][Math.floor(Math.random() * 3)] as "+" | "-" | "*"
    setCurrentProblem({ a, b, op })
    setAnswered(false)
  }

  const getCorrectAnswer = () => {
    if (!currentProblem) return 0
    if (currentProblem.op === "+") return currentProblem.a + currentProblem.b
    if (currentProblem.op === "-") return currentProblem.a - currentProblem.b
    return currentProblem.a * currentProblem.b
  }

  const generateOptions = () => {
    const correct = getCorrectAnswer()
    const options = [correct]
    while (options.length < 4) {
      const wrong = correct + Math.floor(Math.random() * 20) - 10
      if (!options.includes(wrong) && wrong > 0) {
        options.push(wrong)
      }
    }
    return options.sort(() => Math.random() - 0.5)
  }

  const handleAnswer = (answer: number) => {
    if (answered) return
    setAnswered(true)
    if (answer === getCorrectAnswer()) {
      setScore((s) => s + 1)
      setTimeout(generateProblem, 1000)
    } else {
      setTimeout(generateProblem, 1000)
    }
  }

  const stars = Math.floor(score / 5)

  if (gameOver) {
    return (
      <Card className="w-full max-w-md p-8 text-center bg-white rounded-3xl">
        <div className="text-6xl mb-4">🥋</div>
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

  if (!currentProblem) return null

  const options = generateOptions()
  const problem = `${currentProblem.a} ${currentProblem.op} ${currentProblem.b}`

  return (
    <Card className="w-full max-w-md p-8 bg-white rounded-3xl text-center">
      <div className="space-y-6">
        <div className="flex justify-between">
          <div className="text-xl font-bold">Score: {score}</div>
          <div className="text-xl font-bold">Time: {time}s</div>
        </div>

        <div className="text-5xl font-bold text-primary mb-8">{problem}</div>

        <div className="grid grid-cols-2 gap-3">
          {options.map((option) => (
            <Button
              key={option}
              onClick={() => handleAnswer(option)}
              disabled={answered}
              className={`py-6 text-xl font-bold rounded-2xl ${
                answered && option === getCorrectAnswer()
                  ? "bg-green-500 text-white"
                  : answered && option !== getCorrectAnswer()
                    ? "bg-red-500 text-white"
                    : "bg-primary text-white hover:opacity-90"
              }`}
            >
              {option}
            </Button>
          ))}
        </div>

        <Button variant="outline" onClick={onClose} className="w-full bg-transparent">
          Exit Game
        </Button>
      </div>
    </Card>
  )
}
