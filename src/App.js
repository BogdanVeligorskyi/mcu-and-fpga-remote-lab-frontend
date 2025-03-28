import './styles/App.css';
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { getUrlForRequest } from './utils/get-url-for-request';
import ScrollToTop from 'react-scroll-to-top';
import AppCountdown from './AppCountdown';
import Instructions from './Instructions';
import ProgramDevice from './ProgramDevice';
import DigitalInputs from './DigitalInputs';
import CameraView from './CameraView';
import FunctionalGenerator from './FunctionalGenerator';
import Scope from './Scope';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function App() {
 
  const [isInstructionsEnabled, setIsInstructionsEnabled] = useState(true);  
  const [isProgramFPGAEnabled, setIsProgramFPGAEnabled] = useState(true);
  const [isProgramMCUEnabled, setIsProgramMCUEnabled] = useState(false);
  const [isDigitalInputsEnabled, setIsDigitalInputsEnabled] = useState(true);
  const [isCameraViewEnabled, setIsCameraViewEnabled] = useState(true);
  const [isFunctionalGeneratorEnabled, setIsFunctionalGeneratorEnabled] = useState(true);
  const [isScopeEnabled, setIsScopeEnabled] = useState(true);
  const [isSubMenuCollapsed, setIsSubMenuCollapsed] = useState(false);
  const [isSocketClosed, setIsSocketClosed] = useState(false);
  const [connStatus, setConnStatus] = useState(0);
  const [endTime, setEndTime] = useState("");

  let query = useQuery();
  let tokenId = query.get("token");  

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
    console.log("Full url: " + window.location.href);
    console.log("tokenId: " + tokenId);
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

  const onFunctionalGeneratorCBChange = () => {
    console.log("onFunctionalGeneratorCBChange");
    setIsFunctionalGeneratorEnabled(!isFunctionalGeneratorEnabled);
  }

  const onScopeCBChange = () => {
    console.log("onScopeCBChange");
    setIsScopeEnabled(!isScopeEnabled);
  }

  // ----- Render components based on conditions -----
  const renderCollapseIcon = (isSubMenuCollapsed) => {
    // console.log(isSubMenuCollapsed);
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

  const renderFunctionalGenerator = (isFunctionalGeneratorEnabled) => {
    if (isFunctionalGeneratorEnabled) {
      return <FunctionalGenerator/>
    } else {
      return <div><h2>Functional Generator</h2></div>
    }
  }

  const renderScope = (isScopeEnabled) => {
    if (isScopeEnabled) {
      return <Scope/>
    } else {
      return <div><h2>Scope</h2></div>
    }
  }

  const checkCountdown = (connStatus, endTime) => {
    if (connStatus === 200) {
      let date = new Date();
      let dateLocal = date.toISOString();
      console.log("currentTime: " + dateLocal);
      console.log("currentTime timestamp: " + Date.parse(dateLocal));
      console.log("endTime: " + endTime);
      console.log("endTime timestamp: " + Date.parse(endTime));

      let timeDelta = Date.parse(endTime) - Date.parse(dateLocal);
      console.log("timeDelta: " + timeDelta);
      return <AppCountdown timeLeft={timeDelta} isStart={true}/>
    } else {
      return <div className="countdown">
                <span className="bi bi-stopwatch"></span>
                <div className="countdown-value">00:00</div>
              </div>
    }
  }

  const checkConnection = (connStatus, isSocketClosed) => {
    console.log(isSocketClosed);
    if (isSocketClosed) {
      return <div className="countdown-completed">
      <div className="countdown-completed-info">Server does not respond 
        <br/>Work with lab is not available.<br/>
        Please reconnect via SREE Server or JupyterHub <br/>
      </div>
    </div>
    }
    if (connStatus === 401) {
      return <div className="countdown-completed">
      <div className="countdown-completed-info">Token is incorrect! 
        <br/>Work with lab is not available.<br/>
        Please connect via SREE Server or JupyterHub <br/>
      </div>
    </div>
    }
  }

  // fetch session info
  const fetchSession = async () => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Authorization': tokenId },
      credentials: 'include'
    };
    const response = await fetch(getUrlForRequest('/api/my-session'), 
    requestOptions);
    let data = await response.json();
    if (response.status === 401) {
      setConnStatus(401);
    } else {
      setConnStatus(200);
      setEndTime(data['sessionEndTime']);
      //connectToWebSocket(ws);
    }
  }

  
  useEffect(() => {
    const ws = new WebSocket('ws://195.69.76.135:8082/ws?token=' + tokenId);
    console.log("connectToWebSocket");
    
    
  // Connection opened
  ws.addEventListener("open", event => {
    ws.send("Connection established");
    console.log("Socket connection established");
  });

  // Listen for messages
  ws.addEventListener("message", event => {
    console.log("Message from server ", event.data);
  });

  ws.addEventListener("close", event => {
    console.log("Socket closed");
    setIsSocketClosed(true);
  });
    
  }, []);

  const renderOnTokenIncorrect = (tokenId) => {
    if (!tokenId || tokenId.length === 0) {
      return <div className="countdown-completed">
            <div className="countdown-completed-info">No entry token! 
              <br/>Work with lab is not available.<br/>
              Please connect via SREE Server or JupyterHub <br/> 
            </div>
        </div> 
    }
    fetchSession();

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

                  <input type="checkbox" id="functionalGeneratorCB" name="functionalGeneratorCB" value="FunctionalGenerator"
                  checked={isFunctionalGeneratorEnabled === true}
                  onChange={onFunctionalGeneratorCBChange}/>
                  <label htmlFor="functionalGeneratorCB"> Functional Generator</label><br/>

                  <input type="checkbox" id="scopeCB" name="scopeCB" value="Scope"
                  checked={isScopeEnabled === true}
                  onChange={onScopeCBChange}/>
                  <label htmlFor="scopeCB"> Scope</label><br/>

                </div>           
              </div>

              {/* Close submenu button */}
              <div className="collapse-item">
                <button onClick={onCollapseClicked} 
                className="text-decoration-none collapse-image">
                  {renderCollapseIcon(isSubMenuCollapsed)}
                </button>     
              </div>
              {renderOnTokenIncorrect(tokenId)}
              {checkConnection(connStatus, isSocketClosed)}
              {checkCountdown(connStatus, endTime)}
              <div className="countdown-space">
              </div>
            </div>

            {/* Components */}
            <div>
              {/* Instructions and Program Device */}
              <div className="row">
                <div className="col-lg app-component-box">
                  {renderInstructions(isInstructionsEnabled)}
                </div>
                <div className="col-lg app-component-box">
                  {renderProgramFPGAorMCU(isProgramFPGAEnabled)}
                </div>
              </div>

              {/* Digital Inputs and Camera View */}
              <div className="row">
                <div className="col-lg app-component-box">
                  {renderDigitalInputs(isDigitalInputsEnabled)}
                </div>
                <div className="col-lg app-component-box">
                  {renderCameraView(isCameraViewEnabled)}
                </div>
              </div>

              {/* Functional Generator */}
              <div className="row app-component-box">
                  {renderFunctionalGenerator(isFunctionalGeneratorEnabled)}
              </div>

              {/* Scope */}
              <div className="row app-component-box">
                  {renderScope(isScopeEnabled)}
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
