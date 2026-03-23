const fs = require('fs');
const path = require('path');

const covers = {
  "1984": "https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg",
  "The Secret History": "https://covers.openlibrary.org/b/isbn/9781400031702-L.jpg",
  "Season of Migration to the North": "https://covers.openlibrary.org/b/isbn/9781590173029-L.jpg",
  "Children of the Alley": "https://covers.openlibrary.org/b/isbn/9780385264731-L.jpg",
  "Notes from Underground": "https://covers.openlibrary.org/b/isbn/9780679734529-L.jpg",
  "Crime and Punishment": "https://covers.openlibrary.org/b/isbn/9780679734505-L.jpg",
  "The Stranger": "https://covers.openlibrary.org/b/isbn/9780679420262-L.jpg",
  "The Book of Disquiet": "https://covers.openlibrary.org/b/isbn/9780141183046-L.jpg",
  "The Prophet": "https://covers.openlibrary.org/b/isbn/9780394404288-L.jpg",
  "The Plague": "https://covers.openlibrary.org/b/isbn/9780679720218-L.jpg",
  "Dune": "https://covers.openlibrary.org/b/isbn/9780441172719-L.jpg",
  "The Night Circus": "https://covers.openlibrary.org/b/isbn/9780307739920-L.jpg",
  "One Thousand and One Nights": "https://covers.openlibrary.org/b/isbn/9780140449389-L.jpg",
  "Utopia": "https://covers.openlibrary.org/b/isbn/9789774088874-L.jpg",
  "The Hobbit": "https://covers.openlibrary.org/b/isbn/9780547928227-L.jpg",
  "Harry Potter and the Sorcerer's Stone": "https://covers.openlibrary.org/b/isbn/9780590353427-L.jpg",
  "The Name of the Wind": "https://covers.openlibrary.org/b/isbn/9780756404741-L.jpg",
  "Alice's Adventures in Wonderland": "https://covers.openlibrary.org/b/isbn/9780141439761-L.jpg",
  "A Game of Thrones": "https://covers.openlibrary.org/b/isbn/9780553593716-L.jpg",
  "The Chronicles of Narnia": "https://covers.openlibrary.org/b/isbn/9780064404990-L.jpg",
  "Atomic Habits": "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg",
  "Man's Search for Meaning": "https://covers.openlibrary.org/b/isbn/9780807014295-L.jpg",
  "Renew Your Life": "https://covers.openlibrary.org/b/isbn/9789771427508-L.jpg",
  "Because You Are God": "https://covers.openlibrary.org/b/isbn/9786038202570-L.jpg",
  "Meditations": "https://covers.openlibrary.org/b/isbn/9780812968255-L.jpg",
  "The 7 Habits of Highly Effective People": "https://covers.openlibrary.org/b/isbn/9780743269513-L.jpg",
  "Think and Grow Rich": "https://covers.openlibrary.org/b/isbn/9781585424337-L.jpg",
  "The Power of Now": "https://covers.openlibrary.org/b/isbn/9781577314806-L.jpg",
  "Outliers": "https://covers.openlibrary.org/b/isbn/9780316017930-L.jpg",
  "The Alchemist": "https://covers.openlibrary.org/b/isbn/9780061122415-L.jpg",
  "Pride and Prejudice": "https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg",
  "The Seven Husbands of Evelyn Hugo": "https://covers.openlibrary.org/b/isbn/9781501161933-L.jpg",
  "Black Suits You so Well": "https://covers.openlibrary.org/b/isbn/9789953893351-L.jpg",
  "In My Heart is a Hebrew Female": "https://covers.openlibrary.org/b/isbn/9789973059850-L.jpg",
  "Jane Eyre": "https://covers.openlibrary.org/b/isbn/9780141441146-L.jpg",
  "Wuthering Heights": "https://covers.openlibrary.org/b/isbn/9780141439556-L.jpg",
  "Me Before You": "https://covers.openlibrary.org/b/isbn/9780143124542-L.jpg",
  "Outlander": "https://covers.openlibrary.org/b/isbn/9780440212560-L.jpg",
  "The Fault in Our Stars": "https://covers.openlibrary.org/b/isbn/9780525478812-L.jpg",
  "Call Me By Your Name": "https://covers.openlibrary.org/b/isbn/9780312426781-L.jpg",
  "The Kite Runner": "https://covers.openlibrary.org/b/isbn/9781594631931-L.jpg",
  "Pachinko": "https://covers.openlibrary.org/b/isbn/9781455563920-L.jpg",
  "The Granada Trilogy": "https://covers.openlibrary.org/b/isbn/9780815609111-L.jpg",
  "Azazeel": "https://covers.openlibrary.org/b/isbn/9789771442112-L.jpg",
  "Things Fall Apart": "https://covers.openlibrary.org/b/isbn/9780385474542-L.jpg",
  "A Thousand Splendid Suns": "https://covers.openlibrary.org/b/isbn/9781594489501-L.jpg",
  "Memoirs of a Geisha": "https://covers.openlibrary.org/b/isbn/9780679781585-L.jpg",
  "The Joy Luck Club": "https://covers.openlibrary.org/b/isbn/9780143038092-L.jpg",
  "The Shadow of the Wind": "https://covers.openlibrary.org/b/isbn/9780143034902-L.jpg",
  "Half of a Yellow Sun": "https://covers.openlibrary.org/b/isbn/9781400097148-L.jpg",
  "The Hunger Games": "https://covers.openlibrary.org/b/isbn/9780439023481-L.jpg",
  "The Da Vinci Code": "https://covers.openlibrary.org/b/isbn/9780307474278-L.jpg",
  "Bilal's Code": "https://covers.openlibrary.org/b/isbn/9786144195742-L.jpg",
  "The Blue Elephant": "https://covers.openlibrary.org/b/isbn/9789770931535-L.jpg",
  "The Martian": "https://covers.openlibrary.org/b/isbn/9780553418026-L.jpg",
  "The Girl with the Dragon Tattoo": "https://covers.openlibrary.org/b/isbn/9780307454546-L.jpg",
  "Gone Girl": "https://covers.openlibrary.org/b/isbn/9780307588371-L.jpg",
  "The Maze Runner": "https://covers.openlibrary.org/b/isbn/9780385737951-L.jpg",
  "Angels & Demons": "https://covers.openlibrary.org/b/isbn/9780671027360-L.jpg",
  "Jurassic Park": "https://covers.openlibrary.org/b/isbn/9780345538987-L.jpg"
};

