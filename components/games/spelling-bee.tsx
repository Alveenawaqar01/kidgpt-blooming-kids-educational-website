"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X, Volume2 } from "lucide-react"

interface SpellingBeeProps {
  onClose: () => void
  onWin: (stars: number) => void
}

const words = [
  { word: "BEAUTIFUL", hint: "Very pretty" },
  { word: "IMPORTANT", hint: "Very significant" },
  { word: "EXCELLENT", hint: "Very good" },
  { word: "DIFFERENT", hint: "Not the same" },
  { word: "KNOWLEDGE", hint: "Information" },
  { word: "ADVENTURE", hint: "An exciting journey" },
]

export default function SpellingBee({ onClose, onWin }: SpellingBeeProps) {
  const [currentWord, setCurrentWord] = useState<any>(null)
  const [input, setInput] = useState("")
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(0)
  const [message, setMessage] = useState("")

  useEffect(() => {
    startNewWord()
  }, [])

  const startNewWord = () => {
    const word = words[Math.floor(Math.random() * words.length)]
    setCurrentWord(word)
    setInput("")
    setMessage("")
  }

  const speak = () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(currentWord?.word)
      speechSynthesis.speak(utterance)
    }
  }

  const checkSpelling = () => {
    if (input.toUpperCase() === currentWord?.word) {
      setMessage("✓ Correct!")
      const newScore = score + 10
      setScore(newScore)
      setLevel(level + 1)
      if (level >= 4) {
        onWin(3)
      } else {
        setTimeout(startNewWord, 1000)
      }
    } else {
      setMessage(`✗ Try again! Hint: ${currentWord?.hint}`)
      setInput("")
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-gradient-to-br from-yellow-500 to-amber-500 rounded-3xl p-8 shadow-2xl text-white">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Spelling Bee</h2>
          <button onClick={onClose} className="hover:opacity-80">
            <X size={24} />
          </button>
        </div>

        <div className="bg-white/20 rounded-2xl p-6 mb-6">
          <p className="text-center text-sm text-white/80 mb-4">Level {level + 1}</p>

          <Button
            onClick={speak}
            className="w-full mb-6 bg-white text-yellow-600 hover:bg-white/90 font-bold text-lg py-6"
          >
            <Volume2 className="mr-2" />
            Listen to Word
          </Button>

          <div className="mb-4">
            <p className="text-white/80 mb-2">Hint: {currentWord?.hint}</p>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && checkSpelling()}
              placeholder="Type the word..."
              className="w-full px-4 py-3 rounded-lg text-yellow-600 font-bold text-center text-xl"
            />
          </div>

          {message && (
            <p
              className={`text-center font-bold text-lg mb-4 ${
                message.startsWith("✓") ? "text-green-300" : "text-red-300"
              }`}
            >
              {message}
            </p>
          )}

          <Button onClick={checkSpelling} className="w-full bg-white text-yellow-600 hover:bg-white/90 font-bold">
            Check Spelling
          </Button>
        </div>

        <p className="text-center font-bold text-lg">Score: {score}</p>
      </div>
    </div>
  )
}
