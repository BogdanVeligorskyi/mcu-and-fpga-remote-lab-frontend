import { useState } from 'react';
import Switch from 'react-switch'

function DigitalInputsSwitch(pinNum) {

    const [isSwitched, setIsSwitched] = useState(false);

    const onStateChange = () => {
        setIsSwitched(!isSwitched);
    }

    return(
        <div>
            <Switch checked={isSwitched} onChange={onStateChange} />
        </div>
    ); 
}

export default DigitalInputsSwitch;