import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Sparkles, Feather, ArrowRight, RefreshCcw } from "lucide-react";
import heroBg from "@/assets/images/hero-bg.png";

type Step = "home" | "quiz" | "results";
type AnswerValue = "A" | "B" | "C";

const QUIZ_QUESTIONS = [
  {
    id: "q1",
    question: "What do you primarily look for when choosing a new book?",
    options: [
      { value: "A", label: "A complete escape from reality", icon: Sparkles },
      { value: "B", label: "Deep philosophical meaning and complex themes", icon: Feather },
      { value: "C", label: "Practical advice and self-improvement", icon: ArrowRight },
    ],
  },
  {
    id: "q2",
    question: "How do you want to feel after finishing the last page?",
    options: [
      { value: "A", label: "Thoroughly entertained and breathless", icon: Sparkles },
      { value: "B", label: "Intellectually stimulated and slightly challenged", icon: Feather },
      { value: "C", label: "Inspired and ready to take action in my life", icon: ArrowRight },
    ],
  },
  {
    id: "q3",
    question: "Which setting appeals to you the most right now?",
    options: [
      { value: "A", label: "A magical realm or a distant, futuristic planet", icon: Sparkles },
      { value: "B", label: "A historically rich, atmospheric city with secrets", icon: Feather },
      { value: "C", label: "A modern, bustling environment focused on success", icon: ArrowRight },
    ],
  },
  {
    id: "q4",
    question: "What kind of protagonist do you prefer following?",
    options: [
      { value: "A", label: "An ordinary person thrown into an extraordinary adventure", icon: Sparkles },
      { value: "B", label: "A deeply flawed character dealing with moral ambiguity", icon: Feather },
      { value: "C", label: "A real-world successful figure sharing their journey", icon: ArrowRight },
    ],
  },
  {
    id: "q5",
    question: "What is your typical reading pace?",
    options: [
      { value: "A", label: "I binge-read in one sitting until 3 AM", icon: Sparkles },
      { value: "B", label: "I read slowly, savoring the prose and themes", icon: Feather },
      { value: "C", label: "I read a chapter a day to process and apply the lessons", icon: ArrowRight },
    ],
  },
] as const;

const RESULTS_DATA = {
  A: {
    title: "The Escapist",
    description: "You read to journey to other worlds, experience thrilling adventures, and let your imagination soar. Reality is highly overrated.",
    books: [
      {
        title: "The Night Circus",
        author: "Erin Morgenstern",
        reason: "A magical, sensory-rich experience that completely transports you to a mysterious, enchanting world.",
        coverColor: "bg-[#2A2A2A]"
      },
      {
        title: "Dune",
        author: "Frank Herbert",
        reason: "An epic, sprawling adventure across a beautifully realized desert planet with incredible world-building.",
        coverColor: "bg-[#C48C5E]"
      },
      {
        title: "The Name of the Wind",
        author: "Patrick Rothfuss",
        reason: "A brilliantly told fantasy tale of a young man growing into a legend, perfect for losing yourself in.",
        coverColor: "bg-[#4A2E1B]"
      }
    ]
  },
  B: {
    title: "The Deep Thinker",
    description: "You seek books that challenge your perspective, feature complex prose, and linger in your mind long after you've closed the cover.",
    books: [
      {
        title: "The Secret History",
        author: "Donna Tartt",
        reason: "A masterfully atmospheric, dark academia novel exploring morality and human flaws with gorgeous prose.",
        coverColor: "bg-[#1E293B]"
      },
      {
        title: "1984",
        author: "George Orwell",
        reason: "A profound, intellectually stimulating masterpiece that deeply challenges your view of society and truth.",
        coverColor: "bg-[#711E1E]"
      },
      {
        title: "Crime and Punishment",
        author: "Fyodor Dostoevsky",
        reason: "The ultimate psychological exploration of a complex, morally ambiguous character's internal struggles.",
        coverColor: "bg-[#333333]"
      }
    ]
  },
  C: {
    title: "The Motivational Seeker",
    description: "You view reading as a tool for growth. You want actionable insights, real-world wisdom, and the inspiration to become your best self.",
    books: [
      {
        title: "Atomic Habits",
        author: "James Clear",
        reason: "Provides perfectly actionable, clear strategies for daily self-improvement and behavioral change.",
        coverColor: "bg-[#EAB308]"
      },
      {
        title: "Thinking, Fast and Slow",
        author: "Daniel Kahneman",
        reason: "A deeply insightful look into how our minds work, offering practical knowledge for better decision-making.",
        coverColor: "bg-[#2563EB]"
      },
      {
        title: "Man's Search for Meaning",
        author: "Viktor E. Frankl",
        reason: "A profound true story that offers immense inspiration and a powerful perspective on finding purpose.",
        coverColor: "bg-[#15803D]"
      }
    ]
  }
};

