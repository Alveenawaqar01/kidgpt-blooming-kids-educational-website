"use client"

import { useState } from "react"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Gamepad2, BookOpen, PenTool, Brain, Puzzle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import StarAnimation from "@/components/star-animation"

export default function Home() {
  const [language, setLanguage] = useState<"en" | "ur">("en")
  const [showStarAnimation, setShowStarAnimation] = useState(false)

  const content = {
    en: {
      welcome: "Welcome to Blomming kids",
      subtitle: "Learn, Play, and Grow with Fun!",
      description: "A safe AI-powered learning platform designed for kids aged 5-12",
      stats: {
        kids: "50,000+",
        kidsLabel: "Kids Learning",
        games: "15+",
        gamesLabel: "Games",
        content: "200+",
        contentLabel: "Content Items",
        countries: "25+",
        countriesLabel: "Countries",
      },
      sections: [
        {
          title: "Games",
          description: "Play 15+ interactive educational games and earn stars!",
          icon: Gamepad2,
          color: "from-blue-400 to-blue-600",
          link: "/games",
          emoji: "🎮",
        },
        {
          title: "Duas",
          description: "Learn beautiful Islamic duas with audio and translations",
          icon: BookOpen,
          color: "from-emerald-400 to-emerald-600",
          link: "/duas",
          emoji: "📖",
        },
        {
          title: "Stories",
          description: "Read engaging moral and Islamic stories for kids",
          icon: PenTool,
          color: "from-rose-400 to-rose-600",
          link: "/stories",
          emoji: "📚",
        },
        {
          title: "Worksheets",
          description: "Download printable educational worksheets",
          icon: PenTool,
          color: "from-amber-400 to-amber-600",
          link: "/worksheets",
          emoji: "📝",
        },
        {
          title: "Quiz Master",
          description: "Test your knowledge with fun interactive quizzes",
          icon: Brain,
          color: "from-purple-400 to-purple-600",
          link: "/quiz",
          emoji: "🧠",
        },
        {
          title: "Puzzles",
          description: "Solve jigsaw and logic puzzles while having fun",
          icon: Puzzle,
          color: "from-cyan-400 to-cyan-600",
          link: "/puzzles",
          emoji: "🧩",
        },
      ],
    },
    ur: {
      welcome: "KidGPT میں خوش آمدید",
      subtitle: "سیکھیں، کھیلیں، اور مزے سے بڑھیں!",
      description: "5-12 سال کے بچوں کے لیے ڈیزائن کیا گیا محفوظ AI سیکھنے والا پلیٹ فارم",
      stats: {
        kids: "50,000+",
        kidsLabel: "بچے سیکھ رہے ہیں",
        games: "15+",
        gamesLabel: "گیمز",
        content: "200+",
        contentLabel: "مواد کی چیزیں",
        countries: "25+",
        countriesLabel: "ممالک",
      },
      sections: [
        {
          title: "گیمز",
          description: "12+ انٹراکٹو تعلیمی گیمز کھیلیں اور ستارے حاصل کریں!",
          icon: Gamepad2,
          color: "from-blue-400 to-blue-600",
          link: "/games",
          emoji: "🎮",
        },
        {
          title: "دعائیں",
          description: "صوت اور ترجمہ کے ساتھ خوبصورت اسلامی دعائیں سیکھیں",
          icon: BookOpen,
          color: "from-emerald-400 to-emerald-600",
          link: "/duas",
          emoji: "📖",
        },
        {
          title: "کہانیاں",
          description: "بچوں کے لیے دلچسپ اخلاقی اور اسلامی کہانیاں پڑھیں",
          icon: PenTool,
          color: "from-rose-400 to-rose-600",
          link: "/stories",
          emoji: "📚",
        },
        {
          title: "ورک شیٹس",
          description: "قابل طباعت تعلیمی ورک شیٹس ڈاؤن لوڈ کریں",
          icon: PenTool,
          color: "from-amber-400 to-amber-600",
          link: "/worksheets",
          emoji: "📝",
        },
        {
          title: "کوئز ماسٹر",
          description: "مزے دار انٹراکٹو کوئزز کے ساتھ اپنی معلومات آزمائیں",
          icon: Brain,
          color: "from-purple-400 to-purple-600",
          link: "/quiz",
          emoji: "🧠",
        },
        {
          title: "پزل",
          description: "مزے سے جیگسا اور منطقی پزل حل کریں",
          icon: Puzzle,
          color: "from-cyan-400 to-cyan-600",
          link: "/puzzles",
          emoji: "🧩",
        },
      ],
    },
  }

  const current = language === "en" ? content.en : content.ur

  const handleStartClick = () => {
    setShowStarAnimation(true)
    setTimeout(() => setShowStarAnimation(false), 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900">
      <Navbar language={language} setLanguage={setLanguage} />

      <main className="pt-20">
        {/* Hero Section with AI Image */}
        <section className="px-4 py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
          </div>

          <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block mb-4 px-6 py-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full">
                <span className="text-white font-bold text-sm">🌟 Welcome to Learning Fun!</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">
                {current.welcome}
              </h1>

              <p className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">{current.subtitle}</p>

              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-xl">{current.description}</p>

              <div className="flex gap-4 flex-wrap">
                <Link href="/games">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:shadow-lg hover:scale-105 transition-all"
                    onClick={handleStartClick}
                  >
                    <Gamepad2 className="w-5 h-5 mr-2" />
                    Start Playing
                  </Button>
                </Link>
                <Link href="/quiz">
                  <Button size="lg" variant="outline">
                    <Brain className="w-5 h-5 mr-2" />
                    Take Quiz
                  </Button>
                </Link>
              </div>
              {showStarAnimation && <StarAnimation />}
            </div>

            <div className="hidden lg:block relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 rounded-3xl blur-2xl opacity-20"></div>
              <img
                src="/happy-kids-learning-with-ai-technology-colorful-ca.jpg"
                alt="Kids Learning"
                className="relative w-full h-auto rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="px-4 py-16 max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: current.stats.kids, label: current.stats.kidsLabel },
              { number: current.stats.games, label: current.stats.gamesLabel },
              { number: current.stats.content, label: current.stats.contentLabel },
              { number: current.stats.countries, label: current.stats.countriesLabel },
            ].map((stat, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700 text-center hover:shadow-xl transition-all"
              >
                <div className="text-3xl md:text-4xl font-black text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text mb-2">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base font-semibold text-gray-600 dark:text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Features Grid */}
        <section className="px-4 py-20 max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-16 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            Choose Your Adventure
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {current.sections.map((section, index) => {
              const IconComponent = section.icon
              return (
                <Link key={index} href={section.link}>
                  <div className="group h-full p-8 rounded-3xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border border-gray-100 dark:border-gray-700 overflow-hidden relative">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${section.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    ></div>

                    <div className="relative z-10">
                      <div className="text-6xl mb-4 transform group-hover:scale-125 transition-transform duration-300">
                        {section.emoji}
                      </div>

                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{section.title}</h3>

                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{section.description}</p>

                      <div className="flex items-center text-blue-600 dark:text-blue-400 font-bold group-hover:translate-x-2 transition-transform">
                        Explore <span className="ml-2">→</span>
                      </div>
                    </div>

                    <div
                      className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${section.color} opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-300`}
                    ></div>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* Kids Learning Data Section */}
        <section className="px-4 py-20 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,.1)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.1)_50%,rgba(255,255,255,.1)_75%,transparent_75%,transparent)] bg-[length:40px_40px]"></div>
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            <h2 className="text-4xl md:text-5xl font-black text-center mb-16">
              {language === "en" ? "Why KidGPT?" : "KidGPT کیوں؟"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all">
                <div className="text-5xl mb-4">🧠</div>
                <h3 className="text-2xl font-bold mb-3">{language === "en" ? "Brain Development" : "دماغ کی ترقی"}</h3>
                <p className="text-white/90">
                  {language === "en"
                    ? "Interactive games and quizzes enhance cognitive skills, memory, and problem-solving abilities."
                    : "انٹراکٹو گیمز اور کوئزز شناختی مہارت، یادداشت، اور مسئلے حل کرنے کی صلاحیتوں کو بہتر بناتے ہیں۔"}
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all">
                <div className="text-5xl mb-4">🛡️</div>
                <h3 className="text-2xl font-bold mb-3">{language === "en" ? "Safe Learning" : "محفوظ سیکھنا"}</h3>
                <p className="text-white/90">
                  {language === "en"
                    ? "100% child-safe platform with no ads, no personal data collection, and parental controls."
                    : "100% بچوں کے لیے محفوظ پلیٹ فارم کوئی اشتہارات، ذاتی ڈیٹا جمع نہیں، اور والدین کے کنٹرول کے ساتھ۔"}
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all">
                <div className="text-5xl mb-4">📚</div>
                <h3 className="text-2xl font-bold mb-3">{language === "en" ? "Rich Content" : "بھرپور مواد"}</h3>
                <p className="text-white/90">
                  {language === "en"
                    ? "200+ curated educational items including games, stories, duas, and worksheets."
                    : "200+ منتخب تعلیمی چیزیں جن میں گیمز، کہانیاں، دعائیں، اور ورک شیٹس شامل ہیں۔"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Learning Progress Example */}
        <section className="px-4 py-20 max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-16 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            {language === "en" ? "Track Progress" : "ترقی کو ٹریک کریں"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                {language === "en" ? "Weekly Activity" : "ہفتہ وار سرگرمی"}
              </h3>
              <div className="space-y-4">
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-24 text-sm font-semibold text-gray-600 dark:text-gray-300">{day}</div>
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full"
                        style={{ width: `${Math.random() * 100}%` }}
                      ></div>
                    </div>
                    <div className="w-12 text-right text-sm font-bold text-purple-600 dark:text-purple-400">
                      {Math.floor(Math.random() * 100)}%
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-emerald-900/20 dark:to-cyan-900/20 border border-emerald-200 dark:border-emerald-800">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                {language === "en" ? "Achievements" : "کامیابیاں"}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    emoji: "🏆",
                    label: language === "en" ? "Quiz Master" : "کوئز ماسٹر",
                    color: "from-yellow-400 to-yellow-600",
                  },
                  {
                    emoji: "🎮",
                    label: language === "en" ? "Game Expert" : "گیم ماہر",
                    color: "from-blue-400 to-blue-600",
                  },
                  {
                    emoji: "📚",
                    label: language === "en" ? "Story Lover" : "کہانی سے عاشق",
                    color: "from-rose-400 to-rose-600",
                  },
                  {
                    emoji: "⭐",
                    label: language === "en" ? "All Star" : "تمام سیارے",
                    color: "from-purple-400 to-purple-600",
                  },
                ].map((achievement, i) => (
                  <div
                    key={i}
                    className={`p-4 rounded-xl bg-gradient-to-br ${achievement.color} text-white text-center font-bold`}
                  >
                    <div className="text-3xl mb-2">{achievement.emoji}</div>
                    <div className="text-sm">{achievement.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer language={language} />
    </div>
  )
}
