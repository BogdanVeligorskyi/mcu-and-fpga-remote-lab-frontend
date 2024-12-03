import { getUrlForRequest } from './utils/get-url-for-request';
import { useState } from 'react';

function DigitalInputsButton({ pinNum }) {

  const [resultMessage, setResultMessage] = useState("");
  const [isRequestCompleted, setIsRequestCompleted] = useState(false);
  const [status, setStatus] = useState(0);
  const [isPressed, setIsPressed] = useState(false);

  const renderResultBlock = (isRequestCompleted, status) => {
    //console.log(status);
    if (isRequestCompleted && status === 200) {
        return <div className="digital-inputs-button-success">
          {resultMessage}</div>
    } else if (isRequestCompleted && status !== 200) {
        return <div className="digital-inputs-button-failure">
          {resultMessage}</div>
    } else if (!isRequestCompleted && status === 0) {
      return <div className="digital-inputs-button-process">
        {resultMessage}</div>
    }
}

  // invoked when button is released
  const onButtonRelease = () => {
    setIsRequestCompleted(false);
    setIsPressed(false);
    setStatus(0);
    console.log(pinNum);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pin: pinNum, state: 0 }),
    };
    setResultMessage("Trying to set pin " + pinNum);
    fetch(getUrlForRequest('/api/write-pin'), requestOptions).then(
      (response) => {
        if (response.status === 200) {
          setStatus(200);
          setResultMessage("DI value: 0");
        } else {
          setStatus(404);
          setResultMessage("DI value: undefined");
        }
        setIsRequestCompleted(true);
        console.log('response.status =', response.status);
        console.log('response text: ', response.json());
      }
    ).catch(error => {
      console.log(error)
    });
  };

  // invoked when button is pressed
  const onButtonPress = () => {
    setIsRequestCompleted(false);
    setIsPressed(true);
    setStatus(0);
    console.log(pinNum);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pin: pinNum, state: 1 }),
    };
    setResultMessage("Trying to set pin " + pinNum);
    fetch(getUrlForRequest('/api/write-pin'), requestOptions).then(
      (response) => {
        if (response.status === 200) {
          setStatus(200);
          setResultMessage("DI value: 1");
        } else {
          setStatus(500);
          setResultMessage("DI value: undefined");
        }
        setIsRequestCompleted(true);
        console.log('response.status =', response.status);
        console.log('response text: ', response.json());
      }
    ).catch(error => {
      console.log(error)
  });
  };
  return (<div>
    <button className={(isPressed ? "digital-input-button-pressed" : 
    "digital-input-button-normal")} 
    onMouseDown={onButtonPress} 
    onMouseUp={onButtonRelease}>
    </button>
    {renderResultBlock(isRequestCompleted, status)}
    </div>
  );
}

export default DigitalInputsButton;
