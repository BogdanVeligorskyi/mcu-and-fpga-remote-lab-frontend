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
              <p class="intructions-text">
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
            <div class="col digital-inputs">
              <h2>Digital Inputs</h2>

              <table>
                <tr>
                  <th></th>
                  <th>1</th>
                  <th>2</th>
                  <th>3</th>
                  <th>4</th>
                </tr>
                <tr>
                  <td>Button</td>
                  <td>
                    &nbsp;&nbsp;<input type="radio" id="buttonCh1" name="di_channel_1" value=""/>
                    <label for="buttonCh1"></label>
                  </td>
                  <td>&nbsp;&nbsp;
                    <input type="radio" id="buttonCh2" name="di_channel_2" value=""/>
                    <label for="buttonCh2"></label>
                  </td>
                  <td>&nbsp;&nbsp;
                    <input type="radio" id="buttonCh3" name="di_channel_3" value=""/>
                    <label for="buttonCh3"></label>
                  </td>
                  <td>&nbsp;&nbsp;
                    <input type="radio" id="buttonCh4" name="di_channel_4" value=""/>
                    <label for="buttonCh4"></label>
                  </td>
                </tr>
                <tr>
                  <td>Switch</td>
                  <td>
                    &nbsp;&nbsp;<input type="radio" id="switchCh1" name="di_channel_1" value=""/>
                    <label for="switchCh1"></label>
                  </td>
                  <td>&nbsp;&nbsp;
                    <input type="radio" id="switchCh2" name="di_channel_2" value=""/>
                    <label for="switchCh2"></label>
                  </td>
                  <td>&nbsp;&nbsp;
                    <input type="radio" id="switchCh3" name="di_channel_3" value=""/>
                    <label for="switchCh3"></label>
                  </td>
                  <td>&nbsp;&nbsp;
                    <input type="radio" id="switchCh4" name="di_channel_4" value=""/>
                    <label for="switchCh4"></label>
                  </td>
                </tr>
                <tr>
                  <td>Gen</td>
                  <td>
                    &nbsp;&nbsp;<input type="radio" id="genCh1" name="di_channel_1" value=""/>
                    <label for="genCh1"></label>
                  </td>
                  <td>&nbsp;&nbsp;
                    <input type="radio" id="genCh2" name="di_channel_2" value=""/>
                    <label for="genCh2"></label>
                  </td>
                  <td>&nbsp;&nbsp;
                    <input type="radio" id="genCh3" name="di_channel_3" value=""/>
                    <label for="genCh3"></label>
                  </td>
                  <td>&nbsp;&nbsp;
                    <input type="radio" id="genCh4" name="di_channel_4" value=""/>
                    <label for="genCh4"></label>
                  </td>
                </tr>
                <tr>
                  <td>None</td>
                  <td>
                    &nbsp;&nbsp;<input type="radio" id="noneCh1" name="di_channel_1" value="" checked/>
                    <label for="noneCh1"></label>
                  </td>
                    <td>&nbsp;&nbsp;
                    <input type="radio" id="noneCh2" name="di_channel_2" value="" checked/>
                    <label for="noneCh2"></label>
                  </td>
                  <td>&nbsp;&nbsp;
                    <input type="radio" id="noneCh3" name="di_channel_3" value="" checked/>
                    <label for="noneCh3"></label>
                  </td>
                  <td>&nbsp;&nbsp;
                    <input type="radio" id="noneCh4" name="di_channel_4" value="" checked/>
                    <label for="noneCh4"></label>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <div class="digital-input-wrapper">
                      <button class="digital-input-button"></button>
                    </div>
                  </td>
                  <td>
                
                    <div class="digital-input-wrapper">
                      <label class="digital-input-label-in-slider">On</label>
                      <label class="switch-vertical">
                        <input type="checkbox"/>
                        <span class="slider-vertical"></span>
                      </label>
                      <label class="digital-input-label-in-slider">Off</label>
                    </div>
                  </td>
                  
                  <td>
                    <div class="digital-input-wrapper">
                      <button class="digital-input-turn-off"/>
                      <input type="number" class="digital-input-duty-value" value="50"/>
                      Duty, %
                      <input type="number" class="digital-input-frequency-value" value="10"/>
                      Freq, kHz
                    </div>
                  </td>
                  <td>
                    <div class="digital-input-wrapper">           
                      <button class="digital-input-turn-on"/>
                      
                    </div>
                  </td>
                </tr>
              </table>
              
            </div>

            <div class="col camera-view">
              <h2>Camera View From Lab</h2>
              <div class="camera-frame">
              </div>
              <div class="camera-switch">
                off
                <label class="switch">
                  <input type="checkbox"/>
                  <span class="slider"></span>
                </label>
                on
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
