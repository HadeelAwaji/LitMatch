import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Sparkles, Feather, ArrowRight, RefreshCcw, Languages, ExternalLink, ArrowLeft, Shuffle, Copy, Check, Share2, Download } from "lucide-react";
import html2canvas from "html2canvas";
import heroBg from "@/assets/images/hero-bg.png";

type Step = "home" | "quiz" | "results";
type AnswerValue = "A" | "B" | "C" | "D" | "E";
type Language = "en" | "ar";

const UI_TEXT = {
  en: {
    title: "LitMatch",
    heroTitle1: "Discover your next ",
    heroTitle2: "literary obsession.",
    heroSubtitle: "Take our curated personality assessment to reveal your unique reader archetype and uncover books tailored specifically to your soul.",
    startBtn: "Begin the Assessment",
    questionOf: (curr: number, total: number) => `Question ${curr} of ${total}`,
    yourArchetype: "Your Reader Archetype",
    whyItFits: "Why it fits you:",
    descriptionText: "Description:",
    readBook: "Read / Preview",
    retakeQuiz: "Back to Home",
    goBack: "Restart Quiz",
    backBtn: "Back",
    by: "by",
    shuffleBooks: "Shuffle Books",
    readMore: "Read more ▼",
    readLess: "Read less ▲",
    shareResult: "Share Result",
    copyLink: "Copy Link",
    shareX: "Share on X",
    shareWhatsApp: "WhatsApp",
    copied: "Copied!",
    saveResult: "Would you like to save your result?",
    yesSave: "Yes, save it",
    noThanks: "No, thanks",
    welcomeBack: "Welcome back! Your last result was",
    seeResultAgain: "See my result again",
    footerMadeWith: "Built with ❤️ by Hadeel Awaji"
  },
  ar: {
    title: "أثر",
    heroTitle1: "اكتشف ",
    heroTitle2: "شغفك الأدبي القادم.",
    heroSubtitle: "قم بإجراء تقييم الشخصية المنسق الخاص بنا للكشف عن نمط القارئ الفريد الخاص بك واكتشاف الكتب المصممة خصيصًا لروحك.",
    startBtn: "ابدأ التقييم",
    questionOf: (curr: number, total: number) => `السؤال ${curr} من ${total}`,
    yourArchetype: "نمط القارئ الخاص بك",
    whyItFits: "لماذا يناسبك:",
    descriptionText: "الوصف:",
    readBook: "اقرأ / معاينة",
    retakeQuiz: "العودة للرئيسية",
    goBack: "إعادة الاختبار",
    backBtn: "رجوع",
    by: "بقلم",
    shuffleBooks: "تغيير الكتب",
    readMore: "اقرأ المزيد ▼",
    readLess: "اقرأ أقل ▲",
    shareResult: "شارك النتيجة",
    copyLink: "نسخ الرابط",
    shareX: "شارك على X",
    shareWhatsApp: "واتساب",
    copied: "تم النسخ!",
    saveResult: "هل ترغب في حفظ نتيجتك؟",
    yesSave: "نعم، احفظها",
    noThanks: "لا، شكراً",
    welcomeBack: "مرحباً بعودتك! آخر نتيجة لك كانت",
    seeResultAgain: "شوف نتيجتك",
    footerMadeWith: "Built with ❤️ by Hadeel Awaji"
  }
};

const THEMES = {
  A: {
    bg: "bg-[#1a1008]",
    card: "bg-[#2c1e14]",
    text: "text-[#fefae0]",
    muted: "text-gray-300",
    accent: "text-[#d4af37]",
    border: "border-[#5c4d3c]",
    button: "bg-[#d4af37] text-[#1a1008] hover:bg-[#b5952f]",
    buttonOutline: "border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#1a1008]",
    placeholder: "bg-[#2c1e14]"
  },
  B: {
    bg: "bg-[#0b0c10]",
    card: "bg-[#16213e]",
    text: "text-[#e8eaf6]",
    muted: "text-gray-300",
    accent: "text-[#8a2be2]",
    border: "border-[#4a4e69]",
    button: "bg-[#8a2be2] text-white hover:bg-[#7b1fa2]",
    buttonOutline: "border-[#8a2be2] text-white hover:bg-[#8a2be2] hover:text-white",
    placeholder: "bg-[#1a1a2e]"
  },
  C: {
    bg: "bg-[#fff8e1]",
    card: "bg-white",
    text: "text-[#1a0a00]",
    muted: "text-[#5c3a00]",
    accent: "text-[#f57c00]",
    border: "border-[#ffe0b2]",
    button: "bg-[#f57c00] text-white hover:bg-[#ef6c00]",
    buttonOutline: "border-[#f57c00] text-[#f57c00] hover:bg-[#f57c00] hover:text-white",
    placeholder: "bg-[#ffcc80]"
  },
  D: {
    bg: "bg-[#fff0f5]",
    card: "bg-white",
    text: "text-[#2d1b2e]",
    muted: "text-[#6d3b6e]",
    accent: "text-[#d81b60]",
    border: "border-[#f8bbd0]",
    button: "bg-[#d81b60] text-white hover:bg-[#c2185b]",
    buttonOutline: "border-[#d81b60] text-[#d81b60] hover:bg-[#d81b60] hover:text-white",
    placeholder: "bg-[#f48fb1]"
  },
  E: {
    bg: "bg-[#efebe9]",
    card: "bg-[#d7ccc8]",
    text: "text-[#1a0f0a]",
    muted: "text-[#3e2000]",
    accent: "text-[#558b2f]",
    border: "border-[#bcaaa4]",
    button: "bg-[#558b2f] text-white hover:bg-[#33691e]",
    buttonOutline: "border-[#558b2f] text-[#558b2f] hover:bg-[#558b2f] hover:text-white",
    placeholder: "bg-[#a1887f]"
  }
};

const QUIZ_QUESTIONS = [
  {
    id: "q1",
    question: {
      en: "Why do you pick up a new book?",
      ar: "لماذا تختار قراءة كتاب جديد؟"
    },
    options: [
      { value: "A", en: "To challenge my perspective and think deeply", ar: "لتحدي وجهة نظري والتفكير بعمق" },
      { value: "B", en: "To escape reality and enter a new world", ar: "للهروب من الواقع ودخول عالم جديد" },
      { value: "C", en: "To learn something useful and improve my life", ar: "لتعلم شيء مفيد وتحسين حياتي" },
      { value: "D", en: "To feel profound emotions and romance", ar: "للشعور بمشاعر عميقة ورومانسية" },
      { value: "E", en: "I want to discover cultures and historical eras I've never experienced", ar: "أريد اكتشاف ثقافات وعصور تاريخية لم أجربها من قبل" }
    ]
  },
  {
    id: "q2",
    question: {
      en: "What makes a novel unforgettable?",
      ar: "ما الذي يجعل الرواية لا تُنسى؟"
    },
    options: [
      { value: "A", en: "A deeply complex character wrestling with real existential questions", ar: "شخصية معقدة للغاية تتصارع مع أسئلة وجودية حقيقية" },
      { value: "B", en: "A fantasy world built with such detail you believe it's real", ar: "عالم خيالي مبني بتفاصيل دقيقة تجعلك تعتقد أنه حقيقي" },
      { value: "C", en: "A true success story that makes you believe in yourself", ar: "قصة نجاح حقيقية تجعلك تؤمن بنفسك" },
      { value: "D", en: "A love story that makes you cry or smile against your will", ar: "قصة حب تجعلك تبكي أو تبتسم رغماً عنك" },
      { value: "E", en: "A vivid depiction of a place or culture that makes you feel you've visited it", ar: "تصوير حي لمكان أو ثقافة يجعلك تشعر وكأنك زرته" },
    ],
  },
  {
    id: "q3",
    question: {
      en: "How do you prefer the writing style?",
      ar: "كيف تفضل أسلوب الكتابة؟"
    },
    options: [
      { value: "A", en: "Deep and dense — requires focus and re-reading", ar: "عميق وكثيف — يتطلب التركيز وإعادة القراءة" },
      { value: "B", en: "Narrative and gripping — you can't stop reading", ar: "سردي ومشوق — لا يمكنك التوقف عن القراءة" },
      { value: "C", en: "Direct and clear — you leave with practical steps", ar: "مباشر وواضح — تخرج منه بخطوات عملية" },
      { value: "D", en: "Poetic and sensitive — it touches your emotions", ar: "شاعري وحساس — يلامس عواطفك" },
      { value: "E", en: "Rich in cultural and historical details", ar: "غني بالتفاصيل الثقافية والتاريخية" },
    ],
  },
  {
    id: "q4",
    question: {
      en: "What kind of protagonist do you connect with most?",
      ar: "ما نوع بطل القصة الذي تتواصل معه أكثر؟"
    },
    options: [
      { value: "A", en: "Someone who questions the meaning of life and rejects easy answers", ar: "شخص يتساءل عن معنى الحياة ويرفض الإجابات السهلة" },
      { value: "B", en: "An ordinary person thrown into a strange world who must adapt", ar: "شخص عادي يُلقى به في عالم غريب ويجب عليه التكيف" },
      { value: "C", en: "An ambitious person who fails, rises, and achieves their goals", ar: "شخص طموح يفشل وينهض ويحقق أهدافه" },
      { value: "D", en: "Someone who loves deeply and sacrifices for those they love", ar: "شخص يحب بعمق ويضحي من أجل من يحبهم" },
      { value: "E", en: "Someone who moves between cultures and searches for their identity", ar: "شخص يتنقل بين الثقافات ويبحث عن هويته" },
    ],
  },
  {
    id: "q5",
    question: {
      en: "How do you feel after finishing a book that truly affected you?",
      ar: "كيف تشعر بعد الانتهاء من كتاب أثر فيك حقًا؟"
    },
    options: [
      { value: "A", en: "I need days to think and absorb what I read", ar: "أحتاج لأيام للتفكير واستيعاب ما قرأته" },
      { value: "B", en: "I feel empty because the world I lived in is gone", ar: "أشعر بالفراغ لأن العالم الذي عشت فيه قد اختفى" },
      { value: "C", en: "I'm excited to immediately apply what I learned", ar: "أنا متحمس لتطبيق ما تعلمته فوراً" },
      { value: "D", en: "I feel warmth and gratitude and maybe reread some passages", ar: "أشعر بالدفء والامتنان وربما أعيد قراءة بعض المقاطع" },
      { value: "E", en: "I search for more books about the same culture or era", ar: "أبحث عن المزيد من الكتب حول نفس الثقافة أو العصر" },
    ],
  },
  {
    id: "q6",
    question: {
      en: "What do you talk about with friends after reading a book?",
      ar: "عمّا تتحدث مع أصدقائك بعد قراءة كتاب؟"
    },
    options: [
      { value: "A", en: "The big ideas and questions it raised", ar: "الأفكار الكبرى والأسئلة التي أثارها" },
      { value: "B", en: "The exciting events and twists you didn't see coming", ar: "الأحداث المثيرة والتحولات التي لم تتوقعها" },
      { value: "C", en: "The practical lessons you'll use to change your life", ar: "الدروس العملية التي ستستخدمها لتغيير حياتك" },
      { value: "D", en: "The characters and their relationships and emotions", ar: "الشخصيات وعلاقاتهم وعواطفهم" },
      { value: "E", en: "The places, history, and culture you discovered", ar: "الأماكن والتاريخ والثقافة التي اكتشفتها" },
    ],
  },
  {
    id: "q7",
    question: {
      en: "What do you completely avoid in books?",
      ar: "ما الذي تتجنبه تمامًا في الكتب؟"
    },
    options: [
      { value: "A", en: "Shallow books that leave no real impact", ar: "الكتب السطحية التي لا تترك أثراً حقيقياً" },
      { value: "B", en: "Slow books with no exciting events", ar: "الكتب البطيئة التي لا تحتوي على أحداث مثيرة" },
      { value: "C", en: "Theoretical books with no practical application", ar: "الكتب النظرية التي ليس لها تطبيق عملي" },
      { value: "D", en: "Cold books that don't move your emotions", ar: "الكتب الباردة التي لا تحرك عواطفك" },
      { value: "E", en: "Books limited to one culture with no diversity", ar: "الكتب المقتصرة على ثقافة واحدة بلا تنوع" },
    ],
  },
  {
    id: "q8",
    question: {
      en: "If you could gift a book to a friend, what would you choose?",
      ar: "إذا كان بإمكانك إهداء كتاب لصديق، ماذا ستختار؟"
    },
    options: [
      { value: "A", en: "A heavy intellectual novel that changes how they think", ar: "رواية فكرية ثقيلة تغير طريقة تفكيرهم" },
      { value: "B", en: "A sci-fi or fantasy novel that takes them to another world", ar: "رواية خيال علمي أو فانتازيا تأخذهم لعالم آخر" },
      { value: "C", en: "A self-development book that genuinely changed your life", ar: "كتاب تطوير ذات غير حياتك بصدق" },
      { value: "D", en: "A romantic novel that makes them feel warmth", ar: "رواية رومانسية تجعلهم يشعرون بالدفء" },
      { value: "E", en: "A book about the history or culture of a place they dream of visiting", ar: "كتاب عن تاريخ أو ثقافة مكان يحلمون بزيارته" },
    ],
  },
  {
    id: "q9",
    question: {
      en: "What kind of ending do you prefer?",
      ar: "ما نوع النهاية التي تفضلها؟"
    },
    options: [
      { value: "A", en: "An open ending that leaves you with more questions than answers", ar: "نهاية مفتوحة تتركك مع أسئلة أكثر من الإجابات" },
      { value: "B", en: "An unexpected shocking ending that stays with you", ar: "نهاية غير متوقعة وصادمة تبقى معك" },
      { value: "C", en: "A positive ending that fills you with hope and motivation", ar: "نهاية إيجابية تملؤك بالأمل والتحفيز" },
      { value: "D", en: "An emotional ending that touches your heart", ar: "نهاية عاطفية تلامس قلبك" },
      { value: "E", en: "A historical or realistic ending that makes you feel you lived through an era", ar: "نهاية تاريخية أو واقعية تجعلك تشعر وكأنك عشت حقبة كاملة" },
    ],
  },
  {
    id: "q10",
    question: {
      en: "How would you describe your relationship with reading in one sentence?",
      ar: "كيف تصف علاقتك بالقراءة في جملة واحدة؟"
    },
    options: [
      { value: "A", en: "Reading makes me understand the world and people more deeply", ar: "القراءة تجعلني أفهم العالم والناس بشكل أعمق" },
      { value: "B", en: "Reading is my way of escaping and recharging", ar: "القراءة هي طريقتي للهروب وإعادة شحن طاقتي" },
      { value: "C", en: "Reading is a tool I use to become a better version of myself", ar: "القراءة أداة أستخدمها لأصبح نسخة أفضل من نفسي" },
      { value: "D", en: "Reading makes me feel I am not alone", ar: "القراءة تجعلني أشعر أنني لست وحدي" },
      { value: "E", en: "Reading is traveling without a ticket to different places and times", ar: "القراءة هي السفر بدون تذكرة إلى أماكن وأزمنة مختلفة" },
    ],
  }
];

