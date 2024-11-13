import CircularSlider from "@fseehawer/react-circular-slider";
import { useState } from "react";

function ScopeVertical( {channelNum} ) {

    const [verticalScale, setVerticalScale] = useState("0.1");
    const [verticalPosition, setVerticalPosition] = useState("");

    const onVerticalScaleValueChange = value => {
        setVerticalScale(value);
    }

    const onVerticalPositionValueChange = value => {
        setVerticalPosition(value);
    }

    return (
        <div>
            <div>
                <div className="scope-header">
                    Vertical
                </div>
                <div className="scope-vertical-channel-name">
                    CH{channelNum}
                </div> 
            </div>
            <label>Scale</label><br/>
            <label className="functional-generator-sliders-label">{verticalScale}</label><br/>
            <CircularSlider
                hideLabelValue  
                data={["0.1", "0.2", "0.5", "1.0", "5m", "10m", "20m", "50m"]} 
                width={110}
                trackColor="#ffffff"
                onChange={onVerticalScaleValueChange}/>
                <br/><br/>
            <label>Position</label><br/>
            <label className="functional-generator-sliders-label">{verticalPosition}</label><br/>
            <CircularSlider
                hideLabelValue  
                data={[0.0, 1.0, 2.0, 2.5, 3.0, 3.3]} 
                width={110}
                trackColor="#ffffff"
                onChange={onVerticalPositionValueChange}/><br/><br/>
        </div>
    );
}

export default ScopeVertical;