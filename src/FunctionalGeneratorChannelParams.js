import { useState } from "react";
import CircularSlider from '@fseehawer/react-circular-slider';

function FunctionalGeneratorChannelParams( {channelNum} ) {

    const [functionType, setFunctionType] = useState("sine");
    const [frequencyPrefix, setFrequencyPrefix] = useState("Hz");
    const [amplitudeValue, setAmplitudeValue] = useState(0);
    const [frequencyValue, setFrequencyValue] = useState(0);

    const onFunctionTypeChange = e => {
        setFunctionType(e.target.value);
    }

    const onFrequencyPrefixChange = e => {
        setFrequencyPrefix(e.target.value);
        console.log(frequencyPrefix);
        setFrequencyValue(0);
    }

    const onAmplitudeValueChange = value => {
        setAmplitudeValue(value);
    }

    const onFrequencyValueChange = value => {
        setFrequencyValue(value);
    }

    return (
        <div>
            <div className="functional-generator-channel-name">
                Channel {channelNum}
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
                        <td><span className="saw-function"></span></td>
                        <td>
                            <input type="radio" 
                                id={("sawFunction" + channelNum)} 
                                name={("sawFunction" + channelNum)} 
                                value="saw"
                                checked={functionType === "saw"}
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
                        <td><span className="digital-function"></span></td>
                        <td>
                            <input type="radio" 
                                id={("digitalFunction" + channelNum)} 
                                name={("digitalFunction" + channelNum)} 
                                value="digital"
                                checked={functionType === "digital"}
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
                        <td><label className="functional-generator-sliders-label">{amplitudeValue} mV</label></td>
                        <td><label className="functional-generator-sliders-label">{frequencyValue} {frequencyPrefix}</label></td>
                    </tr>
                    <tr>
                        <td><CircularSlider 
                        hideLabelValue 
                        data={[0.0, 1.0, 2.0, 2.5, 3.0, 3.3]} 
                        width={110}
                        onChange={onAmplitudeValueChange}/>
                        </td>
                        <td>
                        <CircularSlider 
                        hideLabelValue
                        data={[1, 10, 50, 100, 200]}  
                        width={110}
                        onChange={onFrequencyValueChange}/>
                        </td>
                    </tr>
                </tbody>

            </table>

            <div className="functional-generator-table">
                <input type="radio" 
                    id={("hzPrefix" + channelNum)} 
                    name={("hzPrefix" + channelNum)} 
                    value="Hz"
                    checked={frequencyPrefix === "Hz"}
                    onChange={onFrequencyPrefixChange}/>
                    <label>Hz</label><br/>
                <input type="radio" 
                    id={("khzPrefix" + channelNum)} 
                    name={("khzPrefix" + channelNum)} 
                    value="kHz"
                    checked={frequencyPrefix === "kHz"}
                    onChange={onFrequencyPrefixChange}/>
                    <label>kHz</label>
            </div>
        </div>
    );
}

export default FunctionalGeneratorChannelParams;