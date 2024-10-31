import { useState } from 'react';
import './CameraView.css';
import { getUrlForRequest } from './utils/get-url-for-request';

function CameraView() {
  const [cameraOn, setCameraOn] = useState(false);

  const onCameraOnOffChange = () => {
    setCameraOn(!cameraOn);
  };

  const renderVideoOrVoidBlock = (cameraOn) => {
    if (cameraOn) {
      return (
        <iframe
          src={getUrlForRequest('/api/stream')}
          title="CameraView"
          scrolling="no"
        ></iframe>
      );
    }
  };

  return (
    <div>
      <h2>Camera View From Lab</h2>
      <div className="camera-frame">{renderVideoOrVoidBlock(cameraOn)}</div>
      <div className="camera-switch">
        <div className="camera-view-onoff">
          Off
        </div>
        <label className="switch">
          <input
            type="checkbox"
            checked={cameraOn}
            onChange={onCameraOnOffChange}
          />
          <span className="slider"></span>
        </label>
        <div className="camera-view-onoff">
          On
        </div>
      </div>
    </div>
  );
}

export default CameraView;
