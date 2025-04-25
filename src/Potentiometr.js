import { useState } from 'react';
import './styles/Potentiometr.css'
import CircularSlider from '@fseehawer/react-circular-slider';
import { getUrlForRequest } from './utils/get-url-for-request';

function Potentiometr( {tokenId} ) {

  const [resistanceValue, setResistanceValue] = useState(0);

  const sendResistanceValue = async (resValue) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': tokenId },
      body: JSON.stringify({ 
        percentage: Number(resValue),  
      }),
      credentials: 'include'
    };
    const response = await fetch(getUrlForRequest('/api/potentiometer/resistance'), requestOptions);
    const responseText = await response.json()
    console.log('response.status =', response.status);
    console.log('response text: ', responseText['percentage']);
  }

  const onPotentiometrValueChange = value => {
    console.log(value);
    if (value == null) {
      return;
    }
    setResistanceValue(value);
    sendResistanceValue(value);
  }

  return(
    <div>
      <h2>Potentiometr</h2>
      <div className="potentiometr">
        
        <label>Value </label><br/>
        
        <label className="round-sliders-label mcu-lab-background-special">{resistanceValue} %</label>
        
          <div className="round-slider-wrapper">
            <div className="round-slider-potentiometr-image">
              <CircularSlider
                hideLabelValue  
                min={0}
                max={100}
                width={115}
                trackColor="#ffffff"
                onChange={onPotentiometrValueChange}/>           
                </div>
            </div>
          <div className="scope-scroll-slider-none"></div>
      </div>
    </div>
  );
}

export default Potentiometr;