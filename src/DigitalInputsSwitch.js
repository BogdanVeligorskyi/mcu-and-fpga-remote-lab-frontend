function DigitalInputsSwitch(pinNum) {
    return(
        <div>
            <label class="digital-input-label-in-slider">On</label>
            <label class="switch-vertical">
                <input type="checkbox"/>
                <span class="slider-vertical"></span>
            </label>
            <label class="digital-input-label-in-slider">Off</label>
        </div>
    ); 
}

export default DigitalInputsSwitch;