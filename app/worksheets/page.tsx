"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Download, BookOpen, Zap, Target } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface Worksheet {
  id: string
  title_en: string
  title_ur: string
  subject: string
  level: "easy" | "medium" | "hard"
  icon: string
  description_en: string
  description_ur: string
  pages: number
  questions: number
  skills_en: string[]
  skills_ur: string[]
  ageGroup: string
}

const worksheets: Worksheet[] = [
  {
    id: "1",
    title_en: "Alphabet Tracing A-Z",
    title_ur: "حروف کی نقل",
    subject: "English",
    level: "easy",
    icon: "✍️",
    description_en: "Comprehensive alphabet tracing guide with proper stroke order and letter formation techniques",
    description_ur: "حروف کو صحیح طریقے سے نقل کریں اور لکھنے کی مہارت بڑھائیں",
    pages: 26,
    questions: 78,
    skills_en: ["Fine Motor Skills", "Letter Recognition", "Writing", "Stroke Order", "Hand-Eye Coordination"],
    skills_ur: ["ہاتھ کی مہارت", "حروف کی پہچان", "لکھنا", "سطروں کی ترتیب", "ہاتھ اور آنکھ میں تالمیل"],
    ageGroup: "4-6 years",
  },
  {
    id: "2",
    title_en: "Number Writing 1-50",
    title_ur: "نمبر لکھنا 1-50",
    subject: "Math",
    level: "easy",
    icon: "🔢",
    description_en: "Learn to write numbers 1 to 50 with proper digit formation and counting practice",
    description_ur: "1 سے 50 تک نمبر لکھنے اور گننے کی مشق",
    pages: 20,
    questions: 150,
    skills_en: ["Counting", "Number Recognition", "Writing", "Number Order", "Quantity Awareness"],
    skills_ur: ["گنتی", "نمبر کی پہچان", "لکھنا", "نمبروں کی ترتیب", "مقدار کی سمجھ"],
    ageGroup: "4-6 years",
  },
  {
    id: "3",
    title_en: "Word Matching & Vocabulary",
    title_ur: "الفاظ کی بندش اور الفاظ",
    subject: "English",
    level: "medium",
    icon: "📝",
    description_en: "Advanced vocabulary building with picture-word association and contextual learning",
    description_ur: "الفاظ کو تصویرسے ملانا اور سیاق میں سیکھنا",
    pages: 30,
    questions: 120,
    skills_en: ["Vocabulary Expansion", "Matching Skills", "Comprehension", "Visual Learning", "Language Development"],
    skills_ur: ["الفاظ کی توسیع", "بندش کی مہارت", "سمجھ", "بصری سیکھ", "زبان کی ترقی"],
    ageGroup: "5-7 years",
  },
  {
    id: "4",
    title_en: "Addition & Number Bonds",
    title_ur: "جمع اور نمبر کے رشتے",
    subject: "Math",
    level: "medium",
    icon: "➕",
    description_en: "Master basic addition up to 20 with visual aids, number bonds, and real-life scenarios",
    description_ur: "20 تک جمع سیکھیں - تصویرسے اور حقیقی مثالوں کے ساتھ",
    pages: 40,
    questions: 200,
    skills_en: ["Addition Mastery", "Mental Math", "Number Bonds", "Problem Solving", "Mathematical Reasoning"],
    skills_ur: ["جمع میں مہارت", "ذہنی ریاضی", "نمبر کے رشتے", "مسائل حل کرنا", "ریاضیاتی سوچ"],
    ageGroup: "6-8 years",
  },
  {
    id: "5",
    title_en: "Subtraction Practice 1-20",
    title_ur: "تفریق کی مشق",
    subject: "Math",
    level: "medium",
    icon: "➖",
    description_en: "Comprehensive subtraction exercises from basic to advanced with visual representations",
    description_ur: "تفریق کی تفصیلی مشق - سادہ سے مشکل تک",
    pages: 35,
    questions: 175,
    skills_en: ["Subtraction Mastery", "Mental Calculation", "Logic & Reasoning", "Inverse Operations", "Number Sense"],
    skills_ur: ["تفریق میں مہارت", "ذہنی حساب", "منطق", "الٹے آپریشنز", "نمبروں کی سمجھ"],
    ageGroup: "6-8 years",
  },
  {
    id: "6",
    title_en: "Urdu Reading & Comprehension",
    title_ur: "اردو پڑھنا اور سمجھنا",
    subject: "Urdu",
    level: "easy",
    icon: "📖",
    description_en: "Read simple Urdu words, phrases, and sentences with comprehension questions",
    description_ur: "سادہ اردو الفاظ، جملے اور متن پڑھیں",
    pages: 35,
    questions: 105,
    skills_en: ["Reading Proficiency", "Urdu Script Mastery", "Pronunciation", "Comprehension", "Language Fluency"],
    skills_ur: ["پڑھنے میں مہارت", "اردو رسم الخط", "تلفظ", "سمجھ", "زبان کی روانی"],
    ageGroup: "5-7 years",
  },
  {
    id: "7",
    title_en: "Islamic Values",
    title_ur: "اسلامی اقدار",
    subject: "Islamic",
    level: "medium",
    icon: "🕌",
    description_en: "Learn Islamic teachings and values",
    description_ur: "اسلامی تعلیمات جانیں",
    pages: 16,
    questions: 32,
    skills_en: ["Islamic Knowledge", "Values", "Comprehension"],
    skills_ur: ["اسلامی علم", "اقدار", "سمجھ"],
    ageGroup: "6-10 years",
  },
  {
    id: "8",
    title_en: "Multiplication Basics",
    title_ur: "ضرب",
    subject: "Math",
    level: "hard",
    icon: "✖️",
    description_en: "Introduction to multiplication with practical examples",
    description_ur: "ضرب سیکھیں",
    pages: 18,
    questions: 60,
    skills_en: ["Multiplication", "Times Tables", "Advanced Math"],
    skills_ur: ["ضرب", "ٹائمز ٹیبل", "اعلیٰ حساب"],
    ageGroup: "7-9 years",
  },
  {
    id: "9",
    title_en: "Phonics and Sounds",
    title_ur: "حروف کی آوازیں",
    subject: "English",
    level: "easy",
    icon: "🔊",
    description_en: "Learn English phonics and pronunciation",
    description_ur: "انگلش کی آوازیں سیکھیں",
    pages: 11,
    questions: 28,
    skills_en: ["Phonics", "Pronunciation", "Listening"],
    skills_ur: ["آوازیں", "تلفظ", "سننا"],
    ageGroup: "4-6 years",
  },
  {
    id: "10",
    title_en: "Geometry Shapes",
    title_ur: "شکلیں",
    subject: "Math",
    level: "medium",
    icon: "🔺",
    description_en: "Learn about geometric shapes and properties",
    description_ur: "شکلیں اور ان کی خصوصیات سیکھیں",
    pages: 13,
    questions: 25,
    skills_en: ["Geometry", "Shapes", "Spatial Awareness"],
    skills_ur: ["جومیٹری", "شکلیں", "مقام کی سمجھ"],
    ageGroup: "6-8 years",
  },
  {
    id: "11",
    title_en: "Comprehension Stories",
    title_ur: "کہانیوں کو سمجھنا",
    subject: "English",
    level: "hard",
    icon: "📚",
    description_en: "Read stories and answer comprehension questions",
    description_ur: "کہانیاں پڑھیں اور سوالات کے جوابات دیں",
    pages: 20,
    questions: 45,
    skills_en: ["Reading", "Comprehension", "Critical Thinking"],
    skills_ur: ["پڑھنا", "سمجھنا", "سوچ سمجھ"],
    ageGroup: "7-10 years",
  },
  {
    id: "12",
    title_en: "Time and Clock",
    title_ur: "وقت اور گھڑی",
    subject: "Math",
    level: "medium",
    icon: "⏰",
    description_en: "Learn to tell time and understand clocks",
    description_ur: "وقت بتانا سیکھیں",
    pages: 12,
    questions: 30,
    skills_en: ["Time", "Clock Reading", "Math"],
    skills_ur: ["وقت", "گھڑی", "ریاضی"],
    ageGroup: "6-8 years",
  },
]

