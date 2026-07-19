const express = require("express");
const router = express.Router();

const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

router.post("/feedback", async (req, res) => {
  try {
    const { question, answer, field } = req.body;

    const prompt = `
You are an expert AI interview coach.

Analyze the interview answer professionally.

Interview Field:
${field}

Question:
${question}

Candidate Answer:
${answer}

Give response in JSON format:

{
  "score": number,
  "feedback": "overall feedback",
  "strengths": ["point1", "point2"],
  "suggestions": ["point1", "point2"],
  "better_answer": "improved answer example"
}
`;

    const completion = await client.chat.completions.create({
      model: "llama3-70b-8192",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    const raw = completion.choices[0].message.content;

    let parsed;

    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      parsed = {
        score: 7,
        feedback: raw,
        strengths: [],
        suggestions: [],
        better_answer: "",
      };
    }

    res.json(parsed);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      score: 5,
      feedback: "AI analysis failed",
      strengths: [],
      suggestions: ["Try again"],
      better_answer: "",
    });
  }
});

module.exports = router;