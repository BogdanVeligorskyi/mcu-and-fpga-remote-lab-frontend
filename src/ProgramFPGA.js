import { useState } from 'react';
import { getUrlForRequest } from './utils/get-url-for-request';
import './ProgramFPGA.css'

const ProgramFPGAForm = () => {

    const [file, setFile] = useState()
    // const [resultMessage, setResultMessage] = useState("")

    function handleChange(event) {
        setFile(event.target.files[0])
      }
      
      function handleSubmit(event) {
        event.preventDefault()
        const formData = new FormData();
        formData.append('file', file);
        // formData.append('fileName', file.name);
        const requestOptions = {
            method: 'POST',
            // headers: {'content-type': 'multipart/form-data'}, 
            body: formData       
        }
        
        fetch(getUrlForRequest('/api/firmware/fpga'), requestOptions).then(
            (response) => {
              console.log('response.status =', response.status);
              console.log('response text: ', response.json());
            }
          );
    
      }
    return (
        <form onSubmit={handleSubmit}>
            <input type="file" id="programFPGAFile" name="programFPGAFile" onChange={handleChange}/> <br/>
            <button type="submit" className="btn btn-primary">ProgramFPGA</button>
        </form>
        
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