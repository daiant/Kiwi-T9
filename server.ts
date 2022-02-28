import express, { Request, Response } from "express";

const PORT = 3001;  

const app = express();

app.get("/predict", (req: Request, res: Response) => {
    res.json({ message: "predigo que eres un tonto"});
});

app.listen(PORT, () => {
    console.log(`Server Listenin On ${PORT}`);
});