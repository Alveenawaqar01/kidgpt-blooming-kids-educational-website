"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

interface TestimonialsSectionProps {
  language: "en" | "ur"
}

const testimonials = {
  en: [
    {
      name: "Fatima Ahmed",
      role: "Parent from Dubai",
      content:
        "KidGPT has been a game-changer for our family. My daughter learns Islamic values while having fun with the games. Highly recommended!",
      stars: 5,
      initials: "FA",
    },
    {
      name: "Mohammad Khan",
      role: "Parent from Karachi",
      content:
        "Finally, a platform I trust completely. The parent dashboard helps me track my son's progress, and he loves the educational games.",
      stars: 5,
      initials: "MK",
    },
    {
      name: "Aisha Malik",
      role: "Educator from London",
      content:
        "As a teacher, I'm impressed by the curriculum design. Kids are learning through play, and the bilingual support is excellent.",
      stars: 5,
      initials: "AM",
    },
    {
      name: "Hassan Ali",
      role: "Parent from Toronto",
      content:
        "Screen time is controlled, learning is happening, and my kids ask for more educational content. This is exactly what we needed.",
      stars: 5,
      initials: "HA",
    },
  ],
  ur: [
    {
      name: "فاطمہ احمد",
      role: "والدہ سے دبئی",
      content:
        "کڈ جی پی ٹی ہمارے خاندان کے لیے ایک تبدیلی ہے۔ میری بیٹی کھیلوں کے ذریعے اسلامی اقدار سیکھ رہی ہے۔ بہت تجویز کیا ہوا۔",
      stars: 5,
      initials: "FA",
    },
    {
      name: "محمد خان",
      role: "والد سے کراچی",
      content:
        "آخر کار، ایک ایسا پلیٹ فارم جس پر میں مکمل اعتماد کر سکتا ہوں۔ والدین کا ڈیش بورڈ میرے بیٹے کی پیش رفت دیکھنے میں مدد کرتا ہے۔",
      stars: 5,
      initials: "MK",
    },
    {
      name: "عائشہ ملک",
      role: "استاد سے لندن",
      content: "ایک استاد کے طور پر، میں نصاب کے ڈیزائن سے متاثر ہوں۔ بچے کھیل کے ذریعے سیکھ رہے ہیں۔",
      stars: 5,
      initials: "AM",
    },
    {
      name: "حسن علی",
      role: "والد سے ٹورنٹو",
      content: "سکرین کا وقت کنٹرول میں ہے، سیکھ ہو رہی ہے، اور میرے بچے مزید تعلیمی مواد مانگتے ہیں۔",
      stars: 5,
      initials: "HA",
    },
  ],
}

export default function TestimonialsSection({ language }: TestimonialsSectionProps) {
  const items = testimonials[language]

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-muted/30 to-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground text-balance">
            {language === "en" ? "Loved by Families Worldwide" : "دنیا بھر کے خاندانوں سے پیار پایا ہوا"}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full border border-border/50 rounded-2xl hover:shadow-lg transition-all">
                <CardContent className="p-8">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-foreground/80 mb-6 leading-relaxed">{testimonial.content}</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{testimonial.initials}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
