import { getUrlForRequest } from './utils/get-url-for-request';
import { useState } from 'react';
import Switch from 'react-switch'

function DigitalInputsSwitch({ pinNum }) {

    const [isSwitched, setIsSwitched] = useState(false);
    const [isRequestCompleted, setIsRequestCompleted] = useState(false);
    const [status, setStatus] = useState(0);
    const [diValue, setDIValue] = useState("");

    const sendRequest = (value) => {
        setIsRequestCompleted(false);
        setStatus(0);
        setDIValue("DI value:");
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pin: pinNum, state: value }),
          };
          fetch(getUrlForRequest('/api/write-pin'), requestOptions).then(
            (response) => {
              console.log('response.status =', response.status);
              console.log('response text: ', response.json());
              if (response.status === 200) {
                setStatus(200);
                setDIValue("DI value: " + value);
              } else {
                setStatus(404);
                setDIValue("DI value: undefined");
              }
              setIsRequestCompleted(true);
            }
          ).catch(error => {
            console.log(error)
        });
    }

    const onStateChange = () => {
        setIsSwitched(!isSwitched);
        if (isSwitched) {
            sendRequest(0);
        } else {
            sendRequest(1);
        }
    }

    const renderResultBlock = (isRequestCompleted, status) => {
        //console.log(status);
        if (isRequestCompleted && status === 200) {
            return <div className="digital-inputs-button-success">{diValue}</div>
        } else if (isRequestCompleted && status !== 200) {
            return <div className="digital-inputs-button-failure">{diValue}</div>
        } else if (!isRequestCompleted && status === 0) {
          return <div className="digital-inputs-button-process">{diValue}</div>
        }
    }

    return(
        <div>
            <Switch checkedIcon={false} uncheckedIcon={false} checked={isSwitched} onChange={onStateChange} />
            {renderResultBlock(isRequestCompleted, status)}
        </div>
    ); 
}

export default DigitalInputsSwitch;