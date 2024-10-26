import './App.css';
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
        <div class="container-fluid">
          <div class="row">
            <div class="col-auto px-0">
              <div id="sidebar" class="collapse collapse-horizontal show border-end">
                <div id="sidebar-nav" class="border-0 rounded-0 text-sm-start min-vh-100 dblock">
                <input type="checkbox" id="instructionsCB" name="instructionsCB" value="Instructions"/>
                <label for="vehicle1"> Instructions</label><br/>
                <input type="checkbox" id="programFPGACB" name="programFPGACB" value="ProgramFPGA"/>
                <label for="vehicle2"> Program FPGA</label><br/>
                <input type="checkbox" id="digitalInputsCB" name="digitalInputsCB" value="DigitalInputs"/>
                <label for="vehicle3"> Digital Inputs</label><br/>
                <input type="checkbox" id="cameraViewCB" name="cameraViewCB" value="CameraView"/>
                <label for="vehicle4"> Camera View</label>
                <br/><br/>
                  
                </div>
              </div>
            </div>
          <main class="col ps-md-2 pt-2">
            <div class="row text-start">
              <a href="#" data-bs-target="#sidebar" data-bs-toggle="collapse" class="border rounded-3 text-decoration-none collapse-image"> Components List</a>
            </div>
            <div class="row">
                <div class="col-12">
                <div class="timer">
          <Countdown 
          date={Date.now() + 600000}
          renderer={renderer}
          onComplete={onCountdownComplete}/>
          {renderOnCountdownComplete(isCompleted)}
        </div>
        <div>
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
                </div>
            </div>
        </main>
        
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
