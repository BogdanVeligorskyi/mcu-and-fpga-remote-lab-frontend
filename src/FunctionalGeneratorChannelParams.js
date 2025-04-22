import { getUrlForRequest } from './utils/get-url-for-request';
import { useState } from "react";
import CircularSlider from '@fseehawer/react-circular-slider';
import Switch from 'react-switch';

function FunctionalGeneratorChannelParams( {channelNum, tokenId, deviceType} ) {

  const [functionType, setFunctionType] = useState("sine");
  const [frequencyPrefix, setFrequencyPrefix] = useState("Hz");
  const [amplitudeValue, setAmplitudeValue] = useState(0.1);
  const [frequencyValue, setFrequencyValue] = useState(1);
  const [dutyCycle, setDutyCycle] = useState(50);
  const [isEnabled, setIsEnabled] = useState(false);
  const [startStop, setStartStop] = useState("Start");

  const sendDutyCycleValue = async (value) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': tokenId },
      body: JSON.stringify({ 
        channel: channelNum-1, 
        dutyCycle: value
      }),
      credentials: 'include'
    };
    const response = await fetch(getUrlForRequest('/api/wavegen/write-duty-cycle'), requestOptions);
    const responseText = await response.json()
    console.log('response.status =', response.status);
    console.log('response text: ', responseText['message']);
  }

  const sendFunctionType = async (value) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' , 'Authorization': tokenId },
      body: JSON.stringify({ 
        channel: channelNum-1, 
        function: value 
      }),
      credentials: 'include'
    };
    const response = await fetch(getUrlForRequest('/api/wavegen/write-function'), requestOptions);
    const responseText = await response.json()
    console.log('response.status =', response.status);
    console.log('response text: ', responseText['message']);
  }

  const sendFrequencyValue = async (value) => {
    console.log("tokenId: " + tokenId);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' , 'Authorization': tokenId },
      body: JSON.stringify({ 
        channel: channelNum-1, 
        frequency: value 
      }),
      credentials: 'include'
    };
    const response = await fetch(getUrlForRequest('/api/wavegen/write-frequency'), requestOptions);
    const responseText = await response.json()
    console.log('response.status =', response.status);
    console.log('response text: ', responseText['message']);
  }

  const sendAmplitudeValue = async (value) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': tokenId },
      body: JSON.stringify({ 
        channel: channelNum-1, 
        amplitude: value 
      }),
      credentials: 'include'
    };
    const response = await fetch(getUrlForRequest('/api/wavegen/write-amplitude'), requestOptions);
    const responseText = await response.json()
    console.log('response.status =', response.status);
    console.log('response text: ', responseText['message']);
  }

  const sendGeneratorConfig = async (isStartValue) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': tokenId },
        body: JSON.stringify({ 
            channel: channelNum-1, 
            isStart: isStartValue 
        }),
        credentials: 'include'
    };
    const response = await fetch(getUrlForRequest('/api/wavegen/write-config'), requestOptions);
    const responseText = await response.json()
    console.log('response.status =', response.status);
    console.log('response text: ', responseText['message']);
    if (response.status === 200 && isStartValue === 1) {
        alert("Generating waveform for channel " + channelNum);
    } else if (isStartValue === 1) {
        alert("An error occured when trying to generate waveform for channel " + channelNum);
    }
    if (response.status === 200 && isStartValue === 0) {
        alert("Stopped generating waveform for channel " + channelNum);
    } else if (isStartValue === 0) {
        alert("An error occured when trying to stop generating waveform for channel " + channelNum);
    }
  }

  const sendChannelEnabled = async (value) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': tokenId },
        body: JSON.stringify({ 
            channel: channelNum-1, 
            isEnabled: value 
        }),
        credentials: 'include'
    };
    const response = await fetch(getUrlForRequest('/api/wavegen/write-channel'), requestOptions);
    const responseText = await response.json()
    console.log('response.status =', response.status);
    console.log('response text: ', responseText['message']);
  }

  // invoked when function type is changed
  const onFunctionTypeChange = e => {
    console.log(window.location.href);
    setFunctionType(e.target.value);
    if (e.target.value !== "pulse") {
      setDutyCycle(50);
      sendDutyCycleValue(50);    
    }
    sendFunctionType(e.target.value);
  }

  // invoked when frequency prefix is changed
  const onFrequencyPrefixChange = e => {
    setFrequencyPrefix(e.target.value);
    let freq = 0.0;
    if (e.target.value === "kHz") {
       freq = frequencyValue * 1000.0;
    } else {
        freq = frequencyValue * 1.0;
    }
    console.log(frequencyValue + " " + frequencyPrefix);
    sendFrequencyValue(freq);
  }

  // invoked when amplitude is changed
  const onAmplitudeValueChange = value => {
    console.log(value);
    if (value == null) {
      return;
    }
    let voltValue = value / 10; // convert to V
    setAmplitudeValue(voltValue);
    sendAmplitudeValue(voltValue);
  }

  // invoked when frequency is changed 
  const onFrequencyValueChange = value => {
    setFrequencyValue(value);
    if (value == null) {
      return;
    } 
    let freq;
    // send to analog discovery value in Hz
    if (frequencyPrefix === "kHz") {
      freq = value * 1000.0;
    } else {
      freq = value * 1.0;
    }
    sendFrequencyValue(freq);
  }

  // handler for start/stop button
  const onStartStopClick = () => {
    if (!isEnabled) {
      return;
    }
    if (startStop === "Start") {
      setStartStop("Stop");
      sendGeneratorConfig(1);
    } else {
      setStartStop("Start")
      sendGeneratorConfig(0);    
    }
  }

  // ivoked when duty cycle is changed
  const onDutyCycleChange = e => {
    setDutyCycle(e.target.value);
    sendDutyCycleValue(Number(e.target.value));
  }

  // ivoked when channel state is changed
  const onStateChange = () => {
    setIsEnabled(!isEnabled);
    let isEnabledInt;
    if (isEnabled) {
      isEnabledInt = 0;
      setStartStop("Start");
    } else {
      isEnabledInt = 1;
      sendFunctionType(functionType);
      sendDutyCycleValue(Number(dutyCycle));
    }
    sendChannelEnabled(isEnabledInt);    
  }

  return (
    <div>
      <div className="functional-generator-channel-name">
      CH{channelNum}
        <div className="switch-sizing">
          <Switch checkedIcon={false} uncheckedIcon={false} 
                  checked={isEnabled} onChange={onStateChange} />
        </div>
      </div>
      <table className="functional-generator-table">
        <tbody>
          <tr>
            <td><span className="sine-function"></span></td>
            <td>
              <input type="radio" 
                     id={("sineFunction" + channelNum)} 
                     name={("sineFunction" + channelNum)}
                     value="sine" 
                     checked={functionType === "sine"}
                     onChange={onFunctionTypeChange}/>
            </td>
          </tr>
          <tr>
            <td><span className="rampup-function"></span></td>
            <td>
              <input type="radio" 
                     id={("rampupFunction" + channelNum)} 
                     name={("rampupFunction" + channelNum)} 
                     value="rampup"
                     checked={functionType === "rampup"}
                     onChange={onFunctionTypeChange}/>
            </td>
          </tr>
          <tr>
            <td><span className="triangle-function"></span></td>
            <td>
              <input type="radio" 
                     id={("triangleFunction" + channelNum)} 
                     name={("triangleFunction" + channelNum)} 
                     value="triangle"
                     checked={functionType === "triangle"}
                     onChange={onFunctionTypeChange}/>
            </td>
          </tr>
          <tr>
            <td><span className="pulse-function"></span></td>
            <td>
              <input type="radio" 
                     id={("pulseFunction" + channelNum)} 
                     name={("pulseFunction" + channelNum)} 
                     value="pulse"
                     checked={functionType === "pulse"}
                     onChange={onFunctionTypeChange}/>
            </td>
          </tr>              
        </tbody>
      </table>
      <table className="functional-generator-sliders">
        <tbody>
          <tr>
            <td><label>Amp</label></td>
            <td><label>Freq</label></td>
          </tr>
          <tr>
            <td><label className={"round-sliders-label " + (deviceType === "mcu" ? 'mcu-lab-background-special' : 'fpga-lab-background-special')}>{amplitudeValue} V</label></td>
            <td><label className={"round-sliders-label " + (deviceType === "mcu" ? 'mcu-lab-background-special' : 'fpga-lab-background-special')}>{frequencyValue} {frequencyPrefix}</label></td>
          </tr>
          <tr>
            <td className="round-slider-amplitude-image">
              <CircularSlider
                className="round-slider" 
                hideLabelValue 
                min={1}
                max={29} 
                width={115}
                trackColor="#ffffff"
                onChange={onAmplitudeValueChange}>
              </CircularSlider>
            </td>
            <td className="round-slider-frequency-image">
              <CircularSlider
                className="round-slider" 
                hideLabelValue
                min={1}
                max={200}  
                width={115}
                trackColor="#ffffff"
                onChange={onFrequencyValueChange}/>
            </td>
          </tr>
        </tbody>
      </table>

      <table className="functional-generator-table">
        <tbody>
          <tr>
            <td>
              <input type="radio" 
                     id={("hzPrefix" + channelNum)} 
                     name={("hzPrefix" + channelNum)} 
                     value="Hz"
                     checked={frequencyPrefix === "Hz"}
                     onChange={onFrequencyPrefixChange}/>
              <label className="functional-generator-channel-radio">Hz</label><br/>
            </td>
          </tr>
          <tr>
            <td>
              <input type="radio" 
                     id={("khzPrefix" + channelNum)} 
                     name={("khzPrefix" + channelNum)} 
                     value="kHz"
                     checked={frequencyPrefix === "kHz"}
                     onChange={onFrequencyPrefixChange}/>
              <label className="functional-generator-channel-radio">kHz</label><br/>
            </td>
          </tr>
        </tbody>
      </table>

      <div className={(functionType === "pulse" ? 
        'functional-generator-duty-cycle' : 
        'functional-generator-duty-cycle-no')}>
        <label>Duty Cycle</label><br/>
        <label className={"round-sliders-label " + (deviceType === "mcu" ? 'mcu-lab-background-special' : 'fpga-lab-background-special')}>{dutyCycle} %</label><br/>
        <input 
          type="range" 
          id={("dutyCycleRange" + channelNum)} 
          name={("dutyCycleRange" + channelNum)} 
          min={0} 
          step={1} 
          max={100}
          value={dutyCycle} 
          onChange={onDutyCycleChange} />
      </div>
      <div className="m-4">
        <div className={(isEnabled ? 
          'btn btn-primary' :
          'btn disabled btn-primary')} 
          onClick={onStartStopClick}>{startStop}
        </div>
      </div>    
    </div>
  );
}

export default FunctionalGeneratorChannelParams;