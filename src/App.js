import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Instructions from './Instructions';
import ProgramFPGA from './ProgramFPGA';
import DigitalInputs from './DigitalInputs';
import CameraView from './CameraView';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div class="timer">
          Time left: 04:00
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
