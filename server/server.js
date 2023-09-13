import express from "express";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: "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"
})

const openai = new OpenAIApi(configuration);
const app = express()
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
    res.status(200).send({
        message: "Welcome to AUTOinfo"
    })
})

app.post("/", async (req, res) => {
    try {
        const prompt = req.body.prompt;
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`,
            temprature: 0,
            max_tokens: 3000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0
        });
        res.status(200).send({
            bot: response.data.choices[0].text,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send(error || "Something went wrong!!")
    }
})

app.listen(4000, () => {
    console.log("AI server started on PORT: http://localhost:4000")
})