import { getUrlForRequest } from './utils/get-url-for-request';
import { useState } from 'react';
import Switch from 'react-switch'

function DigitalInputsSwitch({ pinNum, renderResult, tokenId }) {

  const [isSwitched, setIsSwitched] = useState(false);
  const [isRequestCompleted, setIsRequestCompleted] = useState(false);
  const [status, setStatus] = useState(0);
  const [diValue, setDIValue] = useState("");

  const sendSwitchValue = async (value) => {
    setDIValue("DI value:");
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

  // send pin value to server
  const setSwitchValue = (value) => {
    sendSwitchValue(value);
  }

  const onStateChange = () => {
    setIsSwitched(!isSwitched);
    if (isSwitched) {
      setSwitchValue(0);
    } else {
      setSwitchValue(1);
    }
  }

  return(
    <div>
      <Switch checkedIcon={false} uncheckedIcon={false} 
      checked={isSwitched} onChange={onStateChange} />
      {renderResult(isRequestCompleted, status, diValue)}
    </div>
  ); 
}

export default DigitalInputsSwitch;