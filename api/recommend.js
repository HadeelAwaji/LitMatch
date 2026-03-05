import OpenAI from "openai";

export default async function handler(req,res){
  try {
    const { readerType, language } = req.body;
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const prompt = `
Recommend 4 ${language==="ar"?"Arabic":"English"} books for a reader type: ${readerType}.
For each book, give title, author, short description, why it fits the reader, a cover image URL (can use OpenLibrary or placeholder), and a public PDF link.
Return as JSON array only.
`;

    const completion = await openai.chat.completions.create({
      model:"gpt-4",
      messages:[{role:"user", content:prompt}],
      max_tokens:1000
    });

    const jsonOutput = JSON.parse(completion.choices[0].message.content);
    res.status(200).json(jsonOutput);

  } catch(e){
    console.error(e);
    res.status(500).json([{title:"Error",author:"",desc:"Failed to fetch books.",why:"",img:"",pdf:"#"}]);
  }
}