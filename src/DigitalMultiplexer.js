import './styles/DigitalMultiplexer.css'
import { useState } from "react"

function DigitalMultiplexer() {

    const [dm_option, setDMOptionMode] = useState("option 1") 

    const onDMOptionChange = e => {
        setDMOptionMode(e.target.value)
    }

    return(
        <div>
            <h2>Digital Multiplexer</h2>
            <div>
                <table className="digital-multiplexer-table">
                    <tbody>
                        <tr>
                            <th className="digital-multiplexer-col">Option 1</th>
                            <th className="digital-multiplexer-col">Option 2</th>
                        </tr>
                        <tr>
                            <td className="digital-multiplexer-col">&nbsp;&nbsp;
                            <input type="radio" id="option1" name="dm_option" value="option 1" 
                                checked={dm_option === "option 1"}
                                onChange={onDMOptionChange}/>
                                <label htmlFor="option1"></label>
                            </td>
                            <td className="digital-multiplexer-col">&nbsp;&nbsp;
                                <input type="radio" id="option2" name="dm_option" value="option 2" 
                                checked={dm_option === "option 2"}
                                onChange={onDMOptionChange}/>
                                <label htmlFor="option2"></label>
                            </td>
                        </tr>
                        <tr>
                            <td className="digital-multiplexer-col">CH6 - PE14</td>
                            <td className="digital-multiplexer-col">CH6 - PB0</td>
                        </tr>
                        <tr>
                            <td className="digital-multiplexer-col">CH7 - PE15</td>
                            <td className="digital-multiplexer-col">CH7 - PB14</td>
                        </tr>
                        <tr>
                            <td className="digital-multiplexer-col">CH9 - PD14</td>
                            <td className="digital-multiplexer-col">CH9 - PB15</td>
                        </tr>
                        <tr>
                            <td className="digital-multiplexer-col">CH10 - PD13</td>
                            <td className="digital-multiplexer-col">CH10 - PC13</td>
                        </tr>
                
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default DigitalMultiplexer;