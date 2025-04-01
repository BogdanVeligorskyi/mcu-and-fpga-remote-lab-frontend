import { getUrlForRequest } from './utils/get-url-for-request';
import { useState } from 'react';

function DigitalInputsButton({ pinNum, renderResult, tokenId }) {

  const [diValue, setDIValue] = useState("");
  const [isRequestCompleted, setIsRequestCompleted] = useState(false);
  const [status, setStatus] = useState(0);
  const [isPressed, setIsPressed] = useState(false);

  const sendButtonValue = async (value) => {
    setIsRequestCompleted(false);
    setStatus(0);
    console.log(pinNum);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': tokenId },
      body: JSON.stringify({ pin: pinNum, state: value }),
      credentials: 'include'
    };
    setDIValue("Trying to set pin " + pinNum);
    const response = await fetch(getUrlForRequest('/api/write-pin'), requestOptions);
    const responseText = await response.json();
    console.log('response.status =', response.status);
    console.log('response text: ' + responseText['message']);
    if (response.status === 200) {
      setStatus(200);
      setDIValue("DI value: " + value);
    } else {
      setStatus(404);
      setDIValue("DI value: undefined");
    }
    setIsRequestCompleted(true);
  }

  // invoked when button is released
  const onButtonRelease = () => {
    setIsPressed(false);
    sendButtonValue(0);
  };

  // invoked when button is pressed
  const onButtonPress = () => {
    setIsPressed(true);
    sendButtonValue(1);
  };

  return (<div>
    <button className={(isPressed ? "digital-input-button-pressed" : 
    "digital-input-button-normal")} 
    onMouseDown={onButtonPress} 
    onMouseUp={onButtonRelease}>
    </button>
    {renderResult(isRequestCompleted, status, diValue)}
    </div>
  );
}

export default DigitalInputsButton;
