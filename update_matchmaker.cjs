const fs = require('fs');

let content = fs.readFileSync('client/src/pages/Matchmaker.tsx', 'utf8');

// --- 1. Fix Button Layout ---

// Move Shuffle Books button below the cards, make it outlined and smaller
// Make Retake Quiz / Home buttons plain text at the very bottom

// Remove Shuffle button from top
content = content.replace(
  /<Button\s+onClick=\{shuffleBooks\}\s+className=\{`print:hidden rounded-full px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base gap-2 shadow-md hover:shadow-lg transition-all hover:-translate-y-1 \$\{theme.button\}`\}\s+>\s+<RefreshCcw className="w-4 h-4 sm:w-5 sm:h-5" \/>\s+\{language === "en" \? "Shuffle Books" : "تغيير الكتب"\}\s+<\/Button>/,
  ''
);

// We need to inject the Shuffle button BELOW the books grid
const gridEndIndex = content.indexOf('</motion.div>\n\n            {/* Actions */}');
if (gridEndIndex > -1) {
  const insertIndex = content.indexOf('</div>', gridEndIndex);
  if (insertIndex > -1) {
    const shuffleBtn = `
            {/* New secondary Shuffle button */}
            <div className="flex justify-center mt-8 print:hidden">
              <Button 
                onClick={shuffleBooks}
                variant="outline"
                className={\`rounded-full px-6 py-2 text-sm sm:text-base gap-2 shadow-sm hover:shadow transition-all \${theme.text} \${theme.buttonOutline}\`}
              >
                <RefreshCcw className="w-4 h-4" />
                {language === "en" ? "Shuffle Books" : "تغيير الكتب"}
              </Button>
            </div>
`;
    // Insert after the grid container closes
    content = content.slice(0, insertIndex + 6) + shuffleBtn + content.slice(insertIndex + 6);
  }
}

// Redesign bottom buttons (Restart / Home)
const bottomButtonsRegex = /<div className="flex flex-col sm:flex-row gap-4 justify-center print:hidden border-t pt-8">[\s\S]*?<\/div>/;
const newBottomButtons = `<div className="flex flex-row gap-6 justify-center print:hidden border-t border-black/10 dark:border-white/10 pt-6 mt-8">
              <button 
                onClick={goBackToQuiz}
                className={\`text-sm hover:underline underline-offset-4 \${theme.text}\`}
              >
                {language === "en" ? "Retake Quiz" : "إعادة الاختبار"}
              </button>
              <span className={\`opacity-30 \${theme.text}\`}>|</span>
              <button 
                onClick={resetQuizToHome}
                className={\`text-sm hover:underline underline-offset-4 \${theme.text}\`}
              >
                {language === "en" ? "Return to Home" : "العودة للرئيسية"}
              </button>
            </div>`;
content = content.replace(bottomButtonsRegex, newBottomButtons);


// --- 2. Add Deep Personality Description ---

const deepDescriptionsObj = `
const PERSONALITY_TRAITS: Record<AnswerValue, {
  en: { reader: string, strength: string, challenge: string, ideal: string },
  ar: { reader: string, strength: string, challenge: string, ideal: string }
}> = {
  A: {
    ar: {
      reader: "تقرأ ببطء ومقصودية، تعود للفقرات وتكتب ملاحظات",
      strength: "قدرتك على استخراج معنى عميق من كل كلمة",
      challenge: "أحياناً تتوقف عن الكتب السهلة قبل أن تمنحها فرصة",
      ideal: "رواية فلسفية ثقيلة تحتاج قراءتين لتفهمها"
    },
    en: {
      reader: "You read slowly and intentionally, returning to passages and taking notes",
      strength: "Your ability to extract profound meaning from every word",
      challenge: "You sometimes abandon easy books before giving them a chance",
      ideal: "A heavy philosophical novel that requires two reads to fully understand"
    }
  },
  B: {
    ar: {
      reader: "تختفي في الكتاب تماماً وتنسى العالم من حولك",
      strength: "خيالك الواسع يجعلك تعيش القصص بشكل لا يصدق",
      challenge: "الكتب الواقعية تبدو مملة مقارنة بعوالمك المفضلة",
      ideal: "عالم خيالي بتفاصيل دقيقة تجعلك تنسى أنه وهم"
    },
    en: {
      reader: "You disappear completely into books, forgetting the world around you",
      strength: "Your vivid imagination makes you experience stories like no one else",
      challenge: "Realistic books feel dull compared to your favorite fantasy worlds",
      ideal: "A fantasy world so detailed you forget it isn't real"
    }
  },
  C: {
    ar: {
      reader: "تقرأ بقلم في يدك وتضع خطوطاً تحت الجمل المهمة",
      strength: "قدرتك على تحويل كل كتاب إلى خطة عمل حقيقية",
      challenge: "أحياناً تقرأ الكثير دون أن تطبق ما تعلمته",
      ideal: "كتاب يعطيك أدوات واضحة تغير سلوكك اليومي"
    },
    en: {
      reader: "You read with a pen in hand, underlining every important sentence",
      strength: "Your ability to turn every book into a real action plan",
      challenge: "You sometimes read too much without applying what you've learned",
      ideal: "A book that gives you clear tools to change your daily behavior"
    }
  },
  D: {
    ar: {
      reader: "تتعلق بالشخصيات كأنهم أصدقاء حقيقيون",
      strength: "حساسيتك العالية تجعلك تفهم الشخصيات بعمق استثنائي",
      challenge: "الكتب الحزينة تؤثر فيك لأيام بعد انتهائها",
      ideal: "قصة حب تؤمن بها وتتمنى لو أنها حقيقية"
    },
    en: {
      reader: "You become attached to characters as if they are real friends",
      strength: "Your sensitivity gives you exceptional understanding of characters",
      challenge: "Sad books affect you for days after you finish them",
      ideal: "A love story you believe in and wish were real"
    }
  },
  E: {
    ar: {
      reader: "تبحث عن خرائط وصور الأماكن التي تقرأ عنها",
      strength: "فضولك اللامحدود يجعلك الأكثر ثقافةً وتنوعاً",
      challenge: "أحياناً تبدأ كتباً كثيرة في نفس الوقت",
      ideal: "رواية تأخذك لزمن أو مكان لم تزره وتجعلك تشعر أنك عشت هناك"
    },
    en: {
      reader: "You look up maps and photos of every place you read about",
      strength: "Your boundless curiosity makes you the most culturally rich reader",
      challenge: "You sometimes start too many books at the same time",
      ideal: "A novel that takes you somewhere you've never been and makes you feel you lived there"
    }
  }
};
`;