const gbooks = {
  "1984": "https://books.google.com/books/content?id=v3yqEAAAQBAJ&printsec=frontcover&img=1&zoom=3",
  "The Secret History": "https://books.google.com/books/content?id=A0vTDAAAQBAJ&printsec=frontcover&img=1&zoom=3",
  "Season of Migration to the North": "https://books.google.com/books/content?id=_hZjaWrQtmcC&printsec=frontcover&img=1&zoom=3",
  "Children of the Alley": "https://books.google.com/books/content?id=LvZMDAAAQBAJ&printsec=frontcover&img=1&zoom=3",
  "Notes from Underground": "https://books.google.com/books/content?id=hU5Wk0o_iCoC&printsec=frontcover&img=1&zoom=3",
  "Crime and Punishment": "https://books.google.com/books/content?id=QvB1EAAAQBAJ&printsec=frontcover&img=1&zoom=3",
  "The Stranger": "https://books.google.com/books/content?id=s66fAAAAMAAJ&printsec=frontcover&img=1&zoom=3",
  "The Book of Disquiet": "https://books.google.com/books/content?id=9d-5uQEACAAJ&printsec=frontcover&img=1&zoom=3",
  "The Prophet": "https://books.google.com/books/content?id=r6qEAAAAMAAJ&printsec=frontcover&img=1&zoom=3",
  "The Plague": "https://books.google.com/books/content?id=Y6xMEAAAQBAJ&printsec=frontcover&img=1&zoom=3",
  "Dune": "https://books.google.com/books/content?id=nrRKDwAAQBAJ&printsec=frontcover&img=1&zoom=3",
  "The Night Circus": "https://books.google.com/books/content?id=gwsgL3ZNuqkC&printsec=frontcover&img=1&zoom=3",
  "One Thousand and One Nights": "https://books.google.com/books/content?id=wzQIEAAAQBAJ&printsec=frontcover&img=1&zoom=3",
  "The Hobbit": "https://books.google.com/books/content?id=LLSpngEACAAJ&printsec=frontcover&img=1&zoom=3",
  "Harry Potter and the Sorcerer's Stone": "https://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=3",
  "The Name of the Wind": "https://books.google.com/books/content?id=pA_UDAAAQBAJ&printsec=frontcover&img=1&zoom=3",
  "Alice's Adventures in Wonderland": "https://books.google.com/books/content?id=YwKGEAAAQBAJ&printsec=frontcover&img=1&zoom=3",
  "A Game of Thrones": "https://books.google.com/books/content?id=5NomkK4EV68C&printsec=frontcover&img=1&zoom=3",
  "The Chronicles of Narnia": "https://books.google.com/books/content?id=qYw5EAAAQBAJ&printsec=frontcover&img=1&zoom=3",
  "Atomic Habits": "https://books.google.com/books/content?id=XfFvDwAAQBAJ&printsec=frontcover&img=1&zoom=3",
  "The 7 Habits of Highly Effective People": "https://books.google.com/books/content?id=Z3_qAwAAQBAJ&printsec=frontcover&img=1&zoom=3",
  "Think and Grow Rich": "https://books.google.com/books/content?id=xXfZEAAAQBAJ&printsec=frontcover&img=1&zoom=3",
  "The Power of Now": "https://books.google.com/books/content?id=e7R0DwAAQBAJ&printsec=frontcover&img=1&zoom=3",
  "Outliers": "https://books.google.com/books/content?id=xPzYBgAAQBAJ&printsec=frontcover&img=1&zoom=3",
  "The Alchemist": "https://books.google.com/books/content?id=FzVjBgAAQBAJ&printsec=frontcover&img=1&zoom=3",
  "Pride and Prejudice": "https://books.google.com/books/content?id=uY6MEAAAQBAJ&printsec=frontcover&img=1&zoom=3",
  "The Seven Husbands of Evelyn Hugo": "https://books.google.com/books/content?id=s8X3yQEACAAJ&printsec=frontcover&img=1&zoom=3",
  "Jane Eyre": "https://books.google.com/books/content?id=2-6aEAAAQBAJ&printsec=frontcover&img=1&zoom=3",
  "Wuthering Heights": "https://books.google.com/books/content?id=OqXjCQAAQBAJ&printsec=frontcover&img=1&zoom=3",
  "Me Before You": "https://books.google.com/books/content?id=H49lDAAAQBAJ&printsec=frontcover&img=1&zoom=3",
  "Outlander": "https://books.google.com/books/content?id=B5R5e-a61qUC&printsec=frontcover&img=1&zoom=3",
  "The Fault in Our Stars": "https://books.google.com/books/content?id=a64MEAAAQBAJ&printsec=frontcover&img=1&zoom=3",
  "Call Me By Your Name": "https://books.google.com/books/content?id=M8J1DwAAQBAJ&printsec=frontcover&img=1&zoom=3",
  "The Kite Runner": "https://books.google.com/books/content?id=ykWQEAAAQBAJ&printsec=frontcover&img=1&zoom=3",
  "Pachinko": "https://books.google.com/books/content?id=AV6HtAEACAAJ&printsec=frontcover&img=1&zoom=3",
  "The Granada Trilogy": "https://books.google.com/books/content?id=K3kuQnjHMi0C&printsec=frontcover&img=1&zoom=3",
  "Things Fall Apart": "https://books.google.com/books/content?id=2plPEAAAQBAJ&printsec=frontcover&img=1&zoom=3",
  "A Thousand Splendid Suns": "https://books.google.com/books/content?id=pYwFEAAAQBAJ&printsec=frontcover&img=1&zoom=3",
  "Memoirs of a Geisha": "https://books.google.com/books/content?id=zIqWEAAAQBAJ&printsec=frontcover&img=1&zoom=3",
  "The Joy Luck Club": "https://books.google.com/books/content?id=6u2fEAAAQBAJ&printsec=frontcover&img=1&zoom=3",
  "The Shadow of the Wind": "https://books.google.com/books/content?id=9H2pEAAAQBAJ&printsec=frontcover&img=1&zoom=3",
  "Half of a Yellow Sun": "https://books.google.com/books/content?id=bV19EAAAQBAJ&printsec=frontcover&img=1&zoom=3",
  "The Hunger Games": "https://books.google.com/books/content?id=sJdUAzLUNyAC&printsec=frontcover&img=1&zoom=3",
  "The Da Vinci Code": "https://books.google.com/books/content?id=YuDl2Wl651AC&printsec=frontcover&img=1&zoom=3",
  "The Blue Elephant": "https://books.google.com/books/content?id=BY8mDAAAQBAJ&printsec=frontcover&img=1&zoom=3",
  "The Martian": "https://books.google.com/books/content?id=2NIpDAAAQBAJ&printsec=frontcover&img=1&zoom=3",
  "The Girl with the Dragon Tattoo": "https://books.google.com/books/content?id=r6qEAAAAMAAJ&printsec=frontcover&img=1&zoom=3",
  "Gone Girl": "https://books.google.com/books/content?id=2u3wEAAAQBAJ&printsec=frontcover&img=1&zoom=3",
  "The Maze Runner": "https://books.google.com/books/content?id=k_6FEAAAQBAJ&printsec=frontcover&img=1&zoom=3",
  "Angels & Demons": "https://books.google.com/books/content?id=W9eHEAAAQBAJ&printsec=frontcover&img=1&zoom=3",
  "Jurassic Park": "https://books.google.com/books/content?id=12qWEAAAQBAJ&printsec=frontcover&img=1&zoom=3",
  "Meditations": "https://books.google.com/books/content?id=brSidvTKfcQC&printsec=frontcover&img=1&zoom=3"
};

