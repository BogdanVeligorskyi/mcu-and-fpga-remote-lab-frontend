import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

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
              <h2>Instructions Set</h2>
              <p>
                1. .... <br/>
                2. .... <br/>
                3. .... <br/>
                4. .... <br/>
                5. .... <br/>
                6. .... <br/>
              </p>
            </div>

            <div class="col program-fpga align-text-top">
              <h2>Program FPGA</h2>
            </div>

          </div>

          <div class="row">
            <div class="col interaction-component">
              <h2>Interaction Part</h2>
            </div>

            <div class="col camera-view">
              <h2>Camera View From Lab</h2>
              <div class="camera-frame">
              </div>
              <div class="camera-switch">
                <label class="switch">
                  <input type="checkbox"/>
                  <span class="slider"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
        </header>
      <body>
      </body>
    </div>
  );
}

export default App;
