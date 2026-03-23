const https = require('https');

const books = [
  // A: Deep Thinker
  { title: "1984", author: "George Orwell", isbn: "9780451524935" },
  { title: "The Secret History", author: "Donna Tartt", isbn: "9781400031702" },
  { title: "Season of Migration to the North", author: "Tayeb Salih", isbn: "9781590173029" },
  { title: "Children of the Alley", author: "Naguib Mahfouz", isbn: "9780385264731" },
  { title: "Notes from Underground", author: "Fyodor Dostoevsky", isbn: "9780679734529" },
  { title: "Crime and Punishment", author: "Fyodor Dostoevsky", isbn: "9780679734505" },
  { title: "The Stranger", author: "Albert Camus", isbn: "9780679420262" },
  { title: "The Book of Disquiet", author: "Fernando Pessoa", isbn: "9780141183046" },
  { title: "The Prophet", author: "Kahlil Gibran", isbn: "9780394404288" },
  { title: "The Plague", author: "Albert Camus", isbn: "9780679720218" },

  // B: Escapist
  { title: "Dune", author: "Frank Herbert", isbn: "9780441172719" },
  { title: "The Night Circus", author: "Erin Morgenstern", isbn: "9780307739920" },
  { title: "One Thousand and One Nights", author: "Various", isbn: "9780140449389" },
  { title: "Utopia", author: "Ahmed Khaled Tawfik", isbn: "9789774088874" },
  { title: "The Hobbit", author: "J.R.R. Tolkien", isbn: "9780547928227" },
  { title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", isbn: "9780590353427" },
  { title: "The Name of the Wind", author: "Patrick Rothfuss", isbn: "9780756404741" },
  { title: "Alice's Adventures in Wonderland", author: "Lewis Carroll", isbn: "9780141439761" },
  { title: "A Game of Thrones", author: "George R. R. Martin", isbn: "9780553593716" },
  { title: "The Chronicles of Narnia", author: "C.S. Lewis", isbn: "9780064404990" },

  // C: Motivational Seeker
  { title: "Atomic Habits", author: "James Clear", isbn: "9780735211292" },
  { title: "Man's Search for Meaning", author: "Viktor E. Frankl", isbn: "9780807014295" },
  { title: "Renew Your Life", author: "Muhammad al-Ghazali", isbn: "9789771427508" },
  { title: "Because You Are God", author: "Ali Bin Jaber Al-Fifi", isbn: "9786038202570" },
  { title: "Meditations", author: "Marcus Aurelius", isbn: "9780812968255" },
  { title: "The 7 Habits of Highly Effective People", author: "Stephen Covey", isbn: "9780743269513" },
  { title: "Think and Grow Rich", author: "Napoleon Hill", isbn: "9781585424337" },
  { title: "The Power of Now", author: "Eckhart Tolle", isbn: "9781577314806" },
  { title: "Outliers", author: "Malcolm Gladwell", isbn: "9780316017930" },
  { title: "The Alchemist", author: "Paulo Coelho", isbn: "9780061122415" },

  // D: Romantic Dreamer
  { title: "Pride and Prejudice", author: "Jane Austen", isbn: "9780141439518" },
  { title: "The Seven Husbands of Evelyn Hugo", author: "Taylor Jenkins Reid", isbn: "9781501161933" },
  { title: "Black Suits You so Well", author: "Ahlam Mosteghanemi", isbn: "9789953893351" },
  { title: "In My Heart is a Hebrew Female", author: "Khawla Hamdi", isbn: "9789973059850" },
  { title: "Jane Eyre", author: "Charlotte Brontë", isbn: "9780141441146" },
  { title: "Wuthering Heights", author: "Emily Brontë", isbn: "9780141439556" },
  { title: "Me Before You", author: "Jojo Moyes", isbn: "9780143124542" },
  { title: "Outlander", author: "Diana Gabaldon", isbn: "9780440212560" },
  { title: "The Fault in Our Stars", author: "John Green", isbn: "9780525478812" },
  { title: "Call Me By Your Name", author: "André Aciman", isbn: "9780312426781" },

  // E: Cultural Explorer
  { title: "The Kite Runner", author: "Khaled Hosseini", isbn: "9781594631931" },
  { title: "Pachinko", author: "Min Jin Lee", isbn: "9781455563920" },
  { title: "The Granada Trilogy", author: "Radwa Ashour", isbn: "9780815609111" },
  { title: "Azazeel", author: "Youssef Ziedan", isbn: "9789771442112" },
  { title: "Things Fall Apart", author: "Chinua Achebe", isbn: "9780385474542" },
  { title: "A Thousand Splendid Suns", author: "Khaled Hosseini", isbn: "9781594489501" },
  { title: "Memoirs of a Geisha", author: "Arthur Golden", isbn: "9780679781585" },
  { title: "The Joy Luck Club", author: "Amy Tan", isbn: "9780143038092" },
  { title: "The Shadow of the Wind", author: "Carlos Ruiz Zafón", isbn: "9780143034902" },
  { title: "Half of a Yellow Sun", author: "Chimamanda Ngozi Adichie", isbn: "9781400097148" },

  // F: Action Adventurer
  { title: "The Hunger Games", author: "Suzanne Collins", isbn: "9780439023481" },
  { title: "The Da Vinci Code", author: "Dan Brown", isbn: "9780307474278" },
  { title: "Bilal's Code", author: "Ahmed Khaireddine", isbn: "9786144195742" },
  { title: "The Blue Elephant", author: "Ahmed Mourad", isbn: "9789770931535" },
  { title: "The Martian", author: "Andy Weir", isbn: "9780553418026" },
  { title: "The Girl with the Dragon Tattoo", author: "Stieg Larsson", isbn: "9780307454546" },
  { title: "Gone Girl", author: "Gillian Flynn", isbn: "9780307588371" },
  { title: "The Maze Runner", author: "James Dashner", isbn: "9780385737951" },
  { title: "Angels & Demons", author: "Dan Brown", isbn: "9780671027360" },
  { title: "Jurassic Park", author: "Michael Crichton", isbn: "9780345538987" }
];

const fetch = (url) => new Promise((resolve, reject) => {
  https.get(url, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => resolve({ status: res.statusCode, data }));
  }).on('error', reject);
});

async function findVolumeId(title, author) {
  const q = `intitle:${encodeURIComponent(title)}+inauthor:${encodeURIComponent(author)}`;
  const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${q}`);
  if (res.status === 200) {
    const data = JSON.parse(res.data);
    if (data.items && data.items.length > 0) {
      for (let i = 0; i < Math.min(3, data.items.length); i++) {
        const item = data.items[i];
        if (item.volumeInfo?.imageLinks) {
           return item.id;
        }
      }
    }
  }
  return null;
}

async function main() {
  const results = {};
  
  for (const book of books) {
    console.log(`Checking: ${book.title}`);
    let volId = await findVolumeId(book.title, book.author);
    
    if (volId) {
      const url = `https://books.google.com/books/content?id=${volId}&printsec=frontcover&img=1&zoom=3`;
      console.log(`✅ ${url}`);
      results[book.title] = url;
    } else {
      const olUrl = `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`;
      console.log(`⚠️ Falling back to OL: ${olUrl}`);
      results[book.title] = olUrl;
    }
    
    await new Promise(r => setTimeout(r, 200));
  }
  
  console.log("\n--- JSON RESULTS ---");
  console.log(JSON.stringify(results, null, 2));
}

main();
