import './DigitalInputs.css'
import DigitalInputsButton from './DigitalInputsButton';
import DigitalInputsSwitch from './DigitalInputsSwitch';
import DigitalInputsGen from './DigitalInputsGen';
import { useState } from "react"


function DigitalInputs() {

    const [di_channel_1, setChannel1Mode] = useState("none") 
    const [di_channel_2, setChannel2Mode] = useState("none") 
    const [di_channel_3, setChannel3Mode] = useState("none") 
    const [di_channel_4, setChannel4Mode] = useState("none") 

    const onChannel1ModeChange = e => {
        setChannel1Mode(e.target.value)
    }

    const onChannel2ModeChange = e => {
        setChannel2Mode(e.target.value)
    }

    const onChannel3ModeChange = e => {
        setChannel3Mode(e.target.value)
    }

    const onChannel4ModeChange = e => {
        setChannel4Mode(e.target.value)
    }

    // render necessary components based on the chosen channel mode
    const renderChannelMode = (channel) => {
        if (channel === "button") {
            return <DigitalInputsButton/>
        }
        if (channel === "switch") {
            return <DigitalInputsSwitch/>
        } 
        if (channel === "gen") {
            return <DigitalInputsGen/>
        }
    }

    return(
        <div>
            <h2>Digital Inputs</h2>
            <table>
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
                    <input type="radio" id="buttonCh1" name="di_channel_1" value="button" 
                    checked={di_channel_1 === "button"}
                    onChange={onChannel1ModeChange}/>
                    <label for="buttonCh1"></label>
                  </td>
                  <td>&nbsp;&nbsp;
                    <input type="radio" id="buttonCh2" name="di_channel_2" value="button"
                    checked={di_channel_2 === "button"}
                    onChange={onChannel2ModeChange}/>
                    <label for="buttonCh2"></label>
                  </td>
                  <td>&nbsp;&nbsp;
                    <input type="radio" id="buttonCh3" name="di_channel_3" value="button"
                    checked={di_channel_3 === "button"}
                    onChange={onChannel3ModeChange}/>
                    <label for="buttonCh3"></label>
                  </td>
                  <td>&nbsp;&nbsp;
                    <input type="radio" id="buttonCh4" name="di_channel_4" value="button"
                    checked={di_channel_4 === "button"}
                    onChange={onChannel4ModeChange}/>
                    <label for="buttonCh4"></label>
                  </td>
                </tr>
                <tr>
                  <td>Switch</td>
                  <td>&nbsp;&nbsp;
                    <input type="radio" id="switchCh1" name="di_channel_1" value="switch"
                    checked={di_channel_1 === "switch"}
                    onChange={onChannel1ModeChange}/>
                    <label for="switchCh1"></label>
                  </td>
                  <td>&nbsp;&nbsp;
                    <input type="radio" id="switchCh2" name="di_channel_2" value="switch"
                    checked={di_channel_2 === "switch"}
                    onChange={onChannel2ModeChange}/>
                    <label for="switchCh2"></label>
                  </td>
                  <td>&nbsp;&nbsp;
                    <input type="radio" id="switchCh3" name="di_channel_3" value="switch"
                    checked={di_channel_3 === "switch"}
                    onChange={onChannel3ModeChange}/>
                    <label for="switchCh3"></label>
                  </td>
                  <td>&nbsp;&nbsp;
                    <input type="radio" id="switchCh4" name="di_channel_4" value="switch"
                    checked={di_channel_4 === "switch"}
                    onChange={onChannel4ModeChange}/>
                    <label for="switchCh4"></label>
                  </td>
                </tr>
                <tr>
                  <td>Gen</td>
                  <td>&nbsp;&nbsp;
                    <input type="radio" id="genCh1" name="di_channel_1" value="gen"
                    checked={di_channel_1 === "gen"}
                    onChange={onChannel1ModeChange}/>
                    <label for="genCh1"></label>
                  </td>
                  <td>&nbsp;&nbsp;
                    <input type="radio" id="genCh2" name="di_channel_2" value="gen"
                    checked={di_channel_2 === "gen"}
                    onChange={onChannel2ModeChange}/>
                    <label for="genCh2"></label>
                  </td>
                  <td>&nbsp;&nbsp;
                    <input type="radio" id="genCh3" name="di_channel_3" value="gen"
                    checked={di_channel_3 === "gen"}
                    onChange={onChannel3ModeChange}/>
                    <label for="genCh3"></label>
                  </td>
                  <td>&nbsp;&nbsp;
                    <input type="radio" id="genCh4" name="di_channel_4" value="gen"
                    checked={di_channel_4 === "gen"}
                    onChange={onChannel4ModeChange}/>
                    <label for="genCh4"></label>
                  </td>
                </tr>
                <tr>
                  <td>None</td>
                  <td>&nbsp;&nbsp;
                    <input type="radio" id="noneCh1" name="di_channel_1" value="none"
                    checked={di_channel_1 === "none"}
                    onChange={onChannel1ModeChange}/>
                    <label for="noneCh1"></label>
                  </td>
                    <td>&nbsp;&nbsp;
                    <input type="radio" id="noneCh2" name="di_channel_2" value="none"
                    checked={di_channel_2 === "none"}
                    onChange={onChannel2ModeChange}/>
                    <label for="noneCh2"></label>
                  </td>
                  <td>&nbsp;&nbsp;
                    <input type="radio" id="noneCh3" name="di_channel_3" value="none"
                    checked={di_channel_3 === "none"}
                    onChange={onChannel3ModeChange}/>
                    <label for="noneCh3"></label>
                  </td>
                  <td>&nbsp;&nbsp;
                    <input type="radio" id="noneCh4" name="di_channel_4" value="none"
                    checked={di_channel_4 === "none"}
                    onChange={onChannel4ModeChange}/>
                    <label for="noneCh4"></label>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <div class="digital-input-wrapper">
                        {renderChannelMode(di_channel_1)}                        
                    </div>
                  </td>
                  <td>
                    <div class="digital-input-wrapper">
                        {renderChannelMode(di_channel_2)}                        
                    </div>
                  </td>
                  
                  <td>
                    <div class="digital-input-wrapper">
                        {renderChannelMode(di_channel_3)}                        
                    </div>
                  </td>
                  <td>
                    <div class="digital-input-wrapper">           
                        {renderChannelMode(di_channel_4)}                                              
                    </div>
                  </td>
                </tr>
            </table>
        </div>
    );
} 

export default DigitalInputs;