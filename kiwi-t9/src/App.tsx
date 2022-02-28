import React, { useEffect, useState } from 'react';
import './App.css';
import { numberToPredictions } from './lib/calc';

function App() {
  const [query, setQuery] = useState("");
  const [buttons, setButtons] = useState([
    {id: 1, abc: []},
    {id: 2, abc: ["a", "b", "c"]},
    {id: 3, abc: ["d", "e", "f"]},
    {id: 4, abc: ["g", "h", "i"]},
    {id: 5, abc: ["j", "k", "l"]},
    {id: 6, abc: ["m", "n", "o"]},
    {id: 7, abc: ["p", "q", "r", "s"]},
    {id: 8, abc: ["t", "u", "v"]},
    {id: 9, abc: ["w", "x", "y", "z"]},
    {id: "*", abc: []},
    {id: 0, abc: []},
    {id: "#", abc: []}
  ]);
  const [prediction, setPrediction] = useState([]);

  useEffect(() => {
    if(!Number.isNaN(parseInt(query))) {
      console.log(numberToPredictions(query));
    } else {
      console.log("malament");
    }
  }, [query]);
  
  function predict(e: React.SyntheticEvent) {
    e.preventDefault();
    let input: HTMLElement | null  = document.getElementById("text-input");
    if(input !== null) setQuery((input as HTMLInputElement).value);
  }
  function submit(e: React.SyntheticEvent) {
    e.preventDefault();
    console.log("ekeiei");
  }
  function addNumber(number: number | string) {
    if(typeof number == "string") return;
    let input: HTMLElement | null = document.getElementById("text-input");
    if(input !== null) {
      (input as HTMLInputElement).value += number.toString();
    }
    setQuery((prev: string) => {
      return prev + number.toString();
    })
  }
  return (
    <main>
      <div className='col-1'>
        <div className="title">
          <h2>Mobile T9</h2>
        </div>
        <div className='query-text'>
          <span>Query: <b>{query}</b></span>
          <p>Prediction: <br></br>{prediction.join("\n")}</p>
        </div>

        <div className='nokia'>
          <div>NOKIA</div>
          <form className="form" onSubmit={submit}>
            <input type="number" id="text-input" onChange={predict} placeholder='Input a number'></input>
            <input type="submit" />
          </form>
          <div className='button-holder'>
            {buttons.map((item, index: number) => 
              <div className="button" key={index} onClick={() => addNumber(item.id)}>
                <div className="id">{item.id}</div>
                <div className="letters">{item.abc.join("")}</div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="col-2">
        <div className="people">
          <ul>
            <li>Persono 1</li>
            <li>Persono 2</li>
            <li>Persono 3</li>
            <li>Persono 4</li>
            <li>Persono 5</li>
          </ul>
        </div>
      </div>

    </main>
  );
}

export default App;
