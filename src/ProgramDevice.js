import { useState } from 'react';
import { getUrlForRequest } from './utils/get-url-for-request';
import './styles/ProgramDevice.css'

// Program MCU and FPGA component
const ProgramDeviceForm = ({isFPGADev, tokenId}) => {

  const [file, setFile] = useState()
  const [resultFPGAMessage, setResultFPGAMessage] = useState("")
  const [resultMCUMessage, setResultMCUMessage] = useState("")    
  const [isRequestCompleted, setIsRequestCompleted] = useState(false)
  const [statusFPGA, setStatusFPGA] = useState(0)
  const [statusMCU, setStatusMCU] = useState(0)

  const renderResultBlock = (isRequestCompleted, statusFPGA, statusMCU) => {
    if (isFPGADev) {
      if (isRequestCompleted && statusFPGA === 200) {
        return <div className="program-device-success">{resultFPGAMessage}</div>
      } else if (isRequestCompleted && statusFPGA !== 200) {
        return <div className="program-device-failure">{resultFPGAMessage}</div>
      } else if (!isRequestCompleted) {
        return <div className="program-device-progress">{resultFPGAMessage}</div>
      }
    } else {
      if (isRequestCompleted && statusMCU === 200) {
        return <div className="program-device-success">{resultMCUMessage}</div>
      } else if (isRequestCompleted && statusMCU !== 200) {
        return <div className="program-device-failure">{resultMCUMessage}</div>
      } else if (!isRequestCompleted) {
        return <div className="program-device-progress">{resultMCUMessage}</div>
      }
    }  
  }

  const renderProgramButton = (isFPGADev) => {
    if (isFPGADev) {
      return <button type="submit" className="btn btn-primary my-2">Program FPGA</button>
    } else {
      return <button type="submit" className="btn btn-primary my-2">Program MCU</button>
    }
  } 

  function handleFileChange(event) {
    setFile(event.target.files[0])
  }
      
  function handleSubmitProgramDevice(event) { 
    setIsRequestCompleted(false);
    setStatusMCU(0);
    setStatusFPGA(0);
        
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
        
    const requestOptions = {
      method: 'POST',
      headers: {'Authorization': tokenId}, 
      body: formData,
      credentials: 'include'
    }
        
    // if the device is a FPGA
    if (isFPGADev) {
      setResultFPGAMessage("Trying to program FPGA device...");
      setResultMCUMessage("");
      fetch(getUrlForRequest("/api/firmware/fpga"), 
      requestOptions).then(
        (response) => {
          console.log('response.status =', response.status);
          if (response.status === 200) {
            setResultFPGAMessage("FPGA programmed successfully!");
            setIsRequestCompleted(true);
            setStatusFPGA(200);
          } else {
            setResultFPGAMessage("An error occured during FPGA programming!");
            setIsRequestCompleted(true);
            setStatusFPGA(500);
          } 
          console.log(resultFPGAMessage);
          console.log('response text: ', response.json());
        }
      ).catch(error => {
        console.log(error)
      });
        
      // if the device is a MCU
      } else {
        setResultFPGAMessage("");
        setResultMCUMessage("Trying to program MCU device...");
        fetch(getUrlForRequest("/api/firmware/mcu"), requestOptions).then(
          (response) => {
            console.log('response.status =', response.status);
            if (response.status === 200) {
              setResultMCUMessage("MCU programmed successfully!");
              setIsRequestCompleted(true);
              setStatusMCU(200);
            } else {
              setResultMCUMessage("An error occured during MCU programming!");
              setIsRequestCompleted(true);
              setStatusMCU(500);
            } 
            console.log(resultMCUMessage);
            console.log('response text: ', response.json());
          }
        ).catch(error => {
          console.log(error)
        });
      }
  }
  
  return (
    <div className="program-device-component">
      <form onSubmit={handleSubmitProgramDevice}>
        <input type="file" id="programDeviceFile" 
          className="btn btn-primary" 
          name="programDeviceFile" 
          onChange={handleFileChange}/> <br/>
          {renderProgramButton(isFPGADev)}
      </form>
      {renderResultBlock(isRequestCompleted, statusFPGA, statusMCU)}
    </div>    
  );
}

function ProgramDevice({isFPGADevice, tokenId}) {

  const renderName = (isFPGADevice) => {    
    if (isFPGADevice) {
      return <h2>Program FPGA</h2>
    } else {
      return <h2>Program MCU</h2>
    }
  };

  return(
    <div>
      {renderName(isFPGADevice)}
      <div className="program-device-file">
        <ProgramDeviceForm isFPGADev={isFPGADevice} tokenId={tokenId}/>
      </div>
    </div>
  );
}

export default ProgramDevice;