import { useState } from "react";

function DigitalInputsGen() {

    const [isOn, setIsOn] = useState(false)

    const onButtonClick = () => {
        setIsOn(!isOn);
    }

    // render neccessary graphical component based on the chosen switch state (on/off)
    const renderOnOffButton = (isOn) => {
        if (isOn) {
            return <button class="digital-input-turn-on" onClick={onButtonClick}/>
        } else {
            return <button class="digital-input-turn-off" onClick={onButtonClick}/>
        }
    }

    return(
        <div>
            {renderOnOffButton(isOn)}
            <input type="number" class="digital-input-duty-value" value="50"/>
            Duty, %
            <input type="number" class="digital-input-frequency-value" value="10"/>
            Freq, kHz
        </div>
    );
}

export default DigitalInputsGen;