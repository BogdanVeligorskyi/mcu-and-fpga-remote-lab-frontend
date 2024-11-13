import './styles/DigitalInputs.css'
import DigitalInputsButton from './DigitalInputsButton';
import DigitalInputsSwitch from './DigitalInputsSwitch';
import DigitalInputsGen from './DigitalInputsGen';
import { useState } from "react"

function DigitalInputs() {

    const [di_pin_1, setPin1Mode] = useState("none") 
    const [di_pin_2, setPin2Mode] = useState("none") 
    const [di_pin_3, setPin3Mode] = useState("none") 
    const [di_pin_4, setPin4Mode] = useState("none") 

    const onPin1ModeChange = e => {
        setPin1Mode(e.target.value)
    }

    const onPin2ModeChange = e => {
        setPin2Mode(e.target.value)
    }

    const onPin3ModeChange = e => {
        setPin3Mode(e.target.value)
    }

    const onPin4ModeChange = e => {
        setPin4Mode(e.target.value)
    }

    // render neccessary components based on the chosen pin mode
    const renderPinMode = (pinType, pin) => {
        if (pinType === "button") {
            return <DigitalInputsButton pinNum={pin}/>
        }
        if (pinType === "switch") {
            return <DigitalInputsSwitch pinNum={pin}/>
        } 
        if (pinType === "gen") {
            return <DigitalInputsGen pinNum={pin}/>
        }
    }

    return(
        <div>
            <h2>Digital Inputs</h2>
            <br/>
            <table>
              <tbody>
                <tr>
                  <th></th>
                  <th>1</th>
                  <th>2</th>
                  <th>3</th>
                  <th>4</th>
                </tr>
                <tr>
                  <td>Button</td>
                  <td>&nbsp;&nbsp;
                    <input className="digital-input-radio-button" type="radio" id="buttonCh1" name="di_pin_1" value="button" 
                    checked={di_pin_1 === "button"}
                    onChange={onPin1ModeChange}/>
                    <label htmlFor="buttonCh1"></label>
                  </td>
                  <td>&nbsp;&nbsp;
                    <input className="digital-input-radio-button" type="radio" id="buttonCh2" name="di_pin_2" value="button"
                    checked={di_pin_2 === "button"}
                    onChange={onPin2ModeChange}/>
                    <label htmlFor="buttonCh2"></label>
                  </td>
                  <td>&nbsp;&nbsp;
                    <input className="digital-input-radio-button" type="radio" id="buttonCh3" name="di_pin_3" value="button"
                    checked={di_pin_3 === "button"}
                    onChange={onPin3ModeChange}/>
                    <label htmlFor="buttonCh3"></label>
                  </td>
                  <td>&nbsp;&nbsp;
                    <input className="digital-input-radio-button" type="radio" id="buttonCh4" name="di_pin_4" value="button"
                    checked={di_pin_4 === "button"}
                    onChange={onPin4ModeChange}/>
                    <label htmlFor="buttonCh4"></label>
                  </td>
                </tr>
                <tr>
                  <td>Switch</td>
                  <td>&nbsp;&nbsp;
                    <input className="digital-input-radio-button" type="radio" id="switchCh1" name="di_pin_1" value="switch"
                    checked={di_pin_1 === "switch"}
                    onChange={onPin1ModeChange}/>
                    <label htmlFor="switchCh1"></label>
                  </td>
                  <td>&nbsp;&nbsp;
                    <input className="digital-input-radio-button" type="radio" id="switchCh2" name="di_pin_2" value="switch"
                    checked={di_pin_2 === "switch"}
                    onChange={onPin2ModeChange}/>
                    <label htmlFor="switchCh2"></label>
                  </td>
                  <td>&nbsp;&nbsp;
                    <input className="digital-input-radio-button" type="radio" id="switchCh3" name="di_pin_3" value="switch"
                    checked={di_pin_3 === "switch"}
                    onChange={onPin3ModeChange}/>
                    <label htmlFor="switchCh3"></label>
                  </td>
                  <td>&nbsp;&nbsp;
                    <input className="digital-input-radio-button" type="radio" id="switchCh4" name="di_pin_4" value="switch"
                    checked={di_pin_4 === "switch"}
                    onChange={onPin4ModeChange}/>
                    <label htmlFor="switchCh4"></label>
                  </td>
                </tr>
                <tr>
                  <td>Gen</td>
                  <td>&nbsp;&nbsp;
                    <input className="digital-input-radio-button" type="radio" id="genCh1" name="di_pin_1" value="gen"
                    checked={di_pin_1 === "gen"}
                    onChange={onPin1ModeChange}/>
                    <label htmlFor="genCh1"></label>
                  </td>
                  <td>&nbsp;&nbsp;
                    <input className="digital-input-radio-button" type="radio" id="genCh2" name="di_pin_2" value="gen"
                    checked={di_pin_2 === "gen"}
                    onChange={onPin2ModeChange}/>
                    <label htmlFor="genCh2"></label>
                  </td>
                  <td>&nbsp;&nbsp;
                    <input className="digital-input-radio-button" type="radio" id="genCh3" name="di_pin_3" value="gen"
                    checked={di_pin_3 === "gen"}
                    onChange={onPin3ModeChange}/>
                    <label htmlFor="genCh3"></label>
                  </td>
                  <td>&nbsp;&nbsp;
                    <input className="digital-input-radio-button" type="radio" id="genCh4" name="di_pin_4" value="gen"
                    checked={di_pin_4 === "gen"}
                    onChange={onPin4ModeChange}/>
                    <label htmlFor="genCh4"></label>
                  </td>
                </tr>
                <tr>
                  <td>None</td>
                  <td>&nbsp;&nbsp;
                    <input className="digital-input-radio-button" type="radio" id="noneCh1" name="di_pin_1" value="none"
                    checked={di_pin_1 === "none"}
                    onChange={onPin1ModeChange}/>
                    <label htmlFor="noneCh1"></label>
                  </td>
                    <td>&nbsp;&nbsp;
                    <input className="digital-input-radio-button" type="radio" id="noneCh2" name="di_pin_2" value="none"
                    checked={di_pin_2 === "none"}
                    onChange={onPin2ModeChange}/>
                    <label htmlFor="noneCh2"></label>
                  </td>
                  <td>&nbsp;&nbsp;
                    <input className="digital-input-radio-button" type="radio" id="noneCh3" name="di_pin_3" value="none"
                    checked={di_pin_3 === "none"}
                    onChange={onPin3ModeChange}/>
                    <label htmlFor="noneCh3"></label>
                  </td>
                  <td>&nbsp;&nbsp;
                    <input className="digital-input-radio-button" type="radio" id="noneCh4" name="di_pin_4" value="none"
                    checked={di_pin_4 === "none"}
                    onChange={onPin4ModeChange}/>
                    <label htmlFor="noneCh4"></label>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <div className="digital-input-wrapper">
                        {renderPinMode(di_pin_1, 1)}                        
                    </div>
                  </td>
                  <td>
                    <div className="digital-input-wrapper">
                        {renderPinMode(di_pin_2, 2)}                        
                    </div>
                  </td>
                  
                  <td>
                    <div className="digital-input-wrapper">
                        {renderPinMode(di_pin_3, 3)}                        
                    </div>
                  </td>
                  <td>
                    <div className="digital-input-wrapper">           
                        {renderPinMode(di_pin_4, 4)}                                              
                    </div>
                  </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
} 

export default DigitalInputs;