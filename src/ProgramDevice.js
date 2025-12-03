import { useState } from 'react';
import { getUrlForRequest } from './utils/get-url-for-request';
import './styles/ProgramDevice.css'

// Program MCU and FPGA component
const ProgramDeviceForm = ({isFPGADev, tokenId}) => {

  const [file, setFile] = useState()
  const [resultFPGAMessage, setResultFPGAMessage] = useState("...")
  const [resultMCUMessage, setResultMCUMessage] = useState("...")    
  const [isRequestCompleted, setIsRequestCompleted] = useState(false)
  const [statusFPGA, setStatusFPGA] = useState(0)
  const [statusMCU, setStatusMCU] = useState(0)
  const [isResetEnabled, setIsResetEnabled] = useState(true)

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

  const renderResetButton = (isFPGADev) => {
    if (!isFPGADev) {
      return <button disabled={!isResetEnabled} onClick={onResetButton} className="btn btn-secondary mx-2 my-2">Reset</button>
    }
  }

  const onResetButton = () => {
    setIsResetEnabled(false);
    setStatusMCU(0);
    setResultMCUMessage("Reprogramming mcu...");

    const requestOptions = {
      method: 'POST',
      headers: {'Authorization': tokenId}, 
      body: true,
      credentials: 'include'
    }

    fetch(getUrlForRequest("/api/mcu/reset"), requestOptions).then(
      (response) => {
        console.log('response.status =', response.status);
        if (response.status === 200) {
          setResultMCUMessage("STM32 has been reset!");
          setIsRequestCompleted(true);
          setStatusMCU(200);
          setIsResetEnabled(true);
        } else {
          setResultMCUMessage("An error occured during MCU reprogramming!");
          setIsRequestCompleted(true);
          setStatusMCU(500);
          setIsResetEnabled(true);
        } 
        console.log(resultMCUMessage);
        console.log('response text: ', response.json());
      }
    ).catch(error => {
      console.log(error)
    });
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
          {renderResetButton(isFPGADev)}
      </form>
      {renderResultBlock(isRequestCompleted, statusFPGA, statusMCU)}

    </div>    
  );
}

function ProgramDevice({isFPGADevice, tokenId}) {

  return(
      
      <div className='col d-flex h-100'>
        <div class="row h-100 mx-auto">         
          <div class="row mx-auto">
          </div>
          <div class="row mx-auto">
            <div class="col align-self-center">
              <div className="program-device-file">
                <ProgramDeviceForm isFPGADev={isFPGADevice} tokenId={tokenId}/>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col"></div>
          </div>              
        </div>
      </div>
  );
}

export default ProgramDevice;