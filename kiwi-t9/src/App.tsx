import React, { useEffect, useState } from 'react';
import './App.css';
import { numberToPredictions } from './lib/calc';

function App() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<Array<any>>();
  const [predictionVisibility, setPredictionVisibility] = useState<boolean>(true);
  const [contactsVisibility, setContactsVisibility] = useState<boolean>(true);
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
    {id: "Clear", abc: []},
    {id: 0, abc: []},
    {id: "Delete", abc: []}
  ]);
  const [prediction, setPrediction] = useState<Array<string>>([""]);

  useEffect(() => {
    if(users === undefined) {
      fetch('https://randomuser.me/api/?results=20').then((response) => {
        if(response.ok) {
          return response.json();
        } throw response;
      }).then((data) => {
        setUsers(data.results);
      });
    }

    if(!Number.isNaN(parseInt(query))) {

      if(query.length <= 5) {
        setPrediction(numberToPredictions(query));
      } else {
        console.log("Limit reached");
      }
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
    let input: HTMLElement | null = document.getElementById("text-input");
    if(typeof number == "string") {
      if(number == "Clear") {
        setQuery("");
        setPrediction([""]);
        if(input !== null) {
          (input as HTMLInputElement).value = "";
        }
      } else if(number == "Delete") {
        setQuery((prev) => {
          if(prev.length <= 1) setPrediction([""])
          return prev.slice(0, -1)});
        if(input !== null) {
          (input as HTMLInputElement).value = (input as HTMLInputElement).value.slice(0, -1);
        }
      }
      return;
    };
    
    if(input !== null) {
      (input as HTMLInputElement).value += number.toString();
    }
    setQuery((prev: string) => {
      return prev + number.toString();
    })
  }
  function included(name: string): boolean {
    if(prediction.length <= 0) return true;
    for(let p of prediction) {
      if(name.toLowerCase().includes(p)) return true;
    }
    return false;
  }

  return (
    <>
    <header>
      <div className="col-0">
      <div className="title">
          <h2>Mobile T9</h2>
        </div>
        <div className='query-text'>
          <div>
            <div className="title-section" onClick={() => setPredictionVisibility(!predictionVisibility)}>Prediction: <span className={predictionVisibility ? 'active right' : 'right'}>&#8919;</span></div>
            <div className={predictionVisibility ? "prediction" : "prediction small"}>{prediction.length > 1 ? prediction.join("\n") : "Input a number to begin"}</div></div>
        </div>
      </div>
    </header>
      <main>
      <div className='col-1'>
        

        <div className='nokia'>
          <form className="form">
            <input type="number" id="text-input" maxLength={5} onChange={predict} placeholder='Input a number' ></input>
          </form>
          <div className='button-holder'>
            {buttons.map((item, index: number) => {

              return <div className="button" key={index} onClick={() => addNumber(item.id)}>
                <div className="id">{item.id}</div>
                <div className="letters">{item.abc.join("")}</div>
              </div>}
            )}
          </div>
        </div>
      </div>
      <div className="col-2">
        <div className="people">
          <div className='title-section' onClick={() => setContactsVisibility(!contactsVisibility)}>Contacts<span className={contactsVisibility ? 'active right' : 'right'}>&#8919;</span></div>
          <div className='list'>
            {users && users.map((item, index) => {
              if(included(`${item.name.first} ${item.name.last}`)) {
                  return <li key={index} data-name={`${item.name.first} ${item.name.last}`}>
                  <div className="avatar"><img src={item.picture.thumbnail} alt="" /></div>
                  <div className="info">
                    <div className="name">{item.name.first} {item.name.last}</div>
                    <div className="phone">{item.phone}</div>
                  </div>
                </li>
              }              
            })}
          </div>
        </div>
      </div>

    </main>
    </>
  );
}

export default App;
