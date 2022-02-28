import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if(!Number.isNaN(parseInt(query))) {
      console.log("predicting");
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
  function addNumber(number: number) {
    let input: HTMLElement | null = document.getElementById("text-input");
    if(input !== null) (input as HTMLInputElement).value += number.toString();
    setQuery((prev: string) => {
      return prev + number.toString();
    })
  }
  return (
    <main>
      <div className='col-1'>
        <div className="title">
          <h2>Mobile T9</h2>
          <h3>{query}</h3>
        </div>
        <div className='nokia'>
          <div>NOKIA</div>
          <form className="form" onSubmit={submit}>
            <input type="number" id="text-input" onChange={predict} placeholder='Input a number'></input>
            <input type="submit" />
          </form>
          <div className='button-holder'>
            {[...Array(9)].map((item, index) => 
              <div className="button" key={index} onClick={() => addNumber(index+1)}>{index + 1}</div>
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
