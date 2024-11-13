import CircularSlider from "@fseehawer/react-circular-slider";
import { useState } from "react";

function ScopeTrigger() {

    const [triggerLevelValue, setTriggerLevelValue] = useState("0.1");
    const [scopeTriggerType, setScopeTriggerType] = useState("fall-edge");
    const [scopeTriggerSource, setScopeTriggerSource] = useState("ch1");

    const onTriggerLevelValueChange = value => {
        setTriggerLevelValue(value);
    }

    const onScopeTriggerTypeChange = e => {
        setScopeTriggerType(e.target.value);
    }

    const onScopeTriggerSourceChange = e => {
        setScopeTriggerSource(e.target.value);
    }

    return (
        <div>
            <div>
                Trigger
            </div>
            <div>
                <div className="scope-trigger-level">
                    <label>Level</label><br/>
                    <label className="functional-generator-sliders-label">{triggerLevelValue}V</label><br/>
                    <CircularSlider
                        hideLabelValue  
                        data={["0.1", "0.2", "0.5", "1.0", "1.5", "2.0", "2.5", "3.0"]} 
                        width={110}
                        trackColor="#ffffff"
                        onChange={onTriggerLevelValueChange}/><br/><br/>
                </div>
                <div className="scope-trigger-type">
                {/* <h5>Trigger</h5> */}
                
                <table>
                <label>Type</label>
                    <tbody>
                        <tr>
                            <td><span className="fall-edge"></span></td>
                            <td>
                                <input type="radio" 
                                id="scopeTriggerFallEdge" 
                                name="scopeTriggerFallEdge"
                                value="fall-edge"
                                checked={scopeTriggerType === "fall-edge"}
                                onChange={onScopeTriggerTypeChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td><span className="rise-edge"></span></td>
                            <td>
                                <input type="radio" 
                                id="scopeTriggerRiseEdge" 
                                name="scopeTriggerRiseEdge"
                                value="rise-edge"
                                checked={scopeTriggerType === "rise-edge"}
                                onChange={onScopeTriggerTypeChange}/>
                            </td>
                        </tr>
                    </tbody>
                </table>
                </div>
            </div>
            <label>Source</label><br/>
            <table>
                <tbody>
                    <tr>
                        <td className="scope-trigger-source">
                            CH1
                        </td>
                        <td className="scope-trigger-source">
                            CH2
                        </td>
                        <td className="scope-trigger-source">
                            Logic
                        </td>
                    </tr>
                    <tr>
                        <td className="scope-trigger-source">
                            <input className="digital-input-radio-button" type="radio" id="scopeTriggerCh1" name="scopeTriggerCh1" value="ch1"
                            checked={scopeTriggerSource === "ch1"}
                            onChange={onScopeTriggerSourceChange}/>
                        </td>
                        <td className="scope-trigger-source">
                            <input className="digital-input-radio-button" type="radio" id="scopeTriggerCh2" name="scopeTriggerCh2" value="ch2"
                            checked={scopeTriggerSource === "ch2"}
                            onChange={onScopeTriggerSourceChange}/>
                        </td>
                        <td className="scope-trigger-source">
                            <input className="digital-input-radio-button" type="radio" id="scopeTriggerLogic" name="scopeTriggerLogic" value="logic"
                            checked={scopeTriggerSource === "logic"}
                            onChange={onScopeTriggerSourceChange}/>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );   
}

export default ScopeTrigger;