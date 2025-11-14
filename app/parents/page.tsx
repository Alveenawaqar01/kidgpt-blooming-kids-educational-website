"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Target, Award, Activity } from 'lucide-react'

interface ChildProfile {
  id: string
  name: string
  age: number
  level: "beginner" | "intermediate" | "advanced"
  totalStars: number
  favoriteActivity: string
}

interface ActivityData {
  date: string
  games: number
  stories: number
  worksheets: number
  art: number
}

const childProfiles: ChildProfile[] = [
  {
    id: "1",
    name: "Ali",
    age: 7,
    level: "intermediate",
    totalStars: 45,
    favoriteActivity: "Games",
  },
  {
    id: "2",
    name: "Fatima",
    age: 9,
    level: "advanced",
    totalStars: 62,
    favoriteActivity: "Stories",
  },
]

const activityData: ActivityData[] = [
  { date: "Mon", games: 5, stories: 2, worksheets: 3, art: 1 },
  { date: "Tue", games: 3, stories: 4, worksheets: 2, art: 2 },
  { date: "Wed", games: 4, stories: 3, worksheets: 4, art: 3 },
  { date: "Thu", games: 6, stories: 2, worksheets: 2, art: 1 },
  { date: "Fri", games: 7, stories: 5, worksheets: 3, art: 4 },
]

const subjectProgress = [
  { name: "English", value: 75 },
  { name: "Math", value: 68 },
  { name: "Urdu", value: 82 },
  { name: "Islamic", value: 70 },
]

const COLORS = ["#a78bfa", "#fb923c", "#34d399", "#f87171"]

