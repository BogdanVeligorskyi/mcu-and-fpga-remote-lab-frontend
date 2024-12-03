import { getUrlForRequest } from './utils/get-url-for-request';
import { useState } from "react";

function DigitalInputsGen({ pinNum }) {

    const [isOn, setIsOn] = useState(false);
    const [isRequestCompleted, setIsRequestCompleted] = useState(false);
    const [diValue, setDIValue] = useState("");
    const [dutyCycle, setDutyCycle] = useState(50);
    const [status, setStatus] = useState(0);
    const [frequency, setFrequency] = useState(5);
    const [intervalID, setIntervalID] = useState();
    const [secondIntervalID, setSecondIntervalID] = useState();

    // send pin value to server
    const sendRequest = (value) => {
        setIsRequestCompleted(false);
        setStatus(0);
        setDIValue("DI value:");
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pin: pinNum, state: value }),
          };
          fetch(getUrlForRequest('/api/write-pin'), 
          requestOptions).then(
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
            setIntervalID(setInterval(() => sendRequest(1), 
            (1000/frequency)));
            setTimeout(() => {setSecondIntervalID(setInterval(
                () => sendRequest(0), (1000/frequency)));            
        }, timeout);
            
            console.log("After");
        }
    }

    // render neccessary graphical component based on the 
    // chosen switch state (on/off)
    const renderOnOffButton = (isOn) => {
        if (isOn) {
            return <button className="digital-input-turn-on" 
            onClick={onButtonClick}/>
        } else {
            return <button className="digital-input-turn-off" 
            onClick={onButtonClick}/>
        }
    }

    const renderResultBlock = (isRequestCompleted, status) => {
        //console.log(status);
        if (isRequestCompleted && status === 200) {
            return <div className="digital-inputs-button-success">
                {diValue}</div>
        } else if (isRequestCompleted && status !== 200) {
            return <div className="digital-inputs-button-failure">
                {diValue}</div>
        } else if (!isRequestCompleted && status === 0) {
          return <div className="digital-inputs-button-process">
            {diValue}</div>
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
            {renderResultBlock(isRequestCompleted, status)}
        </div>
    );
}

export default DigitalInputsGen;