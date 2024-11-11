import './styles/App.css';
import { useState, useEffect, useRef } from 'react';
import ScrollToTop from 'react-scroll-to-top';
import AppCountdown from './AppCountdown';
import Instructions from './Instructions';
import ProgramDevice from './ProgramDevice';
import DigitalInputs from './DigitalInputs';
import CameraView from './CameraView';
import AnalogMultiplexer from './AnalogMultiplexer';
import DigitalMultiplexer from './DigitalMultiplexer';
import LogicAnalyzer from './LogicAnalyzer';
import FunctionalGenerator from './FunctionalGenerator';

function App() {

  const [isInstructionsEnabled, setIsInstructionsEnabled] = useState(true);  
  const [isProgramFPGAEnabled, setIsProgramFPGAEnabled] = useState(true);
  const [isProgramMCUEnabled, setIsProgramMCUEnabled] = useState(false);
  const [isDigitalInputsEnabled, setIsDigitalInputsEnabled] = useState(true);
  const [isCameraViewEnabled, setIsCameraViewEnabled] = useState(true);
  const [isDigitalMuxEnabled, setIsDigitalMuxEnabled] = useState(false);
  const [isAnalogMuxEnabled, setIsAnalogMuxEnabled] = useState(false);
  const [isLogicAnalyzerEnabled, setIsLogicAnalyzerEnabled] = useState(false);
  const [isFunctionalGeneratorEnabled, setIsFunctionalGeneratorEnabled] = useState(true);
  const [isSubMenuCollapsed, setIsSubMenuCollapsed] = useState(false);

  // ----- Submenu -----
  const handleClickOutsideSubmenu = () => {
    setIsSubMenuCollapsed(false);
  };

  const useOutsideClick = (callback) => {
    const ref = useRef();
  
    useEffect(() => {
      const handleOutsideClick = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
          callback();
        }
      }; 
      document.addEventListener('click', handleOutsideClick, true);
      return () => {
        document.removeEventListener('click', handleOutsideClick, true);
      };
    }, [ref, callback]);
  
    return ref;
  };

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
  
  const onAnalogMuxCBChange = () => {
    console.log("onAnalogMuxCBChange");
    setIsAnalogMuxEnabled(!isAnalogMuxEnabled);
  }

  const onDigitalMuxCBChange = () => {
    console.log("onDigitalMuxCBChange");
    setIsDigitalMuxEnabled(!isDigitalMuxEnabled);
  }

  const onCameraViewCBChange = () => {
    console.log("onCameraViewCBChange");
    setIsCameraViewEnabled(!isCameraViewEnabled);
  }
  
  const onLogicAnalyzerCBChange = () => {
    console.log("onLogicAnalyzerCBChange");
    setIsLogicAnalyzerEnabled(!isLogicAnalyzerEnabled);
  }

  const onFunctionalGeneratorCBChange = () => {
    console.log("onFunctionalGeneratorCBChange");
    setIsFunctionalGeneratorEnabled(!isFunctionalGeneratorEnabled);
  }

  // ----- Render components based on conditions -----
  const renderCollapseIcon = (isSubMenuCollapsed) => {
    console.log(isSubMenuCollapsed);
    if (!isSubMenuCollapsed) {
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

  const renderAnalogMultiplexer = (isAnalogMuxEnabled) => {
    if (isAnalogMuxEnabled) {
      return <AnalogMultiplexer/>
    } else {
      return <div><h2>Analog Multiplexer</h2></div>
    }
  }

  const renderDigitalMultiplexer = (isDigitalMuxEnabled) => {
    if (isDigitalMuxEnabled) {
      return <DigitalMultiplexer/>
    } else {
      return <div><h2>Digital Multiplexer</h2></div>
    }
  }

  const renderLogicAnalyzer = (isLogicAnalyzerEnabled) => {
    if (isLogicAnalyzerEnabled) {
      return <LogicAnalyzer/>
    } else {
      return <div><h2>Logic Analyzer</h2></div>
    }
  }

  const renderFunctionalGenerator = (isFunctionalGeneratorEnabled) => {
    if (isFunctionalGeneratorEnabled) {
      return <FunctionalGenerator/>
    } else {
      return <div><h2>Functional Generator</h2></div>
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <div className="row">

            {/* Countdown and Submenu */}
            <div className="collapse-and-countdown">
              <div className={(isSubMenuCollapsed ? 'collapse-menu-background' : 'collapse-menu-background-none')}>
              </div>
              <div ref={useOutsideClick(handleClickOutsideSubmenu)} 
              className={(isSubMenuCollapsed ? 'collapse-menu-components' : 'collapse-menu-components-none')}>
                <div className="collapse-item">

                  {/* Open submenu button */}
                  <button onClick={onCollapseClicked} 
                  className="text-decoration-none collapse-image">
                    {renderCollapseIcon(isSubMenuCollapsed)}
                  </button> 
                </div>
                <h2 className={(isSubMenuCollapsed ? 'components-list-header' : 'components-list-header-none')}>Components</h2>  
                <div className={"text-start "+(isSubMenuCollapsed ? 'components-list' : 'components-list-none')} >
                  
                  {/* Submenu checkboxes */}              
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
                  <label htmlFor="cameraViewCB"> Camera View</label><br/>

                  <input type="checkbox" id="analogMuxCB" name="analogMuxCB" value="AnalogMux"
                  checked={isAnalogMuxEnabled === true}
                  onChange={onAnalogMuxCBChange}/>
                  <label htmlFor="analogMuxCB"> Analog MUX</label><br/>
                            
                  <input type="checkbox" id="digitalMuxCB" name="digitalMuxCB" value="DigitalMux"
                  checked={isDigitalMuxEnabled === true}
                  onChange={onDigitalMuxCBChange}/>
                  <label htmlFor="digitalMuxCB"> Digital MUX</label><br/>

                  <input type="checkbox" id="logicAnalyzerCB" name="logicAnalyzerCB" value="LogicAnalyzer"
                  checked={isLogicAnalyzerEnabled === true}
                  onChange={onLogicAnalyzerCBChange}/>
                  <label htmlFor="logicAnalyzerCB"> Logic Analyzer</label><br/>

                  <input type="checkbox" id="functionalGeneratorCB" name="functionalGeneratorCB" value="FunctionalGenerator"
                  checked={isFunctionalGeneratorEnabled === true}
                  onChange={onFunctionalGeneratorCBChange}/>
                  <label htmlFor="functionalGeneratorCB"> Functional Generator</label><br/>

                </div>           
              </div>

              {/* Close submenu button */}
              <div className="collapse-item">
                <button onClick={onCollapseClicked} 
                className="text-decoration-none collapse-image">
                  {renderCollapseIcon(isSubMenuCollapsed)}
                </button>     
              </div>
              <AppCountdown/>
              <div className="countdown-space">
              </div>
            </div>

            {/* Components */}
            <div>
              {/* Instructions and Program Device */}
              <div className="row">
                <div className="col-xl app-component-box">
                  {renderInstructions(isInstructionsEnabled)}
                </div>
                <div className="col-xl app-component-box">
                  {renderProgramFPGAorMCU(isProgramFPGAEnabled)}
                </div>
              </div>

              {/* Digital Inputs and Camera View */}
              <div className="row">
                <div className="col-xl app-component-box">
                  {renderDigitalInputs(isDigitalInputsEnabled)}
                </div>
                <div className="col-xl app-component-box">
                  {renderCameraView(isCameraViewEnabled)}
                </div>
              </div>

              {/* Analog Multiplexer and Digital Multiplexer */}
              <div className="row">
                <div className="col-xl app-component-box">
                  {renderAnalogMultiplexer(isAnalogMuxEnabled)}
                </div>
                <div className="col-xl app-component-box">
                  {renderDigitalMultiplexer(isDigitalMuxEnabled)}
                </div>
              </div>

              {/* Functional Generator */}
              <div className="row app-component-box">
                  {renderFunctionalGenerator(isFunctionalGeneratorEnabled)}
              </div>

              {/* Logic Analyzer */}
              <div className="row app-component-box">
                  {renderLogicAnalyzer(isLogicAnalyzerEnabled)}
              </div>

            </div>
          </div>
        </div>
      </header>
      <ScrollToTop color="white" className="scroll-to-top-button"/>
    </div>
  );
}

export default App;
