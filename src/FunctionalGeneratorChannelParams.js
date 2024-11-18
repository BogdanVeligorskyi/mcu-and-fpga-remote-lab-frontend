import { getUrlForRequest } from './utils/get-url-for-request';
import { useState } from "react";
import CircularSlider from '@fseehawer/react-circular-slider';
import Switch from 'react-switch';

function FunctionalGeneratorChannelParams( {channelNum} ) {

    const [functionType, setFunctionType] = useState("sine");
    const [frequencyPrefix, setFrequencyPrefix] = useState("Hz");
    const [amplitudeValue, setAmplitudeValue] = useState(-5000);
    const [frequencyValue, setFrequencyValue] = useState(1);
    const [dutyCycle, setDutyCycle] = useState(0);
    const [isEnabled, setIsEnabled] = useState(false);

    const onFunctionTypeChange = e => {
        setFunctionType(e.target.value);
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ channel: channelNum-1, function: e.target.value }),
        };
        fetch(getUrlForRequest('/api/wavegen/write-function'), requestOptions).then(
            (response) => {
              /*if (response.status === 200) {
                //setResultMessage("Successfuly unset pin " + pinNum + "!");
              } else {
                setResultMessage("Error trying to set pin " + pinNum + "!");
              }*/
              //setIsRequestCompleted(true);
              console.log('response.status =', response.status);
              console.log('response text: ', response.json());
            }
          ).catch(error => {
            console.log(error)
        });
    }

    const onFrequencyPrefixChange = e => {
        setFrequencyPrefix(e.target.value);
        console.log(frequencyPrefix);
        setFrequencyValue(0);
    }

    const onAmplitudeValueChange = value => {
        if (value == null) {
            return;
        }
        setAmplitudeValue(value);
        let voltValue = value / 1000; // convert from mV to V
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ channel: channelNum-1, amplitude: voltValue }),
        };
        fetch(getUrlForRequest('/api/wavegen/write-amplitude'), requestOptions).then(
            (response) => {
              /*if (response.status === 200) {
                //setResultMessage("Successfuly unset pin " + pinNum + "!");
              } else {
                setResultMessage("Error trying to set pin " + pinNum + "!");
              }*/
              //setIsRequestCompleted(true);
              console.log('response.status =', response.status);
              console.log('response text: ', response.json());
            }
          ).catch(error => {
            console.log(error)
        });
    }

    const onFrequencyValueChange = value => {
        if (value == null) {
            return;
        } 
        setFrequencyValue(value);
        let freq;
        if (frequencyPrefix === "kHz") {
            freq = value * 1000.0;
        } else {
            freq = value * 1.0;
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ channel: channelNum-1, frequency: freq }),
          };
        fetch(getUrlForRequest('/api/wavegen/write-frequency'), requestOptions).then(
            (response) => {
              /*if (response.status === 200) {
                //setResultMessage("Successfuly unset pin " + pinNum + "!");
              } else {
                setResultMessage("Error trying to set pin " + pinNum + "!");
              }*/
              //setIsRequestCompleted(true);
              console.log('response.status =', response.status);
              console.log('response text: ', response.json());
            }
          ).catch(error => {
            console.log(error)
        });
    }

    const onDutyCycleChange = e => {
        setDutyCycle(e.target.value);
    }

    const onStateChange = () => {
        setIsEnabled(!isEnabled);
        let isEnabledInt;
        if (isEnabled) {
            isEnabledInt = 0;
        } else {
            isEnabledInt = 1;
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ channel: channelNum-1, isEnabled: isEnabledInt }),
        };
        fetch(getUrlForRequest('/api/wavegen/write-channel'), requestOptions).then(
            (response) => {
              /*if (response.status === 200) {
                //setResultMessage("Successfuly unset pin " + pinNum + "!");
              } else {
                setResultMessage("Error trying to set pin " + pinNum + "!");
              }*/
              //setIsRequestCompleted(true);
              console.log('response.status =', response.status);
              console.log('response text: ', response.json());
            }
          ).catch(error => {
            console.log(error)
        });
    }

    return (
        <div>
            <div className="functional-generator-channel-name">
                CH{channelNum}
                <div className="switch-sizing">
                    <Switch checkedIcon={false} uncheckedIcon={false} checked={isEnabled} onChange={onStateChange} />
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
                        <td><label className="round-sliders-label">{amplitudeValue} mV</label></td>
                        <td><label className="round-sliders-label">{frequencyValue} {frequencyPrefix}</label></td>
                    </tr>
                    <tr>
                        <td className="round-slider-amplitude-image">
                            <CircularSlider
                                className="round-slider" 
                                hideLabelValue 
                                min={-5000}
                                max={5000} 
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
                        <td><input type="radio" 
                            id={("hzPrefix" + channelNum)} 
                            name={("hzPrefix" + channelNum)} 
                            value="Hz"
                            checked={frequencyPrefix === "Hz"}
                            onChange={onFrequencyPrefixChange}/>
                            <label className="functional-generator-channel-radio">Hz</label><br/>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="radio" 
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

            <div className={(functionType === "digital" ? 'functional-generator-duty-cycle' : 'functional-generator-duty-cycle-no')}>
                <label>Duty Cycle</label><br/>
                <label className="round-sliders-label">{dutyCycle} %</label><br/>
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
            
        </div>
    );
}

export default FunctionalGeneratorChannelParams;