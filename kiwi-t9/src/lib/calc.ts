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
function predictChar(number: string): string[] {
    let n = parseInt(number);
    if(Number.isNaN(n)) return [];
    let button = new Buttons().buttons.find(button => button.id === n);
    if(button !== undefined) {
        return button.abc
    }
    return [];
}
function conjoin(a: string[], b: string[]) : string[] {
    let res: string[] = [];
    if(a.length <= 0) {
        return b;
    }
    if(b.length <= 0) {
        return a;
    }
    for(let item_a of a) {
        for(let item_b of b) {
            res.push(item_a + item_b)
        }
    }    
    return res;
}
export function numberToPredictions(query: string): string[] {
    var res : string[] = [];
    let numbers = query.split("");

    for(let digit of numbers) {
        let predictions : string[] = predictChar(digit);
        res = conjoin(res, predictions);
    }
    return res;
}
