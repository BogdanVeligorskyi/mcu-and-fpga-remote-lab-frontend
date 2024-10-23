import { useState } from 'react';
import './CameraView.css'

function CameraView() {

    const [cameraOnOff, setCameraOnOff] = useState(false)

    const onCameraOnOffChange = () => {
        setCameraOnOff(!cameraOnOff);
    }

    const renderVideoOrVoidBlock = (cameraOnOff) => {
        if (cameraOnOff) {
            return <iframe src='http://195.69.76.135:8082/api/stream' scrolling='no'></iframe>
        }
    }

    return (
        <div>
            <h2>Camera View From Lab</h2>
            <div class="camera-frame">
                {renderVideoOrVoidBlock(cameraOnOff)}
            </div>
            <div class="camera-switch">
                off
            <label class="switch">
                <input type="checkbox" checked={cameraOnOff} onChange={onCameraOnOffChange}/>
                <span class="slider"></span>
            </label>
               on
            </div>
        </div>
    );
}

export default CameraView;