export default function ParentsDashboard() {
  const [language, setLanguage] = useState<"en" | "ur">("en")
  const [selectedChild, setSelectedChild] = useState("1")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState(false)

  const handlePasswordSubmit = () => {
    if (password === "1234") {
      setIsAuthenticated(true)
      setPasswordError(false)
    } else {
      setPasswordError(true)
      setPassword("")
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Navbar language={language} setLanguage={setLanguage} />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md p-8"
        >
          <Card className="bg-white border-0 rounded-3xl shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-primary to-accent text-white text-center py-12">
              <div className="text-6xl mb-4">🔒</div>
              <CardTitle className="text-3xl">
                {language === "en" ? "Parent Dashboard" : "والدین کا ڈیش بورڈ"}
              </CardTitle>
              <p className="text-white/80 mt-3 text-sm">
                {language === "en" ? "Enter password to continue" : "جاری رکھنے کے لیے پاس ورڈ درج کریں"}
              </p>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-foreground mb-3">
                    {language === "en" ? "Password" : "پاس ورڈ"}
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      setPasswordError(false)
                    }}
                    onKeyPress={(e) => e.key === "Enter" && handlePasswordSubmit()}
                    placeholder="••••"
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all text-lg tracking-widest font-bold ${
                      passwordError ? "border-red-500 bg-red-50" : "border-primary/30 focus:border-primary"
                    }`}
                  />
                  {passwordError && (
                    <p className="text-red-500 text-sm mt-2 font-bold">
                      {language === "en" ? "Incorrect password" : "غلط پاس ورڈ"}
                    </p>
                  )}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePasswordSubmit}
                  className="w-full bg-gradient-to-r from-primary to-accent text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all"
                >
                  {language === "en" ? "Unlock Dashboard" : "ڈیش بورڈ کھولیں"}
                </motion.button>
                <p className="text-center text-sm text-foreground/70">
                  {language === "en" ? "Default password: 1234" : "ڈیفالٹ پاس ورڈ: 1234"}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  const child = childProfiles.find((c) => c.id === selectedChild)

  return (
    <div className="min-h-screen bg-background">
      <Navbar language={language} setLanguage={setLanguage} />
      <main className="max-w-7xl mx-auto px-4 py-20">
        <h1 className="text-5xl font-bold text-center mb-4 text-foreground">
          {language === "en" ? "Parent Dashboard" : "والدین کا ڈیش بورڈ"}
        </h1>
        <p className="text-center text-foreground/70 mb-12 text-lg">
          {language === "en"
            ? "Monitor your child's progress and achievements"
            : "اپنے بچے کی ترقی اور حصول کو مانیٹر کریں"}
        </p>

        {/* Child Selection */}
        <div className="mb-12 flex gap-4 justify-center flex-wrap">
          {childProfiles.map((profile) => (
            <motion.button
              key={profile.id}
              onClick={() => setSelectedChild(profile.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                selectedChild === profile.id
                  ? "bg-gradient-to-r from-primary to-accent text-white"
                  : "bg-white border-2 border-border text-foreground hover:border-primary"
              }`}
            >
              {profile.name} ({profile.age}y)
            </motion.button>
          ))}
        </div>

        {child && (
          <>
            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                { label: language === "en" ? "Total Stars" : "کل ستارے", value: child.totalStars, icon: "⭐" },
                {
                  label: language === "en" ? "Level" : "درجہ",
                  value: child.level.charAt(0).toUpperCase() + child.level.slice(1),
                  icon: "🎖️",
                },
                { label: language === "en" ? "Days Active" : "فعال دن", value: "12", icon: "📅" },
                { label: language === "en" ? "Current Streak" : "موجودہ سلسلہ", value: "5", icon: "🔥" },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  <Card className="bg-white border-2 border-border rounded-3xl text-center">
                    <CardContent className="p-6">
                      <div className="text-4xl mb-2">{stat.icon}</div>
                      <p className="text-foreground/70 text-sm mb-2">{stat.label}</p>
                      <p className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        {stat.value}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
              {/* Activity Chart */}
              <Card className="bg-white border-2 border-border rounded-3xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity size={20} />
                    {language === "en" ? "Weekly Activity" : "ہفتہ وار سرگرمی"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={activityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="games" stackId="a" fill="#a78bfa" />
                      <Bar dataKey="stories" stackId="a" fill="#fb923c" />
                      <Bar dataKey="worksheets" stackId="a" fill="#34d399" />
                      <Bar dataKey="art" stackId="a" fill="#f87171" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Subject Progress */}
              <Card className="bg-white border-2 border-border rounded-3xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target size={20} />
                    {language === "en" ? "Subject Progress" : "مضامین کی ترقی"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={subjectProgress}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {subjectProgress.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Recent Achievements */}
            <Card className="bg-white border-2 border-border rounded-3xl mb-12">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10">
                <CardTitle className="flex items-center gap-2">
                  <Award size={20} />
                  {language === "en" ? "Recent Achievements" : "حالیہ حصول"}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { badge: "Game Master", description: "Played 10 games", date: "2 days ago" },
                    { badge: "Story Lover", description: "Read 5 stories", date: "1 week ago" },
                    { badge: "Math Wizard", description: "Scored 100% in Math", date: "3 days ago" },
                  ].map((achievement, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl text-center"
                    >
                      <div className="text-4xl mb-2">🏆</div>
                      <h4 className="font-bold text-foreground mb-1">{achievement.badge}</h4>
                      <p className="text-sm text-foreground/70 mb-2">{achievement.description}</p>
                      <p className="text-xs text-foreground/50">{achievement.date}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Settings */}
            <Card className="bg-white border-2 border-border rounded-3xl">
              <CardHeader>
                <CardTitle>{language === "en" ? "Parent Controls" : "والدین کنٹرول"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted rounded-2xl">
                  <div>
                    <p className="font-semibold text-foreground">
                      {language === "en" ? "Screen Time Limit" : "اسکرین ٹائم کی حد"}
                    </p>
                    <p className="text-sm text-foreground/70">
                      {language === "en" ? "Set daily limit to 1 hour" : "روزانہ 1 گھنٹے کی حد"}
                    </p>
                  </div>
                  <Button className="bg-primary text-white rounded-full px-6">
                    {language === "en" ? "Edit" : "ترمیم کریں"}
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 bg-muted rounded-2xl">
                  <div>
                    <p className="font-semibold text-foreground">
                      {language === "en" ? "Content Filter" : "مواد کی فلٹرنگ"}
                    </p>
                    <p className="text-sm text-foreground/70">
                      {language === "en" ? "Safe mode enabled" : "محفوظ موڈ فعال"}
                    </p>
                  </div>
                  <div className="w-12 h-6 bg-gradient-to-r from-primary to-accent rounded-full" />
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </main>
      <Footer language={language} />
    </div>
  )
}
