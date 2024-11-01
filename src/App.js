import './App.css';
import Countdown, { zeroPad } from 'react-countdown'
import Instructions from './Instructions';
import ProgramDevice from './ProgramDevice';
import DigitalInputs from './DigitalInputs';
import CameraView from './CameraView';
import { useState, useEffect } from 'react';

const getLocalStorageValue = (s) => localStorage.getItem(s);

// formatting countdown
const renderer = ({ minutes, seconds }) => {
    return <span>{zeroPad(minutes)}:{zeroPad(seconds)}</span>;
};

function App() {

  const [isCompleted, setIsCompleted] = useState(false);
  const [isCompletedOk, setIsCompletedOk] = useState(false);
  const [isInstructionsEnabled, setIsInstructionsEnabled] = useState(true);  
  const [isProgramFPGAEnabled, setIsProgramFPGAEnabled] = useState(true);
  const [isProgramMCUEnabled, setIsProgramMCUEnabled] = useState(false);
  const [isDigitalInputsEnabled, setIsDigitalInputsEnabled] = useState(true);
  const [isCameraViewEnabled, setIsCameraViewEnabled] = useState(true);
  const [isSubMenuCollapsed, setIsSubMenuCollapsed] = useState(true);
  const [data, setData] = useState({ date: Date.now(), delay: 600000 });
  const wantedDelay = data.delay;

  // use effect to store countdown value in local storage
  useEffect(() => {

    const savedDate = getLocalStorageValue("end_time");
    console.log(savedDate);
    if (savedDate != null && !isNaN(savedDate)) {
      const currentTime = Date.now();
      const delta = parseInt(savedDate, 10) - currentTime;

      if (wantedDelay < delta) {
        if (localStorage.getItem("end_time").length > 0)
          localStorage.removeItem("end_time");
      } else {
        setData({ date: currentTime, delay: delta });
      }
    }
  }, []);

  const onCollapseClicked = () => {
    setIsSubMenuCollapsed(!isSubMenuCollapsed);
  }
  
  const onInstructionsCBChange = () => {
    console.log("onInstructionsCBchange");
    setIsInstructionsEnabled(!isInstructionsEnabled);
  }

  const onProgramFPGACBChange = () => {
    console.log("onProgramFPGACBChange");
    setIsProgramFPGAEnabled(!isProgramFPGAEnabled);
    setIsProgramMCUEnabled(!isProgramMCUEnabled);
  }  

  const onProgramMCUCBChange = () => {
    console.log("onProgramMCUCBChange");
    setIsProgramFPGAEnabled(!isProgramFPGAEnabled);
    setIsProgramMCUEnabled(!isProgramMCUEnabled);
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
    if (localStorage.getItem("end_time") != null) {
      localStorage.removeItem("end_time");
    }
    setIsCompleted(true);
  }

  const onCountdownStart = () => {
    if (localStorage.getItem("end_time") == null) {
      localStorage.setItem("end_time", JSON.stringify(data.date + data.delay));
    }
  }

  const onTimerCompletedOk = () => {
    console.log("onTimerCompletedOk");
    setIsCompletedOk(true);
  }

  const renderOnCountdownComplete = (isCompleted) => {
    if (isCompleted) {
      if (!isCompletedOk) {
      return <div className="timer-completed">
        <div className="timer-completed-info">Your experiment time is over! 
        <br/>Please, let other students use this lab.<br/>
        <button className="btn btn-primary timer-completed-ok" onClick={onTimerCompletedOk}>Ok</button></div>
      </div>
      } else {
        return <div className="timer-completed"></div>
      }
    }
  }

  const renderCollapseIcon = (isSubMenuCollapsed) => {
    if (isSubMenuCollapsed) {
      return <i className="bi bi-list"></i>
    } else {
      return <i className="bi bi-x"></i>
    }
  }

  const renderInstructions = (isInstructionsEnabled) => {
    if (isInstructionsEnabled) {
      return <Instructions/>
    } else {
      return <div><h2>Instructions</h2></div>
    }
  }

  const renderProgramFPGAorMCU = (isProgramFPGAEnabled) => {
    if (isProgramFPGAEnabled) {
      console.log(4);
      return <ProgramDevice isFPGADevice={true}/>
    } else {
      return <ProgramDevice isFPGADevice={false}/>
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
        <div className="container-fluid">
          <div className="row">
            <div className="col-auto center-block mx-auto px-0">
              <div id="sidebar" className="collapsing in collapse-horizontal dblock">
                <div id="sidebar-nav" className="border-0 rounded-0 text-sm-start">
                  
                  <h2 className="compnents-side-menu">Components</h2>
                  <div className="components-list">
                  <input type="checkbox" id="instructionsCB" name="instructionsCB" value="Instructions" 
                  checked={isInstructionsEnabled === true} 
                  onChange={onInstructionsCBChange}/>
                  <label htmlFor="instructionsCB"> Instructions</label><br/>
                
                  <input type="checkbox" id="programFPGACB" name="programFPGACB" value="ProgramFPGA"
                  checked={isProgramFPGAEnabled === true}
                  onChange={onProgramFPGACBChange}/>
                  <label htmlFor="programFPGACB"> Program FPGA</label><br/>

                  <input type="checkbox" id="programMCUCB" name="programMCUCB" value="ProgramMCU"
                  checked={isProgramMCUEnabled === true}
                  onChange={onProgramMCUCBChange}/>
                  <label htmlFor="programMCUCB"> Program MCU</label><br/>
                
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
            </div>
            <main className="col ps-xs-2 pt-2">
              <div className="row">
                  <div className="collapse-and-timer">
                    <div className="collapse-item">
                      <button onClick={onCollapseClicked} data-bs-target="#sidebar" data-bs-toggle="collapse" 
                      className="text-decoration-none collapse-image">
                        {renderCollapseIcon(isSubMenuCollapsed)}
                      </button>
                    </div>
                    <div className="timer">
                    <Countdown 
                      date={data.date + data.delay}
                      renderer={renderer}
                      onStart={onCountdownStart}
                      onComplete={onCountdownComplete}/>
                    {renderOnCountdownComplete(isCompleted)}
                    </div>
                    <div className="timer-space">
                    </div>
                  </div>
                  <div>
                    <div className="row">
                      <div className="col-xl instructions-set">
                       {renderInstructions(isInstructionsEnabled)}
                      </div>
                      <div className="col-xl program-device">
                        {renderProgramFPGAorMCU(isProgramFPGAEnabled)}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xl digital-inputs">
                        {renderDigitalInputs(isDigitalInputsEnabled)}
                      </div>
                      <div className="col-xl camera-view">
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
