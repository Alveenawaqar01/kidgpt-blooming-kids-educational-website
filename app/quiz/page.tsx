"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ChevronRight, Trophy, Zap, Heart } from "lucide-react"

interface Quiz {
  id: string
  title_en: string
  title_ur: string
  category_en: string
  category_ur: string
  difficulty: "easy" | "medium" | "hard"
  icon: string
  color: string
  questions: Array<{
    question_en: string
    question_ur: string
    options: string[]
    correct: number
  }>
}

const quizzes: Quiz[] = [
  {
    id: "1",
    title_en: "Animal Kingdom",
    title_ur: "جانوروں کی دنیا",
    category_en: "Science",
    category_ur: "سائنس",
    difficulty: "easy",
    icon: "🦁",
    color: "from-amber-400 to-orange-600",
    questions: [
      {
        question_en: "Which animal is the fastest?",
        question_ur: "کون سا جانور سب سے تیز ہے؟",
        options: ["Elephant", "Cheetah", "Lion", "Horse"],
        correct: 1,
      },
      {
        question_en: "How many legs does a spider have?",
        question_ur: "مکڑی کے کتنے پر ہیں؟",
        options: ["4", "6", "8", "10"],
        correct: 2,
      },
      {
        question_en: "What do birds use to fly?",
        question_ur: "پرندے اڑنے کے لیے کیا استعمال کرتے ہیں؟",
        options: ["Fins", "Wings", "Legs", "Tentacles"],
        correct: 1,
      },
    ],
  },
  {
    id: "2",
    title_en: "Math Genius",
    title_ur: "ریاضی کا عبقری",
    category_en: "Mathematics",
    category_ur: "ریاضی",
    difficulty: "medium",
    icon: "🔢",
    color: "from-blue-400 to-indigo-600",
    questions: [
      {
        question_en: "What is 5 + 7?",
        question_ur: "5 + 7 کتنا ہے؟",
        options: ["10", "11", "12", "13"],
        correct: 2,
      },
      {
        question_en: "What is 10 × 3?",
        question_ur: "10 × 3 کتنا ہے؟",
        options: ["20", "30", "40", "50"],
        correct: 1,
      },
      {
        question_en: "Which is the largest number?",
        question_ur: "سب سے بڑا نمبر کون سا ہے؟",
        options: ["45", "89", "67", "34"],
        correct: 1,
      },
    ],
  },
  {
    id: "3",
    title_en: "English Master",
    title_ur: "انگریزی میں ماہر",
    category_en: "Language",
    category_ur: "زبان",
    difficulty: "medium",
    icon: "🔤",
    color: "from-green-400 to-teal-600",
    questions: [
      {
        question_en: "What is the plural of 'cat'?",
        question_ur: "'cat' کی جمع کیا ہے؟",
        options: ["cates", "cats", "cat's", "catss"],
        correct: 1,
      },
      {
        question_en: "Which letter comes after 'G'?",
        question_ur: "'G' کے بعد کون سا حرف آتا ہے؟",
        options: ["E", "F", "H", "I"],
        correct: 2,
      },
      {
        question_en: "How many vowels are there?",
        question_ur: "کتنی vowels ہیں؟",
        options: ["3", "4", "5", "6"],
        correct: 2,
      },
    ],
  },
  {
    id: "4",
    title_en: "Islamic Knowledge",
    title_ur: "اسلامی علم",
    category_en: "Islamic Studies",
    category_ur: "اسلامی علم",
    difficulty: "easy",
    icon: "🕌",
    color: "from-emerald-400 to-green-600",
    questions: [
      {
        question_en: "How many pillars of Islam are there?",
        question_ur: "اسلام کے کتنے ستون ہیں؟",
        options: ["3", "4", "5", "6"],
        correct: 2,
      },
      {
        question_en: "What is the Islamic month of fasting?",
        question_ur: "روزے کا مہینہ کون سا ہے؟",
        options: ["Shawwal", "Ramadan", "Muharram", "Safar"],
        correct: 1,
      },
      {
        question_en: "What is the holy book of Islam?",
        question_ur: "اسلام کی مقدس کتاب کون سی ہے؟",
        options: ["Hadith", "Quran", "Sunnah", "Bible"],
        correct: 1,
      },
    ],
  },
  {
    id: "5",
    title_en: "Geography Explorer",
    title_ur: "جغرافیہ کا شناخت کار",
    category_en: "Social Studies",
    category_ur: "معاشرتی مطالعہ",
    difficulty: "medium",
    icon: "🌍",
    color: "from-red-400 to-pink-600",
    questions: [
      {
        question_en: "Which is the largest continent?",
        question_ur: "سب سے بڑا براعظم کون سا ہے؟",
        options: ["Africa", "Asia", "Europe", "America"],
        correct: 1,
      },
      {
        question_en: "How many continents are there?",
        question_ur: "کتنے براعظم ہیں؟",
        options: ["5", "6", "7", "8"],
        correct: 2,
      },
    ],
  },
]

