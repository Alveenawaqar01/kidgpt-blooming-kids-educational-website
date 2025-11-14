"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Volume2, Copy, Sparkles } from 'lucide-react'

interface Dua {
  id: string
  title_en: string
  title_ur: string
  arabic: string
  english: string
  urdu: string
  translation_en: string
  time_en: string
  time_ur: string
  benefit_en: string
  benefit_ur: string
  color: string
  bgColor: string
  textColor: string
}

const duas: Dua[] = [
  {
    id: "1",
    title_en: "Dua for Knowledge",
    title_ur: "علم کے لیے دعا",
    arabic: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي",
    english: "Rabbish rah li sadri wa yassir li amri",
    urdu: "رب شرح لی صدری و یسر لی امری",
    translation_en: "O my Lord! Expand for me my chest, and ease for me my affair",
    time_en: "Before studying",
    time_ur: "پڑھائی سے پہلے",
    benefit_en: "For better understanding and concentration",
    benefit_ur: "بہتر سمجھ اور توجہ کے لیے",
    color: "from-blue-600 to-cyan-600",
    bgColor: "from-blue-50 to-cyan-50",
    textColor: "text-blue-900",
  },
  {
    id: "2",
    title_en: "Morning Dua",
    title_ur: "صبح کی دعا",
    arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ",
    english: "Asbahna wa asbaha al-mulk lillah",
    urdu: "اصبحنا و اصبح الملک لله",
    translation_en: "We have reached the morning and Allah has reached the morning with His kingdom",
    time_en: "Early morning",
    time_ur: "صبح جلدی",
    benefit_en: "Starting the day with blessing",
    benefit_ur: "دن کو برکت کے ساتھ شروع کریں",
    color: "from-yellow-600 to-orange-600",
    bgColor: "from-yellow-50 to-orange-50",
    textColor: "text-yellow-900",
  },
  {
    id: "3",
    title_en: "Evening Dua",
    title_ur: "شام کی دعا",
    arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ",
    english: "Amsaina wa amsa al-mulk lillah",
    urdu: "امسينا و امسی الملک لله",
    translation_en: "We have reached the evening and Allah has reached the evening with His kingdom",
    time_en: "Evening time",
    time_ur: "شام کو",
    benefit_en: "Protection throughout the night",
    benefit_ur: "رات بھر تحفظ",
    color: "from-purple-600 to-pink-600",
    bgColor: "from-purple-50 to-pink-50",
    textColor: "text-purple-900",
  },
  {
    id: "4",
    title_en: "Dua Before Sleep",
    title_ur: "سونے سے پہلے دعا",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا",
    english: "Al-hamdu lillahi alladhi ata'amana wa saqana",
    urdu: "الحمد لله الذی اطعمنا و سقانا",
    translation_en: "Praise be to Allah who has given us food and drink",
    time_en: "Before sleep",
    time_ur: "سونے سے پہلے",
    benefit_en: "Peaceful and blessed sleep",
    benefit_ur: "پرسرار اور برکت والی نیند",
    color: "from-indigo-600 to-blue-600",
    bgColor: "from-indigo-50 to-blue-50",
    textColor: "text-indigo-900",
  },
  {
    id: "5",
    title_en: "Dua for Parents",
    title_ur: "والدین کے لیے دعا",
    arabic: "رَّبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَلِمَن دَخَلَ بَيْتِيَ مُؤْمِنًا",
    english: "Rabbi ighfir li wa li walidayya wa liman dakhala baytiya mu'minan",
    urdu: "رب اغفر لی و لوالدی و لمن دخل بیتی مؤمنا",
    translation_en: "My Lord, forgive me and my parents and whoever enters my house as a believer",
    time_en: "Anytime",
    time_ur: "کسی بھی وقت",
    benefit_en: "Blessing for family members",
    benefit_ur: "خاندان کے افراد کے لیے برکت",
    color: "from-red-600 to-rose-600",
    bgColor: "from-red-50 to-rose-50",
    textColor: "text-red-900",
  },
  {
    id: "6",
    title_en: "Dua for Good Health",
    title_ur: "اچھی صحت کے لیے دعا",
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ العَفْوَ وَالعَافِيَة",
    english: "Allahumma inni as'aluka al-afu wa al-afia",
    urdu: "اللهم انی اسئلک العفو و العافیة",
    translation_en: "O Allah, I ask You for pardon and well-being",
    time_en: "Anytime",
    time_ur: "کسی بھی وقت",
    benefit_en: "Health and protection from illness",
    benefit_ur: "صحت اور بیماری سے محفوظ رہنا",
    color: "from-green-600 to-teal-600",
    bgColor: "from-green-50 to-teal-50",
    textColor: "text-green-900",
  },
  {
    id: "7",
    title_en: "Dua Before Eating",
    title_ur: "کھانے سے پہلے دعا",
    arabic: "بِسْمِ اللَّهِ وَعَلَىٰ بَرَكَةِ اللَّهِ",
    english: "Bismillahi wa ala barakatillah",
    urdu: "بسم الله و علی برکۃ الله",
    translation_en: "In the name of Allah and upon the blessings of Allah",
    time_en: "Before meals",
    time_ur: "کھانے سے پہلے",
    benefit_en: "Blessing in food and digestion",
    benefit_ur: "کھانے میں برکت",
    color: "from-amber-600 to-orange-600",
    bgColor: "from-amber-50 to-orange-50",
    textColor: "text-amber-900",
  },
  {
    id: "8",
    title_en: "Dua After Eating",
    title_ur: "کھانے کے بعد دعا",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ",
    english: "Alhamdulillahi alladhi ata'amana wa saqana wa ja'alana Muslimeen",
    urdu: "الحمد لله الذی اطعمنا و سقانا و جعلنا مسلمین",
    translation_en: "Praise be to Allah who has fed us, given us drink, and made us Muslims",
    time_en: "After meals",
    time_ur: "کھانے کے بعد",
    benefit_en: "Gratitude and contentment",
    benefit_ur: "شکر گزاری",
    color: "from-rose-600 to-pink-600",
    bgColor: "from-rose-50 to-pink-50",
    textColor: "text-rose-900",
  },
  {
    id: "9",
    title_en: "Dua for Courage",
    title_ur: "ہمت کے لیے دعا",
    arabic: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ",
    english: "Hasbunallahu wa ni'ma al-wakil",
    urdu: "حسبنا الله و نعم الوکیل",
    translation_en: "Allah is sufficient for us, and He is the best Trustee",
    time_en: "During hardship",
    time_ur: "مشکل کے دوران",
    benefit_en: "Strength and confidence",
    benefit_ur: "طاقت اور اعتماد",
    color: "from-teal-600 to-cyan-600",
    bgColor: "from-teal-50 to-cyan-50",
    textColor: "text-teal-900",
  },
]

