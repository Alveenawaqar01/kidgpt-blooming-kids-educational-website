"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface TriviaBridgeProps {
  onClose: () => void
  onWin: (stars: number) => void
}

interface Question {
  id: number
  question: string
  options: string[]
  correct: number
}

const questions: Question[] = [
  { id: 1, question: "What is the capital of France?", options: ["London", "Paris", "Berlin", "Madrid"], correct: 1 },
  { id: 2, question: "How many continents are there?", options: ["5", "6", "7", "8"], correct: 2 },
  { id: 3, question: "What is 5 + 8?", options: ["11", "12", "13", "14"], correct: 2 },
  {
    id: 4,
    question: "Which planet is closest to the Sun?",
    options: ["Venus", "Mercury", "Earth", "Mars"],
    correct: 1,
  },
  { id: 5, question: "What color is the sky?", options: ["Blue", "Green", "Red", "Yellow"], correct: 0 },
]

export default function TriviaBridge({ onClose, onWin }: TriviaBridgeProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [answered, setAnswered] = useState<boolean | null>(null)

  const handleAnswer = (index: number) => {
    if (questions[currentQuestion].correct === index) {
      setScore((s) => s + 1)
      setAnswered(true)
    } else {
      setAnswered(false)
    }
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((c) => c + 1)
      setAnswered(null)
    } else {
      setGameOver(true)
    }
  }

  const stars = Math.ceil((score / questions.length) * 3)

  if (gameOver) {
    return (
      <Card className="w-full max-w-md p-8 text-center bg-white rounded-3xl">
        <div className="text-6xl mb-4">🌉</div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Bridge Crossed!</h2>
        <p className="text-2xl text-foreground mb-2">
          Score: {score}/{questions.length}
        </p>
        <p className="text-4xl font-bold mb-6">⭐ {stars} Stars</p>
        <div className="space-y-2">
          <Button
            onClick={() => onWin(stars)}
            className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3"
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

  const question = questions[currentQuestion]

  return (
    <Card className="w-full max-w-2xl p-8 bg-white rounded-3xl">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="text-lg font-bold">
            Question {currentQuestion + 1}/{questions.length}
          </div>
          <div className="text-lg font-bold">Score: {score}</div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-rose-500 to-pink-500"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Question */}
        <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-6 rounded-2xl">
          <p className="text-xl font-bold text-foreground">{question.question}</p>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <motion.button
              key={index}
              onClick={() => answered === null && handleAnswer(index)}
              disabled={answered !== null}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full p-4 rounded-xl font-bold text-lg transition-all ${
                answered === null
                  ? "bg-white border-2 border-rose-300 hover:bg-rose-50"
                  : index === question.correct
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                    : "bg-gray-100 text-foreground/50"
              }`}
            >
              {option}
            </motion.button>
          ))}
        </div>

        {/* Feedback & Next */}
        {answered !== null && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <p className={`text-lg font-bold mb-4 text-center ${answered ? "text-green-600" : "text-red-600"}`}>
              {answered ? "✓ Correct!" : "✗ Incorrect"}
            </p>
            <Button onClick={handleNext} className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3">
              Next Question
            </Button>
          </motion.div>
        )}

        <Button variant="outline" onClick={onClose} className="w-full bg-transparent">
          Exit Game
        </Button>
      </div>
    </Card>
  )
}
