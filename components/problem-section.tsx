"use client"

import { motion } from "framer-motion"
import { AlertTriangle, Smartphone, BookOpen } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ProblemSectionProps {
  language: "en" | "ur"
}

const problems = {
  en: [
    {
      icon: AlertTriangle,
      title: "Unsafe & Unfiltered Content",
      description:
        "85% of children aged 8-12 encounter inappropriate content online. From cyberbullying to explicit material, the digital world poses real dangers to young minds daily.",
    },
    {
      icon: Smartphone,
      title: "Boring Education Systems",
      description:
        "Kids spend 7+ hours on screens daily, yet only 23% find traditional learning engaging. Modern children need interactive, adaptive education that matches their digital fluency.",
    },
    {
      icon: BookOpen,
      title: "Missing Values Education",
      description:
        "67% of parents struggle to teach Islamic values and moral principles in today's fast-paced world. Character building is often lost in conventional curricula.",
    },
  ],
  ur: [
    {
      icon: AlertTriangle,
      title: "غیر محفوظ مواد",
      description:
        "8-12 سال کے 85 فیصد بچے آن لائن غلط مواد کا سامنا کرتے ہیں۔ سائبر بدمعاشی سے لے کر صریح مواد تک، ڈیجیٹل دنیا روزانہ نوجوان ذہنوں کے لیے خطرات پیش کرتی ہے۔",
    },
    {
      icon: Smartphone,
      title: "بورنگ تعلیم کا نظام",
      description:
        "بچے روزانہ 7 گھنٹے سے زیادہ سکرین پر گزارتے ہیں، پھر بھی صرف 23 فیصد روایتی سیکھ کو دلچسپ پاتے ہیں۔ جدید بچوں کو انٹرایکٹو، موافق تعلیم کی ضرورت ہے۔",
    },
    {
      icon: BookOpen,
      title: "اقدار کی تعلیم میں کمی",
      description:
        "67 فیصد والدین آج کی تیز رفتار دنیا میں اسلامی اقدار اور اخلاقی اصول سکھانے میں مشکل محسوس کرتے ہیں۔ کردار کی تعمیر اکثر روایتی نصاب میں کھو جاتی ہے۔",
    },
  ],
}

export default function ProblemSection({ language }: ProblemSectionProps) {
  const items = problems[language]

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-background via-red-50/30 to-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground text-balance mb-6">
            {language === "en" ? "The Internet Isn't Built for Kids." : "انٹرنیٹ بچوں کے لیے نہیں بنایا گیا۔"}
          </h2>
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
            {language === "en"
              ? "Every day, millions of children navigate an online world designed for adults. Parents worldwide struggle with three critical challenges that threaten their child's safety, growth, and values."
              : "ہر روز، لاکھوں بچے ایک آن لائن دنیا میں تشریف لے جاتے ہیں جو بالغوں کے لیے ڈیزائن کی گئی ہے۔ والدین دنیا بھر میں تین اہم مسائل سے جوجھ رہے ہیں۔"}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((problem, index) => {
            const Icon = problem.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full border-2 border-border/50 hover:border-red-300/50 transition-colors rounded-2xl">
                  <CardHeader>
                    <div className="w-14 h-14 rounded-xl bg-red-100 flex items-center justify-center mb-4">
                      <Icon className="w-7 h-7 text-red-600" />
                    </div>
                    <CardTitle className="text-foreground">{problem.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-foreground/70 leading-relaxed">
                      {problem.description}
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
