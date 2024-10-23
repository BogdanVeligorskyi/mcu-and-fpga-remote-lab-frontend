import { useState } from 'react';
import './CameraView.css'

function CameraView() {

    const [cameraOn, setCameraOn] = useState(false)

    const onCameraOnOffChange = () => {
        setCameraOn(!cameraOn);
    }

    const renderVideoOrVoidBlock = (cameraOn) => {
        if (cameraOn) {
            return <iframe src='http://195.69.76.135:8082/api/stream' title='CameraView' scrolling='no'></iframe>
        }
    }

    return (
        <div>
            <h2>Camera View From Lab</h2>
            <div class="camera-frame">
                {renderVideoOrVoidBlock(cameraOn)}
            </div>
            <div class="camera-switch">
                off
            <label class="switch">
                <input type="checkbox" checked={cameraOn} onChange={onCameraOnOffChange}/>
                <span class="slider"></span>
            </label>
               on
            </div>
        </div>
    );
}

export default CameraView;