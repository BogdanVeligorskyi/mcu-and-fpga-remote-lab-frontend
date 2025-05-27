import './styles/Terminal.css'
import { useState, useEffect } from 'react';
import { getUrlForRequest } from './utils/get-url-for-request';

function Terminal({tokenId, socket}) {

  const [isSettings, setIsSettings] = useState(false);
  const [terminalOutputText, setTerminalOutputText] = useState([]);
  const [enteredCommand, setEnteredCommand] = useState("");
  const [isEchoEnabled, setIsEchoEnabled] = useState(true);
  const [terminalSpeed, setTerminalSpeed] = useState(9600);

  useEffect(() => {
    console.log("Terminal useEffect");
    console.log('Child => socket', socket);
    /*if (socket) {
      console.log('attaching socket events');
      sendTerminalSpeedValue(terminalSpeed);
    }

    socket.addEventListener("message", event => {
      console.log("Message from server ", event.data);
      const response = JSON.parse(event.data);
      
      // if response is type: uart - renew terminal window
      if (response.type === "uart") {
        setTerminalOutputText([...terminalOutputText, { text: "Command result", style: { color: 'white'} }]);
      }
      console.log('response text: ' + response.text);  
    });*/

  }, [socket]);

  const renderTerminalPane = (isSettings) => {
    if (!isSettings) {
      return <div className="textarea">
        {terminalOutputText.map((paragraph, index) => (
        <p key={index} style={paragraph.style}>{paragraph.text}</p>
      ))}
      </div>
    } else {
      return <div className="textarea">
        <h2>Terminal Settings</h2>
        <div className="input-fields">
          <input id="terminalEcho" checked={isEchoEnabled === true} onChange={onTerminalEchoCBChange} type="checkbox" />
          <label htmlFor="terminalEcho"> Echo </label><br/>
        </div>
        <div className="input-fields">
          <input id="terminalSpeed" min="1" max="1000000" value={terminalSpeed} onChange={onTerminalSpeedValueChange} type="number"/>
          <label htmlFor="terminalSpeed"> Terminal Speed </label><br/>
        </div>
      </div>
    }
  }

  const renderSendButton = (isSettings) => {
    if (!isSettings) {
      return <button onClick={onSendClick} className="send-button"><i className="bi bi-send"></i></button>
    } else {
      return <div className="send-button"></div>
    }
  }

  const renderCommandInput = (isSettings) => {
    if (!isSettings) {
      return <input className="input-field" value={enteredCommand} onKeyUp={handleKeyDown} onChange={e => setEnteredCommand(e.target.value)} type="text" placeholder="Enter command:"/>
    } else {
      return <div className="input-field"></div>
    }
  }

  const onTerminalSpeedValueChange = e => {
    console.log(e.target.value);
    let value = Number(e.target.value);
    if (e.target.value == null) {
      return;
    }
    if (Number(e.target.value) >= 1000000) {
      value = 1000000;
    } else if (Number(e.target.value) <= 0) {
      value = 1;
    }
    setTerminalSpeed(value);
    sendTerminalSpeedValue(value);
  }

  const sendTerminalSpeedValue = async (value) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': tokenId },
      body: JSON.stringify({ speed: Number(value) }),
      credentials: 'include'
    };
    const response = await fetch(getUrlForRequest('/api/uart/speed'), requestOptions);
    console.log('response.status =', response.status);
    // console.log('response text: ' + responseText['message']);  
  }

  const onTerminalEchoCBChange = () => {
    setIsEchoEnabled(!isEchoEnabled);
  }

  const onSettingsClick = () => {
    console.log("settings click!");
    setIsSettings(true);
  }

  const sendCommandProcess = () => {
    if (enteredCommand === "") {
      return;
    }

    if (enteredCommand === "clear") {
      setTerminalOutputText([]);
      setEnteredCommand("");
      return;
    }

    console.log("is echo enabled: " + isEchoEnabled);
    if (isEchoEnabled) {
      setTerminalOutputText([...terminalOutputText, { text: "$" + enteredCommand, style: { color: 'lightgreen'} }, { text: "Command result", style: { color: 'white'} }]);
      sendCommandToServer(enteredCommand);
    } else {
      setTerminalOutputText([...terminalOutputText, { text: "Command result", style: { color: 'white'} }]);
      sendCommandToServer(enteredCommand);
    }
    setEnteredCommand("");
  }

  const sendCommandToServer = (message) => {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: 'uart', text: message }));
    }
  }

  const onSendClick = () => {
    console.log("send command click!");
    sendCommandProcess();
  }

  const onTerminalClick = () => {
    console.log("terminal click!");
    setIsSettings(false);
  }

  const onClearClick = () => {
    console.log("clear click!");
    setIsSettings(false);
    setTerminalOutputText("");
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      sendCommandProcess();
    }
  }

    return(
      <div>
        <h2>Terminal</h2>
        <div className="terminal">{renderTerminalPane(isSettings)}</div>
        <div className={"terminal-input" + (isSettings ? " terminal-input-spec" : " ")}>
          {renderCommandInput(isSettings)}
          {renderSendButton(isSettings)}
          <div className="dropdown">
            <button className="options-dropdown"><i className="bi bi-caret-down-fill"></i></button>
            <div className="dropdown-content">
              <button title="Settings" onClick={onSettingsClick}><i className="bi bi-gear"></i></button>
              <button title="Clear" onClick={onClearClick}><i className="bi bi-eraser"></i></button>
              <button title="Terminal" onClick={onTerminalClick}><i className="bi bi-terminal"></i></button>
            </div>
          </div>
        </div>  
      </div>
    );
  }
  
  export default Terminal;