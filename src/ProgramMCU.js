import { useState } from 'react';
import { getUrlForRequest } from './utils/get-url-for-request';
import './ProgramMCU.css'

const ProgramMCUForm = () => {

    const [file, setFile] = useState()
    const [resultMessage, setResultMessage] = useState("")
    const [isRequestCompleted, setIsRequestCompleted] = useState(false)
    const [status, setStatus] = useState(0)

    const renderResultBlock = (isRequestCompleted, status) => {
        console.log(status);
        if (isRequestCompleted && status === 200) {
            return <div className="program-mcu-success">{resultMessage}</div>
        } else if (isRequestCompleted && status !== 200) {
            return <div className="program-mcu-failure">{resultMessage}</div>
        } else if (!isRequestCompleted) {
            return <div className="program-mcu-progress">{resultMessage}</div>
        }
    }

    function handleChange(event) {
        setFile(event.target.files[0])
      }
      
      function handleSubmit(event) {
        setIsRequestCompleted(false);
        setStatus(0);
        event.preventDefault()
        const formData = new FormData();
        formData.append('file', file);
        const requestOptions = {
            method: 'POST',
            body: formData       
        }
        setResultMessage("Trying to program MCU device...");
        fetch(getUrlForRequest('/api/firmware/mcu'), requestOptions).then(
            (response) => {
              console.log('response.status =', response.status);
                if (response.status === 200) {
                 setResultMessage("MCU programmed successfully!");
                 setIsRequestCompleted(true);
                 setStatus(200);
               } else {
                 setResultMessage("An error occured during MCU programming!");
                 setIsRequestCompleted(true);
                 setStatus(500);
               }
               console.log(resultMessage);

              console.log('response text: ', response.json());
            }
          ).catch(error => {
            console.log(error)
        });
    
      }
    return (
        <div className="program-mcu-component">
        <form onSubmit={handleSubmit}>
            <input type="file" id="programMCUFile" className="btn btn-primary" name="programMCUFile" onChange={handleChange}/> <br/>
            <button type="submit" className="btn btn-primary my-2">Program MCU</button>
        </form>
        {renderResultBlock(isRequestCompleted, status)}
        </div>
        
    );
}

function ProgramMCU() {
    return(
        <div>
            <h2>Program MCU</h2>
            <div className="program-mcu-file">
                <ProgramMCUForm/>
            </div>
        </div>
    );
}

export default ProgramMCU;