import { useState } from "react";
import LogicAnalyzerTimingDiagram from "./LogicAnalyzerTimingDiagram";

function LogicAnalyzer() {

    const [ch0, setCh0] = useState(false);
    const [ch1, setCh1] = useState(false);
    const [ch2, setCh2] = useState(false);
    const [ch3, setCh3] = useState(false);
    const [ch4, setCh4] = useState(false);
    const [ch5, setCh5] = useState(false);
    const [ch6, setCh6] = useState(false);
    const [ch7, setCh7] = useState(false);
    const [ch8, setCh8] = useState(false);
    const [ch9, setCh9] = useState(false);
    const [ch10, setCh10] = useState(false);
    const [ch11, setCh11] = useState(false);
    const [ch12, setCh12] = useState(false);
    const [ch13, setCh13] = useState(false);
    const [ch14, setCh14] = useState(false);
    const [ch15, setCh15] = useState(false);
    const [triggerType, setTriggerType] = useState("fall-edge");

    const [list, setList] = useState([]);
    // const [selectedChannel, setSelectedChannel] = useState("");

    const addNewElemToList = (newListElem) => {
        let temp = [...list, newListElem];
        temp.sort();
        setList(temp);
    }

    const removeElemFromList = (channelName) => {
        let arr = [...list];
        var index = arr.indexOf(channelName);
        if (index !== -1) {
            arr.splice(index, 1);
            setList(arr);
        }
    }

    const onTriggerTypeChange = e => {
        setTriggerType(e.target.value);
    }

    const onChannel0Change = () => {
        setCh0(!ch0);  
        if (!ch0) {
            addNewElemToList("CH0");       
        } else {
            removeElemFromList("CH0");
        }
    }

    const onChannel1Change = () => {
        setCh1(!ch1);
        if (!ch1) {
            addNewElemToList("CH1");       
        } else {
            removeElemFromList("CH1");
        }
    }

    const onChannel2Change = () => {
        setCh2(!ch2);
        if (!ch2) {
            addNewElemToList("CH2");       
        } else {
            removeElemFromList("CH2");
        }
    }

    const onChannel3Change = () => {
        setCh3(!ch3);
        if (!ch3) {
            addNewElemToList("CH3");       
        } else {
            removeElemFromList("CH3");
        }
    }

    const onChannel4Change = () => {
        setCh4(!ch4);
        if (!ch4) {
            addNewElemToList("CH4");       
        } else {
            removeElemFromList("CH4");
        }
    }

    const onChannel5Change = () => {
        setCh5(!ch5);
        if (!ch5) {
            addNewElemToList("CH5");       
        } else {
            removeElemFromList("CH5");
        }
    }

    const onChannel6Change = () => {
        setCh6(!ch6);
        if (!ch6) {
            addNewElemToList("CH6");       
        } else {
            removeElemFromList("CH6");
        }
    }

    const onChannel7Change = () => {
        setCh7(!ch7);
        if (!ch7) {
            addNewElemToList("CH7");       
        } else {
            removeElemFromList("CH7");
        }
    }

    const onChannel8Change = () => {
        setCh8(!ch8);
        if (!ch8) {
            addNewElemToList("CH8");       
        } else {
            removeElemFromList("CH8");
        }
    }

    const onChannel9Change = () => {
        setCh9(!ch9);
        if (!ch9) {
            addNewElemToList("CH9");       
        } else {
            removeElemFromList("CH9");
        }
    }

    const onChannel10Change = () => {
        setCh10(!ch10);
        if (!ch10) {
            addNewElemToList("CH10");       
        } else {
            removeElemFromList("CH10");
        }
    }

    const onChannel11Change = () => {
        setCh11(!ch11);
        if (!ch11) {
            addNewElemToList("CH11");       
        } else {
            removeElemFromList("CH11");
        }
    }

    const onChannel12Change = () => {
        setCh12(!ch12);
        if (!ch12) {
            addNewElemToList("CH12");       
        } else {
            removeElemFromList("CH12");
        }
    }

    const onChannel13Change = () => {
        setCh13(!ch13);
        if (!ch13) {
            addNewElemToList("CH13");       
        } else {
            removeElemFromList("CH13");
        }
    }

    const onChannel14Change = () => {
        setCh14(!ch14);
        if (!ch14) {
            addNewElemToList("CH14");       
        } else {
            removeElemFromList("CH14");
        }
    }

    const onChannel15Change = () => {
        setCh15(!ch15);
        if (!ch15) {
            addNewElemToList("CH15");       
        } else {
            removeElemFromList("CH15");
        }
    }

    return (
        <div>
            <h2>Logic Analyzer</h2>
            <LogicAnalyzerTimingDiagram/>
            <div className="row">
            <div className="col-9 logic-analyzer-table">
                <h3>Channels</h3>
                <table>
                    <tbody>
                        <tr>
                            <td>CH0</td>
                            <td>
                                <input type="checkbox" id="ch0" name="ch0" value="Ch0"
                                checked={ch0 === true}
                                onChange={onChannel0Change}/>
                            </td>
                            <td>CH4</td>
                            <td>
                                <input type="checkbox" id="ch4" name="ch4" value="Ch4"
                                checked={ch4 === true}
                                onChange={onChannel4Change}/>
                            </td>
                            <td>CH8</td>
                            <td>
                                <input type="checkbox" id="ch8" name="ch8" value="Ch8"
                                checked={ch8 === true}
                                onChange={onChannel8Change}/>
                            </td>
                            <td>CH12</td>
                            <td>
                                <input type="checkbox" id="ch12" name="ch12" value="Ch12"
                                checked={ch12 === true}
                                onChange={onChannel12Change}/>
                            </td>
                        </tr>
                        <tr>
                            <td>CH1</td>
                            <td>
                                <input type="checkbox" id="ch1" name="ch1" value="Ch1"
                                checked={ch1 === true}
                                onChange={onChannel1Change}/>
                            </td>
                            <td>CH5</td>
                            <td>
                                <input type="checkbox" id="ch5" name="ch5" value="Ch5"
                                checked={ch5 === true}
                                onChange={onChannel5Change}/>
                            </td>
                            <td>CH9</td>
                            <td>
                                <input type="checkbox" id="ch9" name="ch9" value="Ch9"
                                checked={ch9 === true}
                                onChange={onChannel9Change}/>
                            </td>
                            <td>CH13</td>
                            <td>
                                <input type="checkbox" id="ch13" name="ch13" value="Ch13"
                                checked={ch13 === true}
                                onChange={onChannel13Change}/>
                            </td>
                        </tr>
                        <tr>
                            <td>CH2</td>
                            <td>
                                <input type="checkbox" id="ch2" name="ch2" value="Ch2"
                                checked={ch2 === true}
                                onChange={onChannel2Change}/>
                            </td>
                            <td>CH6</td>
                            <td>
                                <input type="checkbox" id="ch6" name="ch6" value="Ch6"
                                checked={ch6 === true}
                                onChange={onChannel6Change}/>
                            </td>
                            <td>CH10</td>
                            <td>
                                <input type="checkbox" id="ch10" name="ch10" value="Ch10"
                                checked={ch10 === true}
                                onChange={onChannel10Change}/>
                            </td>
                            <td>CH14</td>
                            <td>
                                <input type="checkbox" id="ch14" name="ch14" value="Ch14"
                                checked={ch14 === true}
                                onChange={onChannel14Change}/>
                            </td>
                        </tr>
                        <tr>
                            <td>CH3</td>
                            <td>
                                <input type="checkbox" id="ch3" name="ch3" value="Ch3"
                                checked={ch3 === true}
                                onChange={onChannel3Change}/>
                            </td>
                            <td>CH7</td>
                            <td>
                                <input type="checkbox" id="ch7" name="ch7" value="Ch7"
                                checked={ch7 === true}
                                onChange={onChannel7Change}/>
                            </td>
                            <td>CH11</td>
                            <td>
                                <input type="checkbox" id="ch11" name="ch11" value="Ch11"
                                checked={ch11 === true}
                                onChange={onChannel11Change}/>
                            </td>
                            <td>CH15</td>
                            <td>
                                <input type="checkbox" id="ch15" name="ch15" value="Ch15"
                                checked={ch15 === true}
                                onChange={onChannel15Change}/>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="col-3 logic-analyzer-table">
                <h3>Trigger</h3>
                <table>
                    <tbody>
                        <tr>
                            <td><span className="fall-edge"></span></td>
                            <td>
                                <input type="radio" 
                                id="triggerFallEdge" 
                                name="triggerFallEdge"
                                value="fall-edge"
                                checked={triggerType === "fall-edge"}
                                onChange={onTriggerTypeChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td><span className="rise-edge"></span></td>
                            <td>
                                <input type="radio" 
                                id="triggerRiseEdge" 
                                name="triggerRiseEdge"
                                value="rise-edge"
                                checked={triggerType === "rise-edge"}
                                onChange={onTriggerTypeChange}/>
                            </td>
                        </tr>
                    </tbody>
                </table>
                Source <br/>
                <select className="logic-analyzer-select" name="logicAnalyzerChannels">
                    {list.map((channel)=> {
                        return (
                            <option key={channel}>
                                {channel}
                            </option>
                        )
                    })}
                </select>
            </div>
            </div>
        </div>
    )
}

export default LogicAnalyzer;