import './styles/Terminal.css'
import { useState } from 'react';

function Terminal() {

  const [isSettings, setIsSettings] = useState(false);
  const [terminalOutputText, setTerminalOutputText] = useState("");
  const [enteredCommand, setEnteredCommand] = useState("");
  const [isEchoEnabled, setIsEchoEnabled] = useState(true);

  const renderTerminalPane = (isSettings) => {
    if (!isSettings) {
      return <textarea className="textarea" value={terminalOutputText} readOnly={true}></textarea>
    } else {
      return <div className="textarea">
        <h2>Terminal Settings</h2>
        <div className="input-fields">
          <input id="terminalEcho" checked={isEchoEnabled === true} onChange={onTerminalEchoCBChange} type="checkbox" />
          <label htmlFor="terminalEcho"> Echo </label><br/>
        </div>
        <div className="input-fields">
          <input id="terminalSpeed" type="number"/>
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
      setTerminalOutputText("");
      setEnteredCommand("");
      return;
    }

    console.log("is echo enabled: " + isEchoEnabled);
    if (isEchoEnabled) {
      setTerminalOutputText(terminalOutputText + "\n $" + enteredCommand + "\n" + "Command result");
    } else {
      setTerminalOutputText(terminalOutputText + "\n" + "Command result");
    }
    setEnteredCommand("");
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
          <input value={enteredCommand} disabled={isSettings} onKeyUp={handleKeyDown} onChange={e => setEnteredCommand(e.target.value)} type="text" placeholder="Enter command:"/>
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