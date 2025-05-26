import './styles/AnalogMultiplexer.css'
import { useState } from "react"

function AnalogMultiplexer({token, channel, disabled}) {

  const [amChannelValue, setAMChannelValue] = useState("1") 

  const onAMModeChange = e => {
    setAMChannelValue(e.target.value);
    console.log(amChannelValue);
  }

  return(
    
      <div className="tables-in-row">
        <select value={amChannelValue} disabled={disabled} onChange={onAMModeChange}>
          <option value={"1"}>Functional Generator</option>
          <option value={"2"}>DAC</option>
          <option value={"3"}>Supply Voltage</option>
          <option value={"4"}>Potentiometr</option>
        </select>  
      </div>
      
  )
}

export default AnalogMultiplexer;