export default function DuasPage() {
  const [language, setLanguage] = useState<"en" | "ur">("en")
  const [copied, setCopied] = useState<string | null>(null)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [filter, setFilter] = useState<string>("all")

  const toggleFavorite = (id: string) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(id)) {
      newFavorites.delete(id)
    } else {
      newFavorites.add(id)
    }
    setFavorites(newFavorites)
  }

  const handleCopy = (text: string, duaId: string) => {
    navigator.clipboard.writeText(text)
    setCopied(duaId)
    setTimeout(() => setCopied(null), 2000)
  }

  const handleAudio = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = "ar-SA"
      utterance.rate = 0.8
      window.speechSynthesis.speak(utterance)
    }
  }

  const filteredDuas =
    filter === "all"
      ? duas
      : filter === "favorites"
        ? Array.from(favorites)
            .map((id) => duas.find((d) => d.id === id)!)
            .filter(Boolean)
        : duas

  return (
    <div className="min-h-screen bg-background">
      <Navbar language={language} setLanguage={setLanguage} />

      <main className="max-w-7xl mx-auto px-4 py-20">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-primary/30 to-accent/30 rounded-full mb-6 border-2 border-primary/40 backdrop-blur-sm">
            <span className="text-primary font-bold text-sm uppercase tracking-wider flex items-center gap-2 justify-center">
              <Sparkles className="w-4 h-4" />
              {language === "en" ? "9 Authentic Duas" : "9 اصل دعائیں"}
            </span>
          </div>
          <h1 className="text-6xl lg:text-7xl font-black text-foreground mb-6 text-balance bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            {language === "en" ? "Islamic Duas for Kids" : "بچوں کے لیے اسلامی دعائیں"}
          </h1>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            {language === "en"
              ? "Learn, memorize, and listen to 9 beautiful Islamic duas to strengthen your faith and seek Allah's blessings every day"
              : "9 خوبصورت اسلامی دعائیں سیکھیں اور اللہ کی برکتیں حاصل کریں"}
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 justify-center mb-16">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter("all")}
            className={`px-6 py-3 rounded-full font-bold transition-all ${
              filter === "all"
                ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg"
                : "bg-gradient-to-r from-muted to-muted/80 text-foreground hover:shadow-md"
            }`}
          >
            {language === "en" ? "All Duas" : "تمام دعائیں"}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter("favorites")}
            className={`px-6 py-3 rounded-full font-bold transition-all flex items-center gap-2 ${
              filter === "favorites"
                ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg"
                : "bg-gradient-to-r from-muted to-muted/80 text-foreground hover:shadow-md"
            }`}
          >
            <Heart className="w-4 h-4" />
            {language === "en" ? "Favorites" : "پسندیدہ"}
          </motion.button>
        </div>

        {/* Grid of Duas with Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {filteredDuas.map((dua, index) => (
            <motion.div
              key={dua.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <Card
                className={`h-full hover:shadow-2xl transition-all duration-300 border-0 rounded-3xl overflow-hidden group bg-gradient-to-br ${dua.bgColor} backdrop-blur-xl`}
              >
                <div className={`h-40 bg-gradient-to-br ${dua.color} relative overflow-hidden`}>
                  <img
                    src={`/.jpg?key=tpesk&height=160&width=400&query=${dua.title_en} islamic dua illustration children cartoon`}
                    alt={dua.title_en}
                    className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-black/20" />
                  <div className="absolute top-4 right-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleFavorite(dua.id)}
                      className="p-3 bg-white/95 hover:bg-white rounded-lg transition-colors shadow-lg"
                    >
                      <Heart
                        className={`w-6 h-6 transition-colors ${
                          favorites.has(dua.id) ? "fill-red-500 text-red-500" : "text-foreground/40 hover:text-red-500"
                        }`}
                      />
                    </motion.button>
                  </div>
                </div>

                {/* Content */}
                <CardHeader className="pb-4">
                  <div>
                    <CardTitle className={`text-2xl font-bold mb-2 ${dua.textColor}`}>
                      {language === "en" ? dua.title_en : dua.title_ur}
                    </CardTitle>
                    <p className={`text-sm font-semibold ${dua.textColor}/70`}>
                      {language === "en" ? dua.time_en : dua.time_ur}
                    </p>
                  </div>
                </CardHeader>

                <CardContent className="space-y-5">
                  {/* Arabic */}
                  <div
                    className={`p-5 bg-white/40 backdrop-blur-sm rounded-2xl border-2 border-${dua.color.split("-")[1]}-200`}
                  >
                    <p className={`text-right text-2xl font-bold ${dua.textColor} dir-rtl leading-relaxed`}>
                      {dua.arabic}
                    </p>
                    <p className={`text-sm ${dua.textColor}/70 mt-3 text-center font-semibold`}>
                      {language === "en" ? dua.english : dua.urdu}
                    </p>
                  </div>

                  {/* Translation */}
                  <div
                    className={`p-4 bg-white/50 backdrop-blur-sm rounded-xl border-l-4`}
                    style={{ borderColor: dua.color.split(" to-")[0].replace("from-", "") }}
                  >
                    <p className={`text-xs font-bold ${dua.textColor}/70 mb-2 uppercase tracking-wider`}>
                      {language === "en" ? "Translation" : "ترجمہ"}
                    </p>
                    <p className={`text-sm leading-relaxed ${dua.textColor}/80`}>{dua.translation_en}</p>
                  </div>

                  {/* Benefit */}
                  <div
                    className={`p-4 bg-gradient-to-r ${dua.color}/15 rounded-xl border border-${dua.color.split("-")[1]}-300`}
                  >
                    <p
                      className={`text-xs font-bold ${dua.textColor} mb-2 uppercase tracking-wider flex items-center gap-2`}
                    >
                      <Sparkles className="w-3 h-3" /> {language === "en" ? "Benefit" : "فائدہ"}
                    </p>
                    <p className={`text-sm leading-relaxed font-semibold ${dua.textColor}/90`}>
                      {language === "en" ? dua.benefit_en : dua.benefit_ur}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleCopy(dua.arabic, dua.id)}
                      className="flex-1 rounded-lg font-bold"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      {copied === dua.id ? "✓" : language === "en" ? "Copy" : "کاپی"}
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => toggleFavorite(dua.id)}
                      className={`flex-1 rounded-lg font-bold ${
                        favorites.has(dua.id)
                          ? "bg-red-500 text-white hover:bg-red-600"
                          : "bg-gray-200 text-foreground hover:bg-gray-300"
                      }`}
                    >
                      <Heart className="w-4 h-4 mr-2" />
                      {language === "en" ? "Favorite" : "پسندیدہ"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-pink-950/20 rounded-3xl p-8 md:p-16 border-2 border-primary/20"
        >
          <h3 className="text-3xl font-black text-foreground mb-8 flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-primary" />
            {language === "en" ? "Tips for Learning Duas" : "دعائیں سیکھنے کی تجاویز"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3 p-5 bg-white/40 backdrop-blur-sm rounded-2xl">
              <div className="flex gap-4">
                <span className="text-4xl">1️⃣</span>
                <div>
                  <p className="font-bold text-foreground text-lg mb-2">
                    {language === "en" ? "Recite Daily" : "روزانہ پڑھیں"}
                  </p>
                  <p className="text-foreground/70">
                    {language === "en"
                      ? "Practice each dua 3 times daily for better memorization"
                      : "ہر دعا روزانہ 3 بار پڑھیں"}
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-3 p-5 bg-white/40 backdrop-blur-sm rounded-2xl">
              <div className="flex gap-4">
                <span className="text-4xl">2️⃣</span>
                <div>
                  <p className="font-bold text-foreground text-lg mb-2">
                    {language === "en" ? "Understand Meaning" : "معنی سمجھیں"}
                  </p>
                  <p className="text-foreground/70">
                    {language === "en"
                      ? "Learn translations and benefits for deeper connection"
                      : "ترجمہ اور فوائد جانیں"}
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-3 p-5 bg-white/40 backdrop-blur-sm rounded-2xl">
              <div className="flex gap-4">
                <span className="text-4xl">3️⃣</span>
                <div>
                  <p className="font-bold text-foreground text-lg mb-2">
                    {language === "en" ? "Pure Intention" : "خالص نیت"}
                  </p>
                  <p className="text-foreground/70">
                    {language === "en" ? "Pray with sincere and focused heart" : "سچے دل سے دعا کریں"}
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-3 p-5 bg-white/40 backdrop-blur-sm rounded-2xl">
              <div className="flex gap-4">
                <span className="text-4xl">4️⃣</span>
                <div>
                  <p className="font-bold text-foreground text-lg mb-2">
                    {language === "en" ? "Share Knowledge" : "علم شیئر کریں"}
                  </p>
                  <p className="text-foreground/70">
                    {language === "en" ? "Teach others and earn rewards from Allah" : "دوسروں کو سکھائیں"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer language={language} />
    </div>
  )
}