if (!content.includes('const PERSONALITY_TRAITS')) {
  // Insert before RESULTS_DATA
  content = content.replace('const RESULTS_DATA: Record<AnswerValue,', deepDescriptionsObj + '\nconst RESULTS_DATA: Record<AnswerValue,');
}

// Add the description grid after the tagline
const traitsGridHtml = `
            {/* Deep Personality Description Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-4xl mx-auto my-8 print:my-4">
              {[
                { 
                  icon: <BookOpen className="w-4 h-4 opacity-70" />, 
                  label: language === "en" ? "As a Reader" : "كقارئ أنت", 
                  text: PERSONALITY_TRAITS[resultType as AnswerValue][language].reader 
                },
                { 
                  icon: <Star className="w-4 h-4 opacity-70" />, 
                  label: language === "en" ? "Your Strength" : "نقطة قوتك", 
                  text: PERSONALITY_TRAITS[resultType as AnswerValue][language].strength 
                },
                { 
                  icon: <Target className="w-4 h-4 opacity-70" />, 
                  label: language === "en" ? "Your Challenge" : "تحديك", 
                  text: PERSONALITY_TRAITS[resultType as AnswerValue][language].challenge 
                },
                { 
                  icon: <Heart className="w-4 h-4 opacity-70" />, 
                  label: language === "en" ? "Your Ideal Book" : "كتابك المثالي", 
                  text: PERSONALITY_TRAITS[resultType as AnswerValue][language].ideal 
                }
              ].map((item, i) => (
                <div key={i} className={\`p-4 rounded-xl border border-black/5 dark:border-white/5 \${theme.card} flex flex-col gap-2\`}>
                  <div className={\`flex items-center gap-2 font-bold text-sm \${theme.text}\`}>
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  <p className={\`text-sm opacity-90 leading-relaxed \${theme.text}\`}>{item.text}</p>
                </div>
              ))}
            </div>
`;

// Insert after tagline: `<p className={\`text-xl sm:text-2xl mb-8 opacity-90 \${theme.text}\`}>{tagline}</p>`
content = content.replace(
  /<p className=\{`text-xl sm:text-2xl mb-8 opacity-90 \$\{theme\.text\}`\}>\{tagline\}<\/p>/,
  `<p className={\`text-xl sm:text-2xl mb-4 sm:mb-6 opacity-90 \${theme.text}\`}>{tagline}</p>` + traitsGridHtml
);

// We need to import Target and Star if they are missing
if (!content.includes('Target')) {
  content = content.replace('BookOpen, Heart', 'BookOpen, Heart, Target, Star');
}


// --- 3. Fix Missing Book Covers & Add Styled Placeholder ---

