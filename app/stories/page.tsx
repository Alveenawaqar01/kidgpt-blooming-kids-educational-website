"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Play, Pause, Star, BookOpen } from 'lucide-react'

interface Story {
  id: string
  title_en: string
  title_ur: string
  content_en: string
  content_ur: string
  moral_en: string
  moral_ur: string
  icon: string
  topic: string
  category: string
  image: string
}

const stories: Story[] = [
  {
    id: "1",
    title_en: "The Honest Boy",
    title_ur: "ایمانداری والا لڑکا",
    content_en:
      "A young boy named Ahmed was walking home from school when he found a beautiful leather wallet full of money on the road. He felt excited for a moment, but then he remembered his mother's words about honesty. Despite being poor, Ahmed decided to find the owner. He opened the wallet and found the owner's address. Ahmed walked to the house and knocked on the door. When an elderly man opened the door, Ahmed explained everything. The man was so grateful that he not only praised Ahmed's honesty but also offered him a job at his shop. Ahmed learned that honesty brings more rewards than any amount of money ever could.",
    content_ur:
      "احمد نام کا ایک لڑکا اسکول سے گھر جاتے ہوئے راستے میں ایک خوبصورت بٹوہ پایا جو رقوم سے بھرا ہوا تھا۔ پہلے تو وہ خوشی ہوا لیکن اس نے اپنی ماں کی ایمانداری کی باتوں کو یاد کیا۔ اپنی غریبی کے باوجود احمد نے مالک کو تلاش کرنے کا فیصلہ کیا۔ اس نے بٹوے میں سے پتہ لگایا اور اس کے گھر گیا۔ جب ایک بزرگ شخص نے دروازہ کھولا تو احمد نے سب کچھ بتایا۔ وہ شخص اتنا شکر گزار تھا کہ اس نے نہ صرف احمد کی تعریف کی بلکہ اسے اپنی دکان پر کام کا موقع دیا۔",
    moral_en:
      "Honesty is always rewarded and brings peace to the heart. True wealth comes from integrity, not from money.",
    moral_ur: "ایمانداری ہمیشہ انعام پاتی ہے اور دل کو سکون دیتی ہے۔ سچی دولت ایمانداری سے آتی ہے۔",
    icon: "💼",
    topic: "Honesty",
    category: "Values",
    image: "honest-boy-finding-wallet-cartoon",
  },
  {
    id: "2",
    title_en: "The Kind Heart",
    title_ur: "شفقت والا دل",
    content_en:
      "Fatima was a girl who always shared her lunch with a hungry friend named Zainab. Every day, even when her own lunch was small, Fatima would give half of it to Zainab. The other children at school noticed this beautiful act of kindness. Inspired by Fatima, they started bringing extra food and sharing with others who didn't have enough. Soon, the entire school became a place where kindness was the rule, not the exception. The principal noticed this positive change and organized a special assembly to celebrate Fatima's kindness. But Fatima realized that it wasn't just her alone - when one person shows kindness, others follow. By the end of the year, there was a food-sharing program where everyone participated. Fatima learned that small acts of kindness create big ripples of change.",
    content_ur:
      "فاطمہ ایک لڑکی تھی جو ہمیشہ اپنا کھانا ایک بھوکے دوست زینب کے ساتھ بانٹتی تھی۔ ہر روز اپنے کھانے کو نصف کرتے ہوئے زینب کو دیتی۔ دوسرے بچوں نے اس شفقت کو دیکھا اور وہ بھی دوسروں کی مدد کرنے لگے۔ جلد ہی پورا سکول مدد اور شفقت کا مرکز بن گیا۔ اسکول کے اصول نے اس خوبصورت تبدیلی کا اعلان کیا۔ فاطمہ کو سمجھ آ گیا کہ ایک چھوٹی سی شفقت کتنی بڑی تبدیلی لا سکتی ہے۔",
    moral_en:
      "Kindness spreads like wildfire and touches many hearts. When you show compassion, others will follow your example.",
    moral_ur: "شفقت پھیل جاتی ہے اور بہت سے دلوں کو چھوتی ہے۔ جب آپ شفقت دکھاتے ہو تو دوسرے بھی اتباع کرتے ہیں۔",
    icon: "❤️",
    topic: "Kindness",
    category: "Emotions",
    image: "girl-sharing-lunch-kindness-cartoon",
  },
  {
    id: "3",
    title_en: "Patience and Success",
    title_ur: "صبر اور کامیابی",
    content_en:
      "There was a boy named Ali who loved drawing but was never good at it. His paintings were messy, and other kids would laugh at his artwork. Ali felt like giving up many times. But his grandmother told him, 'Great artists are made, not born. Every master was once a beginner who didn't give up.' Inspired by these words, Ali practiced drawing every single day. He filled notebooks with sketches. He practiced shading, perspective, and different styles. For six months, nobody noticed much change. But Ali didn't stop. He attended online classes, watched tutorials, and kept practicing. After a year, something magical happened - people started asking him to draw for them. His patience and determination had transformed him into a skilled artist. Ali realized that success isn't about being perfect from the start; it's about being willing to fail, learn, and try again and again until you achieve your dream.",
    content_ur:
      "علی نام کا ایک لڑکا تھا جو ڈرائنگ کا شوقین تھا لیکن اسے اچھی نہ آتی تھی۔ دوسرے بچے اس کے کام پر ہنستے تھے۔ لیکن اس کی دادی نے کہا کہ بڑے فنکار بنتے ہیں۔ علی روزانہ مشق کرتا رہا۔ چھ ماہ بعد کوئی فرق نہ دیکھا لیکن وہ ہار نہ مانا۔ آخر میں اسے لوگ اپنے لیے ڈرائنگ کے لیے کہنے لگے۔ اس کا صبر اور محنت سفل ہوا۔",
    moral_en:
      "Patience combined with hard work and dedication leads to success and pride. Never give up on your dreams.",
    moral_ur: "صبر اور محنت کامیابی کی طرف لے جاتے ہیں۔ اپنے خوابوں کو ہار نہ مانا۔",
    icon: "⏳",
    topic: "Patience",
    category: "Character",
    image: "boy-practicing-art-patience-cartoon",
  },
  {
    id: "4",
    title_en: "The Grateful Child",
    title_ur: "شکر گزار بچہ",
    content_en:
      "Hana was a child who had simple toys and simple clothes, but every day she thanked her parents for everything. She thanked them for breakfast, for school, for the roof over her head, and even for the opportunity to go to bed. At first, her parents thought it was cute, but over time they realized something profound. Their daughter's gratitude was making their home happier. They started noticing all the good things around them too. When neighbors faced difficulties, Hana's family was always there to help because they understood the value of blessings. Hana's gratitude attracted kindness and abundance into her life. Friends wanted to be around her because of her positive energy. Teachers loved teaching her because of her appreciative attitude. By practicing gratitude daily, Hana didn't get more things, but she felt richer than ever. She realized that being grateful isn't about having more; it's about appreciating what you have and this brings true happiness.",
    content_ur:
      "ہانہ ایک بچی تھی جس کے پاس سادہ کھلونے تھے لیکن ہر روز وہ اپنے والدین کا شکر کرتی۔ کھانے کا، اسکول جانے کا، اور سب کچھ کا شکر کرتی۔ اس کا شکر گزاری اس کے خاندار کو خوش رکھتا تھا۔ وقت کے ساتھ ساتھ اس کے والدین کو بھی احساس ہوا کہ زندگی میں کتنی بہتریاں ہیں۔ ہانہ کی شکر گزاری نے اس کی زندگی میں برکت اور خوشی لائی۔ دوسرے بچے اس کے ساتھ رہنا پسند کرتے تھے۔ اساتذہ اسے پڑھانا دوست کرتے تھے۔",
    moral_en:
      "Gratitude brings blessings and strengthens family bonds. True wealth is not in possessions but in appreciation.",
    moral_ur: "شکر گزاری برکت لاتی ہے اور خاندانی رشتے مضبوط کرتی ہے۔ حقیقی دولت شکرانہ میں ہے۔",
    icon: "🙏",
    topic: "Gratitude",
    category: "Emotions",
    image: "grateful-child-cartoon",
  },
  {
    id: "5",
    title_en: "The Helpful Friend",
    title_ur: "مدد گار دوست",
    content_en:
      "Omar's friend Karim was struggling with mathematics and was about to give up. Omar noticed his pain and decided to help him. Every day after school, for three months, Omar spent time teaching Karim the concepts that seemed difficult. He was patient, never got frustrated, and explained things in different ways until Karim understood. During this time, Omar sacrificed his own playtime and relaxation. But he believed that a true friend's success is their own success too. Slowly, Karim's confidence grew. His grades improved. Finally, when Karim scored an A on his final exam, both boys celebrated together. Karim was so grateful that he promised to help others who were struggling. Within a year, Omar and Karim had created a study group where older students helped younger ones. They realized that by helping others, they weren't losing anything - they were gaining wisdom, building character, and creating lasting relationships. Help given from the heart always comes back multiplied.",
    content_ur:
      "عمر کا دوست کریم ریاضی میں ناکام ہو رہا تھا۔ عمر نے اسے دیکھا اور فیصلہ کیا کہ اسے مدد دے۔ تین ماہ تک ہر روز عمر کریم کو پڑھاتا۔ وہ صبر سے سمجھاتا اور کریم کی ہر بات سمجھتا۔ عمر نے اپنے کھیل کا وقت قربان کیا۔ لیکن اسے معلوم تھا کہ دوست کی کامیابی اپنی کامیابی ہے۔ کریم کا اعتماد بڑھا۔ نتیجے میں A آیا۔ دونوں نے ایک دوسرے کو اور بھی زیادہ سمجھا۔ وہ دونوں نے ایک گروپ بنایا جہاں بڑے بچے چھوٹوں کو پڑھاتے تھے۔",
    moral_en:
      "Helping others creates a cycle of goodness and builds strong communities. True friendship means sacrificing for each other.",
    moral_ur: "دوسروں کی مدد اچھائی کا چکر بناتی ہے۔ حقیقی دوستی میں ایک دوسرے کے لیے قربانی ہے۔",
    icon: "🤝",
    topic: "Help",
    category: "Relationships",
    image: "helpful-friend-cartoon",
  },
  {
    id: "6",
    title_en: "The Brave Heart",
    title_ur: "ہمت والا دل",
    content_en:
      "Layla was a shy girl who was terrified of speaking in front of people. She would tremble and forget her words. During class, she would never raise her hand even when she knew the answer. Her teacher noticed this and encouraged her to participate in the class presentation. Layla wanted to refuse, but something inside her wanted to face her fear. She spent two weeks preparing her speech carefully. She practiced in front of the mirror. She spoke to her family. Each time, her confidence grew a little bit. The day of the presentation came. Layla's heart was pounding as she walked to the front of the class. But then she took a deep breath, remembered all her practice, and started speaking. Her voice shook at first, but as she continued, she became more confident. By the end, her speech was the best in the class. Everyone applauded her. But more importantly, Layla discovered that she was braver than she thought. She realized that courage isn't the absence of fear; it's doing things despite being afraid. After that day, Layla participated more in class and became the confident leader of her group.",
    content_ur:
      "لیلیٰ ایک شرمیلی لڑکی تھی جو کلاس میں بولنے سے ڈرتی تھی۔ اس کی آواز کانپتی تھی۔ اس کا استاد اسے پریزنٹیشن میں حصہ لینے کی ترغیب دیتے ہیں۔ لیلیٰ نے اپنا خوف ختم کرنے کا فیصلہ کیا۔ دو ہفتے تک مشق کرتی رہی۔ جب پریزنٹیشن کا دن آیا تو وہ خوفزدہ تھی لیکن جاری رکھی۔ اس کی تقریر بہترین تھی اور سب نے تالیاں بجائی۔ لیلیٰ نے سمجھا کہ ہمت خوف نہ ہونا نہیں بلکہ خوف میں بھی ہمت کرنا ہے۔",
    moral_en:
      "Courage grows when we face our fears step by step. Being brave doesn't mean you're not scared; it means you act despite your fear.",
    moral_ur:
      "ہمت بڑھتی ہے جب ہم اپنے ڈر کا سامنا کریں۔ ہمت مند ہونے کا مطلب خوف نہ ہونا نہیں بلکہ خوف میں بھی ہمت کرنا ہے۔",
    icon: "💪",
    topic: "Courage",
    category: "Character",
    image: "brave-heart-cartoon",
  },
  {
    id: "7",
    title_en: "The Forgiving Child",
    title_ur: "معاف کرنے والا بچہ",
    content_en:
      "Noor had a favorite toy that was given to her by her grandmother. One day, her best friend Maryam accidentally broke it while playing. Maryam felt terrible and started crying. She immediately apologized and offered to pay for a new one with her allowance. Noor felt angry and hurt at first. She wanted to refuse the friendship and stay upset. But then she remembered the Islamic teaching about forgiveness. She thought about how she herself made mistakes and hoped people would forgive her. With a deep breath and a kind heart, Noor hugged Maryam and said, 'I forgive you. You didn't mean to break it, and you feel sorry. That's enough for me.' Maryam was amazed at Noor's forgiveness. Instead of losing a friend, Noor's forgiveness actually strengthened their friendship. They started being even more careful together. More importantly, Maryam became inspired by Noor's kindness. She too became more forgiving to others. Noor realized that forgiveness isn't about forgetting the hurt; it's about releasing the burden of anger and giving another person a chance to do better.",
    content_ur:
      "نور کے پاس ایک کھلونا تھا جو اس کی دادی نے دیا تھا۔ ایک دن اس کی سب سے اچھی دوست مریم نے اسے غلطی سے توڑ دیا۔ مریم کو بہت افسوس ہوا اور رونے لگی۔ اس نے اپنی رقوم سے نیا کھلونا دینے کی پیشکش کی۔ نور غصہ میں تھی لیکن پھر معاف کرنے کی اسلامی تعلیم کو یاد کیا۔ اس نے سوچا کہ وہ بھی غلطیاں کرتی ہے۔ نور نے مریم کو معاف کر دیا۔ مریم بہت خوش ہوئی۔ ان کی دوستی اور بھی مضبوط ہو گئی۔ نور نے سمجھا کہ معافی برائی کو بھولنا نہیں بلکہ غصہ سے آزادی پانا ہے۔",
    moral_en:
      "Forgiveness heals hearts and strengthens relationships. When you forgive, you free yourself from the burden of anger.",
    moral_ur: "معافی دل کو ٹھیک کرتی ہے اور رشتوں کو مضبوط بناتی ہے۔ معافی دینے سے آپ خود کو آزاد کرتے ہیں۔",
    icon: "🕊️",
    topic: "Forgiveness",
    category: "Character",
    image: "forgiving-child-cartoon",
  },
  {
    id: "8",
    title_en: "The Humble Winner",
    title_ur: "فروتن فاضل",
    content_en:
      "Aisha had worked very hard for a science competition. She stayed up late studying, did numerous experiments, and prepared thoroughly. When the day came and she won the first prize, she was extremely happy. But instead of going around telling everyone about her achievement, she did something unexpected. At the awards ceremony, when it was her turn to speak, Aisha thanked her teacher for guiding her, her parents for supporting her, and even her competitors for pushing her to do her best. She said, 'This prize is not mine alone. Many people helped me reach here.' The audience was moved by her humility. Even her competitors felt inspired rather than defeated. The next year, more students wanted to join the competition because they saw that it wasn't just about winning - it was about growth and appreciation. Aisha's coach later told her, 'I've seen many winners in my life, but very few with your kind of humility. That's what makes you a true champion.' Aisha learned that true success isn't measured by trophies but by the character you build and the people you inspire along the way.",
    content_ur:
      "عائشہ نے ایک سائنس کے مقابلے کے لیے بہت محنت کی۔ وہ دیر رات تک پڑھتی، تجربات کرتی اور تیاری کرتی۔ جب اسے پہلا انعام ملا تو بہت خوش ہوئی۔ لیکن اس نے سب کو بتانے کے بجائے ایک اور کام کیا۔ انعام کی تقریب میں جب اس کی بات ہوئی تو اس نے اپنے استاد کا شکریہ کیا، اپنے والدین کا، اور اپنے حریفوں کا بھی۔ اس نے کہا کہ یہ انعام صرف میرا نہیں ہے۔ سب لوگوں نے مدد دی۔ سب کو عائشہ کی فروتنی پسند آئی۔ عائشہ نے سمجھا کہ حقیقی کامیابی تھیلیاں نہیں بلکہ کردار میں ہے۔",
    moral_en:
      "Humility is more valuable than any award or achievement. True champions inspire others through their character and kindness.",
    moral_ur: "فروتنی کسی بھی انعام سے بہتر ہے۔ حقیقی چیمپین دوسروں کو اپنے کردار سے متاثر کرتے ہیں۔",
    icon: "👑",
    topic: "Humility",
    category: "Character",
    image: "humble-winner-cartoon",
  },
]