const RESULTS_DATA = {
  A: {
    title: { en: "The Deep Thinker", ar: "المفكر العميق" },
    description: {
      en: "You seek books that challenge your perspective, feature complex prose, and linger in your mind long after you close the cover.",
      ar: "تبحث عن الكتب التي تتحدى وجهة نظرك، وتتميز بنثر معقد، وتبقى في ذهنك طويلاً بعد أن تغلق الغلاف."
    },
    books: [
      {
        title: { en: "1984", ar: "١٩٨٤" },
        author: { en: "George Orwell", ar: "جورج أورويل" },
        style: { en: "Dystopian Fiction", ar: "خيال ديستوبي" },
                pages: 328,
        description: { en: "A chilling prophecy about the future. It's a gripping novel about totalitarianism and the power of truth.", ar: "نبوءة مرعبة عن المستقبل. إنها رواية مشوقة عن الشمولية وقوة الحقيقة." },
        reason: { en: "It tackles profound questions about society and truth. You will ponder its themes for days.", ar: "يعالج أسئلة عميقة حول المجتمع والحقيقة. ستتأمل في مواضيعها لأيام." },
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg",
        link: "https://archive.org/search?query=1984+George+Orwell"
      },
      {
        title: { en: "The Secret History", ar: "التاريخ السري" },
        author: { en: "Donna Tartt", ar: "دونا تارت" },
        style: { en: "Dark Academia", ar: "أكاديمية مظلمة" },
                pages: 559,
        description: { en: "An inverted detective story exploring beauty, terror, and morality. A group of eccentric students go too far.", ar: "قصة بوليسية مقلوبة تستكشف الجمال والرعب والأخلاق. مجموعة من الطلاب غريبي الأطوار يتمادون كثيراً." },
        reason: { en: "It challenges your moral compass with complex, flawed characters. Perfect for analytical readers.", ar: "تتحدى بوصلتك الأخلاقية بشخصيات معقدة ومعيبة. مثالية للقراء التحليليين." },
        coverUrl: "https://covers.openlibrary.org/b/isbn/9781400031702-L.jpg",
        link: "https://archive.org/search?query=The+Secret+History+Donna+Tartt"
      },
      {
        title: { en: "Crime and Punishment", ar: "الجريمة والعقاب" },
        author: { en: "Fyodor Dostoevsky", ar: "فيودور دوستويفسكي" },
        style: { en: "Philosophical Fiction", ar: "خيال فلسفي" },
                pages: 545,
        description: { en: "A psychological drama about a young student's moral dilemmas after a murder. It dives deep into guilt and redemption.", ar: "دراما نفسية حول المعضلات الأخلاقية لطالب شاب بعد ارتكاب جريمة قتل. تغوص بعمق في الذنب والفداء." },
        reason: { en: "Explores the deepest corners of the human psyche. It is incredibly dense and intellectually satisfying.", ar: "يستكشف أعمق زوايا النفس البشرية. كثيف للغاية ومرضٍ فكرياً." },
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780679734505-L.jpg",
        link: "https://archive.org/search?query=Crime+and+Punishment"
      },
      {
        title: { en: "The Stranger", ar: "الغريب" },
        author: { en: "Albert Camus", ar: "ألبير كامو" },
        style: { en: "Existentialist Fiction", ar: "خيال وجودي" },
                pages: 123,
        description: { en: "An exploration of existentialism and the absurdity of life through a detached narrator. A short but impactful read.", ar: "استكشاف للوجودية وعبثية الحياة من خلال راوٍ منفصل. قراءة قصيرة لكنها مؤثرة." },
        reason: { en: "Forces you to confront the inherent meaninglessness of societal norms. It will completely alter your perspective.", ar: "يجبرك على مواجهة انعدام المعنى المتأصل للأعراف المجتمعية. سيغير منظورك تماماً." },
        coverUrl: "https://m.media-amazon.com/images/I/81A+XyBv8aL.jpg",
        link: "https://archive.org/search?query=The+Stranger+Albert+Camus"
      },
      {
        title: { en: "Steppenwolf", ar: "ذئب السهوب" },
        author: { en: "Hermann Hesse", ar: "هيرمان هيسه" },
        style: { en: "Classic Literature", ar: "أدب كلاسيكي" },
                pages: 238,
        description: { en: "A mesmerizing tale of a man divided between his human and wolf-like instincts. It's a deep dive into spiritual isolation.", ar: "حكاية ساحرة لرجل منقسم بين غرائزه البشرية والذئبية. غوص عميق في العزلة الروحية." },
        reason: { en: "Resonates with those who feel alienated by modern society. Highly intellectual and deeply introspective.", ar: "يتردد صداه مع أولئك الذين يشعرون بالغربة عن المجتمع الحديث. فكري وتأملي للغاية." },
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780312278670-L.jpg",
        link: "https://archive.org/search?query=Steppenwolf+Hesse"
      },
      {
        title: { en: "The Master and Margarita", ar: "المعلم ومارجريتا" },
        author: { en: "Mikhail Bulgakov", ar: "ميخائيل بولغاكوف" },
        style: { en: "Magical Realism", ar: "واقعية سحرية" },
                pages: 384,
        description: { en: "The Devil visits atheistic Soviet Moscow. A brilliant satire and a profound exploration of good and evil.", ar: "الشيطان يزور موسكو السوفيتية الإلحادية. هجاء رائع واستكشاف عميق للخير والشر." },
        reason: { en: "Combines sharp political critique with wild imagination. Offers endless layers of meaning to uncover.", ar: "يجمع بين النقد السياسي الحاد والخيال الجامح. يقدم طبقات لا حصر لها من المعاني لاكتشافها." },
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780679760801-L.jpg",
        link: "https://archive.org/search?query=The+Master+and+Margarita"
      },
      {
        title: { en: "Season of Migration to the North", ar: "موسم الهجرة إلى الشمال" },
        author: { en: "Tayeb Salih", ar: "الطيب صالح" },
        style: { en: "Post-colonial Fiction", ar: "أدب ما بعد الاستعمار" },
                pages: 169,
        description: { en: "A classic post-colonial Arabic novel exploring East-West relations. It unravels dark secrets of identity.", ar: "رواية عربية كلاسيكية عن ما بعد الاستعمار تستكشف العلاقات بين الشرق والغرب. تكشف أسراراً مظلمة للهوية." },
        reason: { en: "Offers profound philosophical insights into cultural conflict. Its dense prose rewards careful reading.", ar: "تقدم رؤى فلسفية عميقة حول الصراع الثقافي. نثرها الكثيف يكافئ القراءة المتأنية." },
        coverUrl: "https://covers.openlibrary.org/b/isbn/9781590173029-L.jpg",
        link: "https://archive.org/search?query=Season+of+Migration+to+the+North"
      },
      {
        title: { en: "Children of the Alley", ar: "أولاد حارتنا" },
        author: { en: "Naguib Mahfouz", ar: "نجيب محفوظ" },
        style: { en: "Allegorical Novel", ar: "رواية رمزية" },
                pages: 455,
        description: { en: "An allegorical novel tracing the history of human existence and religion. It's a masterpiece of modern Arabic literature.", ar: "رواية رمزية تتتبع تاريخ الوجود البشري والدين. إنها تحفة من روائع الأدب العربي الحديث." },
        reason: { en: "Deep, symbolic, and thought-provoking. It challenges you to decode its intricate religious allegories.", ar: "عميقة ورمزية ومثيرة للتفكير. تتحداك لفك رموزها الدينية المعقدة." },
        coverUrl: "https://books.google.com/books/content?id=Uw9iAAAAMAAJ&printsec=frontcover&img=1&zoom=3",
        link: "https://archive.org/search?query=Children+of+the+Alley"
      },
      {
        title: { en: "The Prophet", ar: "النبي" },
        author: { en: "Kahlil Gibran", ar: "جبران خليل جبران" },
        style: { en: "Poetic Essays", ar: "مقالات شعرية" },
                pages: 107,
        description: { en: "Poetic essays covering various aspects of life and the human condition. A beautiful meditation on existence.", ar: "مقالات شعرية تغطي جوانب مختلفة من الحياة والظروف الإنسانية. تأمل جميل في الوجود." },
        reason: { en: "Offers timeless philosophical wisdom wrapped in beautiful prose. Perfect for slow, contemplative reading.", ar: "يقدم حكمة فلسفية خالدة مغلفة بنثر جميل. مثالي للقراءة البطيئة والمتأملة." },
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780394404288-L.jpg",
        link: "https://archive.org/search?query=The+Prophet+Gibran"
      },
      {
        title: { en: "Notes from Underground", ar: "رسائل من تحت الأرض" },
        author: { en: "Fyodor Dostoevsky", ar: "فيودور دوستويفسكي" },
        style: { en: "Existentialism", ar: "وجودية" },
                pages: 136,
        description: { en: "A profound existentialist novel exploring human nature and suffering. A bitter, brilliant monologue.", ar: "رواية وجودية عميقة تستكشف الطبيعة البشرية والمعاناة. مونولوج مرير ورائع." },
        reason: { en: "A brilliant, unfiltered look into the complexity of the human mind. Leaves a lasting intellectual impact.", ar: "نظرة رائعة وغير مفلترة في تعقيد العقل البشري. تترك تأثيراً فكرياً دائماً." },
        coverUrl: "https://m.media-amazon.com/images/I/41I+nU6oQLL.jpg",
        link: "https://archive.org/search?query=Notes+from+Underground"
      }
    ]
  },
  B: {
    title: { en: "The Escapist", ar: "الهارب من الواقع" },
    description: {
      en: "You read to disappear. You want worlds so vivid and complete that reality feels like the interruption.",
      ar: "أنت تقرأ لتختفي. تريد عوالم حية وكاملة لدرجة أن الواقع يبدو وكأنه مقاطعة."
    },
    books: [
      {
        title: { en: "Dune", ar: "كثيب" },
        author: { en: "Frank Herbert", ar: "فرانك هربرت" },
        style: { en: "Epic Sci-Fi", ar: "خيال علمي ملحمي" },
                pages: 896,
        description: { en: "An epic science fiction masterpiece set on a desert planet. It weaves politics, religion, and ecology into a massive world.", ar: "تحفة خيال علمي ملحمية تدور أحداثها على كوكب صحراوي. تنسج السياسة والدين والبيئة في عالم هائل." },
        reason: { en: "Unmatched world-building that completely absorbs you. You will easily lose yourself in Arrakis.", ar: "بناء عالم لا مثيل له يمتصك بالكامل. ستفقد نفسك بسهولة في أراكيس." },
        coverUrl: "https://m.media-amazon.com/images/I/81ym3QUd3KL.jpg",
        link: "https://archive.org/search?query=Dune+Frank+Herbert"
      },
      {
        title: { en: "The Name of the Wind", ar: "اسم الريح" },
        author: { en: "Patrick Rothfuss", ar: "باتريك روثفوس" },
        style: { en: "High Fantasy", ar: "فانتازيا ملحمية" },
                pages: 662,
        description: { en: "The legendary tale of a gifted young man who grows to be a notorious wizard. A deeply immersive magical journey.", ar: "الحكاية الأسطورية لشاب موهوب يكبر ليصبح ساحراً سيئ السمعة. رحلة سحرية غامرة بعمق." },
        reason: { en: "Immersive storytelling with a beautifully crafted magic system. A perfect escape from reality.", ar: "سرد قصصي غامر مع نظام سحري مصمم بشكل جميل. ملاذ مثالي من الواقع." },
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780756404741-L.jpg",
        link: "https://archive.org/search?query=The+Name+of+the+Wind"
      },
      {
        title: { en: "The Night Circus", ar: "السيرك الليلي" },
        author: { en: "Erin Morgenstern", ar: "إيرين مورجينستيرن" },
        style: { en: "Magical Realism", ar: "واقعية سحرية" },
                pages: 387,
        description: { en: "A phantasmagorical fairy tale set in a magical circus that only opens at night. It's a breathtaking sensory experience.", ar: "حكاية خرافية خيالية تدور أحداثها في سيرك سحري يفتح أبوابه ليلاً فقط. إنها تجربة حسية تخطف الأنفاس." },
        reason: { en: "A rich, dreamlike atmosphere full of magic and wonder. It enchants and transports the reader.", ar: "أجواء غنية وحالمة مليئة بالسحر والعجب. تسحر وتنقل القارئ." },
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780307744432-L.jpg",
        link: "https://archive.org/search?query=The+Night+Circus"
      },
      {
        title: { en: "The Hobbit", ar: "الهوبيت" },
        author: { en: "J.R.R. Tolkien", ar: "ج.ر.ر. تولكين" },
        style: { en: "Classic Fantasy", ar: "فانتازيا كلاسيكية" },
                pages: 310,
        description: { en: "A classic fantasy adventure following a reluctant hero. It's the ultimate journey into Middle-earth.", ar: "مغامرة خيالية كلاسيكية تتبع بطلاً متردداً. إنها الرحلة المطلقة إلى الأرض الوسطى." },
        reason: { en: "The perfect journey into a richly detailed magical world. It’s comforting, adventurous, and perfectly escapist.", ar: "الرحلة المثالية إلى عالم سحري غني بالتفاصيل. إنها مريحة ومغامرة وهروب مثالي." },
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780261102217-L.jpg",
        link: "https://archive.org/search?query=The+Hobbit+Tolkien"
      },
      {
        title: { en: "Mistborn", ar: "أبناء الضباب" },
        author: { en: "Brandon Sanderson", ar: "براندون ساندرسون" },
        style: { en: "Fantasy / Action", ar: "فانتازيا / أكشن" },
                pages: 541,
        description: { en: "A thrilling heist story set in an ash-covered world where magic is drawn from metals.", ar: "قصة سرقة مثيرة تدور أحداثها في عالم مغطى بالرماد حيث يُستمد السحر من المعادن." },
        reason: { en: "Features an incredible magic system and non-stop action. You simply won't be able to put it down.", ar: "يتميز بنظام سحري مذهل وعمل لا يتوقف. ببساطة لن تتمكن من تركه." },
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780765311788-L.jpg",
        link: "https://archive.org/search?query=Mistborn+Brandon+Sanderson"
      },
      {
        title: { en: "The Hitchhiker's Guide to the Galaxy", ar: "دليل المسافر للمجرة" },
        author: { en: "Douglas Adams", ar: "دوغلاس آدمز" },
        style: { en: "Sci-Fi Comedy", ar: "خيال علمي كوميدي" },
                pages: 193,
        description: { en: "A hilarious journey through space following the destruction of Earth. Pure, joyous absurdity.", ar: "رحلة مرحة عبر الفضاء بعد تدمير الأرض. عبثية نقية ومبهجة." },
        reason: { en: "Provides a wildly entertaining escape through laughter. It makes you completely forget your worldly worries.", ar: "يوفر هروباً ترفيهياً جامحاً من خلال الضحك. يجعلك تنسى تماماً همومك الدنيوية." },
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780345391803-L.jpg",
        link: "https://archive.org/search?query=Hitchhikers+Guide+to+the+Galaxy"
      },
      {
        title: { en: "One Thousand and One Nights", ar: "ألف ليلة وليلة" },
        author: { en: "Various", ar: "متنوع" },
        style: { en: "Folk Tales", ar: "حكايات شعبية" },
                pages: 980,
        description: { en: "A collection of Middle Eastern folk tales compiled in Arabic. Full of genies, magic, and epic quests.", ar: "مجموعة من الحكايات الشعبية الشرق أوسطية. مليئة بالجن والسحر والمهام الملحمية." },
        reason: { en: "The ultimate collection of enchanting and magical escapist stories. It’s the origin of fantasy storytelling.", ar: "المجموعة المطلقة من القصص الساحرة والخيالية. إنه أصل سرد القصص الخيالية." },
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780140449389-L.jpg",
        link: "https://archive.org/search?query=One+Thousand+and+One+Nights"
      },
      {
        title: { en: "Utopia", ar: "يوتوبيا" },
        author: { en: "Ahmed Khaled Tawfik", ar: "أحمد خالد توفيق" },
        style: { en: "Dystopian Thriller", ar: "إثارة ديستوبية" },
                pages: 122,
        description: { en: "A chilling futuristic thriller exploring extreme social division in Egypt. A dark but gripping alternate reality.", ar: "قصة إثارة مستقبلية مرعبة تستكشف الانقسام الاجتماعي المتطرف في مصر. واقع بديل مظلم ولكنه مشوق." },
        reason: { en: "A fast-paced reality shift that keeps you completely hooked. An intense form of literary escape.", ar: "تحول سريع الوتيرة للواقع يبقيك منتبهاً تماماً. شكل مكثف من الهروب الأدبي." },
        coverUrl: "https://covers.openlibrary.org/b/isbn/9789774088874-L.jpg",
        link: "https://archive.org/search?query=Utopia+Ahmed+Khaled"
      },
      {
        title: { en: "The Chronicles of Narnia", ar: "سجلات نارنيا" },
        author: { en: "C.S. Lewis", ar: "سي. إس. لويس" },
        style: { en: "Children's Fantasy", ar: "فانتازيا الأطفال" },
                pages: 767,
        description: { en: "Children travel through a wardrobe to a magical land of talking animals. A timeless classic of imagination.", ar: "أطفال يسافرون عبر خزانة ملابس إلى أرض سحرية بها حيوانات ناطقة. كلاسيكية خالدة من الخيال." },
        reason: { en: "A deeply nostalgic and wondrous adventure. It reawakens the childlike joy of pure imagination.", ar: "مغامرة حنين إلى الماضي ورائعة بعمق. توقظ الفرح الطفولي بالخيال النقي." },
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780064404990-L.jpg",
        link: "https://archive.org/search?query=The+Chronicles+of+Narnia"
      },
      {
        title: { en: "Harry Potter and the Sorcerer's Stone", ar: "هاري بوتر وحجر الفيلسوف" },
        author: { en: "J.K. Rowling", ar: "ج. ك. رولينغ" },
        style: { en: "Modern Fantasy", ar: "فانتازيا حديثة" },
                pages: 309,
        description: { en: "A young boy discovers he's a wizard and enters a magical world. The ultimate story of hidden magic.", ar: "يكتشف صبي صغير أنه ساحر ويدخل عالماً سحرياً. القصة المطلقة للسحر الخفي." },
        reason: { en: "The ultimate escapist fantasy that feels incredibly real. A comforting world you can always return to.", ar: "الخيال الهروبي المطلق الذي يبدو حقيقياً بشكل لا يصدق. عالم مريح يمكنك دائمًا العودة إليه." },
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780439708180-L.jpg",
        link: "https://archive.org/search?query=Harry+Potter+and+the+Sorcerers+Stone"
      }
    ]
  },
  C: {
    title: { en: "The Motivational Seeker", ar: "الباحث عن التحفيز" },
    description: {
      en: "You read with purpose. Every book is a tool, every page a step closer to the best version of yourself.",
      ar: "أنت تقرأ بهدف. كل كتاب أداة، وكل صفحة خطوة أقرب إلى أفضل نسخة من نفسك."
    },
    books: [
      {
        title: { en: "Atomic Habits", ar: "العادات الذرية" },
        author: { en: "James Clear", ar: "جيمس كلير" },
        style: { en: "Self-Improvement", ar: "تطوير الذات" },
                pages: 320,
        description: { en: "An easy and proven way to build good habits and break bad ones. Focuses on small daily improvements.", ar: "طريقة سهلة ومثبتة لبناء عادات جيدة وكسر العادات السيئة. يركز على التحسينات اليومية الصغيرة." },
        reason: { en: "Provides clear, actionable steps to change your life immediately. Highly practical and goal-oriented.", ar: "يقدم خطوات واضحة وقابلة للتنفيذ لتغيير حياتك على الفور. عملي للغاية وموجه نحو الهدف." },
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg",
        link: "https://archive.org/search?query=Atomic+Habits+James+Clear"
      },
      {
        title: { en: "Man's Search for Meaning", ar: "الإنسان يبحث عن المعنى" },
        author: { en: "Viktor Frankl", ar: "فيكتور فرانكل" },
        style: { en: "Psychology / Memoir", ar: "علم النفس / مذكرات" },
                pages: 165,
        description: { en: "A profound memoir of finding purpose in the darkest of times inside a concentration camp.", ar: "مذكرات عميقة حول إيجاد الهدف في أحلك الأوقات داخل معسكر اعتقال." },
        reason: { en: "Offers deep inspiration and shifts your life perspective forever. It motivates you through profound meaning.", ar: "يقدم إلهاماً عميقاً ويغير نظرتك للحياة إلى الأبد. يحفزك من خلال المعنى العميق." },
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780807014295-L.jpg",
        link: "https://archive.org/search?query=Mans+Search+for+Meaning"
      },
      {
        title: { en: "Meditations", ar: "التأملات" },
        author: { en: "Marcus Aurelius", ar: "ماركوس أوريليوس" },
        style: { en: "Stoic Philosophy", ar: "فلسفة رواقية" },
                pages: 254,
        description: { en: "A series of personal writings on Stoic philosophy from a Roman Emperor. A guide to mental resilience.", ar: "سلسلة من الكتابات الشخصية حول الفلسفة الرواقية من إمبراطور روماني. دليل للمرونة العقلية." },
        reason: { en: "Timeless wisdom on self-discipline and inner strength. It's the ultimate manual for self-mastery.", ar: "حكمة خالدة حول الانضباط الذاتي والقوة الداخلية. إنه الدليل المطلق للتمكن الذاتي." },
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780812968255-L.jpg",
        link: "https://archive.org/search?query=Meditations+Marcus+Aurelius"
      },
      {
        title: { en: "The Alchemist", ar: "الخيميائي" },
        author: { en: "Paulo Coelho", ar: "باولو كويلو" },
        style: { en: "Inspirational Fiction", ar: "خيال ملهم" },
                pages: 167,
        description: { en: "A magical fable about an Andalusian shepherd boy following his dreams. A global phenomenon about destiny.", ar: "حكاية سحرية عن صبي راعٍ أندلسي يتبع أحلامه. ظاهرة عالمية عن المصير." },
        reason: { en: "A beautifully simple story that will reignite your ambitions. It inspires you to pursue your true calling.", ar: "قصة بسيطة وجميلة ستعيد إشعال طموحاتك. تلهمك لمتابعة دعوتك الحقيقية." },
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780061122415-L.jpg",
        link: "https://archive.org/search?query=The+Alchemist+Paulo+Coelho"
      },
      {
        title: { en: "Start With Why", ar: "ابدأ بلماذا" },
        author: { en: "Simon Sinek", ar: "سيمون سينك" },
        style: { en: "Leadership / Business", ar: "القيادة / الأعمال" },
                pages: 256,
        description: { en: "Shows how great leaders inspire action by focusing on their underlying purpose.", ar: "يوضح كيف يلهم القادة العظماء العمل من خلال التركيز على هدفهم الأساسي." },
        reason: { en: "Gives you a powerful framework to lead and find your own motivation. Perfect for ambitious minds.", ar: "يمنحك إطاراً قوياً للقيادة وإيجاد دوافعك الخاصة. مثالي للعقول الطموحة." },
        coverUrl: "https://covers.openlibrary.org/b/isbn/9781591846444-L.jpg",
        link: "https://archive.org/search?query=Start+With+Why"
      },
      {
        title: { en: "Can't Hurt Me", ar: "لا يمكن إيذائي" },
        author: { en: "David Goggins", ar: "ديفيد جوجينز" },
        style: { en: "Biography / Motivation", ar: "سيرة ذاتية / تحفيز" },
                pages: 364,
        description: { en: "The story of a man who overcame a horrific childhood to become a US Armed Forces icon.", ar: "قصة رجل تغلب على طفولة مروعة ليصبح أيقونة في القوات المسلحة الأمريكية." },
        reason: { en: "Provides raw, intense motivation to push past your mental limits. It destroys excuses.", ar: "يوفر دافعاً خاماً ومكثفاً لتجاوز حدودك العقلية. إنه يدمر الأعذار." },
        coverUrl: "https://covers.openlibrary.org/b/isbn/9781544512280-L.jpg",
        link: "https://archive.org/search?query=Cant+Hurt+Me"
      },
      {
        title: { en: "Zero to One", ar: "من الصفر إلى الواحد" },
        author: { en: "Peter Thiel", ar: "بيتر ثيل" },
        style: { en: "Business / Innovation", ar: "أعمال / ابتكار" },
                pages: 210,
        description: { en: "Notes on startups and how to build the future through unique innovation.", ar: "ملاحظات حول الشركات الناشئة وكيفية بناء المستقبل من خلال الابتكار الفريد." },
        reason: { en: "Challenges you to think differently about success and creation. Highly inspiring for entrepreneurs.", ar: "يتحداك للتفكير بشكل مختلف حول النجاح والخلق. ملهم للغاية لرواد الأعمال." },
        coverUrl: "https://books.google.com/books/content?id=POOJDQAAQBAJ&printsec=frontcover&img=1&zoom=3",
        link: "https://archive.org/search?query=Zero+to+One+Peter+Thiel"
      },
      {
        title: { en: "Renew Your Life", ar: "تجديد حياتك" },
        author: { en: "Muhammad al-Ghazali", ar: "محمد الغزالي" },
        style: { en: "Spiritual / Self-Help", ar: "روحي / تطوير الذات" },
                pages: 200,
        description: { en: "Islamic perspective on self-help inspired by Dale Carnegie. It blends modern psychology with faith.", ar: "منظور إسلامي لتطوير الذات مستوحى من ديل كارنيجي. يمزج علم النفس الحديث بالإيمان." },
        reason: { en: "Practical spiritual and mental guidance for a better life. Gives you actionable wisdom with a soulful touch.", ar: "إرشادات روحية وعقلية عملية لحياة أفضل. يمنحك حكمة قابلة للتنفيذ بلمسة روحية." },
        coverUrl: "https://books.google.com/books/content?id=xxxxxxxxxxx&printsec=frontcover&img=1&zoom=3",
        link: "https://archive.org/search?query=Renew+Your+Life+Ghazali"
      },
      {
        title: { en: "Because You Are God", ar: "لأنك الله" },
        author: { en: "Ali Bin Jaber Al-Fifi", ar: "علي بن جابر الفيفي" },
        style: { en: "Spiritual / Healing", ar: "روحي / علاج نفسي" },
                pages: 192,
        description: { en: "A journey to the depths of spirituality, explaining the names of God to find inner peace.", ar: "رحلة إلى أعماق الروحانية، تشرح أسماء الله لإيجاد السلام الداخلي." },
        reason: { en: "Highly motivating for spiritual and emotional well-being. It brings profound comfort and inner strength.", ar: "محفز للغاية للرفاهية الروحية والعاطفية. يجلب راحة عميقة وقوة داخلية." },
        coverUrl: "https://covers.openlibrary.org/b/isbn/9786038202570-L.jpg",
        link: "https://archive.org/search?query=%D9%84%D8%A3%D9%86%D9%83+%D8%A7%D9%84%D9%84%D9%87"
      },
      {
        title: { en: "The 7 Habits of Highly Effective People", ar: "العادات السبع للناس الأكثر فعالية" },
        author: { en: "Stephen Covey", ar: "ستيفن كوفي" },
        style: { en: "Self-Improvement", ar: "تطوير الذات" },
                pages: 381,
        description: { en: "A comprehensive framework for personal and professional effectiveness based on timeless principles.", ar: "إطار عمل شامل للفعالية الشخصية والمهنية بناءً على مبادئ خالدة." },
        reason: { en: "Provides powerful paradigms to improve your life fundamentally. It’s a complete toolkit for success.", ar: "يوفر نماذج قوية لتحسين حياتك بشكل أساسي. إنها مجموعة أدوات كاملة للنجاح." },
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780743269513-L.jpg",
        link: "https://archive.org/search?query=7+Habits+Highly+Effective+People"
      }
    ]
  },
  D: {
    title: { en: "The Romantic Dreamer", ar: "الحالم الرومانسي" },
    description: {
      en: "You read to feel. You want love, warmth, and stories that remind you that human connection is everything.",
      ar: "أنت تقرأ لتشعر. تريد الحب والدفء والقصص التي تذكرك بأن التواصل البشري هو كل شيء."
    },
    books: [
      {
        title: { en: "Pride and Prejudice", ar: "كبرياء وتحامل" },
        author: { en: "Jane Austen", ar: "جين أوستن" },
        style: { en: "Classic Romance", ar: "رومانسية كلاسيكية" },
                pages: 279,
        description: { en: "The ultimate classic romance dealing with manners, matrimony, and overcoming first impressions.", ar: "الرومانسية الكلاسيكية المطلقة التي تتناول الأخلاق والزواج والتغلب على الانطباعات الأولى." },
        reason: { en: "A beautifully written, timeless love story with sharp wit. It hits all the right emotional notes.", ar: "قصة حب خالدة ومكتوبة بشكل جميل بذكاء حاد. تضرب على جميع الأوتار العاطفية الصحيحة." },
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg",
        link: "https://archive.org/search?query=Pride+and+Prejudice"
      },
      {
        title: { en: "The Seven Husbands of Evelyn Hugo", ar: "أزواج إيفلين هيوغو السبعة" },
        author: { en: "Taylor Jenkins Reid", ar: "تايلور جينكينز ريد" },
        style: { en: "Historical Romance", ar: "رومانسية تاريخية" },
                pages: 400,
        description: { en: "A glamorous, heartbreaking tale of a Hollywood icon revealing her hidden true love.", ar: "قصة ساحرة ومفجعة لأيقونة هوليوود تكشف عن حبها الحقيقي الخفي." },
        reason: { en: "Delivers the emotional depth and passionate romance you crave. It will make you both smile and cry.", ar: "يقدم العمق العاطفي والرومانسية العاطفية التي تتوق إليها. سيجعلك تبتسم وتبكي." },
        coverUrl: "https://covers.openlibrary.org/b/isbn/9781501161933-L.jpg",
        link: "https://archive.org/search?query=The+Seven+Husbands+of+Evelyn+Hugo"
      },
      {
        title: { en: "Jane Eyre", ar: "جين أير" },
        author: { en: "Charlotte Brontë", ar: "شارلوت برونتي" },
        style: { en: "Gothic Romance", ar: "رومانسية قوطية" },
                pages: 532,
        description: { en: "A classic romance featuring a strong-willed heroine and a brooding hero with a dark secret.", ar: "رومانسية كلاسيكية تتميز ببطلة قوية الإرادة وبطل غامض ذو سر مظلم." },
        reason: { en: "A deeply emotional story of love, morality, and independence. Perfect for a cozy afternoon.", ar: "قصة عاطفية عميقة عن الحب والأخلاق والاستقلال. مثالية لعصر مريح." },
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780141441146-L.jpg",
        link: "https://archive.org/search?query=Jane+Eyre"
      },
      {
        title: { en: "Normal People", ar: "أشخاص عاديون" },
        author: { en: "Sally Rooney", ar: "سالي روني" },
        style: { en: "Contemporary Fiction", ar: "خيال معاصر" },
                pages: 273,
        description: { en: "A raw and complex story about two people who constantly orbit each other's lives.", ar: "قصة خام ومعقدة عن شخصين يدوران باستمرار في حياة بعضهما البعض." },
        reason: { en: "An intense exploration of modern love and human connection. It feels incredibly real and vulnerable.", ar: "استكشاف مكثف للحب الحديث والتواصل البشري. يبدو حقيقياً وضعيفاً بشكل لا يصدق." },
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780571334650-L.jpg",
        link: "https://archive.org/search?query=Normal+People+Sally+Rooney"
      },
      {
        title: { en: "The Notebook", ar: "دفتر الملاحظات" },
        author: { en: "Nicholas Sparks", ar: "نيكولاس سباركس" },
        style: { en: "Romantic Drama", ar: "دراما رومانسية" },
                pages: 214,
        description: { en: "A timeless story of a love that endures sickness, time, and tragedy.", ar: "قصة خالدة لحب يدوم رغم المرض والوقت والمأساة." },
        reason: { en: "The ultimate tear-jerker. It provides the warm, sweeping emotions you look for in a book.", ar: "القصة المبكية المطلقة. توفر العواطف الدافئة والشاملة التي تبحث عنها في كتاب." },
        coverUrl: "https://covers.openlibrary.org/b/isbn/9781455582877-L.jpg",
        link: "https://archive.org/search?query=The+Notebook+Nicholas+Sparks"
      },
      {
        title: { en: "Anna Karenina", ar: "آنا كارينينا" },
        author: { en: "Leo Tolstoy", ar: "ليو تولستوي" },
        style: { en: "Classic Tragic Romance", ar: "رومانسية مأساوية كلاسيكية" },
                pages: 864,
        description: { en: "An epic tale of passion, betrayal, and society in Imperial Russia.", ar: "حكاية ملحمية عن العاطفة والخيانة والمجتمع في روسيا الإمبراطورية." },
        reason: { en: "A masterpiece of human emotion. You will feel every ounce of love and heartbreak.", ar: "تحفة من المشاعر الإنسانية. ستشعر بكل أوقية من الحب وحسرة القلب." },
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780143035008-L.jpg",
        link: "https://archive.org/search?query=Anna+Karenina"
      },
      {
        title: { en: "Black Suits You so Well", ar: "الأسود يليق بك" },
        author: { en: "Ahlam Mosteghanemi", ar: "أحلام مستغانمي" },
        style: { en: "Arabic Romance", ar: "رومانسية عربية" },
                pages: 350,
        description: { en: "A tale of love, pride, and sorrow in the Arab world. A billionaire falls for a grieving singer.", ar: "حكاية حب وكبرياء وحزن في العالم العربي. ملياردير يقع في حب مغنية حزينة." },
        reason: { en: "Richly poetic and highly emotional. It caters perfectly to your romantic sensibilities.", ar: "شاعري غني وعاطفي للغاية. يلبي حساسيتك الرومانسية بشكل مثالي." },
        coverUrl: "https://m.media-amazon.com/images/I/41O9V1e6uDL.jpg",
        link: "https://archive.org/search?query=Black+Suits+You+so+Well"
      },
      {
        title: { en: "In My Heart is a Hebrew Female", ar: "في قلبي أنثى عبرية" },
        author: { en: "Khawla Hamdi", ar: "خولة حمدي" },
        style: { en: "Cultural Romance", ar: "رومانسية ثقافية" },
                pages: 388,
        description: { en: "A touching love story crossing religious and cultural bounds in Tunisia and Lebanon.", ar: "قصة حب مؤثرة تتخطى الحدود الدينية والثقافية في تونس ولبنان." },
        reason: { en: "A poignant exploration of love overcoming major obstacles. Heartwarming and beautifully written.", ar: "استكشاف مؤثر للحب الذي يتغلب على العقبات الكبرى. دافئ القلب ومكتوب بشكل جميل." },
        coverUrl: "https://covers.openlibrary.org/b/isbn/9789973059850-L.jpg",
        link: "https://archive.org/search?query=%D9%81%D9%8A+%D9%82%D9%84%D8%A8%D9%8A+%D8%A3%D9%86%D8%AB%D9%89+%D8%B9%D8%A8%D8%B1%D9%8A%D8%A9"
      },
      {
        title: { en: "Emma", ar: "إيما" },
        author: { en: "Jane Austen", ar: "جين أوستن" },
        style: { en: "Classic Romance", ar: "رومانسية كلاسيكية" },
                pages: 474,
        description: { en: "A young woman who fancies herself a matchmaker meddles in the romantic lives of her friends.", ar: "شابة تعتقد أنها خبيرة في التوفيق بين الزوجين تتدخل في الحياة الرومانسية لأصدقائها." },
        reason: { en: "A witty and charming classic that explores love and self-discovery. Delightfully romantic.", ar: "كلاسيكية ذكية وساحرة تستكشف الحب واكتشاف الذات. رومانسية مبهجة." },
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780141439587-L.jpg",
        link: "https://archive.org/search?query=Emma+Jane+Austen"
      },
      {
        title: { en: "Eleanor Oliphant is Completely Fine", ar: "إليانور أوليفانت في حالة جيدة تماماً" },
      author: { en: "Gail Honeyman", ar: "غيل هونيمن" },
      description: {
        en: "A socially awkward woman with a rigid routine finds her life slowly opening up when she befriends a clumsy IT guy.",
        ar: "امرأة غير اجتماعية ذات روتين صارم تجد حياتها تنفتح ببطء عندما تصادق شاباً غير بارع من قسم تقنية المعلومات."
      },
      pages: 336,
      coverUrl: "https://covers.openlibrary.org/b/isbn/9780735220683-L.jpg",
        link: "https://archive.org/search?query=A+Little+Life"
      }
    ]
  },
  E: {
    title: { en: "The Cultural Explorer", ar: "المستكشف الثقافي" },
    description: {
      en: "You read to travel without moving. Every book is a passport to a different time, place, and way of seeing the world.",
      ar: "أنت تقرأ لتسافر دون أن تتحرك. كل كتاب هو جواز سفر لزمن ومكان وطريقة مختلفة لرؤية العالم."
    },
    books: [
      {
        title: { en: "The Kite Runner", ar: "عداء الطائرة الورقية" },
        author: { en: "Khaled Hosseini", ar: "خالد حسيني" },
        style: { en: "Historical Drama", ar: "دراما تاريخية" },
                pages: 371,
        description: { en: "A heartbreaking story of friendship and redemption set against the turbulent history of Afghanistan.", ar: "قصة مفجعة عن الصداقة والفداء تدور أحداثها على خلفية التاريخ المضطرب لأفغانستان." },
        reason: { en: "Deeply immerses you in a rich culture and poignant history. It's a powerful emotional journey.", ar: "يغمرك بعمق في ثقافة غنية وتاريخ مؤثر. إنها رحلة عاطفية قوية." },
        coverUrl: "https://m.media-amazon.com/images/I/81aMh9AXYmL.jpg",
        link: "https://archive.org/search?query=The+Kite+Runner"
      },
      {
        title: { en: "Pachinko", ar: "باتشينكو" },
        author: { en: "Min Jin Lee", ar: "مين جين لي" },
        style: { en: "Historical Saga", ar: "ملحمة تاريخية" },
                pages: 496,
        description: { en: "A sweeping saga of a Korean family living in Japan through generations, facing exile and discrimination.", ar: "ملحمة شاملة لعائلة كورية تعيش في اليابان عبر الأجيال، وتواجه النفي والتمييز." },
        reason: { en: "A beautifully detailed exploration of immigrant identities and resilience across cultures.", ar: "استكشاف مفصل بشكل جميل لهويات المهاجرين والمرونة عبر الثقافات." },
        coverUrl: "https://books.google.com/books/content?id=_eFrDQAAQBAJ&printsec=frontcover&img=1&zoom=3",
        link: "https://archive.org/search?query=Pachinko"
      },
      {
        title: { en: "Things Fall Apart", ar: "أشياء تتداعى" },
        author: { en: "Chinua Achebe", ar: "تشينوا أتشيبي" },
        style: { en: "African Literature", ar: "أدب أفريقي" },
                pages: 209,
        description: { en: "A powerful novel detailing the impact of British colonialism on a Nigerian village.", ar: "رواية قوية تفصل تأثير الاستعمار البريطاني على قرية نيجيرية." },
        reason: { en: "An essential cultural narrative that completely expands your worldview.", ar: "سرد ثقافي أساسي يوسع نظرتك للعالم تماماً." },
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780385474542-L.jpg",
        link: "https://archive.org/search?query=Things+Fall+Apart"
      },
      {
        title: { en: "Americanah", ar: "أمريكانا" },
        author: { en: "Chimamanda Ngozi Adichie", ar: "تشيماماندا نغوزي أديتشي" },
        style: { en: "Contemporary Fiction", ar: "خيال معاصر" },
                pages: 588,
        description: { en: "A Nigerian woman moves to America and must navigate issues of race, identity, and love.", ar: "امرأة نيجيرية تنتقل إلى أمريكا ويجب عليها التنقل في قضايا العرق والهوية والحب." },
        reason: { en: "A brilliant dissection of global cultures and what it means to be an immigrant.", ar: "تشريح رائع للثقافات العالمية وما يعنيه أن تكون مهاجراً." },
        coverUrl: "https://m.media-amazon.com/images/I/81Q1I+hH-OL.jpg",
        link: "https://archive.org/search?query=Americanah"
      },
      {
        title: { en: "A Thousand Splendid Suns", ar: "ألف شمس مشرقة" },
        author: { en: "Khaled Hosseini", ar: "خالد حسيني" },
        style: { en: "Historical Drama", ar: "دراما تاريخية" },
                pages: 384,
        description: { en: "A sweeping story of two Afghan women whose lives intersect over decades of war.", ar: "قصة شاملة لامرأتين أفغانيتين تتقاطع حياتهما على مدى عقود من الحرب." },
        reason: { en: "A deeply moving window into the history and people of Afghanistan.", ar: "نافذة مؤثرة للغاية على تاريخ وشعب أفغانستان." },
        coverUrl: "https://covers.openlibrary.org/b/isbn/9781594489501-L.jpg",
        link: "https://archive.org/search?query=A+Thousand+Splendid+Suns"
      },
      {
        title: { en: "The God of Small Things", ar: "إله الأشياء الصغيرة" },
        author: { en: "Arundhati Roy", ar: "أرونداتي روي" },
        style: { en: "Literary Fiction", ar: "خيال أدبي" },
                pages: 340,
        description: { en: "A lush, tragic story of twins in Kerala, India, whose lives are destroyed by the 'Love Laws'.", ar: "قصة خصبة ومأساوية عن توأمين في كيرالا بالهند، دُمرت حياتهما بسبب 'قوانين الحب'." },
        reason: { en: "Transports you to India with its poetic prose and deep cultural commentary.", ar: "ينقلك إلى الهند بنثره الشعري وتعليقه الثقافي العميق." },
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780812979657-L.jpg",
        link: "https://archive.org/search?query=The+God+of+Small+Things"
      },
      {
        title: { en: "The Granada Trilogy", ar: "ثلاثية غرناطة" },
        author: { en: "Radwa Ashour", ar: "رضوى عاشور" },
        style: { en: "Historical Epic", ar: "ملحمة تاريخية" },
                pages: 512,
        description: { en: "A masterpiece chronicling the fall of Moorish Spain and its devastating impact on an Arab family.", ar: "تحفة فنية تؤرخ لسقوط إسبانيا المغاربية وتأثيرها المدمر على عائلة عربية." },
        reason: { en: "An incredible historical journey through a fascinating and tragic era.", ar: "رحلة تاريخية مذهلة عبر حقبة رائعة ومأساوية." },
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780815609111-L.jpg",
        link: "https://archive.org/search?query=The+Granada+Trilogy"
      },
      {
        title: { en: "Azazeel", ar: "عزازيل" },
        author: { en: "Youssef Ziedan", ar: "يوسف زيدان" },
        style: { en: "Historical Fiction", ar: "خيال تاريخي" },
                pages: 377,
        description: { en: "A monk's struggles with faith and temptation in 5th century Egypt and Syria.", ar: "صراعات راهب مع الإيمان والإغراء في مصر وسوريا في القرن الخامس." },
        reason: { en: "Rich historical setting that vividly transports you to the ancient Middle East.", ar: "بيئة تاريخية غنية تنقلك بوضوح إلى الشرق الأوسط القديم." },
        coverUrl: "https://covers.openlibrary.org/b/isbn/9789771442112-L.jpg",
        link: "https://archive.org/search?query=Azazeel"
      },
      {
        title: { en: "In the Name of the Rose", ar: "اسم الوردة" },
        author: { en: "Umberto Eco", ar: "أومبرتو إيكو" },
        style: { en: "Historical Mystery", ar: "لغز تاريخي" },
                pages: 536,
        description: { en: "A murder mystery set in an Italian monastery in 1327. Dense with medieval theology and history.", ar: "لغز جريمة قتل تدور أحداثه في دير إيطالي عام 1327. كثيف بعلم اللاهوت والتاريخ في العصور الوسطى." },
        reason: { en: "A brilliant time machine that thoroughly immerses you in the medieval world.", ar: "آلة زمنية رائعة تغمرك تماماً في عالم العصور الوسطى." },
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780156001311-L.jpg",
        link: "https://archive.org/search?query=In+the+Name+of+the+Rose"
      },
      {
        title: { en: "The Book Thief", ar: "سارقة الكتب" },
        author: { en: "Markus Zusak", ar: "ماركوس زوساك" },
        style: { en: "Historical Fiction", ar: "خيال تاريخي" },
                pages: 584,
        description: { en: "The story of a young girl in Nazi Germany, narrated by Death himself.", ar: "قصة فتاة صغيرة في ألمانيا النازية، يرويها الموت نفسه." },
        reason: { en: "A uniquely told cultural narrative that captures the humanity within a dark historical period.", ar: "سرد ثقافي فريد يجسد الإنسانية داخل فترة تاريخية مظلمة." },
        coverUrl: "https://covers.openlibrary.org/b/isbn/9780375842207-L.jpg",
        link: "https://archive.org/search?query=The+Book+Thief"
      }
    ]
  }
};

