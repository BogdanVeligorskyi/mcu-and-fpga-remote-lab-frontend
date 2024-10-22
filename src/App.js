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
        <div class="container align-top">
          <div class="row">
            <div class="col instructions-set">
              <Instructions/>
            </div>

            <div class="col program-fpga align-text-top">
              <ProgramFPGA/>
            </div>

          </div>

          <div class="row">
            <div class="col digital-inputs">
              <DigitalInputs/>
            </div>

            <div class="col camera-view">
              <CameraView/>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