export default function StoriesPage() {
  const [language, setLanguage] = useState<"en" | "ur">("en")
  const [selectedStory, setSelectedStory] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const story = stories.find((s) => s.id === selectedStory)

  if (selectedStory && story) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar language={language} setLanguage={setLanguage} />
        <main className="max-w-4xl mx-auto px-4 py-20">
          <motion.button
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedStory(null)}
            className="mb-8 px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-full hover:shadow-lg transition-all font-bold flex items-center gap-2"
          >
            ← {language === "en" ? "Back to Stories" : "کہانیوں کے پاس واپس"}
          </motion.button>

          <Card className="bg-white border-0 rounded-3xl overflow-hidden shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 p-8 md:p-12">
              <div className="text-7xl mb-6">{story.icon}</div>
              <CardTitle className="text-4xl md:text-5xl text-foreground mb-4">
                {language === "en" ? story.title_en : story.title_ur}
              </CardTitle>
              <div className="flex gap-3 flex-wrap">
                <span className="inline-block bg-gradient-to-r from-primary to-accent text-white px-4 py-2 rounded-full text-sm font-bold">
                  {story.topic}
                </span>
                <span className="inline-block bg-muted text-foreground px-4 py-2 rounded-full text-sm font-semibold">
                  {story.category}
                </span>
              </div>
            </CardHeader>
            <CardContent className="p-8 md:p-12 space-y-10">
              {/* Story Content */}
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-foreground flex items-center gap-3">
                  <BookOpen className="w-8 h-8 text-primary" />
                  {language === "en" ? "📖 Story" : "📖 کہانی"}
                </h3>
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-2xl p-8 border border-primary/20">
                  <p className="text-lg text-foreground/90 leading-relaxed line-height-8">
                    {language === "en" ? story.content_en : story.content_ur}
                  </p>
                </div>
              </div>

              {/* Moral */}
              <div className="space-y-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-2xl p-8 border-2 border-green-200 dark:border-green-800">
                <h3 className="text-3xl font-bold text-green-900 dark:text-green-300 flex items-center gap-3">
                  💡 {language === "en" ? "Moral of the Story" : "کہانی کی سیکھ"}
                </h3>
                <p className="text-xl text-green-900 dark:text-green-200 font-bold leading-relaxed">
                  {language === "en" ? story.moral_en : story.moral_ur}
                </p>
              </div>

              {/* Action */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-to-r from-primary to-accent text-white py-5 text-xl rounded-full font-bold hover:shadow-xl transition-all flex items-center justify-center gap-3"
              >
                <Star className="w-6 h-6 fill-white" />
                {language === "en" ? "Earned 3 Stars!" : "3 ستارے حاصل کیے!"}
              </motion.button>
            </CardContent>
          </Card>
        </main>
        <Footer language={language} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar language={language} setLanguage={setLanguage} />
      <main className="max-w-7xl mx-auto px-4 py-20">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-primary/30 to-accent/30 rounded-full mb-6 border-2 border-primary/40 backdrop-blur-sm">
            <span className="text-primary font-bold text-sm uppercase tracking-wider">📚 8 Moral Stories</span>
          </div>
          <h1 className="text-6xl lg:text-7xl font-black text-foreground mb-6 text-balance bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            {language === "en" ? "Inspiring Stories" : "متاثر کن کہانیاں"}
          </h1>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            {language === "en"
              ? "Read and listen to 8 inspiring stories with longer, detailed content that teach values and build character"
              : "8 تفصیلی اور متاثر کن کہانیاں سنیں جو اقدار سیکھاتی ہیں"}
          </p>
        </motion.div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stories.map((s, index) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <Card
                onClick={() => setSelectedStory(s.id)}
                className="h-full bg-white border-0 rounded-3xl hover:shadow-2xl transition-all cursor-pointer overflow-hidden group"
              >
                {/* AI Generated Image */}
                <div className="relative h-56 overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
                  <img
                    src={`/.jpg?key=fmq0f&height=224&width=400&query=${s.image} children book illustration cartoon style professional`}
                    alt={s.title_en}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
                </div>

                <CardHeader className="pb-3">
                  <CardTitle className="text-2xl text-foreground">
                    {language === "en" ? s.title_en : s.title_ur}
                  </CardTitle>
                  <CardDescription className="text-foreground/70 mt-3 line-clamp-3 leading-relaxed">
                    {language === "en" ? s.content_en.slice(0, 150) + "..." : s.content_ur.slice(0, 150) + "..."}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <span className="bg-gradient-to-r from-primary to-accent text-white px-3 py-1 rounded-full text-xs font-bold">
                        {s.topic}
                      </span>
                      <span className="bg-muted text-foreground px-3 py-1 rounded-full text-xs font-semibold">
                        {s.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(3)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>
      <Footer language={language} />
    </div>
  )
}
