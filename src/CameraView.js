import './CameraView.css'

function CameraView() {
    return (
        <div>
            <h2>Camera View From Lab</h2>
            <div class="camera-frame">
            </div>
            <div class="camera-switch">
                off
            <label class="switch">
                <input type="checkbox"/>
                <span class="slider"></span>
            </label>
               on
            </div>
        </div>
    );
}

export default CameraView;