import CircularSlider from "@fseehawer/react-circular-slider";
import { useState } from "react";

function ScopeHorizontal() {

    const [horizontalScale, setHorizontalScale] = useState("0.1");
    const [horizontalPosition, setHorizontalPosition] = useState("");

    const onHorizontalScaleValueChange = value => {
        setHorizontalScale(value);
    }

    const onHorizontalPositionValueChange = value => {
        setHorizontalPosition(value);
    }

    return (
        <div>
            <div>
                <div className="scope-header">
                    Horizontal
                </div>
                <div className="scope-vertical-channel-name">
                </div>
            </div>
            <label>Scale</label><br/>
            <label className="functional-generator-sliders-label">{horizontalScale}</label><br/>
            <CircularSlider
                hideLabelValue  
                data={["1", "10", "50m", "100m", "1n", "10n", "50n", "100n"]} 
                width={110}
                trackColor="#ffffff"
                onChange={onHorizontalScaleValueChange}/>
                <br/><br/>
            <label>Position</label><br/>
            <label className="functional-generator-sliders-label">{horizontalPosition}</label><br/>
            <CircularSlider
                hideLabelValue  
                data={[0.0, 1.0, 2.0, 2.5, 3.0, 3.3]} 
                width={110}
                trackColor="#ffffff"
                onChange={onHorizontalPositionValueChange}/><br/><br/>
        </div>
    );
}

export default ScopeHorizontal;