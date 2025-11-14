"use client"

import { motion } from "framer-motion"

interface StarAnimationProps {
  count?: number
  onComplete?: () => void
}

export default function StarAnimation({ count = 1, onComplete }: StarAnimationProps) {
  return (
    <div className="fixed inset-0 pointer-events-none flex items-center justify-center">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            opacity: 1, 
            y: 0, 
            x: 0,
            scale: 1
          }}
          animate={{ 
            opacity: 0, 
            y: -200, 
            x: Math.random() * 200 - 100,
            scale: 1.5,
            rotate: 360
          }}
          transition={{ 
            duration: 1.5, 
            delay: i * 0.1,
            ease: "easeOut"
          }}
          onAnimationComplete={i === count - 1 ? onComplete : undefined}
          className="text-5xl"
        >
          ⭐
        </motion.div>
      ))}
    </div>
  )
}
