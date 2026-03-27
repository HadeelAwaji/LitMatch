const https = require('https');

const books = [
  // A: Deep Thinker
  { id: "A1", title: "1984", author: "George Orwell", isbn: "9780451524935" },
  { id: "A2", title: "The Secret History", author: "Donna Tartt", isbn: "9781400031702" },
  { id: "A3", title: "Crime and Punishment", author: "Fyodor Dostoevsky", isbn: "9780679734505" },
  { id: "A4", title: "The Stranger", author: "Albert Camus", isbn: "9780679420262" },
  { id: "A5", title: "Steppenwolf", author: "Hermann Hesse", isbn: "9780312278670" },
  { id: "A6", title: "The Master and Margarita", author: "Mikhail Bulgakov", isbn: "9780679760801" },
  { id: "A7", title: "Season of Migration to the North", author: "Tayeb Salih", isbn: "9781590173029" },
  { id: "A8", title: "Children of the Alley", author: "Naguib Mahfouz", isbn: "9780385264731" },
  { id: "A9", title: "The Prophet", author: "Kahlil Gibran", isbn: "9780394404288" },
  { id: "A10", title: "Notes from Underground", author: "Fyodor Dostoevsky", isbn: "9780679734529" },

  // B: Escapist
  { id: "B1", title: "Dune", author: "Frank Herbert", isbn: "9780441172719" },
  { id: "B2", title: "The Name of the Wind", author: "Patrick Rothfuss", isbn: "9780756404741" },
  { id: "B3", title: "The Night Circus", author: "Erin Morgenstern", isbn: "9780307739920" },
  { id: "B4", title: "The Hobbit", author: "J.R.R. Tolkien", isbn: "9780547928227" },
  { id: "B5", title: "Mistborn", author: "Brandon Sanderson", isbn: "9780765311788" },
  { id: "B6", title: "The Hitchhiker's Guide to the Galaxy", author: "Douglas Adams", isbn: "9780345391803" },
  { id: "B7", title: "One Thousand and One Nights", author: "Various", isbn: "9780140449389" },
  { id: "B8", title: "Utopia", author: "Ahmed Khaled Tawfik", isbn: "9789774088874" },
  { id: "B9", title: "The Chronicles of Narnia", author: "C.S. Lewis", isbn: "9780064404990" },
  { id: "B10", title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", isbn: "9780590353427" },

  // C: Motivational Seeker
  { id: "C1", title: "Atomic Habits", author: "James Clear", isbn: "9780735211292" },
  { id: "C2", title: "Man's Search for Meaning", author: "Viktor E. Frankl", isbn: "9780807014295" },
  { id: "C3", title: "Meditations", author: "Marcus Aurelius", isbn: "9780812968255" },
  { id: "C4", title: "The Alchemist", author: "Paulo Coelho", isbn: "9780061122415" },
  { id: "C5", title: "Start With Why", author: "Simon Sinek", isbn: "9781591846444" },
  { id: "C6", title: "Can't Hurt Me", author: "David Goggins", isbn: "9781544512280" },
  { id: "C7", title: "Zero to One", author: "Peter Thiel", isbn: "9780804139298" },
  { id: "C8", title: "Renew Your Life", author: "Muhammad al-Ghazali", isbn: "9789771427508" },
  { id: "C9", title: "Because You Are God", author: "Ali Bin Jaber Al-Fifi", isbn: "9786038202570" },
  { id: "C10", title: "The 7 Habits of Highly Effective People", author: "Stephen Covey", isbn: "9780743269513" },

  // D: Romantic Dreamer
  { id: "D1", title: "Pride and Prejudice", author: "Jane Austen", isbn: "9780141439518" },
  { id: "D2", title: "The Seven Husbands of Evelyn Hugo", author: "Taylor Jenkins Reid", isbn: "9781501161933" },
  { id: "D3", title: "Jane Eyre", author: "Charlotte Brontë", isbn: "9780141441146" },
  { id: "D4", title: "Normal People", author: "Sally Rooney", isbn: "9781984822178" },
  { id: "D5", title: "The Notebook", author: "Nicholas Sparks", isbn: "9780446605236" },
  { id: "D6", title: "Anna Karenina", author: "Leo Tolstoy", isbn: "9780143035008" },
  { id: "D7", title: "Black Suits You so Well", author: "Ahlam Mosteghanemi", isbn: "9789953893351" },
  { id: "D8", title: "In My Heart is a Hebrew Female", author: "Khawla Hamdi", isbn: "9789973059850" },
  { id: "D9", title: "The Love Hypothesis", author: "Ali Hazelwood", isbn: "9780593336823" },
  { id: "D10", title: "A Little Life", author: "Hanya Yanagihara", isbn: "9780804172707" },

  // E: Cultural Explorer
  { id: "E1", title: "The Kite Runner", author: "Khaled Hosseini", isbn: "9781594631931" },
  { id: "E2", title: "Pachinko", author: "Min Jin Lee", isbn: "9781455563920" },
  { id: "E3", title: "Things Fall Apart", author: "Chinua Achebe", isbn: "9780385474542" },
  { id: "E4", title: "Americanah", author: "Chimamanda Ngozi Adichie", isbn: "9780307455925" },
  { id: "E5", title: "A Thousand Splendid Suns", author: "Khaled Hosseini", isbn: "9781594489501" },
  { id: "E6", title: "The God of Small Things", author: "Arundhati Roy", isbn: "9780812979657" },
  { id: "E7", title: "The Granada Trilogy", author: "Radwa Ashour", isbn: "9780815609111" },
  { id: "E8", title: "Azazeel", author: "Youssef Ziedan", isbn: "9789771442112" },
  { id: "E9", title: "In the Name of the Rose", author: "Umberto Eco", isbn: "9780156001311" },
  { id: "E10", title: "The Book Thief", author: "Markus Zusak", isbn: "9780375842207" },
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
    let volId = await findVolumeId(book.title, book.author);
    if (!volId && book.title.includes("Hebrew")) {
      volId = await findVolumeId("في قلبي أنثى عبرية", "خولة حمدي");
    }
    
    if (volId) {
      const url = `https://books.google.com/books/content?id=${volId}&printsec=frontcover&img=1&zoom=3`;
      results[book.title] = url;
    } else {
      const olUrl = `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`;
      results[book.title] = olUrl;
    }
    
    await new Promise(r => setTimeout(r, 200));
  }
  
  const fs = require('fs');
  fs.writeFileSync('covers_data.json', JSON.stringify(results, null, 2));
}

main();