const shuffleArray = <T,>(array: T[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const OPEN_LIBRARY_ISBN_RE = /covers\.openlibrary\.org\/b\/isbn\/(\d{10,13})/i;

function openLibraryCoverToGoogleBooksFallback(url: string): string | null {
  const m = url.match(OPEN_LIBRARY_ISBN_RE);
  if (!m) return null;
  return `https://books.google.com/books/content?isbn=${m[1]}&printsec=frontcover&img=1&zoom=3`;
}

const BookCover = ({ coverUrl, title, author, color }: { coverUrl?: string, title: string, author: string, color: string }) => {
  const [activeSrc, setActiveSrc] = useState(coverUrl ?? "");
  const [loadFailed, setLoadFailed] = useState(!coverUrl);

  useEffect(() => {
    setActiveSrc(coverUrl ?? "");
    setLoadFailed(!coverUrl);
  }, [coverUrl]);

  const handleImgError = () => {
    if (coverUrl && activeSrc === coverUrl) {
      const fallback = openLibraryCoverToGoogleBooksFallback(coverUrl);
      if (fallback) {
        setActiveSrc(fallback);
        return;
      }
    }
    setLoadFailed(true);
  };

  return (
    <div className={`h-[220px] shrink-0 relative flex items-center justify-center overflow-hidden ${color}`}>
      {!loadFailed && activeSrc ? (
        <motion.img 
          key={activeSrc}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          src={activeSrc} 
          alt={title}
          crossOrigin="anonymous"
          referrerPolicy="no-referrer" 
          onError={handleImgError}
          className="w-full h-full object-contain object-center z-20 bg-white dark:bg-[#f8f9fa]"
        />
      ) : (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-2 px-4 text-center">
          <p className="text-sm font-semibold font-serif text-foreground line-clamp-3 leading-snug">{title}</p>
          <p className="text-xs text-muted-foreground line-clamp-2">{author}</p>
        </div>
      )}
    </div>
  )
}

const BookCard = ({ book, color, language, t }: any) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <Card className={`flex flex-col h-full border shadow-lg overflow-hidden group transition-all duration-300 ${color.card} ${color.border} ${color.text}`}>
      <BookCover 
        coverUrl={book.coverUrl}
        title={book.title[language]}
        author={book.author[language]}
        color={color.placeholder}
      />

      <CardContent className="p-5 flex flex-col flex-1">
        <div className="mb-4">
          <h4 className={`text-lg font-bold font-serif leading-tight mb-1 ${color.text}`}>
            {book.title[language]}
          </h4>
          <p className={`text-sm italic mb-3 ${color.muted}`}>{t.by} {book.author[language]}</p>
          <div className="flex gap-2 items-center flex-wrap">
            <span className={`inline-block px-2.5 py-1 text-xs rounded-full bg-black/5 dark:bg-white/10 border ${color.border} ${color.text}`}>
              {book.style[language]}
            </span>
            {book.pages && (
              <span className={`inline-block px-2.5 py-1 text-xs rounded-full bg-black/5 dark:bg-white/10 border ${color.border} ${color.text}`}>
                📄 {book.pages} {language === 'en' ? 'pages' : 'صفحة'}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex-1 space-y-4 mb-4">
          <p className={`text-sm leading-relaxed ${color.text} ${!expanded ? 'line-clamp-2' : ''}`}>
            {book.description[language]}
          </p>
          
          <AnimatePresence>
            {expanded && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className={`pt-3 border-t overflow-hidden ${color.border}`}
              >
                <p className={`text-sm leading-relaxed ${color.text}`}>
                  <span className={`font-semibold block mb-1 ${color.text} ${color.accent}`}>{t.whyItFits}</span>
                  {book.reason[language]}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className={`mt-auto flex flex-col gap-3 pt-4 border-t ${color.border}`}>
          <button 
            onClick={() => setExpanded(!expanded)}
            className={`text-sm font-medium w-full text-center hover:opacity-80 transition-opacity flex justify-center items-center gap-1 ${color.text} ${color.accent}`}
          >
            {expanded ? t.readLess : t.readMore}
          </button>
          
          <Button 
            size="sm"
            className={`w-full rounded-full transition-all duration-300 font-medium border ${color.buttonOutline} bg-transparent hover:text-white`}
            asChild
          >
            <a href={book.link} target="_blank" rel="noopener noreferrer" className={`flex items-center justify-center gap-2 ${color.text}`}>
              {t.readBook}
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};





const BackgroundDecorations = ({ type }: { type: AnswerValue }) => {
  return (
    <div id="personality-bg" className="fixed inset-0 pointer-events-none z-[0] overflow-hidden transition-opacity duration-1500 opacity-100">
      {type === 'A' && (
        <div className="absolute inset-0 bg-[#1a1008]">
          {/* Faint grid lines for aged manuscript */}
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(transparent 99%, #ffffff 1%)', backgroundSize: '100% 20px' }} />
          
          {/* Amber candlelight glow */}
          <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(255, 191, 0, 0.05) 0%, transparent 70%)', transform: 'translate(-30%, -30%)' }} />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(255, 191, 0, 0.05) 0%, transparent 70%)', transform: 'translate(30%, 30%)' }} />

          <svg className="w-full h-full absolute inset-0" xmlns="http://www.w3.org/2000/svg">
            {/* Center: Large Open Book */}
            <g opacity="0.08" stroke="#d4af37" fill="none" strokeWidth="2" transform="translate(50%, 50%) scale(2.5) translate(-50, -50)">
              <path d="M10 80 Q 40 70 50 80 L 50 130 Q 40 120 10 130 Z" />
              <path d="M50 80 Q 60 70 90 80 L 90 130 Q 60 120 50 130 Z" />
              <line x1="50" y1="80" x2="50" y2="130" />
            </g>

            {/* Scattered ink drops */}
            <g opacity="0.2" fill="#111">
              <circle cx="20%" cy="30%" r="3" />
              <circle cx="22%" cy="32%" r="1" />
              <circle cx="18%" cy="28%" r="1.5" />
              
              <circle cx="75%" cy="80%" r="4" />
              <circle cx="77%" cy="78%" r="1" />
              <circle cx="72%" cy="82%" r="2" />
            </g>
            
            {/* Bottom-Right: Feather Quill */}
            <g opacity="0.15" stroke="#d4af37" fill="none" transform="translate(calc(100% - 150px), calc(100% - 150px)) scale(1.5)">
              <path d="M 20 80 Q 50 50 90 10" strokeWidth="3"/>
              <path d="M 20 80 Q 40 60 90 10" strokeWidth="1"/>
              <path d="M 20 80 Q 60 70 90 10" strokeWidth="1"/>
              <path d="M 60 40 L 70 30" strokeWidth="1"/>
              <path d="M 50 50 L 65 40" strokeWidth="1"/>
              <path d="M 40 60 L 60 50" strokeWidth="1"/>
            </g>
          </svg>
        </div>
      )}

      {type === 'B' && (
        <div className="absolute inset-0 bg-[#050a1a]">
          {/* Nebula purple glow */}
          <div className="absolute top-1/2 left-1/2 w-[80vw] h-[80vw] rounded-full" style={{ background: 'radial-gradient(circle, rgba(75, 0, 130, 0.1) 0%, transparent 80%)', transform: 'translate(-50%, -50%)' }} />

          {/* Stars using box-shadow logic generated in JS inline */}
          <div className="absolute inset-0">
            {[...Array(80)].map((_, i) => (
              <div 
                key={i} 
                className="absolute rounded-full bg-white" 
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  width: `${Math.max(1, Math.random() * 3)}px`,
                  height: `${Math.max(1, Math.random() * 3)}px`,
                  opacity: Math.random() > 0.5 ? 0.8 : 0.4,
                  boxShadow: Math.random() > 0.8 ? '0 0 4px 1px rgba(173, 216, 230, 0.6)' : 'none'
                }} 
              />
            ))}
          </div>

          <svg className="w-full h-full absolute inset-0" xmlns="http://www.w3.org/2000/svg">
            {/* Top-Right: Crescent Moon */}
            <path d="M calc(100% - 150px) 100 A 60 60 0 1 0 calc(100% - 60px) 190 A 80 80 0 1 1 calc(100% - 150px) 100 Z" fill="#c0c0c0" opacity="0.10" />
            
            {/* Constellation lines */}
            <g opacity="0.05" stroke="#ffffff" strokeWidth="1" fill="none">
              <polyline points="20%,30% 25%,20% 35%,25% 40%,15%" />
              <circle cx="20%" cy="30%" r="2" fill="#fff" />
              <circle cx="25%" cy="20%" r="2" fill="#fff" />
              <circle cx="35%" cy="25%" r="2" fill="#fff" />
              <circle cx="40%" cy="15%" r="2" fill="#fff" />

              <polyline points="70%,60% 75%,75% 85%,70% 90%,85%" />
              <circle cx="70%" cy="60%" r="2" fill="#fff" />
              <circle cx="75%" cy="75%" r="2" fill="#fff" />
              <circle cx="85%" cy="70%" r="2" fill="#fff" />
              <circle cx="90%" cy="85%" r="2" fill="#fff" />
            </g>
          </svg>
        </div>
      )}

      {type === 'C' && (
        <div className="absolute inset-0 bg-[#fffbf0]">
          {/* Sunrise Glow */}
          <div className="absolute bottom-0 left-1/2 w-[150vw] h-[150vw] rounded-full" style={{ background: 'radial-gradient(circle, rgba(255, 165, 0, 0.15) 0%, transparent 70%)', transform: 'translate(-50%, 50%)' }} />
          
          <svg className="w-full h-full absolute inset-0" xmlns="http://www.w3.org/2000/svg">
            {/* Light Rays */}
            <g opacity="0.08" stroke="#ff8c00" strokeWidth="1" fill="none">
              <line x1="50%" y1="100%" x2="10%" y2="0" />
              <line x1="50%" y1="100%" x2="30%" y2="0" />
              <line x1="50%" y1="100%" x2="50%" y2="0" />
              <line x1="50%" y1="100%" x2="70%" y2="0" />
              <line x1="50%" y1="100%" x2="90%" y2="0" />
            </g>

            {/* Pattern: Upward Arrows */}
            <g opacity="0.05" stroke="#ff8c00" strokeWidth="2" fill="none">
              {[...Array(40)].map((_, i) => (
                <path key={i} d="M -5 5 L 0 0 L 5 5 M 0 0 L 0 10" transform={`translate(${Math.random() * 100}%, ${Math.random() * 100}%) scale(0.8)`} />
              ))}
            </g>

            {/* Accents: Diamonds in Corners */}
            <g opacity="0.06" fill="#D4AF37">
              <polygon points="50,20 80,50 50,80 20,50" />
              <polygon points="calc(100% - 50px),20 calc(100% - 20px),50 calc(100% - 50px),80 calc(100% - 80px),50" />
              <polygon points="50,calc(100% - 80px) 80,calc(100% - 50px) 50,calc(100% - 20px) 20,calc(100% - 50px)" />
              <polygon points="calc(100% - 50px),calc(100% - 80px) calc(100% - 20px),calc(100% - 50px) calc(100% - 50px),calc(100% - 20px) calc(100% - 80px),calc(100% - 50px)" />
            </g>
          </svg>
        </div>
      )}

      {type === 'D' && (
        <div className="absolute inset-0 bg-[#fff0f3]">
          <svg className="w-full h-full absolute inset-0" xmlns="http://www.w3.org/2000/svg">
            {/* Corners: Roses */}
            <g opacity="0.12" fill="none" stroke="#d6336c" strokeWidth="2">
              {/* Top Left */}
              <g transform="translate(50, 50) scale(1.5)">
                <path d="M0,0 Q10,-10 20,0 Q30,10 20,20 Q10,30 0,20 Q-10,10 0,0" />
                <path d="M5,-5 Q10,-15 15,-5 Q20,5 15,15 Q5,25 -5,15 Q-15,5 -5,-5" />
              </g>
              {/* Top Right */}
              <g transform="translate(calc(100% - 50px), 50) scale(1.5)">
                <path d="M0,0 Q10,-10 20,0 Q30,10 20,20 Q10,30 0,20 Q-10,10 0,0" />
                <path d="M5,-5 Q10,-15 15,-5 Q20,5 15,15 Q5,25 -5,15 Q-15,5 -5,-5" />
              </g>
              {/* Bottom Left */}
              <g transform="translate(50, calc(100% - 50px)) scale(1.5)">
                <path d="M0,0 Q10,-10 20,0 Q30,10 20,20 Q10,30 0,20 Q-10,10 0,0" />
                <path d="M5,-5 Q10,-15 15,-5 Q20,5 15,15 Q5,25 -5,15 Q-15,5 -5,-5" />
              </g>
              {/* Bottom Right */}
              <g transform="translate(calc(100% - 50px), calc(100% - 50px)) scale(1.5)">
                <path d="M0,0 Q10,-10 20,0 Q30,10 20,20 Q10,30 0,20 Q-10,10 0,0" />
                <path d="M5,-5 Q10,-15 15,-5 Q20,5 15,15 Q5,25 -5,15 Q-15,5 -5,-5" />
              </g>
            </g>

            {/* Floating Petals */}
            <g opacity="0.08" fill="#d6336c">
              {[...Array(15)].map((_, i) => (
                <path key={i} d="M0,0 Q10,-5 20,0 Q10,5 0,0" transform={`translate(${10 + Math.random() * 80}%, ${10 + Math.random() * 80}%) rotate(${Math.random() * 360}) scale(${1 + Math.random()})`} />
              ))}
            </g>

            {/* Edge Vines */}
            <g opacity="0.10" fill="none" stroke="#84a59d" strokeWidth="2">
              <path d="M 20 0 Q 40 50 20 100 T 20 200 T 20 300 T 20 400 T 20 500 T 20 600 T 20 700 T 20 800 T 20 900 T 20 1000" />
              <path d="M calc(100% - 20px) 0 Q calc(100% - 40px) 50 calc(100% - 20px) 100 T calc(100% - 20px) 200 T calc(100% - 20px) 300 T calc(100% - 20px) 400 T calc(100% - 20px) 500 T calc(100% - 20px) 600 T calc(100% - 20px) 700 T calc(100% - 20px) 800 T calc(100% - 20px) 900 T calc(100% - 20px) 1000" />
            </g>
          </svg>
        </div>
      )}

      {type === 'E' && (
        <div className="absolute inset-0 bg-[#f5efe0]" style={{ boxShadow: 'inset 0 0 100px rgba(101, 67, 33, 0.4)' }}>
          <svg className="w-full h-full absolute inset-0" xmlns="http://www.w3.org/2000/svg">
            
            {/* Latitude/Longitude grid */}
            <g opacity="0.05" stroke="#8b4513" strokeWidth="1" fill="none">
              {[...Array(10)].map((_, i) => (
                <line key={`h-${i}`} x1="0" y1={`${i * 10}%`} x2="100%" y2={`${i * 10}%`} />
              ))}
              {[...Array(10)].map((_, i) => (
                <line key={`v-${i}`} x1={`${i * 10}%`} y1="0" x2={`${i * 10}%`} y2="100%" />
              ))}
            </g>
            
            {/* Center: Compass Rose */}
            <g opacity="0.08" fill="#8b4513" transform="translate(50%, 50%) scale(2.5)">
              <polygon points="0,-60 15,-15 60,0 15,15 0,60 -15,15 -60,0 -15,-15" />
              <polygon points="0,-60 0,0 -15,-15" fill="#5c2e0e" />
              <polygon points="60,0 0,0 15,-15" fill="#5c2e0e" />
              <polygon points="0,60 0,0 15,15" fill="#5c2e0e" />
              <polygon points="-60,0 0,0 -15,15" fill="#5c2e0e" />
              <circle cx="0" cy="0" r="40" fill="none" stroke="#8b4513" strokeWidth="1" />
            </g>

            {/* Travel Routes */}
            <g opacity="0.06" fill="none" stroke="#8b4513" strokeWidth="2" strokeDasharray="6,6">
              <path d="M 10% 20% Q 40% 10% 60% 40% T 90% 80%" />
              <path d="M 80% 20% Q 60% 30% 40% 70% T 20% 90%" />
            </g>

            {/* Mountain Range at Bottom */}
            <g opacity="0.10" fill="#6b705c" transform="translate(0, calc(100% - 100px))">
              <path d="M0,100 L0,50 L50,10 L100,60 L180,0 L250,70 L350,20 L450,80 L550,30 L650,90 L750,40 L850,80 L1000,20 L1000,100 Z" transform="scale(2, 1)" />
            </g>
          </svg>
        </div>
      )}
    </div>
  );
};

