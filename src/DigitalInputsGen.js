import { getUrlForRequest } from './utils/get-url-for-request';
import { useState } from "react";

function DigitalInputsGen({ pinNum, renderResult, tokenId }) {

  const [isOn, setIsOn] = useState(false);
  const [isRequestCompleted, setIsRequestCompleted] = useState(false);
  const [diValue, setDIValue] = useState("");
  const [dutyCycle, setDutyCycle] = useState(50);
  const [status, setStatus] = useState(0);
  const [frequency, setFrequency] = useState(5);
  const [intervalID, setIntervalID] = useState();
  const [secondIntervalID, setSecondIntervalID] = useState();

  const sendGenValue = async (value) => {
    setIsRequestCompleted(false);
    setStatus(0);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': tokenId },
      body: JSON.stringify({ pin: pinNum, state: value }),
      credentials: 'include'
    };
    const response = await fetch(getUrlForRequest('/api/write-pin'), requestOptions);
    const responseText = await response.json();
    console.log('response.status =', response.status);
    console.log('response text: ', responseText['message']);
    if (response.status === 200) {
      setStatus(200);
      setDIValue("DI value: " + value);
    } else {
      setStatus(404);
      setDIValue("DI value: undefined");
    }
    setIsRequestCompleted(true);
  }

  // send pin value to server
  const setGenValue = (value) => {
    setDIValue("DI value:");
    sendGenValue(value);
  }

  const onButtonClick = () => {
    setIsOn(!isOn);
    // if stopped - stop timers
    if (isOn) {
      clearInterval(intervalID);
      clearInterval(secondIntervalID);
    } else {
      let interval = 1000/frequency;
      let timeout = interval * (dutyCycle / 100);
      console.log(interval);
      console.log(timeout);
      setIntervalID(setInterval(() => setGenValue(1), (1000/frequency)));
      setTimeout(() => {setSecondIntervalID(setInterval(() => setGenValue(0), (1000/frequency)));}, timeout);         
    }
  }

  // render neccessary graphical component based on the 
  // chosen switch state (on/off)
  const renderOnOffButton = (isOn) => {
    if (isOn) {
      return <button className="digital-input-turn-on" onClick={onButtonClick}/>
    } else {
      return <button className="digital-input-turn-off" onClick={onButtonClick}/>
    }
  }

  return(
    <div>
      {renderOnOffButton(isOn)}
      <input type="number" value={dutyCycle} disabled={isOn === true}
             onChange={e => setDutyCycle(e.target.value)} 
             className="digital-input-duty-value" min="1" max="99" />
             Duty, %
      <input type="number" value={frequency}
             onChange={e => setFrequency(e.target.value)} disabled={isOn === true}
             className="digital-input-frequency-value" min="1" max="10" />
             Freq, Hz
      {renderResult(isRequestCompleted, status, diValue)}
    </div>
  );
}

export default DigitalInputsGen;