export default function QuizPage() {
  const [language, setLanguage] = useState<"en" | "ur">("en")
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [lives, setLives] = useState(3)

  const quiz = quizzes.find((q) => q.id === selectedQuiz)

  const handleAnswer = (optionIndex: number) => {
    if (quiz && optionIndex === quiz.questions[currentQuestion].correct) {
      setScore(score + 1)
    } else {
      setLives(lives - 1)
      if (lives <= 1) {
        setShowResult(true)
        return
      }
    }

    if (currentQuestion < quiz!.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResult(true)
    }
  }

  const resetQuiz = () => {
    setSelectedQuiz(null)
    setCurrentQuestion(0)
    setScore(0)
    setShowResult(false)
    setLives(3)
  }

  if (selectedQuiz && quiz) {
    if (showResult) {
      const percentage = Math.round((score / quiz.questions.length) * 100)
      const getGrade = () => {
        if (percentage === 100) return "Perfect! 🌟"
        if (percentage >= 80) return "Excellent! 🎉"
        if (percentage >= 60) return "Good! 👍"
        return "Try Again! 💪"
      }

      return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 flex flex-col">
          <Navbar language={language} setLanguage={setLanguage} />
          <div className="flex-1 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center max-w-md"
            >
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 2 }} className="text-9xl mb-6">
                {percentage === 100 ? "🏆" : percentage >= 80 ? "🎊" : percentage >= 60 ? "🙌" : "😊"}
              </motion.div>
              <h2 className="text-5xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
                {getGrade()}
              </h2>
              <p className="text-3xl font-bold text-foreground mb-2">
                {score}/{quiz.questions.length}
              </p>
              <p className="text-xl text-foreground/70 mb-8">
                {language === "en" ? `You scored ${percentage}%` : `آپ نے ${percentage}% حاصل کیے`}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetQuiz}
                className="px-8 py-4 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-full hover:shadow-lg transition-all"
              >
                {language === "en" ? "Back to Quizzes" : "کوئز پر واپس جائیں"}
              </motion.button>
            </motion.div>
          </div>
        </div>
      )
    }

    const question = quiz.questions[currentQuestion]

    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 flex flex-col">
        <Navbar language={language} setLanguage={setLanguage} />

        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl">
            {/* Quiz Header */}
            <div className="mb-8">
              <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
                <div className="text-6xl mb-4">{quiz.icon}</div>
                <h1 className="text-4xl font-black text-foreground mb-2">
                  {language === "en" ? quiz.title_en : quiz.title_ur}
                </h1>
                <div className="flex justify-center gap-4 text-lg font-bold">
                  <div className="flex items-center gap-1">
                    <Zap className="w-5 h-5 text-yellow-500" />
                    {currentQuestion + 1}/{quiz.questions.length}
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-5 h-5 text-red-500" />
                    {lives}/3
                  </div>
                  <div className="flex items-center gap-1">
                    <Trophy className="w-5 h-5 text-purple-500" />
                    {score}
                  </div>
                </div>
              </motion.div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
                  className="h-full bg-gradient-to-r from-primary to-accent"
                />
              </div>
            </div>

            {/* Question Card */}
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl mb-8"
            >
              <h2 className="text-3xl font-bold text-foreground mb-8">
                {language === "en" ? question.question_en : question.question_ur}
              </h2>

              {/* Options */}
              <div className="grid grid-cols-1 gap-4">
                {question.options.map((option, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(index)}
                    className="p-4 text-lg font-bold rounded-2xl border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all text-left"
                  >
                    <span className="inline-block w-8 h-8 bg-gradient-to-r from-primary to-accent text-white rounded-full text-center font-bold mr-3">
                      {String.fromCharCode(65 + index)}
                    </span>
                    {option}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar language={language} setLanguage={setLanguage} />
      <main className="max-w-7xl mx-auto px-4 py-20">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-primary/30 to-accent/30 rounded-full mb-6 border-2 border-primary/40 backdrop-blur-sm">
            <span className="text-primary font-bold text-sm uppercase tracking-wider">
              {language === "en" ? "🧠 5 Interactive Quizzes" : "🧠 5 انٹراکٹو کوئزز"}
            </span>
          </div>
          <h1 className="text-6xl lg:text-7xl font-black text-foreground mb-6 text-balance bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            {language === "en" ? "Quiz Master" : "کوئز ماسٹر"}
          </h1>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            {language === "en"
              ? "Test your knowledge with 5 fun quizzes covering Science, Math, Language, Islamic Studies, and Geography!"
              : "5 مزے دار کوئزز کے ساتھ اپنی علم آزمائیں!"}
          </p>
        </motion.div>

        {/* Quizzes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {quizzes.map((quizItem, index) => (
            <motion.div
              key={quizItem.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <div className="h-full bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border-2 border-gray-100 dark:border-gray-700">
                <div className={`h-32 bg-gradient-to-br ${quizItem.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 flex items-center justify-center text-8xl">{quizItem.icon}</div>
                </div>
                <div className="p-6 flex flex-col">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {language === "en" ? quizItem.title_en : quizItem.title_ur}
                  </h3>
                  <p className="text-foreground/70 mb-4 text-sm">
                    {language === "en" ? quizItem.category_en : quizItem.category_ur}
                  </p>
                  <div className="mb-6 flex items-center gap-2">
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full ${
                        quizItem.difficulty === "easy"
                          ? "bg-green-100 text-green-700"
                          : quizItem.difficulty === "medium"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {quizItem.difficulty.toUpperCase()}
                    </span>
                    <span className="text-xs text-foreground/70">
                      {quizItem.questions.length} {language === "en" ? "Questions" : "سوالات"}
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedQuiz(quizItem.id)}
                    className="w-full bg-gradient-to-r from-primary to-accent text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-auto"
                  >
                    {language === "en" ? "Start Quiz" : "شروع کریں"}
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <Footer language={language} />
    </div>
  )
}
