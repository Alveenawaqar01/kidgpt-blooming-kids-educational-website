"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface WordBuilderProps {
  onClose: () => void
  onWin: (stars: number) => void
}

const wordList = [
  { word: "HAPPY", hint: "Full of joy" },
  { word: "LEARN", hint: "To gain knowledge" },
  { word: "SMILE", hint: "Show your teeth happily" },
  { word: "BRAIN", hint: "Think with this" },
  { word: "HEART", hint: "Organ that pumps blood" },
  { word: "FRIEND", hint: "Someone you like" },
  { word: "FLOWER", hint: "Beautiful plant" },
  { word: "RAINBOW", hint: "Appears after rain" },
]

export default function WordBuilder({ onClose, onWin }: WordBuilderProps) {
  const [currentWord, setCurrentWord] = useState<any>(null)
  const [scrambled, setScrambled] = useState<string[]>([])
  const [selected, setSelected] = useState<string[]>([])
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(0)

  useEffect(() => {
    startNewWord()
  }, [])

  const startNewWord = () => {
    const word = wordList[Math.floor(Math.random() * wordList.length)]
    setCurrentWord(word)
    const arr = word.word.split("").sort(() => Math.random() - 0.5)
    setScrambled(arr)
    setSelected([])
  }

  const selectLetter = (letter: string, index: number) => {
    setSelected([...selected, { letter, index }])
    setScrambled(scrambled.filter((_, i) => i !== index))
  }

  const deselectLetter = (index: number) => {
    const letter = selected[index].letter
    setScrambled([...scrambled, letter])
    setSelected(selected.filter((_, i) => i !== index))
  }

  const checkWord = () => {
    const guessed = selected.map((s) => s.letter).join("")
    if (guessed === currentWord.word) {
      const newScore = score + 10
      setScore(newScore)
      setLevel(level + 1)
      if (level >= 4) {
        onWin(3)
      } else {
        setTimeout(startNewWord, 500)
      }
    }
  }

  const reset = () => {
    setSelected([])
    const arr = currentWord.word.split("").sort(() => Math.random() - 0.5)
    setScrambled(arr)
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-gradient-to-br from-green-500 to-teal-500 rounded-3xl p-8 shadow-2xl text-white">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Word Builder</h2>
          <button onClick={onClose} className="hover:opacity-80">
            <X size={24} />
          </button>
        </div>

        <div className="bg-white/20 rounded-2xl p-6 mb-6">
          <div className="text-center mb-4">
            <p className="text-white/80 text-sm">Level {level + 1}</p>
            <p className="text-4xl font-bold">Hint: {currentWord?.hint}</p>
          </div>

          <div className="bg-white/30 rounded-xl p-4 mb-4 min-h-16 flex flex-wrap gap-2 items-center justify-center">
            {selected.map((s, i) => (
              <button
                key={i}
                onClick={() => deselectLetter(i)}
                className="w-12 h-12 bg-white text-green-600 rounded-lg font-bold text-lg hover:bg-white/80 transition-all"
              >
                {s.letter}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 justify-center mb-4">
            {scrambled.map((letter, i) => (
              <button
                key={i}
                onClick={() => selectLetter(letter, i)}
                className="w-12 h-12 bg-white text-green-600 rounded-lg font-bold text-lg hover:scale-110 transition-transform"
              >
                {letter}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <Button
              onClick={reset}
              variant="outline"
              className="flex-1 bg-white/20 text-white border-white hover:bg-white/30"
            >
              Reset
            </Button>
            <Button onClick={checkWord} className="flex-1 bg-white text-green-600 hover:bg-white/90 font-bold">
              Check
            </Button>
          </div>
        </div>

        <p className="text-center font-bold text-lg">Score: {score}</p>
      </div>
    </div>
  )
}
