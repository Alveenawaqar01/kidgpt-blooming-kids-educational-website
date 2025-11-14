"use client"

import type React from "react"

import { useState, useRef } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Download, Trash2, Palette } from "lucide-react"

export default function ArtPage() {
  const [language, setLanguage] = useState<"en" | "ur">("en")
  const [isDrawing, setIsDrawing] = useState(false)
  const [color, setColor] = useState("#ef4444")
  const [brushSize, setBrushSize] = useState(5)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const startDrawing = (e: React.MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    ctx.strokeStyle = color
    ctx.lineWidth = brushSize
    ctx.lineJoin = "round"
    ctx.lineCap = "round"
    ctx.beginPath()
    ctx.moveTo(x, y)
    setIsDrawing(true)
  }

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    ctx.lineTo(x, y)
    ctx.stroke()
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  const downloadArt = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const link = document.createElement("a")
    link.download = "my-art.png"
    link.href = canvas.toDataURL()
    link.click()
  }

  const colors = ["#ef4444", "#f97316", "#eab308", "#10b981", "#3b82f6", "#8b5cf6", "#ec4899", "#000000"]

  return (
    <div className="min-h-screen bg-background">
      <Navbar language={language} setLanguage={setLanguage} />
      <main className="max-w-7xl mx-auto px-4 py-20">
        <h1 className="text-5xl font-bold text-center mb-4 text-foreground">
          {language === "en" ? "Art Studio" : "آرٹ اسٹوڈیو"}
        </h1>
        <p className="text-center text-foreground/70 mb-12 text-lg">
          {language === "en" ? "Draw and create your masterpiece!" : "اپنا شاہکار بنائیں!"}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Canvas */}
          <div className="lg:col-span-2">
            <Card className="bg-white border-2 border-border rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10">
                <CardTitle>{language === "en" ? "Drawing Canvas" : "ڈرائنگ ک بورڈ"}</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <canvas
                  ref={canvasRef}
                  width={500}
                  height={400}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  className="w-full border-2 border-border rounded-2xl cursor-crosshair bg-white"
                />
              </CardContent>
            </Card>
          </div>

          {/* Tools */}
          <div className="space-y-4">
            {/* Color Picker */}
            <Card className="bg-white border-2 border-border rounded-3xl">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Palette size={20} />
                  {language === "en" ? "Colors" : "رنگ"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-4 gap-2">
                  {colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setColor(c)}
                      className={`w-full aspect-square rounded-xl transition-transform ${
                        color === c ? "scale-110 ring-2 ring-foreground" : "hover:scale-105"
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
                <div className="p-4 bg-muted rounded-2xl">
                  <p className="text-sm text-foreground/60 mb-2">
                    {language === "en" ? "Current Color" : "موجودہ رنگ"}
                  </p>
                  <div className="w-full h-12 rounded-xl border-2 border-border" style={{ backgroundColor: color }} />
                </div>
              </CardContent>
            </Card>

            {/* Brush Size */}
            <Card className="bg-white border-2 border-border rounded-3xl">
              <CardHeader>
                <CardTitle className="text-lg">{language === "en" ? "Brush Size" : "برش سائز"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={brushSize}
                  onChange={(e) => setBrushSize(Number.parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="text-center text-lg font-bold text-primary">{brushSize}px</div>
                <div className="flex justify-center">
                  <div
                    className="rounded-full"
                    style={{
                      width: `${brushSize * 2}px`,
                      height: `${brushSize * 2}px`,
                      backgroundColor: color,
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card className="bg-white border-2 border-border rounded-3xl">
              <CardHeader>
                <CardTitle className="text-lg">{language === "en" ? "Actions" : "اقدامات"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={downloadArt}
                  className="w-full bg-gradient-to-r from-primary to-accent text-white rounded-full py-3 flex items-center justify-center gap-2"
                >
                  <Download size={20} />
                  {language === "en" ? "Download" : "ڈاؤن لوڈ"}
                </Button>
                <Button
                  onClick={clearCanvas}
                  variant="outline"
                  className="w-full rounded-full py-3 flex items-center justify-center gap-2 bg-transparent"
                >
                  <Trash2 size={20} />
                  {language === "en" ? "Clear" : "صاف کریں"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tutorials */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-foreground mb-8">
            {language === "en" ? "Drawing Tutorials" : "ڈرائنگ ٹیوٹوریلز"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title_en: "Draw a House", title_ur: "گھر بنائیں", icon: "🏠", steps: 4 },
              { title_en: "Draw a Tree", title_ur: "درخت بنائیں", icon: "🌳", steps: 5 },
              { title_en: "Draw a Flower", title_ur: "پھول بنائیں", icon: "🌸", steps: 6 },
            ].map((tutorial, idx) => (
              <motion.div key={idx} whileHover={{ y: -8 }} transition={{ duration: 0.2 }}>
                <Card className="bg-white border-2 border-border rounded-3xl hover:shadow-lg cursor-pointer">
                  <CardHeader>
                    <div className="text-5xl mb-4">{tutorial.icon}</div>
                    <CardTitle className="text-foreground">
                      {language === "en" ? tutorial.title_en : tutorial.title_ur}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/70 mb-4">
                      {tutorial.steps} {language === "en" ? "steps" : "اقدامات"}
                    </p>
                    <Button className="w-full bg-muted text-foreground hover:bg-primary/10 rounded-full">
                      {language === "en" ? "Learn" : "سیکھیں"}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer language={language} />
    </div>
  )
}
