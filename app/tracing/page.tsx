"use client"

import { useState, useRef } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { RotateCcw, Download, Star } from 'lucide-react'
import StarAnimation from "@/components/star-animation" // Assuming StarAnimation component exists

interface TracingItem {
  id: string
  type: "letter" | "number"
  label_en: string
  label_ur: string
  value: string
  svgPath: string
}

const tracingItems: TracingItem[] = [
  // Urdu Letters
  { id: "1", type: "letter", label_en: "Alif", label_ur: "الف", value: "ا", svgPath: "M 50 50 L 50 250" },
  { id: "2", type: "letter", label_en: "Bay", label_ur: "بے", value: "ب", svgPath: "M 50 50 L 50 250 Q 50 280 80 280 L 150 280" },
  { id: "3", type: "letter", label_en: "Pay", label_ur: "پے", value: "پ", svgPath: "M 50 50 L 50 200 Q 50 230 80 230 L 150 230 M 70 200 Q 70 170 100 170 L 130 170" },
  { id: "4", type: "letter", label_en: "Tay", label_ur: "ٹے", value: "ت", svgPath: "M 50 50 L 50 200 M 100 200 L 100 100 L 50 100 L 150 100" },
  { id: "5", type: "letter", label_en: "Say", label_ur: "سے", value: "س", svgPath: "M 50 100 Q 50 50 150 50 Q 150 100 50 100 Q 50 150 150 150" },
  { id: "6", type: "letter", label_en: "Seen", label_ur: "سین", value: "ش", svgPath: "M 50 100 Q 50 50 150 50 Q 150 100 50 100 Q 50 150 150 150 L 150 200" },
  { id: "7", type: "letter", label_en: "Sad", label_ur: "صاد", value: "ص", svgPath: "M 50 50 L 150 50 Q 150 100 50 100 Q 150 100 150 150 L 50 150" },
  { id: "8", type: "letter", label_en: "Daad", label_ur: "ڈاد", value: "ض", svgPath: "M 50 50 L 150 50 Q 150 100 50 100 Q 150 100 150 150 L 50 150 M 100 150 L 100 200" },
  { id: "9", type: "letter", label_en: "Tua", label_ur: "طاء", value: "ط", svgPath: "M 50 50 Q 150 50 150 100 L 50 100 L 150 100 L 150 150" },
  { id: "10", type: "letter", label_en: "Zua", label_ur: "ظاء", value: "ظ", svgPath: "M 50 50 Q 150 50 150 100 L 50 100 L 150 100 L 150 150 L 150 200" },
  
  // Numbers 1-50 (showing first 10, user can scroll for more)
  { id: "11", type: "number", label_en: "One", label_ur: "ایک", value: "1", svgPath: "M 100 50 L 100 250" },
  { id: "12", type: "number", label_en: "Two", label_ur: "دو", value: "2", svgPath: "M 50 100 L 150 100 Q 150 50 50 50 Q 50 100 150 100 L 150 150 Q 150 200 50 200 L 150 200" },
  { id: "13", type: "number", label_en: "Three", label_ur: "تین", value: "3", svgPath: "M 50 50 L 150 50 M 150 50 Q 150 100 50 100 Q 150 100 150 150 L 50 150" },
  { id: "14", type: "number", label_en: "Four", label_ur: "چار", value: "4", svgPath: "M 150 50 L 50 150 L 150 150 M 100 50 L 100 200" },
  { id: "15", type: "number", label_en: "Five", label_ur: "پانچ", value: "5", svgPath: "M 150 50 L 50 50 L 50 100 L 150 100 Q 150 150 50 150 L 150 150" },
]