// First update the specific Arabic books mentioned in the prompt with accurate covers
const coverUpdates = {
  "موسم الهجرة إلى الشمال": "https://m.media-amazon.com/images/I/71Y-s21aJtL.jpg",
  "أولاد حارتنا": "https://m.media-amazon.com/images/I/41K-mF1e1iL.jpg",
  "النبي": "https://m.media-amazon.com/images/I/71eA3P+S5xL.jpg",
  "رسائل من تحت الأرض": "https://m.media-amazon.com/images/I/41I+nU6oQLL.jpg",
  "ألف ليلة وليلة": "https://m.media-amazon.com/images/I/51wXb-M5U4L.jpg",
  "يوتوبيا": "https://m.media-amazon.com/images/I/41a1k8+XpwL.jpg",
  "في قلبها أنثى عبرية": "https://m.media-amazon.com/images/I/41-NqL+z4HL.jpg"
};

for (const [title, newCover] of Object.entries(coverUpdates)) {
  const bookRegex = new RegExp(`title: \\{ en: "[^"]+", ar: "${title}" \\}.*?coverUrl: "([^"]+)"`, 's');
  content = content.replace(bookRegex, (match, oldCover) => {
    return match.replace(`coverUrl: "${oldCover}"`, `coverUrl: "${newCover}"`);
  });
}

// Modify BookCard to show styled fallback instead of broken images/placeholders
const bookCardRegex = /const BookCard = \(\{ book, index, isRtl, theme, resultType \}: \{ book: any, index: number, isRtl: boolean, theme: any, resultType: string \}\) => \{([\s\S]*?)\};/s;

const newBookCardBody = `
  const isDarkTheme = resultType === 'A' || resultType === 'B';
  const [imgError, setImgError] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // Determine if we should show a fallback cover
  // Many Google Books URLs or placehold.co ones are unreliable, so we use the styled fallback if error occurs
  const showFallback = imgError || !book.coverUrl || book.coverUrl.includes('placehold.co') || book.coverUrl.includes('via.placeholder');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={\`flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-6 rounded-2xl sm:rounded-3xl border shadow-sm \${theme.card}\`}
      style={{ boxShadow: isDarkTheme ? '0 0 20px rgba(255, 255, 255, 0.04)' : undefined }}
    >
      <div className="w-full sm:w-32 h-48 sm:h-48 flex-shrink-0 mx-auto sm:mx-0 overflow-hidden rounded-lg sm:rounded-xl bg-white/5 border border-black/10 dark:border-white/10 relative">
        {showFallback ? (
          <div className={\`w-full h-full flex flex-col items-center justify-center p-4 text-center \${theme.card} relative overflow-hidden\`}>
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)', backgroundSize: '10px 10px', backgroundPosition: '0 0, 5px 5px' }}></div>
            <h4 className={\`font-bold text-sm mb-2 \${isRtl ? 'font-amiri' : ''} \${theme.text} z-10\`}>
              {isRtl ? book.title.ar : book.title.en}
            </h4>
            <p className={\`text-xs opacity-70 \${theme.text} z-10\`}>
              {isRtl ? book.author.ar : book.author.en}
            </p>
          </div>
        ) : (
          <img 
            src={book.coverUrl} 
            alt={isRtl ? book.title.ar : book.title.en}
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover shadow-sm transition-transform hover:scale-105"
            loading="lazy"
          />
        )}
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <h3 className={\`text-xl sm:text-2xl font-bold mb-1 \${isRtl ? 'font-amiri' : ''} \${theme.text}\`}>
          {isRtl ? book.title.ar : book.title.en}
        </h3>
        <p className={\`text-sm sm:text-base opacity-80 mb-3 sm:mb-4 \${theme.text}\`}>
          {isRtl ? book.author.ar : book.author.en}
        </p>
        
        <p className={\`text-sm leading-relaxed mb-4 \${theme.text} \${expanded ? '' : 'line-clamp-2 sm:line-clamp-3'}\`}>
          {isRtl ? book.description.ar : book.description.en}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <button 
            onClick={() => setExpanded(!expanded)}
            className={\`text-xs font-semibold hover:underline \${theme.text}\`}
          >
            {expanded 
              ? (isRtl ? "عرض أقل" : "Show less") 
              : (isRtl ? "اقرأ المزيد" : "Read more")}
          </button>
          
          <div className={\`flex items-center gap-1 text-xs opacity-60 \${theme.text}\`}>
            <BookOpen className="w-3 h-3" />
            <span>{isRtl ? \`\${book.pages} صفحة\` : \`\${book.pages} pages\`}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
`;

content = content.replace(bookCardRegex, `const BookCard = ({ book, index, isRtl, theme, resultType }: { book: any, index: number, isRtl: boolean, theme: any, resultType: string }) => {${newBookCardBody}};`);


// Fix the Footer credits
content = content.replace(
  /Built with ❤️ by Hadeel Awaji<\/p>\s+<\/footer>/g,
  'Built with ❤️ by Hadeel Awaji</p>\n      </footer>'
);


fs.writeFileSync('client/src/pages/Matchmaker.tsx', content);
