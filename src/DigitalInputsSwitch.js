function DigitalInputsSwitch(pinNum) {
    return(
        <div>
            <label className="digital-input-label-in-slider">On</label>
            <label className="switch-vertical">
                <input type="checkbox"/>
                <span className="slider-vertical"></span>
            </label>
            <label className="digital-input-label-in-slider">Off</label>
        </div>
    ); 
}

export default DigitalInputsSwitch;