export default function TracingPage() {
  const [language, setLanguage] = useState<"en" | "ur">("en")
  const [selectedItem, setSelectedItem] = useState<TracingItem | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [stars, setStars] = useState(0)
  const [name, setName] = useState("")
  const [showNameInput, setShowNameInput] = useState(true)
  const [showStarAnimation, setShowStarAnimation] = useState(false)

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return
    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const ctx = canvasRef.current.getContext("2d")
    if (ctx) {
      ctx.beginPath()
      ctx.moveTo(x, y)
      setIsDrawing(true)
    }
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return
    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const ctx = canvasRef.current.getContext("2d")
    if (ctx) {
      ctx.lineTo(x, y)
      ctx.stroke()
    }
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clearCanvas = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d")
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
        drawGuidePath()
      }
    }
  }

  const drawGuidePath = () => {
    if (!canvasRef.current || !selectedItem) return
    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return
    
    ctx.strokeStyle = "rgba(200, 200, 200, 0.3)"
    ctx.lineWidth = 3
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
    
    // Simple guide lines (would need proper SVG path parsing for real implementation)
    ctx.beginPath()
  }

  const completeTracing = () => {
    const newStars = stars + 3
    setStars(newStars)
    setShowStarAnimation(true)
    setTimeout(() => setShowStarAnimation(false), 1500)
    clearCanvas()
  }

  const downloadDrawing = () => {
    if (canvasRef.current) {
      const link = document.createElement("a")
      link.href = canvasRef.current.toDataURL()
      link.download = `tracing-${selectedItem?.value || "drawing"}.png`
      link.click()
    }
  }

  if (showNameInput && !name) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar language={language} setLanguage={setLanguage} />
        <main className="max-w-2xl mx-auto px-4 py-20 flex items-center justify-center min-h-[70vh]">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full">
            <Card className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-950 dark:to-pink-950 border-0 rounded-3xl overflow-hidden shadow-2xl">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-12 text-center">
                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className="text-8xl mb-6">
                  ✨
                </motion.div>
                <CardTitle className="text-4xl">
                  {language === "en" ? "Welcome to Tracing Academy!" : "ٹریسنگ اکیڈمی میں خوش آمدید!"}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-12 text-center space-y-8">
                <div>
                  <label className="text-xl font-bold text-foreground mb-4 block">
                    {language === "en" ? "What's your name?" : "آپ کا نام کیا ہے؟"}
                  </label>
                  <input
                    type="text"
                    placeholder={language === "en" ? "Enter your name..." : "اپنا نام درج کریں..."}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-6 py-4 rounded-2xl border-2 border-purple-300 text-lg font-bold focus:outline-none focus:border-purple-500"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowNameInput(false)}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-2xl font-bold text-lg hover:shadow-xl transition-all"
                >
                  {language === "en" ? "Start Learning" : "سیکھنا شروع کریں"}
                </motion.button>
              </CardContent>
            </Card>
          </motion.div>
        </main>
        <Footer language={language} />
      </div>
    )
  }

  if (selectedItem) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar language={language} setLanguage={setLanguage} />
        {showStarAnimation && <StarAnimation count={3} />}
        <main className="max-w-4xl mx-auto px-4 py-12">
          <motion.button
            whileHover={{ scale: 1.05, x: -5 }}
            onClick={() => setSelectedItem(null)}
            className="mb-8 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:shadow-lg transition-all font-bold flex items-center gap-2"
          >
            ← {language === "en" ? "Back" : "واپس"}
          </motion.button>

          <Card className="bg-white border-0 rounded-3xl overflow-hidden shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-12">
              <div className="text-8xl mb-6 text-center">{selectedItem.value}</div>
              <CardTitle className="text-3xl text-center">
                {language === "en" ? selectedItem.label_en : selectedItem.label_ur}
              </CardTitle>
              <p className="text-white/90 text-center mt-4 text-lg font-semibold">
                {language === "en" ? `Hello ${name}! Practice tracing this ${selectedItem.type}` : `سلام ${name}! اس کو ٹریس کریں`}
              </p>
            </CardHeader>
            <CardContent className="p-12 space-y-8">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-2xl p-6 border-2 border-purple-200 dark:border-purple-700">
                <canvas
                  ref={canvasRef}
                  width={500}
                  height={300}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  className="w-full border-4 border-dashed border-purple-300 dark:border-purple-600 rounded-lg cursor-crosshair bg-white"
                  style={{ touchAction: "none" }}
                />
              </div>

              <div className="flex gap-4 flex-wrap">
                <Button
                  onClick={clearCanvas}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl py-6"
                >
                  <RotateCcw className="mr-2" />
                  {language === "en" ? "Clear" : "صاف کریں"}
                </Button>
                <Button
                  onClick={downloadDrawing}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl py-6"
                >
                  <Download className="mr-2" />
                  {language === "en" ? "Download" : "ڈاؤن لوڈ"}
                </Button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={completeTracing}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl py-6 text-lg flex items-center justify-center gap-2 hover:shadow-lg"
                >
                  <Star className="w-6 h-6 fill-white" />
                  {language === "en" ? "Completed! +3 Stars" : "مکمل! +3 ستارے"}
                </motion.button>
              </div>

              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-950/30 dark:to-orange-950/30 rounded-2xl p-6 text-center border-2 border-yellow-300 dark:border-yellow-700">
                <p className="text-3xl font-black text-yellow-600 dark:text-yellow-300">
                  ⭐ {stars} {language === "en" ? "Stars Earned" : "ستارے کمائے"}
                </p>
                <p className="text-foreground/70 mt-2">
                  {language === "en" ? `Great job ${name}! Keep practicing to earn more stars!` : `بہترین کام ${name}! مزید ستارے کمانے کے لیے جاری رکھیں!`}
                </p>
              </div>
            </CardContent>
          </Card>
        </main>
        <Footer language={language} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar language={language} setLanguage={setLanguage} />
      <main className="max-w-7xl mx-auto px-4 py-20">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full mb-6 border-2 border-purple-500/40 backdrop-blur-sm">
            <span className="text-purple-600 dark:text-purple-300 font-bold text-sm uppercase tracking-wider">
              ✏️ Interactive Tracing
            </span>
          </div>
          <h1 className="text-6xl lg:text-7xl font-black text-foreground mb-6 text-balance bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
            {language === "en" ? "Tracing Academy" : "ٹریسنگ اکیڈمی"}
          </h1>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            {language === "en"
              ? `Welcome ${name}! Learn to write Urdu letters and numbers by tracing. Earn stars for each completed practice!`
              : `خوش آمدید ${name}! ٹریس کرتے ہوئے اردو حروف اور نمبر سیکھیں۔ مزید ستارے کمانے کے لیے جاری رکھیں!`}
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex gap-4 justify-center mb-12">
          {["all", "letter", "number"].map((cat) => (
            <Button
              key={cat}
              className={`rounded-full px-6 py-3 font-bold ${
                cat === "all"
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                  : "bg-muted text-foreground hover:bg-muted/80"
              }`}
            >
              {cat === "all"
                ? language === "en"
                  ? "All"
                  : "سب"
                : cat === "letter"
                  ? language === "en"
                    ? "Urdu Letters"
                    : "اردو حروف"
                  : language === "en"
                    ? "Numbers"
                    : "نمبر"}
            </Button>
          ))}
        </div>

        {/* Tracing Items Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
          {tracingItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -8, scale: 1.05 }}
            >
              <motion.button
                onClick={() => setSelectedItem(item)}
                className="w-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-950 dark:to-pink-950 hover:shadow-xl transition-all rounded-2xl p-6 text-center group border-2 border-purple-300 dark:border-purple-700"
              >
                <motion.div className="text-6xl mb-4 group-hover:scale-125 transition-transform">
                  {item.value}
                </motion.div>
                <p className="text-foreground font-bold text-sm mb-2">
                  {language === "en" ? item.label_en : item.label_ur}
                </p>
                <motion.div className="text-3xl">✏️</motion.div>
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-3xl p-8 md:p-16 border-2 border-purple-300 dark:border-purple-700"
        >
          <h3 className="text-3xl font-black text-foreground mb-8">
            {language === "en" ? "How to Use" : "کیسے استعمال کریں"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "1️⃣", title: "Select", title_ur: "منتخب کریں", desc: "Choose a letter or number" },
              { icon: "2️⃣", title: "Trace", title_ur: "ٹریس کریں", desc: "Follow the guide and trace" },
              { icon: "3️⃣", title: "Earn", title_ur: "کمائیں", desc: "Get stars and rewards!" },
            ].map((step, idx) => (
              <div key={idx} className="bg-white dark:bg-foreground/5 rounded-2xl p-6 text-center">
                <p className="text-4xl mb-4">{step.icon}</p>
                <p className="text-lg font-bold text-foreground mb-2">
                  {language === "en" ? step.title : step.title_ur}
                </p>
                <p className="text-foreground/70">{step.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
      <Footer language={language} />
    </div>
  )
}
