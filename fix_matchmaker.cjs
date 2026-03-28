const fs = require('fs');

let content = fs.readFileSync('client/src/pages/Matchmaker.tsx', 'utf8');

// 1. Footer text
content = content.replace(/Built with ❤️ by Hadeel Awaji/g, 'Built with ❤️ by Hadeel Awaji'); // Just in case, already done. Wait, previous instruction asked to change "Made with ❤️ by LitMatch Team" to "Built with ❤️ by Hadeel Awaji". Let's do both to be safe.
content = content.replace(/Made with ❤️ by LitMatch Team/g, 'Built with ❤️ by Hadeel Awaji');

// 2. Change Deep Thinker background from brown to lighter beige
content = content.replace(/bg-\[#1a1008\]/g, 'bg-[#fdf6e3]');

// Deep thinker is no longer dark theme for cards
content = content.replace(
  /const isDarkTheme = resultType === 'A' \|\| resultType === 'B';/g,
  "const isDarkTheme = resultType === 'B';"
);

// Fix Deep thinker SVGs
content = content.replace(
  /backgroundImage: 'linear-gradient\\(transparent 99%, #ffffff 1%\\)'/g,
  "backgroundImage: 'linear-gradient(transparent 99%, rgba(0,0,0,0.05) 1%)'"
);

content = content.replace(
  /<g opacity="0.08" stroke="#d4af37" fill="none" strokeWidth="2" transform="translate\(50%, 50%\) scale\(2\) translate\(-50, -50\)">/g,
  '<g opacity="0.12" stroke="#8b5a2b" fill="none" strokeWidth="2" transform="translate(50%, 50%) scale(2) translate(-50, -50)">'
);

content = content.replace(
  /<g opacity="0.15" stroke="#d4af37" fill="none" transform="translate\(calc\(100% - 150px\), calc\(100% - 150px\)\) scale\(1.5\)">/g,
  '<g opacity="0.20" stroke="#8b5a2b" fill="none" transform="translate(calc(100% - 150px), calc(100% - 150px)) scale(1.5)">'
);

// 3. Longer description for the archetype
const descriptions = {
  A: {
    en: "You are the Deep Thinker. You don't just read books; you study them. You underline profound passages, reflect on philosophical dilemmas, and seek literature that challenges your understanding of the world. For you, reading is a solitary journey into the depths of human existence, where every page holds the potential for a new revelation. You prefer quality over quantity, and a book that stays with you for months is worth more than a dozen quick reads.",
    ar: "أنت المفكر العميق. أنت لا تقرأ الكتب فحسب، بل تدرسها. تضع خطوطاً تحت العبارات العميقة، وتتأمل في المعضلات الفلسفية، وتبحث عن الأدب الذي يتحدى فهمك للعالم. بالنسبة لك، القراءة هي رحلة فردية في أعماق الوجود الإنساني، حيث تحمل كل صفحة إمكانية اكتشاف جديد. أنت تفضل الجودة على الكمية، والكتاب الذي يبقى في ذاكرتك لأشهر يساوي أكثر من عشرات القراءات السريعة."
  },
  B: {
    en: "You are the Escapist. The real world is often too mundane, so you use books as portals to other dimensions. You thrive on magic systems, epic quests, and characters who defy the impossible. When you read, you lose all sense of time, completely immersed in the landscapes crafted by the author. You don't just witness the story; you live it, fighting alongside heroes and soaring through skies of realms that exist only in imagination.",
    ar: "أنت الهارب من الواقع. غالباً ما يكون العالم الحقيقي مملاً، لذا تستخدم الكتب كبوابات لأبعاد أخرى. أنت تزدهر في أنظمة السحر، والمهام الملحمية، والشخصيات التي تتحدى المستحيل. عندما تقرأ، تفقد الإحساس بالوقت، منغمساً تماماً في المناظر التي يصنعها المؤلف. أنت لا تشهد القصة فحسب؛ بل تعيشها، تقاتل جنباً إلى جنب مع الأبطال وتحلق في سماء عوالم لا توجد إلا في الخيال."
  },
  C: {
    en: "You are the Motivational Seeker. You view books as stepping stones to your best self. Non-fiction, self-help, and biographies of great leaders are your preferred fuel. You read with purpose, seeking actionable advice, powerful habits, and mindset shifts that can elevate your daily life. Every chapter you conquer is a tool added to your arsenal, propelling you forward in your career, relationships, and personal growth.",
    ar: "أنت الباحث عن التحفيز. تنظر إلى الكتب كنقطة انطلاق نحو أفضل نسخة من نفسك. الكتب الواقعية، وتطوير الذات، وسير القادة العظماء هي وقودك المفضل. تقرأ بهدف، باحثاً عن نصائح قابلة للتطبيق، وعادات قوية، وتحولات في طريقة التفكير يمكن أن ترتقي بحياتك اليومية. كل فصل تنهيه هو أداة تضاف إلى ترسانتك، تدفعك للأمام في حياتك المهنية وعلاقاتك ونموك الشخصي."
  },
  D: {
    en: "You are the Romantic Dreamer. You read with your heart wide open, seeking narratives that evoke profound emotion. Whether it's a sweeping historical romance or a poignant contemporary drama, you are captivated by the complexities of human relationships, love, and heartbreak. You cherish beautiful prose and moments that make you sigh, swoon, or cry. For you, the most powerful stories are the ones that make you feel deeply alive.",
    ar: "أنت الحالم الرومانسي. تقرأ بقلب مفتوح، باحثاً عن الروايات التي تثير مشاعر عميقة. سواء كانت قصة حب تاريخية جارفة أو دراما معاصرة مؤثرة، فإنك تأسر بتعقيدات العلاقات الإنسانية والحب والقلوب المنكسرة. أنت تقدر النثر الجميل واللحظات التي تجعلك تتنهد أو تبكي. بالنسبة لك، أقوى القصص هي تلك التي تجعلك تشعر بالحياة بعمق."
  },
  E: {
    en: "You are the Cultural Explorer. Your bookshelf is a passport to the globe. You crave stories that immerse you in unfamiliar cultures, historical eras, and diverse perspectives. Translated fiction, historical novels, and rich memoirs are your treasures. Through reading, you travel to places you've never been, taste foods you've never eaten, and understand lives vastly different from your own. Your curiosity knows no borders.",
    ar: "أنت المستكشف الثقافي. مكتبتك هي جواز سفرك حول العالم. أنت تتوق للقصص التي تغمرك في ثقافات غير مألوفة، وعصور تاريخية، ووجهات نظر متنوعة. الأدب المترجم، والروايات التاريخية، والمذكرات الغنية هي كنوزك. من خلال القراءة، تسافر إلى أماكن لم تزرها من قبل، وتتذوق أطعمة لم تأكلها، وتفهم حيوات تختلف اختلافاً شاسعاً عن حياتك. فضولك لا يعرف حدوداً."
  }
};

for (const key of Object.keys(descriptions)) {
  const enMatch = new RegExp(key + ': \\{[\\s\\S]*?description: \\{\\s*en: "([^"]+)",\\s*ar: "([^"]+)"\\s*\\}');
  content = content.replace(enMatch, (match) => {
    return match.replace(/en: "[^"]+"/, 'en: "' + descriptions[key].en + '"')
                .replace(/ar: "[^"]+"/, 'ar: "' + descriptions[key].ar + '"');
  });
}

// 4. Fix missing book covers
const covers = {
  // Deep Thinker
  "The Brothers Karamazov": "https://m.media-amazon.com/images/I/71rIvvKj8wL.jpg",
  "Critique of Pure Reason": "https://m.media-amazon.com/images/I/71oX3L29gOL.jpg",
  "The Myth of Sisyphus": "https://m.media-amazon.com/images/I/41-i2oV8f4L.jpg",
  "The Stranger": "https://m.media-amazon.com/images/I/81A+XyBv8aL.jpg",
  "Thus Spoke Zarathustra": "https://m.media-amazon.com/images/I/51rYfG8PzTL.jpg",
  
  // Escapist
  "Dune": "https://m.media-amazon.com/images/I/81ym3QUd3KL.jpg",
  "The Name of the Wind": "https://m.media-amazon.com/images/I/91b8oNwaV1L.jpg",
  "Neuromancer": "https://m.media-amazon.com/images/I/81oE5BVDfLL.jpg",
  "The Way of Kings": "https://m.media-amazon.com/images/I/91rY71nB2aL.jpg",
  "The Final Empire": "https://m.media-amazon.com/images/I/91bSQ2N0ZGL.jpg",
  
  // Motivational Seeker
  "Deep Work": "https://m.media-amazon.com/images/I/81jjXv1L5bL.jpg",
  "Ego is the Enemy": "https://m.media-amazon.com/images/I/71b2D1Q-o8L.jpg",
  "Essentialism": "https://m.media-amazon.com/images/I/81OqL24kQyL.jpg",
  "The Obstacle Is the Way": "https://m.media-amazon.com/images/I/71zV-0K1JtL.jpg",
  "Grit": "https://m.media-amazon.com/images/I/71v1R8PnsXL.jpg",
  
  // Romantic Dreamer
  "Me Before You": "https://m.media-amazon.com/images/I/815zE9dXYCL.jpg",
  "The Fault in Our Stars": "https://m.media-amazon.com/images/I/81tZp-u6yAL.jpg",
  "Normal People": "https://m.media-amazon.com/images/I/817tHNcyAgL.jpg",
  "A Walk to Remember": "https://m.media-amazon.com/images/I/81BCEbA5H1L.jpg",
  "The Time Traveler's Wife": "https://m.media-amazon.com/images/I/71X8k8hXp-L.jpg",
  
  // Cultural Explorer
  "Pachinko": "https://m.media-amazon.com/images/I/81E1528T1eL.jpg",
  "The Kite Runner": "https://m.media-amazon.com/images/I/81aMh9AXYmL.jpg",
  "Americanah": "https://m.media-amazon.com/images/I/81Q1I+hH-OL.jpg",
  "Homegoing": "https://m.media-amazon.com/images/I/91y07V+MstL.jpg",
  "The Book Thief": "https://m.media-amazon.com/images/I/81eB+7+CkUL.jpg"
};

for (const [title, url] of Object.entries(covers)) {
  const regex = new RegExp('title: \\{ en: "' + title + '"[\\s\\S]*?coverUrl: "([^"]+)"', 's');
  content = content.replace(regex, (match, oldUrl) => {
    return match.replace(oldUrl, url);
  });
}

// Ensure all "placehold.co" get stripped out so the nice fallback runs.
content = content.replace(/coverUrl: "https:\/\/placehold.co\/[^"]+"/g, 'coverUrl: ""');

fs.writeFileSync('client/src/pages/Matchmaker.tsx', content);
