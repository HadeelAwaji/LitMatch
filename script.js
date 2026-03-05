let language = "en";

document.getElementById("langToggle").onclick = ()=>{
  language = language === "en" ? "ar" : "en";
  document.getElementById("langToggle").innerText = language==="en" ? "العربية":"EN";
}

// Quiz functions
function startQuiz(){
  document.querySelector(".landing").classList.add("hidden");
  document.getElementById("quizSection").classList.remove("hidden");
}

function calculateResult(){
  const form = new FormData(document.getElementById("quizForm"));
  let scores={};
  for(let value of form.values()){
    scores[value]=(scores[value]||0)+1;
  }
  let result = Object.keys(scores).reduce((a,b)=>scores[a]>scores[b]?a:b);
  showBooks(result);
}

async function showBooks(type){
  document.getElementById("quizSection").classList.add("hidden");
  document.getElementById("results").classList.remove("hidden");

  document.getElementById("readerType").innerText = type;
  document.getElementById("readerDescription").innerText = "Fetching AI recommendations...";

  try {
    const res = await fetch("/api/recommend",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({readerType:type, language})
    });

    const books = await res.json();
    const container = document.getElementById("bookContainer");
    container.innerHTML="";

    books.forEach(book=>{
      container.innerHTML +=`
      <div class="card">
        <img src="${book.img}" alt="${book.title}">
        <h3>${book.title}</h3>
        <p>${book.author}</p>
        <p>${book.desc}</p>
        <p><strong>${language==="en"?"Why this fits you":"لماذا يناسبك"}:</strong> ${book.why}</p>
        <a href="${book.pdf}" target="_blank">${language==="en"?"Read PDF":"اقرأ PDF"}</a>
      </div>`;
    });

    document.getElementById("readerDescription").innerText = language==="en" ? "Recommended books for you:" : "الكتب المقترحة لك:";

  } catch(err){
    document.getElementById("bookContainer").innerHTML="<p>Error fetching books. Try again.</p>";
  }
}