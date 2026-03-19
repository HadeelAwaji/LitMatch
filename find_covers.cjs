const https = require('https');

const books = [
  { id: "A1", title: "1984", author: "George Orwell", isbn: "9780451524935", isbn10: "0451524934" },
  { id: "A2", title: "The Secret History", author: "Donna Tartt", isbn: "9781400031702", isbn10: "1400031702" },
  { id: "A3", title: "Season of Migration to the North", author: "Tayeb Salih", isbn: "9781590173029", isbn10: "1590173023" },
  { id: "A4", title: "Children of the Alley", author: "Naguib Mahfouz", isbn: "9780385264731", isbn10: "0385264739" },
  { id: "A5", title: "Notes from Underground", author: "Fyodor Dostoevsky", isbn: "9780679734529", isbn10: "067973452X" },

  { id: "B1", title: "Dune", author: "Frank Herbert", isbn: "9780441172719", isbn10: "0441172717" },
  { id: "B2", title: "The Night Circus", author: "Erin Morgenstern", isbn: "9780307739920", isbn10: "0307739922" },
  { id: "B3", title: "One Thousand and One Nights", author: "Various", isbn: "9780140449389", isbn10: "0140449388" },
  { id: "B4", title: "Utopia", author: "Ahmed Khaled Tawfik", isbn: "9789774088874", isbn10: "" },
  { id: "B5", title: "The Hobbit", author: "J.R.R. Tolkien", isbn: "9780547928227", isbn10: "054792822X" },

  { id: "C1", title: "Atomic Habits", author: "James Clear", isbn: "9780735211292", isbn10: "0735211299" },
  { id: "C2", title: "Man's Search for Meaning", author: "Viktor E. Frankl", isbn: "9780807014295", isbn10: "080701429X" },
  { id: "C3", title: "Renew Your Life", author: "Muhammad al-Ghazali", isbn: "9789771427508", isbn10: "" },
  { id: "C4", title: "Because You Are God", author: "Ali Bin Jaber Al-Fifi", isbn: "9786038202570", isbn10: "" },
  { id: "C5", title: "Meditations", author: "Marcus Aurelius", isbn: "9780812968255", isbn10: "0812968255" },

  { id: "D1", title: "Pride and Prejudice", author: "Jane Austen", isbn: "9780141439518", isbn10: "0141439513" },
  { id: "D2", title: "The Seven Husbands of Evelyn Hugo", author: "Taylor Jenkins Reid", isbn: "9781501161933", isbn10: "1501161938" },
  { id: "D3", title: "Black Suits You so Well", author: "Ahlam Mosteghanemi", isbn: "9789953893351", isbn10: "" },
  { id: "D4", title: "In My Heart is a Hebrew Female", author: "Khawla Hamdi", isbn: "9789973059850", isbn10: "" },
  { id: "D5", title: "Jane Eyre", author: "Charlotte Brontë", isbn: "9780141441146", isbn10: "0141441143" },

  { id: "E1", title: "The Kite Runner", author: "Khaled Hosseini", isbn: "9781594631931", isbn10: "159463193X" },
  { id: "E2", title: "Pachinko", author: "Min Jin Lee", isbn: "9781455563920", isbn10: "1455563925" },
  { id: "E3", title: "The Granada Trilogy", author: "Radwa Ashour", isbn: "9780815609111", isbn10: "0815609117" },
  { id: "E4", title: "Azazeel", author: "Youssef Ziedan", isbn: "9789771442112", isbn10: "" },
  { id: "E5", title: "Things Fall Apart", author: "Chinua Achebe", isbn: "9780385474542", isbn10: "0385474547" },

  { id: "F1", title: "The Hunger Games", author: "Suzanne Collins", isbn: "9780439023481", isbn10: "0439023483" },
  { id: "F2", title: "The Da Vinci Code", author: "Dan Brown", isbn: "9780307474278", isbn10: "0307474275" },
  { id: "F3", title: "Bilal's Code", author: "Ahmed Khaireddine", isbn: "9786144195742", isbn10: "" },
  { id: "F4", title: "The Blue Elephant", author: "Ahmed Mourad", isbn: "9789770931535", isbn10: "" },
  { id: "F5", title: "The Martian", author: "Andy Weir", isbn: "9780553418026", isbn10: "0553418025" },
];

const fetch = (url) => new Promise((resolve, reject) => {
  https.get(url, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => resolve({ status: res.statusCode, data }));
  }).on('error', reject);
});

const checkImage = (url) => new Promise((resolve) => {
  https.get(url, (res) => {
    const len = res.headers['content-length'];
    resolve({ status: res.statusCode, size: len ? parseInt(len) : 0, headers: res.headers });
  }).on('error', () => resolve({ status: 500, size: 0 }));
});

async function main() {
  const results = {};
  
  for (const book of books) {
    console.log(`\nChecking: ${book.title}`);
    let bestUrl = null;
    let bestSize = 0;
    let bestType = null;
    
    // 1. Google Books High Res
    const q = `isbn:${book.isbn}`;
    const gbRes = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(q)}`);
    if (gbRes.status === 200) {
      const data = JSON.parse(gbRes.data);
      if (data.items && data.items.length > 0) {
        const volumeId = data.items[0].id;
        const gbUrl = `https://books.google.com/books/publisher/content/images/frontcover/${volumeId}?fife=w400-h600`;
        const imgRes = await checkImage(gbUrl);
        if (imgRes.status === 200 && imgRes.size > 5000) { // Google sometimes returns a 1x1 or small default
          // Wait, actually Google returns 200 even for a placeholder often, need to be careful
          if (imgRes.size > 10000) {
            bestUrl = gbUrl;
            bestSize = imgRes.size;
            bestType = "GoogleBooks";
          }
        }
      }
    }
    
    // 2. OpenLibrary L
    if (!bestUrl) {
      const olUrl = `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`;
      const imgRes = await checkImage(olUrl);
      if (imgRes.status === 200 && imgRes.size > 5000 && imgRes.headers['content-type'] === 'image/jpeg') {
        bestUrl = olUrl;
        bestSize = imgRes.size;
        bestType = "OpenLibrary";
      }
    }
    
    // 3. Amazon LZZZZZZZ
    if (!bestUrl && book.isbn10) {
      const amzUrl = `https://images-na.ssl-images-amazon.com/images/P/${book.isbn10}.01.LZZZZZZZ.jpg`;
      const imgRes = await checkImage(amzUrl);
      // Amazon returns a 1x1 gif (43 bytes) if not found, so check size
      if (imgRes.status === 200 && imgRes.size > 2000) {
        bestUrl = amzUrl;
        bestSize = imgRes.size;
        bestType = "Amazon";
      }
    }
    
    if (bestUrl) {
      console.log(`✅ ${bestType}: ${bestUrl} (${bestSize} bytes)`);
    } else {
      console.log(`❌ No good cover found`);
    }
    results[book.id] = bestUrl;
    
    // rate limit prevention
    await new Promise(r => setTimeout(r, 500));
  }
  
  console.log("\n--- JSON OUTPUT ---");
  console.log(JSON.stringify(results, null, 2));
}

main();
