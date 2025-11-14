"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface QuickMathProps {
  onClose: () => void
  onWin: (stars: number) => void
}

export default function QuickMath({ onClose, onWin }: QuickMathProps) {
  const [problem, setProblem] = useState<any>(null)
  const [input, setInput] = useState("")
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [answered, setAnswered] = useState(0)

  useEffect(() => {
    generateProblem()
  }, [])

  useEffect(() => {
    if (answered >= 10) {
      onWin(5)
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (answered >= 10) {
            onWin(5)
          } else {
            onClose()
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [answered])

  const generateProblem = () => {
    const a = Math.floor(Math.random() * 12) + 1
    const b = Math.floor(Math.random() * 12) + 1
    const op = ["+", "-", "×"][Math.floor(Math.random() * 3)]
    setProblem({ a, b, op })
    setInput("")
  }

  const checkAnswer = () => {
    let correct = 0
    if (problem.op === "+") correct = problem.a + problem.b
    if (problem.op === "-") correct = problem.a - problem.b
    if (problem.op === "×") correct = problem.a * problem.b

    if (Number.parseInt(input) === correct) {
      setScore(score + 10)
      setAnswered(answered + 1)
      generateProblem()
    } else {
      setInput("")
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-gradient-to-br from-red-500 to-orange-500 rounded-3xl p-8 shadow-2xl text-white">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Quick Math</h2>
          <button onClick={onClose} className="hover:opacity-80">
            <X size={24} />
          </button>
        </div>

        <div className="bg-white/20 rounded-2xl p-8 mb-6 text-center">
          <p className="text-white/80 text-sm mb-2">
            Time: {timeLeft}s | Solved: {answered}/10
          </p>

          <div className="bg-white/30 rounded-xl p-6 mb-6">
            <p className="text-6xl font-bold">
              {problem?.a} {problem?.op} {problem?.b}
            </p>
          </div>

          <input
            type="number"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && checkAnswer()}
            placeholder="Your answer..."
            className="w-full px-4 py-3 rounded-lg text-center text-2xl font-bold mb-4 text-red-600"
            autoFocus
          />

          <Button onClick={checkAnswer} className="w-full bg-white text-red-600 hover:bg-white/90 font-bold text-lg">
            Submit
          </Button>
        </div>

        <p className="text-center font-bold text-lg">Score: {score}</p>
      </div>
    </div>
  )
}
