"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Gamepad2, Heart, BarChart3 } from "lucide-react"

interface FeaturesShowcaseProps {
  language: "en" | "ur"
}

const features = {
  en: [
    {
      icon: Shield,
      title: "Safe AI Chat & Filtered Answers",
      description:
        "Multi-layer AI safety filters trained on child psychology. Blocks inappropriate content while providing age-appropriate, educational responses.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Gamepad2,
      title: "Gamified Learning & Quizzes",
      description:
        "Interactive lessons with 500+ quizzes covering math, science, languages. Adaptive difficulty that grows with your child's abilities.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Heart,
      title: "Verified Islamic & Moral Stories",
      description:
        "250+ authenticated stories from Islamic scholars and educators. Teaching Islamic values, moral principles, and character building.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: BarChart3,
      title: "Parent Dashboard & Progress Tracking",
      description:
        "Real-time monitoring with detailed analytics. Track learning progress, screen time, achievements, and usage patterns in one place.",
      color: "from-orange-500 to-yellow-500",
    },
  ],
  ur: [
    {
      icon: Shield,
      title: "محفوظ ایآئی چیٹ",
      description: "بہند سطری ایآئی حفاظت فلٹرز۔ غلط مواد کو روکتے ہوئے تعلیمی جوابات فراہم کرتے ہیں۔",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Gamepad2,
      title: "گیمیفائی شدہ سیکھ",
      description: "500 سے زیادہ کویزز کے ساتھ انٹرایکٹو اسباق۔ آپ کے بچے کی صلاحیت کے مطابق مشکل میں اضافہ۔",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Heart,
      title: "تصدیق شدہ اسلامی کہانیاں",
      description: "250 سے زیادہ تصدیق شدہ اسلامی کہانیاں۔ اسلامی اقدار، اخلاقی اصول اور کردار کی تعمیر۔",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: BarChart3,
      title: "والدین کا ڈیش بورڈ",
      description: "حقیقی وقت میں نگرانی اور تفصیلی تجزیات۔ سیکھ کی پیش رفت، وقت، اور کامیابیاں ٹریک کریں۔",
      color: "from-orange-500 to-yellow-500",
    },
  ],
}

export default function FeaturesShowcase({ language }: FeaturesShowcaseProps) {
  const items = features[language]

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-background to-muted/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground text-balance mb-6">
            {language === "en"
              ? "KidGPT: Where Learning Meets Safety & Fun!"
              : "KidGPT: جہاں سیکھ محفوظیت اور مزے سے ملتی ہے!"}
          </h2>
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
            {language === "en"
              ? "A comprehensive platform designed specifically for young learners. Built by educators for families worldwide."
              : "نوجوان متعلمین کے لیے خصوصی طور پر ڈیزائن کیا گیا مکمل پلیٹ فارم۔"}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full border border-border/50 rounded-2xl hover:shadow-xl transition-all overflow-hidden group">
                  <div className={`h-1 bg-gradient-to-r ${feature.color}`} />
                  <CardHeader>
                    <div
                      className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-shadow`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-foreground text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-foreground/70 leading-relaxed text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
