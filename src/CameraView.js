import { useState } from 'react';
import './styles/CameraView.css';
import { getUrlForRequest } from './utils/get-url-for-request';
import Switch from 'react-switch';

function CameraView({tokenId}) {
  
  const [cameraOn, setCameraOn] = useState(false);

  // change on/off mode
  const onCameraOnOffChange = () => {
    setCameraOn(!cameraOn);
  };

  const renderVideoOrVoidBlock = (cameraOn) => {
    if (cameraOn) {
      return (
        <iframe
          src={getUrlForRequest('/api/stream/?token=' + tokenId)}
          // src={'https://digitrans.stu.cn.ua:8081/api/stream?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRhc2hib2FyZCIsImlhdCI6MTc2NDg2ODkxMiwiZXhwIjoxNzY0ODY5NTEyfQ.nXaOLB9KWKr3f_kI5m5htJ3pjwYAkdnCDfB6I9DUeSU'}
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
      <div className="switch-sizing">
        <Switch checkedIcon={false} uncheckedIcon={false} 
        checked={cameraOn} onChange={onCameraOnOffChange}/>
      </div>
    </div>
  );
}

export default CameraView;