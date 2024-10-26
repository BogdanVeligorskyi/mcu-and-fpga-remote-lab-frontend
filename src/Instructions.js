import './Instructions.css'

function Instructions() {
    return(
        <div>
            <h2>Instructions</h2>
              <p class="intructions-text">
                1. Switch on the camera in the Camera View From Lab conponent and ensure that video is being translated. <br/>
                2. Load the firmware (program) FPGA or MCU by choosing file in your computer and clicking 'Program' <br/> 
                3. In the Digital Inputs pane click change the mode of pin 1 to button. <br/>
                4. For the button that appeared below click the button and see the changes on the Camera View From Lab. <br/>
                5. Repeat these actions for pins 2 and 3 and put the screens in your laboratory work report. <br/>
                </p>
        </div>
    );
}

export default Instructions;