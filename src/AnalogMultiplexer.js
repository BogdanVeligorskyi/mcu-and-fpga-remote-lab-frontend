import './styles/AnalogMultiplexer.css'
import { useState } from "react"

function AnalogMultiplexer() {

    const [am_ch_1, setAMCh1Mode] = useState("wg") 
    const [am_ch_2, setAMCh2Mode] = useState("wg") 

    const onAMCh1ModeChange = e => {
        setAMCh1Mode(e.target.value)
    }

    const onAMCh2ModeChange = e => {
        setAMCh2Mode(e.target.value)
    }

    return(
        <div>
            <h2>Analog Multiplexer</h2>
            <div>
                <div className="tables-in-row">
                    <table>
                        <tbody>
                            <tr>
                                <th></th>
                                <th>CH1</th>
                            </tr>
                            <tr>
                                <td>WG1</td>
                                <td>&nbsp;&nbsp;
                                    <input type="radio" id="wgCh1" name="am_ch_1" value="wg" 
                                    checked={am_ch_1 === "wg"}
                                    onChange={onAMCh1ModeChange}/>
                                    <label htmlFor="wgCh1"></label>
                                </td>
                            </tr>
                            <tr>
                                <td>DAC CH1</td>
                                <td>&nbsp;&nbsp;
                                    <input type="radio" id="dacCh1" name="am_ch_1" value="dac" 
                                    checked={am_ch_1 === "dac"}
                                    onChange={onAMCh1ModeChange}/>
                                    <label htmlFor="dacCh1"></label>
                                </td>
                            </tr>
                            <tr>
                                <td>Supply voltage</td>
                                <td>&nbsp;&nbsp;
                                    <input type="radio" id="svCh1" name="am_ch_1" value="supply voltage" 
                                    checked={am_ch_1 === "supply voltage"}
                                    onChange={onAMCh1ModeChange}/>
                                    <label htmlFor="svCh1"></label>
                                </td>
                            </tr>
                            <tr>
                                <td>Pot</td>
                                <td>&nbsp;&nbsp;
                                    <input type="radio" id="potCh1" name="am_ch_1" value="pot" 
                                    checked={am_ch_1 === "pot"}
                                    onChange={onAMCh1ModeChange}/>
                                    <label htmlFor="potCh1"></label>
                                </td>
                            </tr>
                
                        </tbody>
                    </table>
                </div>
                <div className="tables-in-row">
                    <table>
                        <tbody>
                            <tr>
                                <th></th>
                                <th>CH2</th>
                            </tr>
                            <tr>
                                <td>WG2</td>
                                <td>&nbsp;&nbsp;
                                    <input type="radio" id="wgCh2" name="am_ch_2" value="wg" 
                                    checked={am_ch_2 === "wg"}
                                    onChange={onAMCh2ModeChange}/>
                                    <label htmlFor="wgCh2"></label>
                                </td>
                            </tr>
                            <tr>
                                <td>DAC CH2</td>
                                <td>&nbsp;&nbsp;
                                    <input type="radio" id="dacCh2" name="am_ch_2" value="dac" 
                                    checked={am_ch_2 === "dac"}
                                    onChange={onAMCh2ModeChange}/>
                                    <label htmlFor="dacCh2"></label>
                                </td>
                            </tr>
                            <tr>
                                <td>Supply current</td>
                                <td>&nbsp;&nbsp;
                                    <input type="radio" id="scCh2" name="am_ch_2" value="supply current" 
                                    checked={am_ch_2 === "supply current"}
                                    onChange={onAMCh2ModeChange}/>
                                    <label htmlFor="scCh2"></label>
                                </td>
                            </tr>
                            <tr>
                                <td>Pot</td>
                                <td>&nbsp;&nbsp;
                                    <input type="radio" id="potCh2" name="am_ch_2" value="pot" 
                                    checked={am_ch_2 === "pot"}
                                    onChange={onAMCh2ModeChange}/>
                                    <label htmlFor="potCh2"></label>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AnalogMultiplexer;