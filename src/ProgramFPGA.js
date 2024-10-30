import { useState } from 'react';
import { getUrlForRequest } from './utils/get-url-for-request';
import './ProgramFPGA.css'

const ProgramFPGAForm = () => {

    const [file, setFile] = useState()
    const [resultMessage, setResultMessage] = useState("")
    const [isRequestCompleted, setIsRequestCompleted] = useState(false)
    const [status, setStatus] = useState(0)

    const renderResultBlock = (isRequestCompleted, status) => {
        console.log(status);
        if (isRequestCompleted && status === 200) {
            return <div className="program-fpga-success">{resultMessage}</div>
        } else if (isRequestCompleted && status !== 200) {
            return <div className="program-fpga-failure">{resultMessage}</div>
        } else if (!isRequestCompleted) {
            return <div className="program-fpga-progress">{resultMessage}</div>
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
        // formData.append('fileName', file.name);
        const requestOptions = {
            method: 'POST',
            // headers: {'content-type': 'multipart/form-data'}, 
            body: formData       
        }
        setResultMessage("Trying to program FPGA device...");
        fetch(getUrlForRequest('/api/firmware/fpga'), requestOptions).then(
            (response) => {
              console.log('response.status =', response.status);
                if (response.status === 200) {
                 setResultMessage("FPGA programmed successfully!");
                 setIsRequestCompleted(true);
                 setStatus(200);
               } else {
                 setResultMessage("An error occured during FPGA programming!");
                 setIsRequestCompleted(true);
                 setStatus(500);
               }
               console.log(resultMessage);

              console.log('response text: ', response.json());
            }
          );
    
      }
    return (
        <div className="program-fpga-component">
        <form onSubmit={handleSubmit}>
            <input type="file" id="programFPGAFile" name="programFPGAFile" onChange={handleChange}/> <br/>
            <button type="submit" className="btn btn-primary">Program FPGA</button>
        </form>
        {renderResultBlock(isRequestCompleted, status)}
        </div>
        
    );
}

function ProgramFPGA() {
    return(
        <div>
            <h2>Program FPGA</h2>
            <div className="program-fpga-file">
                <ProgramFPGAForm/>
            </div>
        </div>
    );
}

export default ProgramFPGA;