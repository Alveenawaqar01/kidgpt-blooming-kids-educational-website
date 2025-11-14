"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface IslamicContent {
  id: string
  type: "hadith" | "dua" | "prophet" | "manners"
  title_en: string
  title_ur: string
  content_en: string
  content_ur: string
  translation?: string
  icon: string
}

const islamicContent: IslamicContent[] = [
  {
    id: "1",
    type: "hadith",
    title_en: "Kindness to Others",
    title_ur: "دوسروں کے ساتھ شفقت",
    content_en:
      'The Prophet Muhammad (Peace be upon him) said: "The best of you are those who are best to their families."',
    content_ur: 'نبی کریم صلی اللہ علیہ وسلم نے فرمایا: "تم میں سے بہتر وہ ہیں جو اپنے اہل و عیال کے لیے بہتر ہیں۔"',
    icon: "💚",
  },
  {
    id: "2",
    type: "dua",
    title_en: "Morning Dua",
    title_ur: "صبح کی دعا",
    content_en: "Alhamdulillah alaa kulli hal",
    content_ur: "الحمد اللہ على كل حال",
    translation: "All praise is due to Allah in every circumstance",
    icon: "🌅",
  },
  {
    id: "3",
    type: "prophet",
    title_en: "Prophet Muhammad",
    title_ur: "نبی محمد",
    content_en: 'Muhammad (PBUH) was known as "Al-Amin" (The Trustworthy) even before he became a prophet.',
    content_ur: 'محمد صلی اللہ علیہ وسلم کو نبوت سے پہلے "امین" کہا جاتا تھا۔',
    icon: "🕌",
  },
  {
    id: "4",
    type: "manners",
    title_en: "Respect Your Parents",
    title_ur: "اپنے والدین کا احترام کریں",
    content_en: "Allah has commanded us to be kind and respectful to our parents in the Quran and Hadith.",
    content_ur: "اللہ نے ہمیں اپنے والدین کے ساتھ نیک سلوک کا حکم دیا ہے۔",
    icon: "👨‍👩‍👧",
  },
  {
    id: "5",
    type: "dua",
    title_en: "Before Sleep",
    title_ur: "سوتے وقت کی دعا",
    content_en: "Bismillah allahumma bi-asumiak amutu wa ahya",
    content_ur: "بسم اللہ اللہم باسمك أموت وأحيا",
    translation: "In the name of Allah, O Allah, by Your name I die and live",
    icon: "😴",
  },
]

const tabs = ["Hadith", "Dua", "Prophets", "Manners"]

