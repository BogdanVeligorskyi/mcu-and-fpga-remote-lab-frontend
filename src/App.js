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
  const [isInstructionsEnabled, setIsInstructionsEnabled] = useState(true);  
  const [isProgramFPGAEnabled, setIsProgramFPGAEnabled] = useState(true);
  const [isDigitalInputsEnabled, setIsDigitalInputsEnabled] = useState(true);
  const [isCameraViewEnabled, setIsCameraViewEnabled] = useState(true);
  
  const onInstructionsCBChange = () => {
    console.log("onInstructionsCBchange");
    setIsInstructionsEnabled(!isInstructionsEnabled);
  }

  const onProgramFPGACBChange = () => {
    console.log("onProgramFPGACBChange");
    setIsProgramFPGAEnabled(!isProgramFPGAEnabled);
  }  

  const onDigitalInputsCBChange = () => {
    console.log("onDigitalInputsCBChange");
    setIsDigitalInputsEnabled(!isDigitalInputsEnabled);
  }  

  const onCameraViewCBChange = () => {
    console.log("onCameraViewCBChange");
    setIsCameraViewEnabled(!isCameraViewEnabled);
  }  

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

  const renderInstructions = (isInstructionsEnabled) => {
    if (isInstructionsEnabled) {
      return <Instructions/>
    } else {
      return <div><h2>Instructions</h2></div>
    }
  }

  const renderProgramFPGA = (isProgramFPGAEnabled) => {
    if (isProgramFPGAEnabled) {
      return <ProgramFPGA/>
    } else {
      return <div><h2>Program FPGA</h2></div>
    }
  }

  const renderDigitalInputs = (isDigitalInputsEnabled) => {
    if (isDigitalInputsEnabled) {
      return <DigitalInputs/>
    } else {
      return <div><h2>Digital Inputs</h2></div>
    }
  }

  const renderCameraView = (isCameraViewEnabled) => {
    if (isCameraViewEnabled) {
      return <CameraView/>
    } else {
      return <div><h2>Camera View From Lab</h2></div>
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
                  <h2 class="compnents-side-menu">Components</h2>
                  <input type="checkbox" id="instructionsCB" name="instructionsCB" value="Instructions" 
                  checked={isInstructionsEnabled === true} 
                  onChange={onInstructionsCBChange}/>
                  <label htmlFor="instructionsCB"> Instructions</label><br/>
                
                  <input type="checkbox" id="programFPGACB" name="programFPGACB" value="ProgramFPGA"
                  checked={isProgramFPGAEnabled === true}
                  onChange={onProgramFPGACBChange}/>
                  <label htmlFor="programFPGACB"> Program FPGA</label><br/>
                
                  <input type="checkbox" id="digitalInputsCB" name="digitalInputsCB" value="DigitalInputs"
                  checked={isDigitalInputsEnabled === true}
                  onChange={onDigitalInputsCBChange}/>
                  <label htmlFor="digitalInputsCB"> Digital Inputs</label><br/>
                
                  <input type="checkbox" id="cameraViewCB" name="cameraViewCB" value="CameraView"
                  checked={isCameraViewEnabled === true}
                  onChange={onCameraViewCBChange}/>
                  <label htmlFor="cameraViewCB"> Camera View</label>                  
                </div>
              </div>
            </div>
            <main class="col ps-md-2 pt-2">
              <div class="row">
                  <div class="collapse-and-timer">
                    <div class="collapse-item">
                      <a href="#" data-bs-target="#sidebar" data-bs-toggle="collapse" 
                      class="border rounded-3 text-decoration-none collapse-image"><span></span></a>
                    </div>
                    <div class="timer">
                    <Countdown 
                      date={Date.now() + 600000}
                      renderer={renderer}
                      onComplete={onCountdownComplete}/>
                    {renderOnCountdownComplete(isCompleted)}
                  </div>
                  </div>
                  <div>
                    <div class="row">
                      <div class="col-xl instructions-set">
                       {renderInstructions(isInstructionsEnabled)}
                      </div>
                      <div class="col-xl program-fpga">
                        {renderProgramFPGA(isProgramFPGAEnabled)}
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-xl digital-inputs">
                        {renderDigitalInputs(isDigitalInputsEnabled)}
                      </div>
                      <div class="col-xl camera-view">
                        {renderCameraView(isCameraViewEnabled)}
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