export default function Matchmaker() {
  const [step, setStep] = useState<Step>("home");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  const [resultType, setResultType] = useState<"A" | "B" | "C" | null>(null);

  const startQuiz = () => {
    setStep("quiz");
    setCurrentQuestionIndex(0);
    setAnswers({});
  };

  const handleAnswer = (value: AnswerValue) => {
    const newAnswers = { ...answers, [QUIZ_QUESTIONS[currentQuestionIndex].id]: value };
    setAnswers(newAnswers);

    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      calculateResults(newAnswers);
    }
  };

  const calculateResults = (finalAnswers: Record<string, AnswerValue>) => {
    const counts = { A: 0, B: 0, C: 0 };
    Object.values(finalAnswers).forEach((val) => {
      counts[val]++;
    });

    let maxKey: "A" | "B" | "C" = "A";
    let maxVal = 0;
    (Object.entries(counts) as [AnswerValue, number][]).forEach(([key, val]) => {
      if (val > maxVal) {
        maxVal = val;
        maxKey = key;
      }
    });

    setResultType(maxKey);
    setStep("results");
  };

  const resetQuiz = () => {
    setStep("home");
    setResultType(null);
  };

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];

  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] z-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover mix-blend-multiply" />
      </div>
      
      <header className="w-full py-6 px-8 border-b border-border/40 backdrop-blur-sm sticky top-0 z-50 flex items-center justify-between">
        <div className="flex items-center gap-3 text-primary">
          <BookOpen className="w-6 h-6" />
          <h1 className="text-xl font-bold font-serif tracking-wide">LitMatch</h1>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
        <AnimatePresence mode="wait">
          {step === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-2xl w-full text-center space-y-8 py-12"
            >
              <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4 text-primary">
                <Feather className="w-8 h-8" />
              </div>
              <h2 className="text-5xl md:text-6xl font-bold leading-tight text-foreground">
                Discover your next <span className="italic text-primary">literary obsession.</span>
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto font-sans leading-relaxed">
                Take our curated personality assessment to reveal your unique reader archetype and uncover books tailored specifically to your soul.
              </p>
              
              <div className="pt-8">
                <Button 
                  onClick={startQuiz}
                  size="lg" 
                  className="rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  data-testid="button-start-quiz"
                >
                  Begin the Assessment
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === "quiz" && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-3xl w-full"
            >
              <div className="mb-8 flex items-center justify-between text-sm font-medium text-muted-foreground">
                <span className="tracking-widest uppercase">Question {currentQuestionIndex + 1} of {QUIZ_QUESTIONS.length}</span>
                <div className="flex gap-1.5">
                  {QUIZ_QUESTIONS.map((_, idx) => (
                    <div 
                      key={idx} 
                      className={`h-1.5 rounded-full transition-all duration-500 ${idx <= currentQuestionIndex ? "w-8 bg-primary" : "w-4 bg-primary/20"}`}
                    />
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestionIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card className="border-border/60 shadow-xl overflow-hidden bg-card/80 backdrop-blur-md">
                    <CardContent className="p-8 md:p-10">
                      <h3 className="text-3xl font-serif font-medium mb-10 text-foreground" data-testid={`text-question-${currentQuestion.id}`}>
                        {currentQuestion.question}
                      </h3>
                      
                      <div className="space-y-4">
                        {currentQuestion.options.map((option, idx) => {
                          const Icon = option.icon;
                          return (
                            <button
                              key={idx}
                              onClick={() => handleAnswer(option.value as AnswerValue)}
                              className="w-full text-left p-6 rounded-xl border border-border/50 hover:border-primary hover:bg-primary/5 group transition-all duration-300 flex items-center gap-5 hover:-translate-y-0.5"
                              data-testid={`button-answer-${currentQuestion.id}-${option.value}`}
                            >
                              <div className="w-12 h-12 rounded-full bg-secondary/50 group-hover:bg-primary text-secondary-foreground group-hover:text-primary-foreground flex items-center justify-center transition-colors">
                                <Icon className="w-5 h-5" />
                              </div>
                              <span className="text-lg font-medium group-hover:text-primary transition-colors">
                                {option.label}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}

          {step === "results" && resultType && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.2 }}
              className="max-w-5xl w-full py-10"
            >
              <div className="text-center mb-16 space-y-4">
                <p className="text-primary font-medium tracking-widest uppercase text-sm">Your Reader Archetype</p>
                <h2 className="text-5xl md:text-6xl font-bold font-serif text-foreground" data-testid="text-result-title">
                  {RESULTS_DATA[resultType].title}
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-sans">
                  {RESULTS_DATA[resultType].description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {RESULTS_DATA[resultType].books.map((book, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + idx * 0.1, duration: 0.5 }}
                  >
                    <Card className="h-full border-border/60 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                      <div className={`h-48 ${book.coverColor} relative flex items-center justify-center overflow-hidden`}>
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="relative z-10 w-32 h-40 bg-white/10 backdrop-blur-sm border border-white/20 shadow-2xl flex flex-col items-center justify-center p-4 text-center transform group-hover:scale-105 transition-transform duration-500">
                           <BookOpen className="w-8 h-8 text-white/80 mb-2" />
                           <span className="text-white/90 font-serif font-bold text-xs leading-tight">
                             {book.title}
                           </span>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <div className="mb-4">
                          <h4 className="text-xl font-bold font-serif mb-1 group-hover:text-primary transition-colors" data-testid={`text-book-title-${idx}`}>
                            {book.title}
                          </h4>
                          <p className="text-sm text-muted-foreground italic">by {book.author}</p>
                        </div>
                        <p className="text-foreground/80 text-sm leading-relaxed border-t border-border/50 pt-4">
                          <span className="font-semibold text-primary block mb-1">Why it fits you:</span>
                          {book.reason}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <div className="text-center">
                <Button 
                  variant="outline" 
                  onClick={resetQuiz}
                  className="rounded-full px-6 gap-2"
                  data-testid="button-retake-quiz"
                >
                  <RefreshCcw className="w-4 h-4" />
                  Retake Assessment
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}