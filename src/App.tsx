import React, { useEffect, useState } from 'react';
import './css/App.css';
import { ContactCard } from './components/ContactCard';
import { DialScreen } from './components/DialScreen';
import { Nokia } from './components/Nokia';
import { numberToPredictions } from './mock/calc';

function App() {
  const [query, setQuery] = useState<string>("");
  const [users, setUsers] = useState<Array<any>>();
  const [predictionVisibility, setPredictionVisibility] = useState<boolean>(true);
  const [contactsVisibility, setContactsVisibility] = useState<boolean>(true);
  const [prediction, setPrediction] = useState<Array<string>>([""]);
  const [calling, setCalling] = useState<boolean>(false);
  const [userCalling, setUserCalling] = useState<any>(null);

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
    if(query.length > 9) return;
    if(Number.isNaN(query)) setQuery("");
  // DEPLOYMENT VERSION
  // setPrediction(numberToPredictions(query));
  // NON-DEPLOYMENT VERSION  
    fetch("/predict", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: query
      })
    })
      .then((res) => res.json())
      .then((data) => setPrediction(data.message));
  }, [query, users]);
  
  function included(name: string): boolean {
    if(prediction.length <= 0) return true;
    for(let p of prediction) {
      if(name.toLowerCase().includes(p)) return true;
    }
    return false;
  }
  function checkUsers(): number {
    let res: number = 0;
    if(users === undefined) return res; 

    for(let user of users){
      if(included(`${user.name.first} ${user.name.last}`)) res++;
    }
    return res;
  }
  return (
    <>
    <header>
        <div className="title">
            <h2><a href="https://github.com/daiant">Mobile T9</a></h2>
          </div>
          
    </header>
      <main>
      <div className="col-1">
          <div className='query-text'>
            <div>
              <div className="title-section" onClick={() => setPredictionVisibility(!predictionVisibility)}>Prediction <span className={predictionVisibility ? 'active right' : 'right'}><img src='/plus.png' alt="show-more"/></span></div>
              <div className={predictionVisibility ? "prediction" : "prediction small"}>{prediction.length > 1 ? prediction.join("\n") : "Input a number to begin"}</div></div>
          </div>
      </div>
      <div className="col-2">
        <div className="people">
          <div className='title-section' onClick={() => setContactsVisibility(!contactsVisibility)}>Contacts ({checkUsers()})<span className={contactsVisibility ? 'active right' : 'right'}><img src='/plus.png' alt="show-more"/></span></div>
          <div className={contactsVisibility ? 'list' : 'list small'}>
            {users && users.map((item, index) => {
              if(included(`${item.name.first} ${item.name.last}`)) {
                  return <ContactCard key={index} user={item} handleCalling={setCalling} handleUserCalling={setUserCalling} />
              }
              return null;
            })}
          </div>
        </div>
      </div>

    </main>
    <Nokia handleQuery={setQuery} handlePrediction={setPrediction} />
    {calling && <>
      <DialScreen user={userCalling} calling={calling} handleCalling={setCalling} />
    </>}
    </>
  );
}

export default App;