export default function IslamicPage() {
  const [language, setLanguage] = useState<"en" | "ur">("en")
  const [activeTab, setActiveTab] = useState("all")

  const filtered =
    activeTab === "all" ? islamicContent : islamicContent.filter((item) => item.type === activeTab.toLowerCase())

  return (
    <div className="min-h-screen bg-background">
      <Navbar language={language} setLanguage={setLanguage} />
      <main className="max-w-7xl mx-auto px-4 py-20">
        <h1 className="text-5xl font-bold text-center mb-4 text-foreground">
          {language === "en" ? "Islamic Learning" : "اسلامی سیکھ"}
        </h1>
        <p className="text-center text-foreground/70 mb-12 text-lg">
          {language === "en"
            ? "Learn about Islam through Hadith, Duas, and Prophet stories"
            : "احادیث، دعاؤں اور نبی کی کہانیوں سے اسلام سیکھیں"}
        </p>

        {/* Hadith of the Day */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <Card className="bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-primary rounded-3xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary to-accent text-white">
              <CardTitle className="text-2xl">{language === "en" ? "Hadith of the Day" : "آج کی حدیث"}</CardTitle>
            </CardHeader>
            <CardContent className="p-8 text-center space-y-4">
              <p className="text-2xl font-bold text-foreground">
                {language === "en" ? '"Cleanliness is half of faith"' : '"صفائی ایمان کا نصف ہے"'}
              </p>
              <p className="text-lg text-foreground/70">
                {language === "en" ? "- Prophet Muhammad (PBUH)" : "- نبی کریم صلی اللہ علیہ وسلم"}
              </p>
              <Button className="bg-gradient-to-r from-primary to-accent text-white rounded-full py-3">
                {language === "en" ? "Learn More" : "مزید سیکھیں"}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Content Tabs */}
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {["All", "Hadith", "Dua", "Prophets", "Manners"].map((tab) => (
              <Button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`rounded-full px-6 py-3 ${
                  activeTab === tab.toLowerCase()
                    ? "bg-gradient-to-r from-primary to-accent text-white"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                {tab}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Card className="h-full bg-white border-2 border-border rounded-3xl hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="text-5xl mb-4">{item.icon}</div>
                    <CardTitle className="text-foreground">
                      {language === "en" ? item.title_en : item.title_ur}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-foreground/80 leading-relaxed">
                      {language === "en" ? item.content_en : item.content_ur}
                    </p>
                    {item.translation && <p className="text-sm text-primary/70 italic">{item.translation}</p>}
                    <Button className="w-full bg-gradient-to-r from-primary to-accent text-white rounded-full py-3">
                      {language === "en" ? "Explore" : "تلاش کریں"}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Islamic Calendar Months */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-20 mb-20">
          <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
            🌙 {language === "en" ? "Islamic Months (Hijri Calendar)" : "اسلامی مہینے (ہجری تقویم)"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { num: 1, en: "Muharram", ur: "محرم", desc: "Sacred month" },
              { num: 2, en: "Safar", ur: "صفر", desc: "Month of travel" },
              { num: 3, en: "Rabi' al-Awwal", ur: "ربیع الاول", desc: "Spring - Prophet's birth month" },
              { num: 4, en: "Rabi' al-Thani", ur: "ربیع الثانی", desc: "Spring continued" },
              { num: 5, en: "Jumada al-Awwal", ur: "جمادی الاول", desc: "First month of dryness" },
              { num: 6, en: "Jumada al-Thani", ur: "جمادی الثانی", desc: "Second month of dryness" },
              { num: 7, en: "Rajab", ur: "رجب", desc: "Month of respect" },
              { num: 8, en: "Sha'ban", ur: "شعبان", desc: "Month of preparation" },
              { num: 9, en: "Ramadan", ur: "رمضان", desc: "Holy month of fasting" },
              { num: 10, en: "Shawwal", ur: "شوال", desc: "Eid al-Fitr month" },
              { num: 11, en: "Dhu al-Qi'dah", ur: "ذوالقعدہ", desc: "Month of sitting" },
              { num: 12, en: "Dhu al-Hijjah", ur: "ذوالحجہ", desc: "Pilgrimage month" },
            ].map((month) => (
              <motion.div key={month.num} whileHover={{ y: -5 }} className="group">
                <Card className="h-full bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-950/30 dark:to-blue-950/30 border-2 border-purple-300 dark:border-purple-700 rounded-2xl overflow-hidden hover:shadow-xl transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl font-black text-purple-600 dark:text-purple-300 min-w-fit">
                        {month.num}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-foreground mb-1">{language === "en" ? month.en : month.ur}</h3>
                        <p className="text-sm text-foreground/70 mb-3">
                          {language === "en" ? month.desc : month.desc}
                        </p>
                        <motion.div className="h-2 bg-foreground/10 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                            style={{ width: `${(month.num / 12) * 100}%` }}
                          />
                        </motion.div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Daily Duas - Enhanced */}
        <div className="mt-20">
          <h2 className="text-4xl font-black text-foreground mb-10 flex items-center gap-3">
            📿 {language === "en" ? "Daily Duas (Read & Practice)" : "روزمرہ کی دعائیں (پڑھیں اور مشق کریں)"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                time: "Morning",
                time_ur: "صبح",
                dua_en: "Alhamdulillah alaa kulli hal",
                dua_ur: "الحمد اللہ على كل حال",
                meaning: "All praise is due to Allah in every circumstance",
                meaning_ur: "تمام تعریف اللہ کے لیے ہے ہر حالت میں",
              },
              {
                time: "Before Food",
                time_ur: "کھانے سے پہلے",
                dua_en: "Bismillah allahumma bi-asumiak",
                dua_ur: "بسم الله اللهم بتسميتك",
                meaning: "In the name of Allah, O Allah, by Your name",
                meaning_ur: "اللہ کے نام پر، اے اللہ",
              },
              {
                time: "School",
                time_ur: "اسکول میں",
                dua_en: "Rabbish rah li sadri wa yassir li amri",
                dua_ur: "رب شرح لی صدری و یسر لی امری",
                meaning: "O my Lord, expand my chest and ease my affairs",
                meaning_ur: "اے اللہ میرا سینہ کھول اور میرے کام آسان کر",
              },
              {
                time: "Sleep",
                time_ur: "سونے سے پہلے",
                dua_en: "Bismika allahumma amutu wa ahya",
                dua_ur: "بسمك اللهم أموت وأحيا",
                meaning: "In Your name, O Allah, I die and I live",
                meaning_ur: "تمہارے نام پر اے اللہ میں سوتا اور جاگتا ہوں",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 border-2 border-purple-200 dark:border-purple-700 rounded-3xl h-full hover:shadow-xl transition-all">
                  <CardHeader className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                    <CardTitle className="text-xl">{language === "en" ? item.time : item.time_ur}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    {/* Dua Text */}
                    <div className="bg-white/60 dark:bg-black/20 rounded-2xl p-5 border-l-4 border-purple-500">
                      <p className="text-sm font-bold text-purple-600 dark:text-purple-300 mb-2 uppercase tracking-wider">
                        {language === "en" ? "Dua" : "دعا"}
                      </p>
                      <p className="text-lg font-bold text-foreground text-center dir-rtl leading-relaxed">
                        {language === "en" ? item.dua_en : item.dua_ur}
                      </p>
                    </div>

                    {/* Meaning */}
                    <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-950/40 dark:to-purple-950/40 rounded-2xl p-5">
                      <p className="text-xs font-bold text-foreground/70 mb-2 uppercase tracking-wider">
                        {language === "en" ? "Meaning" : "مطلب"}
                      </p>
                      <p className="text-sm leading-relaxed text-foreground/90 font-semibold">
                        {language === "en" ? item.meaning : item.meaning_ur}
                      </p>
                    </div>

                    {/* Action Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-full font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      ✨ {language === "en" ? "Read Dua" : "دعا پڑھیں"}
                    </motion.button>
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