const getLevelColor = (level: string) => {
  if (level === "easy") return "from-green-500 to-emerald-500"
  if (level === "medium") return "from-blue-500 to-cyan-500"
  return "from-orange-500 to-red-500"
}

const getLevelBg = (level: string) => {
  if (level === "easy") return "bg-green-50 dark:bg-green-950/30 border-green-200"
  if (level === "medium") return "bg-blue-50 dark:bg-blue-950/30 border-blue-200"
  return "bg-orange-50 dark:bg-orange-950/30 border-orange-200"
}

const subjects = ["All", ...new Set(worksheets.map((w) => w.subject))]

export default function WorksheetsPage() {
  const [language, setLanguage] = useState<"en" | "ur">("en")
  const [selectedSubject, setSelectedSubject] = useState<string>("all")

  const filtered = selectedSubject === "all" ? worksheets : worksheets.filter((w) => w.subject === selectedSubject)

  return (
    <div className="min-h-screen bg-background">
      <Navbar language={language} setLanguage={setLanguage} />
      <main className="max-w-7xl mx-auto px-4 py-20">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-primary/30 to-accent/30 rounded-full mb-6 border-2 border-primary/40 backdrop-blur-sm">
            <span className="text-primary font-bold text-sm uppercase tracking-wider">
              📄 12 Professional Worksheets
            </span>
          </div>
          <h1 className="text-6xl lg:text-7xl font-black text-foreground mb-6 text-balance bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            {language === "en" ? "Practice Worksheets" : "مشق کی ورک شیٹس"}
          </h1>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            {language === "en"
              ? "Download 12 professional worksheets covering English, Math, Urdu, and Islamic studies with 300+ questions designed for effective learning"
              : "12 پروفیشنل ورک شیٹس ڈاؤن لوڈ کریں"}
          </p>
        </motion.div>

        {/* Subject Filter */}
        <div className="flex flex-wrap gap-3 mb-16 justify-center">
          {subjects.map((subject) => (
            <motion.button
              key={subject}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedSubject(subject === "All" ? "all" : subject)}
              className={`px-6 py-3 rounded-full font-bold transition-all whitespace-nowrap ${
                selectedSubject === (subject === "All" ? "all" : subject)
                  ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg"
                  : "bg-gradient-to-r from-muted to-muted/80 text-foreground hover:shadow-md"
              }`}
            >
              {subject}
            </motion.button>
          ))}
        </div>

        {/* Worksheets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((worksheet, index) => (
            <motion.div
              key={worksheet.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <Card
                className={`h-full bg-white border-2 rounded-3xl hover:shadow-2xl transition-all overflow-hidden ${getLevelBg(worksheet.level)}`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-5xl">{worksheet.icon}</div>
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full text-white bg-gradient-to-r ${getLevelColor(worksheet.level)}`}
                    >
                      {worksheet.level.toUpperCase()}
                    </span>
                  </div>
                  <CardTitle className="text-2xl text-foreground">
                    {language === "en" ? worksheet.title_en : worksheet.title_ur}
                  </CardTitle>
                  <p className="text-sm text-foreground/70 mt-2">
                    {language === "en" ? worksheet.description_en : worksheet.description_ur}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-3 text-center">
                        <BookOpen className="w-5 h-5 mx-auto mb-1 text-primary" />
                        <p className="text-xs text-foreground/70 font-semibold">Pages</p>
                        <p className="text-xl font-bold text-primary">{worksheet.pages}</p>
                      </div>
                      <div className="bg-gradient-to-br from-accent/10 to-secondary/10 rounded-lg p-3 text-center">
                        <Target className="w-5 h-5 mx-auto mb-1 text-accent" />
                        <p className="text-xs text-foreground/70 font-semibold">Questions</p>
                        <p className="text-xl font-bold text-accent">{worksheet.questions}</p>
                      </div>
                      <div className="bg-gradient-to-br from-secondary/10 to-primary/10 rounded-lg p-3 text-center">
                        <Zap className="w-5 h-5 mx-auto mb-1 text-secondary" />
                        <p className="text-xs text-foreground/70 font-semibold">Ages</p>
                        <p className="text-xs font-bold text-secondary">{worksheet.ageGroup}</p>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="bg-gradient-to-r from-muted/40 to-muted/20 rounded-xl p-4">
                      <p className="text-xs font-bold text-foreground/70 mb-3 uppercase tracking-wider">
                        {language === "en" ? "Skills Learned" : "سیکھنے کی مہارتیں"}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {(language === "en" ? worksheet.skills_en : worksheet.skills_ur).map((skill, i) => (
                          <span
                            key={i}
                            className="text-xs bg-gradient-to-r from-primary/20 to-accent/20 text-foreground px-3 py-1 rounded-full font-semibold"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Download Button */}
                    <Button className="w-full bg-gradient-to-r from-primary to-accent text-white py-6 rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2 text-lg">
                      <Download className="w-5 h-5" />
                      {language === "en" ? "Download PDF" : "PDF ڈاؤن لوڈ کریں"}
                    </Button>

                    {/* Subject Tag */}
                    <div className="text-center">
                      <span className="inline-block bg-muted text-foreground px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider">
                        {worksheet.subject}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="mt-20 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-pink-950/20 rounded-3xl p-12 text-center border-2 border-primary/30"
        >
          <h3 className="text-3xl font-bold text-foreground mb-6">
            {language === "en" ? "300+ Practice Questions" : "300+ سوالات"}
          </h3>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto mb-8">
            {language === "en"
              ? "All worksheets are carefully designed by educators and tested with children to ensure effective learning outcomes."
              : "تمام ورک شیٹس معلمین نے تیار کی ہیں اور بچوں کے ساتھ ٹیسٹ کی گئی ہیں۔"}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white/40 backdrop-blur-sm rounded-xl">
              <div className="text-4xl mb-3">✅</div>
              <p className="font-bold text-foreground">{language === "en" ? "Printable Format" : "پرنٹ کے قابل"}</p>
            </div>
            <div className="p-6 bg-white/40 backdrop-blur-sm rounded-xl">
              <div className="text-4xl mb-3">🎓</div>
              <p className="font-bold text-foreground">{language === "en" ? "Educator Approved" : "معلم کی منظوری"}</p>
            </div>
            <div className="p-6 bg-white/40 backdrop-blur-sm rounded-xl">
              <div className="text-4xl mb-3">🌍</div>
              <p className="font-bold text-foreground">{language === "en" ? "Bilingual Content" : "دو زبانی مواد"}</p>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer language={language} />
    </div>
  )
}
