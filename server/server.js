import express from "express";
import cors from "cors";
import { OpenAI } from "openai";

const app = express()
app.use(cors());
app.use(express.json());

// chat-gpt-api-key
const openai = new OpenAI({
    apiKey: "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",
});

app.post("/", async (req, res) => {
    try {
        const prompt = req.body.prompt;
        const completion = await openai.chat.completions.create({
            messages: [
                {
                    role: 'user',
                    content: prompt,
                }
            ],
            model: 'gpt-3.5-turbo',
        });
        res.status(200).send({
            bot: completion.choices[0].message.content
        })

    } catch (error) {
        console.log(error);
        res.status(500).send(error || "Something went wrong!!")
    }
})

app.listen(4000, () => {
    console.log("AI server started on PORT: http://localhost:4000")
})