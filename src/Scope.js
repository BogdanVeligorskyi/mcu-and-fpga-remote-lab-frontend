import CircularSlider from "@fseehawer/react-circular-slider";
import ScopeChart from './ScopeChart';
import './styles/Scope.css';
import { useState } from 'react';

function Scope() {

    // const [verticalPositionCH1, setVerticalPositionCH1] = useState();
    // const [verticalPositionCH2, setVerticalPositionCH2] = useState();
    // const [horizontalPosition, setHorizontalPosition] = useState();
    const [verticalScaleCH1, setVerticalScaleCH1] = useState();
    const [verticalScaleCH2, setVerticalScaleCH2] = useState();
    const [horizontalScale, setHorizontalScale] = useState();
    // const [triggerLevelValue, setTriggerLevelValue] = useState("0.1");
    // const [scopeTriggerType, setScopeTriggerType] = useState("fall-edge");
    // const [scopeTriggerSource, setScopeTriggerSource] = useState("ch1");

    /*const onTriggerLevelValueChange = value => {
        setTriggerLevelValue(value);
    }

    const onScopeTriggerTypeChange = e => {
        setScopeTriggerType(e.target.value);
    }

    const onScopeTriggerSourceChange = e => {
        setScopeTriggerSource(e.target.value);
    }
    
    const onVerticalPositionCH1ValueChange = value => {
        setVerticalPositionCH1(value);
    }

    const onVerticalPositionCH2ValueChange = value => {
        setVerticalPositionCH2(value);
    

    const onHorizontalPositionValueChange = value => {
        setHorizontalPosition(value);
    }*/

    const onVerticalScaleCH1ValueChange = value => {
        setVerticalScaleCH1(value);
    }

    const onHorizontalScaleValueChange = value => {
        setHorizontalScale(value);
    }

    const onVerticalScaleCH2ValueChange = value => {
        setVerticalScaleCH2(value);
    }

    return (
        <div>
            <h2>Scope</h2>
            <ScopeChart/>
            <div className="row m-1">
                <div className="col-xl m-1 px-1 border-spec">
                    <div className="scope-header">
                        Vertical
                    </div>
                    <div className="scope-vertical-channel-name">
                        CH1
                    </div> 
                    <label>Scale</label><br/>
                    <label className="round-sliders-label">{verticalScaleCH1}V/div</label><br/>
                    <div className="round-slider-wrapper">
                        <div className="round-slider-vertical-scale-image">
                        <CircularSlider
                            hideLabelValue  
                            data={["5m", "10m", "20m", "50m", "0.1", "0.2", "0.5", "1.0"]} 
                            width={115}
                            trackColor="#ffffff"
                            onChange={onVerticalScaleCH1ValueChange}/>
                            
                        </div>
                    </div>
                    <br/>
                    {/* <label>Position</label><br/>
                    <label className="round-sliders-label">{verticalPositionCH1}</label><br/>
                    <CircularSlider
                        hideLabelValue  
                        data={[0.0, 1.0, 2.0, 2.5, 3.0, 3.3]} 
                        width={115}
                        trackColor="#ffffff"
                        onChange={onVerticalPositionCH1ValueChange}/><br/> */}
                </div>
                <div className="col-xl m-1 px-1 border-spec">
                    <div className="scope-header">
                        Vertical
                    </div>
                    <div className="scope-vertical-channel-name">
                        CH2
                    </div> 
                    <label>Scale</label><br/>
                    <label className="round-sliders-label">{verticalScaleCH2}V/div</label><br/>
                    <div className="round-slider-wrapper">
                        <div className="round-slider-vertical-scale-image">
                        <CircularSlider
                            hideLabelValue  
                            data={["5m", "10m", "20m", "50m", "0.1", "0.2", "0.5", "1.0"]} 
                            width={115}
                            trackColor="#ffffff"
                            onChange={onVerticalScaleCH2ValueChange}/>
                        </div>
                    </div>
                    <br/>
                    {/* <label>Position</label><br/>
                    <label className="round-sliders-label">{verticalPositionCH2}</label><br/>
                    <CircularSlider
                        hideLabelValue  
                        data={[0.0, 1.0, 2.0, 2.5, 3.0, 3.3]} 
                        width={115}
                        trackColor="#ffffff"
                        onChange={onVerticalPositionCH2ValueChange}/><br/><br/> */}
                </div>
                <div className="col-xl m-1 px-1 border-spec">
                    <div className="scope-header">
                        Horizontal
                    </div>
                    <div className="scope-vertical-channel-name">
                    </div>
                    <label>Scale</label><br/>
                    <label className="round-sliders-label">{horizontalScale}/div</label><br/>
                    <div className="round-slider-wrapper">
                        <div className="round-slider-horizontal-scale-image">
                        <CircularSlider
                            hideLabelValue  
                            data={["1us", "10us", "50us", "100us", "1ms", "10ms", "50ms", "100ms"]} 
                            width={115}
                            trackColor="#ffffff"
                            onChange={onHorizontalScaleValueChange}/>
                        </div>
                    </div>
                    <br/>
                    {/* <label>Position</label><br/>
                    <label className="round-sliders-label">{horizontalPosition}</label><br/>
                    <CircularSlider
                        hideLabelValue  
                        data={[0.0, 1.0, 2.0, 2.5, 3.0, 3.3]} 
                        width={115}
                        trackColor="#ffffff"
                        onChange={onHorizontalPositionValueChange}/> */}
                </div>
                {/* <div className="col-xl m-1 px-1 border-spec">
                <div>
                Trigger
            </div>
            <div>
                <div className="scope-trigger-level">
                    <label>Level</label><br/>
                    <label className="round-sliders-label">{triggerLevelValue}V</label><br/>
                    <CircularSlider
                        hideLabelValue  
                        data={["0.1", "0.2", "0.5", "1.0", "1.5", "2.0", "2.5", "3.0"]} 
                        width={110}
                        trackColor="#ffffff"
                        onChange={onTriggerLevelValueChange}/><br/><br/>
                </div>
                <div className="scope-trigger-type">
                <table>
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
                </div> */}
            </div>
        </div>
    );
}

export default Scope;