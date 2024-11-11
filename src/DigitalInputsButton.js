import { getUrlForRequest } from './utils/get-url-for-request';
import { useState } from 'react';

function DigitalInputsButton({ pinNum }) {

  const [resultMessage, setResultMessage] = useState("")
  const [isRequestCompleted, setIsRequestCompleted] = useState(false)
  const [status, setStatus] = useState(0)

const renderResultBlock = (isRequestCompleted, status) => {
    console.log(status);
    if (isRequestCompleted && status === 200) {
        return <div className="digital-inputs-button-success">{resultMessage}</div>
    } else if (isRequestCompleted && status !== 200) {
        return <div className="digital-inputs-button-failure">{resultMessage}</div>
    } else if (!isRequestCompleted && status === 0) {
      return <div className="digital-inputs-button-process">{resultMessage}</div>
    }
}

  const onButtonClick = () => {
    setIsRequestCompleted(false);
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
          setResultMessage("Successfuly set pin " + pinNum + "!");
        } else {
          setStatus(500);
          setResultMessage("Error trying to set pin " + pinNum + "!");
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
    <button className="digital-input-button" onClick={onButtonClick}></button>
    {renderResultBlock(isRequestCompleted, status)}
    </div>
  );
}

export default DigitalInputsButton;
