import { getUrlForRequest } from './utils/get-url-for-request';
import { useState } from "react";
import { useLocation } from 'react-router-dom';
import CircularSlider from '@fseehawer/react-circular-slider';
import Switch from 'react-switch';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function FunctionalGeneratorChannelParams( {channelNum} ) {

    const [functionType, setFunctionType] = useState("sine");
    const [frequencyPrefix, setFrequencyPrefix] = useState("Hz");
    const [amplitudeValue, setAmplitudeValue] = useState(-0.1);
    const [frequencyValue, setFrequencyValue] = useState(1);
    const [dutyCycle, setDutyCycle] = useState(50);
    const [isEnabled, setIsEnabled] = useState(false);
    const [startStop, setStartStop] = useState("Start");

    let query = useQuery();
    let tokenId = query.get("token");

    // ivoked when function type is changed
    const onFunctionTypeChange = e => {
        console.log("tokenID:" + tokenId);
        console.log(window.location.href);
        setFunctionType(e.target.value);
        if (e.target.value !== "pulse") {
            setDutyCycle(50);
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': tokenId },
                body: JSON.stringify({ 
                    channel: channelNum-1, 
                    dutyCycle: 50
                }),
                credentials: 'include'
            };
            fetch(getUrlForRequest('/api/wavegen/write-duty-cycle'), 
            requestOptions).then(
                (response) => {
                    console.log('response.status =', response.status);
                    console.log('response text: ', response.json());
                }
            ).catch(error => {
                console.log(error)
            });
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' , 'Authorization': tokenId },
            body: JSON.stringify({ 
                channel: channelNum-1, 
                function: e.target.value 
            }),
            credentials: 'include'
        };
        fetch(getUrlForRequest('/api/wavegen/write-function'), 
        requestOptions).then(
            (response) => {
              console.log('response.status =', response.status);
              console.log('response text: ', response.json());
            }
          ).catch(error => {
            console.log(error)
        });
    }

    // ivoked when frequency prefix is changed
    const onFrequencyPrefixChange = e => {
        setFrequencyPrefix(e.target.value);
        let freq = 0.0;
        if (e.target.value === "kHz") {
            freq = frequencyValue * 1000.0;
        } else {
            freq = frequencyValue * 1.0;
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': tokenId },
            body: JSON.stringify({ 
                channel: channelNum-1, 
                frequency: freq
            }),
            credentials: 'include'
        };
        fetch('/api/wavegen/write-frequency', requestOptions).then(
            (response) => {
              console.log('response.status =', response.status);
              console.log('response text: ', response.json());
            }
          ).catch(error => {
            console.log(error)
        });
        console.log(frequencyValue + " " + frequencyPrefix);
    }

    // ivoked when amplitude is changed
    const onAmplitudeValueChange = value => {
        console.log(value);
        if (value == null) {
            return;
        }
        let voltValue = value / 10; // convert to V
        setAmplitudeValue(voltValue);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': tokenId },
            body: JSON.stringify({ 
                channel: channelNum-1, 
                amplitude: voltValue 
            }),
            credentials: 'include'
        };
        fetch('/api/wavegen/write-amplitude', requestOptions).then(
            (response) => {
              console.log('response.status =', response.status);
              console.log('response text: ', response.json());
            }
          ).catch(error => {
            console.log(error)
        });
    }

    // ivoked when frequency is changed
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
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': tokenId },
            body: JSON.stringify({ 
                channel: channelNum-1, 
                frequency: freq 
            }),
            credentials: 'include'
        };
        fetch(getUrlForRequest('/api/wavegen/write-frequency'), 
        requestOptions).then(
            (response) => {
              console.log('response.status =', response.status);
              console.log('response text: ', response.json());
            }
          ).catch(error => {
            console.log(error)
        });
    }

    // handler for start/stop button
    const onStartStopClick = () => {
        if (!isEnabled) {
            return;
        }
        if (startStop === "Start") {
            setStartStop("Stop");
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': tokenId },
                body: JSON.stringify({ 
                    channel: channelNum-1, 
                    isStart: 1 
                }),
                credentials: 'include'
            };
            fetch(getUrlForRequest('/api/wavegen/write-config'), 
            requestOptions).then(
                (response) => {
                    console.log('response.status =', response.status);
                    console.log('response text: ', response.json());
                    if (response.status === 200) {
                        alert("Generating waveform for channel " + channelNum);
                    } else {
                        alert("An error occured when trying to generate waveform for channel " + channelNum);
                    }
                }
            ).catch(error => {
                console.log(error)
            });

        } else {
            setStartStop("Start")

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': tokenId },
                body: JSON.stringify({ 
                    channel: channelNum-1, 
                    isStart: 0 
                }),
                credentials: 'include'
            };
            fetch(getUrlForRequest('/api/wavegen/write-config'), requestOptions).then(
                (response) => {
                    console.log('response.status =', response.status);
                    console.log('response text: ', response.json());
                    if (response.status === 200) {
                        alert("Stopped generating waveform for channel " + channelNum);
                    } else {
                        alert("An error occured when trying to stop generating waveform for channel " + channelNum);
                    }
                }
            ).catch(error => {
                console.log(error)
            });
        }
    }

    // ivoked when duty cycle is changed
    const onDutyCycleChange = e => {
        setDutyCycle(e.target.value);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': tokenId },
            body: JSON.stringify({ 
                channel: channelNum-1, 
                dutyCycle: Number(e.target.value) 
            }),
            credentials: 'include'
        };
        fetch(getUrlForRequest('/api/wavegen/write-duty-cycle'), 
        requestOptions).then(
            (response) => {
                console.log('response.status =', response.status);
                console.log('response text: ', response.json());
            }
        ).catch(error => {
            console.log(error)
        });
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
            const functionApprovalRequestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': tokenId },
                body: JSON.stringify({ 
                    channel: channelNum-1, 
                    function: functionType 
                }),
                credentials: 'include'
            };
            fetch(getUrlForRequest('/api/wavegen/write-function'), 
            functionApprovalRequestOptions).then(
                (response) => {
                  console.log('response.status =', response.status);
                  console.log('response text: ', response.json());
                }
              ).catch(error => {
                console.log(error)
            });
            const dutyCycleApprovalRequestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': tokenId },
                body: JSON.stringify({ 
                    channel: channelNum-1, 
                    dutyCycle: Number(dutyCycle) 
                }),
                credentials: 'include'
            };
            fetch(getUrlForRequest('/api/wavegen/write-duty-cycle'), 
            dutyCycleApprovalRequestOptions).then(
                (response) => {
                  console.log('response.status =', response.status);
                  console.log('response text: ', response.json());
                }
              ).catch(error => {
                console.log(error)
            });
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': tokenId },
            body: JSON.stringify({ 
                channel: channelNum-1, 
                isEnabled: isEnabledInt 
            }),
            credentials: 'include'
        };
        fetch(getUrlForRequest('/api/wavegen/write-channel'), 
        requestOptions).then(
            (response) => {
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
                        <td><label className="round-sliders-label">
                            {amplitudeValue} V</label></td>
                        <td><label className="round-sliders-label">
                            {frequencyValue} {frequencyPrefix}
                            </label></td>
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
                        <td><input type="radio" 
                            id={("hzPrefix" + channelNum)} 
                            name={("hzPrefix" + channelNum)} 
                            value="Hz"
                            checked={frequencyPrefix === "Hz"}
                            onChange={onFrequencyPrefixChange}/>
                            <label 
                            className="functional-generator-channel-radio">
                                Hz
                            </label><br/>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="radio" 
                            id={("khzPrefix" + channelNum)} 
                            name={("khzPrefix" + channelNum)} 
                            value="kHz"
                            checked={frequencyPrefix === "kHz"}
                            onChange={onFrequencyPrefixChange}/>
                            <label className="functional-generator-channel-radio">
                                kHz
                            </label><br/>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div className={(functionType === "pulse" ? 
            'functional-generator-duty-cycle' : 
            'functional-generator-duty-cycle-no')}>
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

            <div className="m-4">
                <div className={(isEnabled ? 'btn btn-primary' :
                 'btn disabled btn-primary')} 
                 onClick={onStartStopClick}>{startStop}</div>
            </div>
            
        </div>
    );
}

export default FunctionalGeneratorChannelParams;