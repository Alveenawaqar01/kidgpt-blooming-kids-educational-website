"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"

export default function ParentLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isSignup, setIsSignup] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login/signup
    window.location.href = "/parents"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 flex items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-flex items-center gap-2 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-2xl">K</span>
            </div>
            <span className="font-bold text-2xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              KidGPT
            </span>
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">{isSignup ? "Create Account" : "Welcome Back!"}</h1>
          <p className="text-foreground/70">
            {isSignup ? "Join thousands of parents" : "Sign in to monitor your child's progress"}
          </p>
        </div>

        {/* Form Card */}
        <Card className="bg-white border-2 border-border rounded-3xl overflow-hidden">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground block">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 text-primary/50" size={20} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="parent@example.com"
                    className="w-full pl-12 pr-4 py-3 border-2 border-border rounded-xl focus:outline-none focus:border-primary transition"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground block">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-3.5 text-primary/50" size={20} />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-3 border-2 border-border rounded-xl focus:outline-none focus:border-primary transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-3.5 text-primary/50 hover:text-primary"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              {!isSignup && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-2 border-border" />
                    <span className="text-sm text-foreground/70">Remember me</span>
                  </label>
                  <button type="button" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-accent text-white py-3 rounded-full font-semibold hover:opacity-90 transition"
              >
                {isSignup ? "Create Account" : "Sign In"}
              </Button>
            </form>

            {/* Toggle */}
            <div className="mt-6 pt-6 border-t border-border text-center">
              <p className="text-foreground/70 mb-3">
                {isSignup ? "Already have an account?" : "Don't have an account?"}
              </p>
              <button onClick={() => setIsSignup(!isSignup)} className="text-primary font-semibold hover:underline">
                {isSignup ? "Sign In" : "Create One"}
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Footer Note */}
        <p className="text-center text-foreground/60 text-sm mt-8">
          Your child's safety and privacy are our top priority
        </p>
      </motion.div>
    </div>
  )
}
