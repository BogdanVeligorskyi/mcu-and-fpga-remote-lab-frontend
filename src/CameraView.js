import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './styles/CameraView.css';
import { getUrlForRequest } from './utils/get-url-for-request';
import Switch from 'react-switch';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function CameraView() {

  let query = useQuery();
  let tokenId = query.get("token");
  
  const [cameraOn, setCameraOn] = useState(false);

  // change on/off mode
  const onCameraOnOffChange = () => {
    setCameraOn(!cameraOn);
  };

  async function getSrc() {
    const res = await fetch(getUrlForRequest('/api/stream'), {
      method: 'GET',
      headers: {
        'Authorization': tokenId
      },
      credentials: 'include'
    });
    const blob = await res.blob();
    const urlObject = URL.createObjectURL(blob);
    document.querySelector('iframe').setAttribute("src", urlObject)
  }

  const renderVideoOrVoidBlock = (cameraOn) => {
    if (cameraOn) {
    getSrc();
      return (
        <iframe
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
