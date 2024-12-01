import './styles/Instructions.css'

function Instructions() {
    return(
        <div>
            <h2>Instructions</h2>
            <div className="instructions-text">
                <p>
                    1. Switch on the camera in the Camera View From Lab component and ensure that video is being translated. <br/>
                    2. Load the firmware (program) FPGA or MCU by choosing file in your computer and clicking 'Program'. <br/> 
                    3. In the Digital Inputs pane  change the mode of pin 1 to button. <br/>
                    4. For the button that appeared below press the button and see the changes on the Camera View From Lab. <br/>
                    5. Generate waveform and try to capture it in Scope pane.<br/>
                </p>
            </div>
        </div>
    );
}

export default Instructions;