const finalCovers = { ...covers, ...gbooks };

let content = fs.readFileSync('client/src/pages/Matchmaker.tsx', 'utf8');

// Replace the BookCover component with a static one
content = content.replace(
  /const BookCover = \({ titleEn, titleAr, authorEn, authorAr, color }: { titleEn: string, titleAr: string, authorEn: string, authorAr: string, color: string }\) => {[\s\S]*?return \([\s\S]*?<div className={`h-\[220px\] shrink-0 relative flex items-center justify-center overflow-hidden \${color}`}>[\s\S]*?{!imageError && coverUrl && \([\s\S]*?<motion.img[\s\S]*?src={coverUrl}[\s\S]*?alt={titleEn}[\s\S]*?onError={\(\) => setImageError\(true\)}[\s\S]*?className="w-full h-full object-cover object-center z-20"[\s\S]*?\/>[\s\S]*?\)}[\s\S]*?<\/div>[\s\S]*?\)[\s\S]*?}/g,
  `const BookCover = ({ coverUrl, title, color }: { coverUrl?: string, title: string, color: string }) => {
  const [imageError, setImageError] = useState(false);
  
  return (
    <div className={\`h-[220px] shrink-0 relative flex items-center justify-center overflow-hidden \${color}\`}>
      {!imageError && coverUrl && (
        <motion.img 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          src={coverUrl} 
          alt={title} 
          onError={() => setImageError(true)}
          className="w-full h-full object-cover object-center z-20"
        />
      )}
    </div>
  )
}`
);

// Inject coverUrl to every book in RESULTS_DATA
const bookRegex = /title: \{ en: "([^"]+)", ar:/g;
let newContent = "";
let lastIndex = 0;

let match;
while ((match = bookRegex.exec(content)) !== null) {
  const title = match[1];
  const coverUrl = finalCovers[title] || null;
  
  newContent += content.substring(lastIndex, match.index);
  
  if (coverUrl) {
    newContent += `coverUrl: "${coverUrl}",\n        `;
  }
  
  newContent += match[0];
  lastIndex = match.index + match[0].length;
}
newContent += content.substring(lastIndex);

// Replace component calls
newContent = newContent.replace(
  /<BookCover \s*titleEn={book\.title\.en}\s*titleAr={book\.title\.ar}\s*authorEn={book\.author\.en}\s*authorAr={book\.author\.ar}\s*color={RESULTS_DATA\[resultType\]\.placeholderColor}\s*\/>/g,
  `<BookCover 
                          coverUrl={(book as any).coverUrl}
                          title={book.title[language]}
                          color={RESULTS_DATA[resultType].placeholderColor}
                        />`
);

fs.writeFileSync('client/src/pages/Matchmaker.tsx', newContent);
console.log('Fixed covers successfully');
