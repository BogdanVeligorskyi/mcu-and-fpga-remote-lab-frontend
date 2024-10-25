import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Countdown, { zeroPad } from 'react-countdown'
import Instructions from './Instructions';
import ProgramFPGA from './ProgramFPGA';
import DigitalInputs from './DigitalInputs';
import CameraView from './CameraView';
import { useState } from 'react';

// formatting countdown
const renderer = ({ minutes, seconds }) => {
    return <span>{zeroPad(minutes)}:{zeroPad(seconds)}</span>;
};

function App() {

  const [isCompleted, setIsCompleted] = useState(false);
  const [isCompletedOk, setIsCompletedOk] = useState(false);

  const onCountdownComplete = () => {
    console.log("onCountdownComplete");
    setIsCompleted(true);
  }

  const onTimerCompletedOk = () => {
    console.log("onTimerCompletedOk");
    setIsCompletedOk(true);
  }

  const renderOnCountdownComplete = (isCompleted) => {
    if (isCompleted) {
      if (!isCompletedOk) {
      return <div class="timer-completed">
        <div class="timer-completed-info">Your experiment time is over! 
        <br/>Please, let other students use this lab.
        <button class="timer-completed-ok" onClick={onTimerCompletedOk}>Ok</button></div>
      </div>
      } else {
        return <div class="timer-completed"></div>
      }
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <div class="timer">
          <Countdown 
          date={Date.now() + 600000}
          renderer={renderer}
          onComplete={onCountdownComplete}/>
          {renderOnCountdownComplete(isCompleted)}
        </div>
        <div class="container-fluid">
          <div class="row">
            <div class="col-xl instructions-set">
              <Instructions/>
            </div>

            <div class="col-xl program-fpga">
              <ProgramFPGA/>
            </div>

          </div>

          <div class="row">
            <div class="col-xl digital-inputs">
              <DigitalInputs/>
            </div>

            <div class="col-xl camera-view">
              <CameraView/>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
