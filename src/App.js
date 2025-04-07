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
import Potentiometr from './Potentiometr';
import Terminal from './Terminal';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function App() {
 
  const [isInstructionsEnabled, setIsInstructionsEnabled] = useState(true);  
  const [isProgramDeviceEnabled, setIsProgramDeviceEnabled] = useState(true);
  const [isDigitalInputsEnabled, setIsDigitalInputsEnabled] = useState(true);
  const [isCameraViewEnabled, setIsCameraViewEnabled] = useState(true);
  const [isFunctionalGeneratorEnabled, setIsFunctionalGeneratorEnabled] = useState(true);
  const [isPotentiometrEnabled, setIsPotentiometrEnabled] = useState(true);
  const [isTerminalEnabled, setIsTerminalEnabled] = useState(true);
  const [isScopeEnabled, setIsScopeEnabled] = useState(true);
  const [isSubMenuCollapsed, setIsSubMenuCollapsed] = useState(false);
  const [isSocketClosed, setIsSocketClosed] = useState(false);
  const [connStatus, setConnStatus] = useState(0);
  const [endTime, setEndTime] = useState("");
  const [deviceType, setDeviceType] = useState("");

  const query = useQuery();
  const token = query.get("token");  

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
    setIsInstructionsEnabled(!isInstructionsEnabled);
  }

  const onProgramDeviceCBChange = () => {
    setIsProgramDeviceEnabled(!isProgramDeviceEnabled);
  }  

  const onDigitalInputsCBChange = () => {
    setIsDigitalInputsEnabled(!isDigitalInputsEnabled);
  }

  const onPotentiometrCBChange = () => {
    setIsPotentiometrEnabled(!isPotentiometrEnabled);
  }

  const onTerminalCBChange = () => {
    setIsTerminalEnabled(!isTerminalEnabled);
  }

  const onCameraViewCBChange = () => {
    setIsCameraViewEnabled(!isCameraViewEnabled);
  }

  const onFunctionalGeneratorCBChange = () => {
    setIsFunctionalGeneratorEnabled(!isFunctionalGeneratorEnabled);
  }

  const onScopeCBChange = () => {
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

  const renderProgramFPGAorMCU = (isProgramDeviceEnabled, deviceType) => {
   
    if (deviceType === "") {
      return <div><h2>Program Device</h2></div>
    } 
   
    if (isProgramDeviceEnabled && deviceType === "fpga") {
      return <ProgramDevice isFPGADevice={true} tokenId={token}/>
    } else if (!isProgramDeviceEnabled && deviceType === "fpga") {
      return <div><h2>Program FPGA</h2></div> 
    }

    if (isProgramDeviceEnabled && deviceType === "mcu") {
      return <ProgramDevice isFPGADevice={false} tokenId={token}/>
    } else if (!isProgramDeviceEnabled && deviceType === "mcu") {
      return <div><h2>Program MCU</h2></div>
    }
        
  }

  const renderPotentiometr = (isPotentiometrEnabled) => {
    if (isPotentiometrEnabled) {
      return <Potentiometr/>
    } else {
      return <div><h2>Potentiometr</h2></div>
    }
  }

  const renderTerminal = (isTerminalEnabled) => {
    if (isTerminalEnabled) {
      return <Terminal/>
    } else {
      return <div><h2>Terminal</h2></div>
    }
  }

  const renderDigitalInputs = (isDigitalInputsEnabled) => {
    if (isDigitalInputsEnabled) {
      return <DigitalInputs tokenId={token}/>
    } else {
      return <div><h2>Digital Inputs</h2></div>
    }
  }

  const renderCameraView = (isCameraViewEnabled) => {
    if (isCameraViewEnabled) {
      return <CameraView tokenId={token}/>
    } else {
      return <div><h2>Camera View From Lab</h2></div>
    }
  }

  const renderFunctionalGenerator = (isFunctionalGeneratorEnabled) => {
    if (isFunctionalGeneratorEnabled) {
      return <FunctionalGenerator tokenId={token}/>
    } else {
      return <div><h2>Functional Generator</h2></div>
    }
  }

  const renderScope = (isScopeEnabled) => {
    if (isScopeEnabled) {
      return <Scope tokenId={token}/>
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
      return <AppCountdown timeLeft={timeDelta}/>
    } else {
      return <div className="countdown">
                <span className="bi bi-stopwatch"></span>
                <div className="countdown-value">00:00</div>
             </div>
    }
  }

  // fetch session info
  const fetchSession = async () => {
    if (isSocketClosed) {
      return;
    }
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Authorization': token },
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
      setDeviceType(data['deviceType']);
    }
  }

  // socket connection
  useEffect(() => {
    if (!token) {
      return;
    }
    const ws = new WebSocket('wss://digitrans.stu.cn.ua:8082/ws?token=' + token);
    
    // Connection opened
    ws.addEventListener("open", event => {
      ws.send("Connection established");
      console.log("Socket connection established");
    });

    ws.addEventListener("message", event => {
      console.log("Message from server ", event.data);
    });

    // Connection closed
    ws.addEventListener("close", event => {
      console.log("Socket closed");
      setIsSocketClosed(true);
    });
    const pingInterval = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        console.log("Socket send ping message");
        ws.send(JSON.stringify({ type: 'ping' }));
      }
    }, 30000);
    
  }, [token]);

  // show error message if something is wrong
  const renderErrorMessage = (token, connStatus, isSocketClosed) => {

    // if no token is provided
    if (!token || token.length === 0) {
      return <div className="error-message">
            <div className="error-message-info">No entry token! 
              <br/>Work with lab is not available.<br/>
              Please connect via SREE Server or JupyterHub <br/> 
            </div>
        </div> 
    }

    fetchSession();
    console.log("isSocketClosed: " + isSocketClosed);
    
    // if token is incorrect
    if (connStatus === 401) {
      return <div className="error-message">
      <div className="error-message-info">Token is incorrect! 
        <br/>Work with lab is not available.<br/>
        Please connect via SREE Server or JupyterHub <br/>
      </div>
    </div>
    }

    // if socket connection was closed
    if (isSocketClosed) {
      return <div className="error-message">
      <div className="error-message-info">Connection was closed. 
        <br/>Work with lab is not available.<br/>
        Please reconnect via SREE Server or JupyterHub <br/>
      </div>
    </div>
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
                
                {/* Open submenu button */}
                <div className="collapse-item">
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
                            
                  <input type="checkbox" id="programDeviceCB" name="programDeviceCB" value="ProgramDevice"
                  checked={isProgramDeviceEnabled === true}
                  onChange={onProgramDeviceCBChange}/>
                  <label htmlFor="programDeviceCB"> Program Device</label><br/>
                            
                  <input type="checkbox" id="digitalInputsCB" name="digitalInputsCB" value="DigitalInputs"
                  checked={isDigitalInputsEnabled === true}
                  onChange={onDigitalInputsCBChange}/>
                  <label htmlFor="digitalInputsCB"> Digital Inputs</label><br/>
                            
                  <input type="checkbox" id="cameraViewCB" name="cameraViewCB" value="CameraView"
                  checked={isCameraViewEnabled === true}
                  onChange={onCameraViewCBChange}/>
                  <label htmlFor="cameraViewCB"> Camera View</label><br/>

                  <input type="checkbox" id="potentiometrCB" name="potentiometrCB" value="Potentiometr"
                  checked={isPotentiometrEnabled === true}
                  onChange={onPotentiometrCBChange}/>
                  <label htmlFor="potentiometrCB">Potentiometr</label><br/>

                  <input type="checkbox" id="terminalCB" name="terminalCB" value="Terminal"
                  checked={isTerminalEnabled === true}
                  onChange={onTerminalCBChange}/>
                  <label htmlFor="terminalCB"> Terminal</label><br/>

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
              {/* {renderErrorMessage(token, connStatus, isSocketClosed)} */}
              {checkCountdown(200, 400000)}
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
                  {renderProgramFPGAorMCU(isProgramDeviceEnabled, deviceType)}
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

              {/* Potentiometr and Terminal */}
              <div className="row">
                <div className="col-lg app-component-box">
                  {renderPotentiometr(isPotentiometrEnabled)}
                </div>
                <div className="col-lg app-component-box">
                  {renderTerminal(isTerminalEnabled)}
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
