import './styles/Terminal.css'

function Terminal() {
    return(
      <div>
        <h2>Terminal</h2>
        <div className="terminal">
          
            <textarea readOnly={true}>
              
            </textarea>
            
        </div>
        <div className="terminal-input">
        <input type="text" placeholder="Enter command:"/>
        <button className="send-button">Send</button>
        </div>
        
      </div>
    );
  }
  
  export default Terminal;