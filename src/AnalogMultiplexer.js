import './styles/AnalogMultiplexer.css'
import { useEffect, useState } from "react"
import { getUrlForRequest } from './utils/get-url-for-request';

function AnalogMultiplexer({tokenId, amChannel, disabled}) {

  const [amChannelValue, setAMChannelValue] = useState("1") 

  useEffect(() => {
    sendAMModeValue(Number(amChannelValue));
  }, [])

  const onAMModeChange = e => {
    setAMChannelValue(e.target.value);
    console.log(e.target.value);
    sendAMModeValue(Number(e.target.value));
  }

  const sendAMModeValue = async (value) => {
    console.log("Send AM Value" + tokenId);
    console.log("MUX: " + amChannel);
    console.log("Channel: " + value);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': tokenId },
      body: JSON.stringify({ 
        multiplexer: amChannel, 
        channel: value 
      }),
      credentials: 'include'
    };
    const response = await fetch(getUrlForRequest('/api/multiplexer'), requestOptions);
    const responseText = await response.json()
    console.log('response.status =', response.status);
    //console.log('response text: ', responseText['message']);
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