export default function Matchmaker() {
  const [step, setStep] = useState<Step>("home");
  const [language, setLanguage] = useState<Language>("en");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  const [resultType, setResultType] = useState<AnswerValue | null>(null);
  const [direction, setDirection] = useState<number>(1);
  const [displayedBooks, setDisplayedBooks] = useState<any[]>([]);
  const [copied, setCopied] = useState(false);
  const [savedResult, setSavedResult] = useState<AnswerValue | null>(null);
  const [showSavePrompt, setShowSavePrompt] = useState(false);

  const t = UI_TEXT[language];

  useEffect(() => {
    const saved = localStorage.getItem('litmatch_result') as AnswerValue | null;
    if (saved) setSavedResult(saved);
  }, []);

  useEffect(() => {
    if (step === "results" && resultType) {
      const allBooks = RESULTS_DATA[resultType as keyof typeof RESULTS_DATA].books;
      setDisplayedBooks(shuffleArray(allBooks).slice(0, 5));
      
      if (!savedResult || savedResult !== resultType) {
        setShowSavePrompt(true);
      } else {
        setShowSavePrompt(false);
      }
    }
  }, [step, resultType]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === "en" ? "ar" : "en");
  };

  const startQuiz = () => {
    setDirection(1);
    setStep("quiz");
    setCurrentQuestionIndex(0);
    setAnswers({});
  };

  const handleAnswer = (value: AnswerValue) => {
    if (!QUIZ_QUESTIONS[currentQuestionIndex]) return;

    const newAnswers = { ...answers, [QUIZ_QUESTIONS[currentQuestionIndex].id]: value };
    setAnswers(newAnswers);
    setDirection(1);

    setTimeout(() => {
      if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        calculateResults(newAnswers);
      }
    }, 250);
  };

  const goBack = () => {
    setDirection(-1);
    if (step === "quiz") {
      if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex(prev => prev - 1);
      } else {
        setStep("home");
      }
    }
  };

  const calculateResults = (finalAnswers: Record<string, AnswerValue>) => {
    const counts: Record<AnswerValue, number> = { A: 0, B: 0, C: 0, D: 0, E: 0 };
    Object.values(finalAnswers).forEach((val) => {
      counts[val]++;
    });

    let maxKey: AnswerValue = "A";
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

  const resetQuizToHome = () => {
    setDirection(-1);
    setStep("home");
    setResultType(null);
  };

  const goBackToQuiz = () => {
    setDirection(-1);
    setStep("quiz");
    setCurrentQuestionIndex(0);
    setAnswers({});
    setResultType(null);
  };

  const handleShuffle = () => {
    if (resultType) {
      const allBooks = RESULTS_DATA[resultType as keyof typeof RESULTS_DATA].books;
      setDisplayedBooks(shuffleArray(allBooks).slice(0, 5));
    }
  };

  const saveToLocalStorage = () => {
    if (resultType) {
      localStorage.setItem('litmatch_result', resultType);
      setSavedResult(resultType);
      setShowSavePrompt(false);
    }
  };

  const getShareText = () => {
    if (!resultType) return "";
    const archetype = RESULTS_DATA[resultType as keyof typeof RESULTS_DATA].title[language];
    return language === "en" 
      ? `I got ${archetype} on LitMatch! Discover yours → litmatch.vercel.app`
      : `طلعت شخصيتي الأدبية: ${archetype} في أثر! اكتشف شخصيتك ← litmatch.vercel.app`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getShareText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(getShareText())}`, '_blank');
  };

  const shareWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(getShareText())}`, '_blank');
  };

  
  
  const shareInstagram = () => {
    navigator.clipboard.writeText(getShareText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    alert(language === "en" ? "Text copied! Open Instagram to paste it in your story or post." : "تم نسخ النص! افتح انستغرام للصقه في قصتك أو منشورك.");
  };

  const shareLinkedIn = () => {
    window.open(`https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(getShareText())}`, '_blank');
  };


 const downloadResultImage = async () => {
  const el = document.getElementById("result-capture-area");
  if (!el) return;

  const canvas = await html2canvas(el, {
    useCORS: true,
    scale: 2, // improves quality + fixes some blank exports
  });

  canvas.toBlob((blob) => {
    if (!blob) return;

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "litmatch-result.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  });
};


  const loadSavedResult = () => {
    if (savedResult) {
      setResultType(savedResult);
      setStep("results");
    }
  };

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex] ?? QUIZ_QUESTIONS[0];
  const isRtl = language === "ar";
  const theme = resultType ? THEMES[resultType as keyof typeof THEMES] : THEMES.A;
  
  const quizVariants = {
    enter: (dir: number) => {
      const offset = 30 * dir;
      return { x: isRtl ? -offset : offset, opacity: 0 };
    },
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => {
      const offset = -30 * dir;
      return { x: isRtl ? -offset : offset, opacity: 0 };
    }
  };

  return (
    <div 
      className={`min-h-screen w-full flex flex-col relative overflow-hidden transition-colors duration-1000 ${step === 'results' ? theme.bg : 'bg-background'}`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      {step !== 'results' && (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] z-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover mix-blend-multiply" />
        </div>
      )}
      
      <header className={`w-full py-4 sm:py-6 px-6 sm:px-8 border-b backdrop-blur-sm sticky top-0 z-50 flex items-center justify-between transition-colors duration-1000 ${step === 'results' ? `${theme.bg} ${theme.border} border-opacity-30` : 'border-border/40 bg-background/80'}`}>
        <div className={`flex items-center gap-3 ${step === 'results' ? theme.text : 'text-primary'}`}>
          <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
          <h1 className="text-lg sm:text-xl font-bold font-serif tracking-wide">{t.title}</h1>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={toggleLanguage}
          className={`rounded-full gap-2 transition-colors duration-1000 ${step === 'results' ? `${theme.buttonOutline}` : 'text-primary border-primary/20 hover:bg-primary/5'}`}
        >
          <Languages className="w-4 h-4" />
          {language === "en" ? "عربي" : "English"}
        </Button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 relative z-10 w-full">
        <AnimatePresence mode="wait" custom={direction}>
          {step === "home" && (
            <motion.div
              key="home"
              custom={direction}
              initial="enter"
              animate="center"
              exit="exit"
              variants={quizVariants}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-2xl w-full text-center space-y-6 sm:space-y-8 py-8 sm:py-12"
            >
              <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-2 sm:mb-4 text-primary">
                <Feather className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <h2 className={`text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-foreground ${isRtl ? 'font-amiri tracking-[-0.02em]' : ''}`}>
                {t.heroTitle1} <span className="italic text-primary">{t.heroTitle2}</span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-lg mx-auto font-sans leading-relaxed">
                {t.heroSubtitle}
              </p>
              
              <div className="pt-4 sm:pt-8 flex flex-col items-center gap-4">
                <Button 
                  onClick={startQuiz}
                  size="lg" 
                  className="rounded-full px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto"
                >
                  {t.startBtn}
                  {isRtl ? <ArrowLeft className="mr-2 w-5 h-5" /> : <ArrowRight className="ml-2 w-5 h-5" />}
                </Button>
                
                {savedResult && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 inline-flex flex-col sm:flex-row items-center gap-3 p-4 bg-muted/30 rounded-2xl border border-border/50 text-sm"
                  >
                    <span className="text-muted-foreground">{t.welcomeBack} <span className="font-bold text-foreground">{RESULTS_DATA[savedResult as keyof typeof RESULTS_DATA].title[language]}</span></span>
                    <Button variant="outline" size="sm" onClick={loadSavedResult} className="rounded-full h-8 text-xs">
                      {t.seeResultAgain}
                    </Button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {step === "quiz" && (() => {
            if (!currentQuestion?.question || !currentQuestion?.options?.length) return null;
            return (
            <motion.div
              key="quiz"
              className="max-w-3xl w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="mb-4 sm:mb-6 flex items-center justify-between text-xs sm:text-sm font-medium text-muted-foreground">
                <div className="flex items-center gap-2 sm:gap-4">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={goBack}
                    className="hover:bg-primary/5 text-primary rounded-full px-2 sm:px-4"
                  >
                    {isRtl ? <ArrowRight className="ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4" /> : <ArrowLeft className="mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4" />}
                    {t.backBtn}
                  </Button>
                  <span className="tracking-widest uppercase">
                    {t.questionOf(currentQuestionIndex + 1, QUIZ_QUESTIONS.length)}
                  </span>
                </div>
                <div className="flex gap-1 sm:gap-1.5" dir="ltr">
                  {QUIZ_QUESTIONS.map((_, idx) => (
                    <div 
                      key={idx} 
                      className={`h-1 sm:h-1.5 rounded-full transition-all duration-500 ${idx <= currentQuestionIndex ? "w-4 sm:w-8 bg-primary" : "w-2 sm:w-4 bg-primary/20"}`}
                    />
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentQuestionIndex}
                  custom={direction}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  variants={quizVariants}
                  transition={{ duration: 0.4 }}
                >
                  <Card className="border-border/60 shadow-xl overflow-hidden bg-card/80 backdrop-blur-md">
                    <CardContent className="p-6 sm:p-8 md:p-10">
                      <h3 className="text-2xl sm:text-3xl font-serif font-medium mb-8 sm:mb-10 text-foreground leading-snug">
                        {currentQuestion.question?.[language] ?? ""}
                      </h3>
                      
                      <div className="space-y-3 sm:space-y-4">
                        {currentQuestion.options?.map((option, idx) => {
                          const isSelected = answers[currentQuestion?.id ?? ""] === option?.value;
                          
                          return (
                            <button
                              key={idx}
                              onClick={() => handleAnswer(option?.value as AnswerValue)}
                              className={`w-full text-start p-4 sm:p-6 rounded-xl border group transition-all duration-300 flex items-center gap-4 sm:gap-5 hover:-translate-y-0.5 
                                ${isSelected 
                                  ? "border-primary bg-primary/5 shadow-sm" 
                                  : "border-border/50 hover:border-primary hover:bg-primary/5"
                                }`}
                            >
                              <div className={`w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-full flex items-center justify-center font-bold font-serif text-sm sm:text-base transition-colors 
                                ${isSelected 
                                  ? "bg-primary text-primary-foreground" 
                                  : "bg-secondary/50 group-hover:bg-primary text-secondary-foreground group-hover:text-primary-foreground"
                                }`}
                              >
                                {option?.value}
                              </div>
                              <span className={`text-base sm:text-lg font-medium transition-colors ${isSelected ? "text-primary" : "group-hover:text-primary"}`}>
                                {option?.[language] ?? ""}
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
            );
          })()}

          {step === "results" && resultType && (
            <motion.div
              key="results"
              id="result-capture-area"
              custom={direction}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className={`max-w-7xl w-full py-6 sm:py-10 relative z-10 ${theme.text}`}
            >
              <BackgroundDecorations type={resultType} />
              <div className="relative z-[1]">
              <div className="text-center mb-10 sm:mb-16 space-y-4 sm:space-y-6">
                <p className={`${theme.text} ${theme.accent} font-medium tracking-widest uppercase text-xs sm:text-sm`}>{t.yourArchetype}</p>
                <h2 className={`text-4xl sm:text-5xl md:text-7xl font-bold font-serif ${theme.text}`}>
                  {RESULTS_DATA[resultType as keyof typeof RESULTS_DATA].title[language]}
                </h2>
                <p className={`text-lg sm:text-xl ${theme.text} ${theme.muted} max-w-2xl mx-auto font-sans leading-relaxed px-4`}>
                  {RESULTS_DATA[resultType as keyof typeof RESULTS_DATA].description[language]}
                </p>

                <div className="flex flex-wrap justify-center gap-2 sm:gap-3 pt-4 sm:pt-6">
                  <div className="print:hidden"><DropdownMenu dir={isRtl ? "rtl" : "ltr"}>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className={`rounded-full ${theme.text} ${theme.buttonOutline} border bg-transparent h-9 sm:h-10 text-xs sm:text-sm px-3 sm:px-4`}
                      >
                        <Share2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        {language === "en" ? "Share" : "مشاركة"}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center" className={`${theme.card} ${theme.border} ${theme.text}`}>
                      <DropdownMenuItem onClick={copyToClipboard} className={`cursor-pointer hover:opacity-80 ${theme.text}`}>
                        {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                        {t.copyLink}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={shareWhatsApp} className={`cursor-pointer hover:opacity-80 ${theme.text}`}>
                        <svg className="w-4 h-4 mr-2 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.405-.881-.733-1.476-1.639-1.649-1.937-.173-.298-.019-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .104 5.383.101 11.936c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c6.551 0 11.944-5.383 11.947-11.936a11.86 11.86 0 0 0-3.534-8.455"/></svg>
                        {t.shareWhatsApp}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={shareTwitter} className={`cursor-pointer hover:opacity-80 ${theme.text}`}>
                        <svg className="w-4 h-4 mr-2 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                        {t.shareX}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={shareInstagram} className={`cursor-pointer hover:opacity-80 ${theme.text}`}>
                        <svg className="w-4 h-4 mr-2 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                        {language === "en" ? "Instagram" : "انستغرام"}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={shareLinkedIn} className={`cursor-pointer hover:opacity-80 ${theme.text}`}>
                        <svg className="w-4 h-4 mr-2 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                        {language === "en" ? "LinkedIn" : "لينكد إن"}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu></div>

                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={downloadResultImage}
                    className={`print:hidden rounded-full ${theme.text} ${theme.buttonOutline} border bg-transparent h-9 sm:h-10 text-xs sm:text-sm px-3 sm:px-4`}
                  >
                    <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    {language === "en" ? "Download My Result" : "تحميل نتيجتي"}
                  </Button>

                </div>
                
                {showSavePrompt && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`mt-4 inline-flex flex-col sm:flex-row items-center gap-3 p-4 ${theme.card} ${theme.text} rounded-2xl border ${theme.border} text-sm max-w-md mx-auto shadow-md`}
                  >
                    <span className={`font-medium ${theme.text}`}>{t.saveResult}</span>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={saveToLocalStorage} className={`rounded-full h-8 text-xs ${theme.text} ${theme.button}`}>
                        {t.yesSave}
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => setShowSavePrompt(false)} className={`rounded-full h-8 text-xs ${theme.text} ${theme.muted} hover:opacity-90`}>
                        {t.noThanks}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 mb-10 sm:mb-16">
                <AnimatePresence mode="popLayout">
                  {displayedBooks.map((book) => (
                    <motion.div
                      key={book.title.en}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4 }}
                    >
                      <BookCard book={book} color={theme} language={language} t={t} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <div className="flex justify-center mb-10 sm:mb-16">
                <Button 
                  onClick={handleShuffle}
                  className={`print:hidden rounded-full px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base gap-2 shadow-md hover:shadow-lg transition-all hover:-translate-y-1 ${theme.text} ${theme.button}`}
                >
                  <Shuffle className="w-4 h-4 sm:w-5 sm:h-5" />
                  {t.shuffleBooks}
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 border-t border-opacity-20 pt-8 sm:pt-12" style={{ borderColor: theme.border.replace('border-', '') }}>
                <Button 
                  variant="outline" 
                  onClick={goBackToQuiz}
                  className={`rounded-full px-5 sm:px-6 py-5 sm:py-6 text-sm sm:text-base gap-2 w-full sm:w-auto ${theme.text} ${theme.buttonOutline} bg-transparent`}
                >
                  <RefreshCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  {t.goBack}
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={resetQuizToHome}
                  className={`rounded-full px-5 sm:px-6 py-5 sm:py-6 text-sm sm:text-base gap-2 w-full sm:w-auto ${theme.text} ${theme.muted} hover:opacity-90 hover:bg-black/5 dark:hover:bg-white/5`}
                >
                  {t.retakeQuiz}
                </Button>
              </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      
      <footer className={`w-full py-4 sm:py-6 text-center text-xs sm:text-sm transition-colors duration-1000 ${step === 'results' ? `${theme.text} ${theme.muted}` : 'text-muted-foreground'}`}>
        {t.footerMadeWith}
      </footer>
    </div>
  );
}
