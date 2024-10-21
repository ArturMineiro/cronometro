import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect } from 'react';


function App() {

  const [time,setTime] = useState(0);
  const[isRunning,setIsRunning] = useState(false);
  const[intervalId, setIntervalId] = useState(null);
  const[savedTimes, setSavedTimes] = useState([]);

  const startTimer = () => {
    if(!isRunning){
     setIsRunning(true);
     const id = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
     }, 1000);
     setIntervalId(id);
    }
  };

  const stopTimer =() => {
    if(isRunning){
      setIsRunning(false);
      clearInterval(intervalId);
    }
  };
  
  const resetTimer = () => {
    setTime(0);
    clearInterval(intervalId);
    setIsRunning(false);
  }

  const saveTime=() =>{
    setSavedTimes((prevTimes)=>[...prevTimes,time]);
  };

  const removeSavedTime =(index) =>{
    setSavedTimes((prevTimes)=> prevTimes.filter((_,i) => i !== index))
  }
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds/60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }


  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text">Cronômetro</h1>
        <div className="timer">
          <h2>{formatTime(time)}</h2>
           </div>
           <div className="buttons">
            <button onClick={startTimer}>Iniciar</button>
            <button onClick={stopTimer}>Pausar</button>
           <button onClick={resetTimer}>Zerar</button>
          <button onClick={saveTime}>Guardar tempo</button>
           </div>
           <div className="saved-times">
          <h3>Tempos Salvos:</h3>
          <ul>
            {savedTimes.map((savedTime, index) => (
              <li key={index}>
                {formatTime(savedTime)} 
                <button onClick={() => removeSavedTime(index)}>Excluir</button> {/* Botão para remover um tempo salvo */}
              </li>
            ))}
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;
