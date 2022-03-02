import express from 'express';
import path from 'path';


const PORT = 3001;

const app = express();

app.use(express.static(path.resolve(__dirname, '../../client/build')))
app.use(express.json());


export class Buttons {
    buttons = [
        {id: 1, abc: []},
        {id: 2, abc: ["a", "b", "c"]},
        {id: 3, abc: ["d", "e", "f"]},
        {id: 4, abc: ["g", "h", "i"]},
        {id: 5, abc: ["j", "k", "l"]},
        {id: 6, abc: ["m", "n", "o"]},
        {id: 7, abc: ["p", "q", "r", "s"]},
        {id: 8, abc: ["t", "u", "v"]},
        {id: 9, abc: ["w", "x", "y", "z"]},
        {id: 0, abc: []},
    ]
}
function predictChar(query: string): string[] {
    const n:number = parseInt(query, 10);
    if(Number.isNaN(n)) return [];
    const button = new Buttons().buttons.find(b => b.id === n);
    if(button !== undefined) {
        return button.abc
    }
    return [];
}
function conjoin(a: string[], b: string[]) : string[] {
    const res: string[] = [];
    if(a.length <= 0) {
        return b;
    }
    if(b.length <= 0) {
        return a;
    }
    for(const itemA of a) {
        for(const itemB of b) {
            res.push(itemA + itemB)
        }
    }
    return res;
}
export function numberToPredictions(query: string): string[] {
    let res : string[] = [];
    const numbers = query.split("");

    for(const digit of numbers) {
        const predictions : string[] = predictChar(digit);
        res = conjoin(res, predictions);
    }
    return res;
}


app.post("/predict", (req, res) => {
    const query = req.body.query || "";
    res.json({ message: numberToPredictions(query)});
});
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../client/build/', 'index.html'));
})
app.listen(PORT, () => {
    // console.log(`Server Listenin On ${PORT}`);
});