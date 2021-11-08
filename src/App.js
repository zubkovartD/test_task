import {useState, useEffect} from 'react';
import './App.css';

import { interval, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

function App() {

  const [time, setTime] = useState(0);
  const [streamStopwatch, setStreamStopwatch] = useState(false);

  useEffect(() => {

    const unsubscribe = new Subject();
    interval(1)
        .pipe(takeUntil(unsubscribe))
        .subscribe(() => {
          if (streamStopwatch) {
            setTime(val => val + 1);
          }
        });
    return () => {
      unsubscribe.next();
      unsubscribe.complete();
    };
  }, [streamStopwatch]);

  const handleStart = () => {
    setStreamStopwatch(prevState => !prevState);
    
  }


  const handleResume = () => {
    handleStart();
  }


  const handleStop = () => {
    if (time !== 0) {
      setStreamStopwatch(false);
    }
 
  }


  const handleReset = () => {
    setTime(0);
    setStreamStopwatch(false);
 
  }
  return (
    <div className="App">
      <h4>Test task React + RxJS stopwatch</h4>
      <p>{time}</p>

      <div>
        <button onClick={handleStart} >Start</button>
        <button onClick={handleResume} >Resume</button>
        <button onClick={handleReset} >Reset</button>
        <button onClick={handleStop} >Stop</button>
      </div>
    </div>
  );
}

export default App;
