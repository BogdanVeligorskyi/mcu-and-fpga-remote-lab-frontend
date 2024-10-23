import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Countdown, { zeroPad } from 'react-countdown'
import Instructions from './Instructions';
import ProgramFPGA from './ProgramFPGA';
import DigitalInputs from './DigitalInputs';
import CameraView from './CameraView';

// formatting countdown
const renderer = ({ minutes, seconds }) => {
    return <span>{zeroPad(minutes)}:{zeroPad(seconds)}</span>;
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div class="timer">
          <Countdown 
          date={Date.now() + 600000}
          renderer={renderer}/>
        </div>
        <div class="container-fluid">
          <div class="row">
            <div class="col-xl instructions-set">
              <Instructions/>
            </div>

            <div class="col-xl program-fpga">
              <ProgramFPGA/>
            </div>

          </div>

          <div class="row">
            <div class="col-xl digital-inputs">
              <DigitalInputs/>
            </div>

            <div class="col-xl camera-view">
              <CameraView/>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
