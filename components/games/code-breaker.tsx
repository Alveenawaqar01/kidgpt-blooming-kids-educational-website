"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface CodeBreakerProps {
  onClose: () => void
  onWin: (stars: number) => void
}

const puzzles = [
  { code: [1, 2, 3, 4], pattern: "Numbers 1 to 4 in order" },
  { code: [2, 4, 6, 8], pattern: "Even numbers" },
  { code: [5, 10, 15, 20], pattern: "Multiples of 5" },
  { code: [1, 1, 2, 3], pattern: "Fibonacci sequence start" },
  { code: [3, 6, 9, 12], pattern: "Multiples of 3" },
]

export default function CodeBreaker({ onClose, onWin }: CodeBreakerProps) {
  const [currentPuzzle, setCurrentPuzzle] = useState<any>(null)
  const [answers, setAnswers] = useState<number[]>([])
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(0)
  const [message, setMessage] = useState("")

  useEffect(() => {
    startNewPuzzle()
  }, [])

  const startNewPuzzle = () => {
    const puzzle = puzzles[Math.floor(Math.random() * puzzles.length)]
    setCurrentPuzzle(puzzle)
    setAnswers([])
    setMessage("")
  }

  const addAnswer = (num: number) => {
    if (answers.length < 4) {
      setAnswers([...answers, num])
    }
  }

  const checkCode = () => {
    if (answers.length !== 4) {
      setMessage("Please enter 4 numbers")
      return
    }

    if (JSON.stringify(answers) === JSON.stringify(currentPuzzle?.code)) {
      setMessage("✓ Code Cracked!")
      const newScore = score + 15
      setScore(newScore)
      setLevel(level + 1)
      if (level >= 3) {
        onWin(3)
      } else {
        setTimeout(startNewPuzzle, 1000)
      }
    } else {
      setMessage("✗ Wrong pattern! Try again.")
      setAnswers([])
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-8 shadow-2xl text-white">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Code Breaker</h2>
          <button onClick={onClose} className="hover:opacity-80">
            <X size={24} />
          </button>
        </div>

        <div className="bg-white/20 rounded-2xl p-6 mb-6">
          <p className="text-center text-sm text-white/80 mb-4">Level {level + 1}</p>

          <div className="bg-black/30 rounded-xl p-4 mb-6">
            <p className="text-center text-white/80 mb-3">Pattern Hint:</p>
            <p className="text-center font-bold text-lg">{currentPuzzle?.pattern}</p>
          </div>

          <div className="grid grid-cols-4 gap-2 mb-6">
            {answers.map((ans, i) => (
              <button key={i} className="w-full bg-white text-indigo-600 font-bold text-lg py-3 rounded-lg">
                {ans}
              </button>
            ))}
            {[...Array(4 - answers.length)].map((_, i) => (
              <div key={i} className="w-full bg-white/20 rounded-lg py-3" />
            ))}
          </div>

          <div className="grid grid-cols-5 gap-2 mb-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 12, 25, 30].map((num) => (
              <button
                key={num}
                onClick={() => addAnswer(num)}
                disabled={answers.length >= 4}
                className="bg-white text-indigo-600 font-bold py-2 rounded-lg hover:bg-white/80 disabled:opacity-50"
              >
                {num}
              </button>
            ))}
          </div>

          {message && (
            <p className={`text-center font-bold mb-4 ${message.startsWith("✓") ? "text-green-300" : "text-red-300"}`}>
              {message}
            </p>
          )}

          <div className="flex gap-2">
            <Button
              onClick={() => setAnswers([])}
              variant="outline"
              className="flex-1 bg-white/20 text-white border-white hover:bg-white/30"
            >
              Clear
            </Button>
            <Button onClick={checkCode} className="flex-1 bg-white text-indigo-600 hover:bg-white/90 font-bold">
              Submit Code
            </Button>
          </div>
        </div>

        <p className="text-center font-bold text-lg">Score: {score}</p>
      </div>
    </div>
  )
}
