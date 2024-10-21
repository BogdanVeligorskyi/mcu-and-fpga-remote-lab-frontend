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
                  &nbsp;&nbsp;<input type="radio" id="noneCh1" name="di_channel_1" value=""/>
                  <label for="noneCh1"></label>
                  </td>
                  <td>&nbsp;&nbsp;
                  <input type="radio" id="noneCh2" name="di_channel_2" value=""/>
                <label for="noneCh2"></label>
                  </td>
                  <td>&nbsp;&nbsp;
                  <input type="radio" id="noneCh3" name="di_channel_3" value=""/>
                <label for="noneCh3"></label>
                  </td>
                  <td>&nbsp;&nbsp;
                  <input type="radio" id="noneCh4" name="di_channel_4" value=""/>
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
                  on
                    <div class="digital-input-wrapper">
                    
                      <label class="switch-vertical">
                        <input type="checkbox"/>
                        <span class="slider-vertical"></span>
                      </label>
                      
                    </div>
                    off
                  </td>
                  
                  <td>
                    <div class="digital-input-wrapper">
                    <button class="digital-input-switch"></button>

                    </div>
                  </td>
                  <td>
                    <div class="digital-input-wrapper">
                      <button class="digital-input-button"></button>
                    </div>
                  </td>
                </tr>
              </table>
              
            </div>

              {/* <div class="digital-input-types">
                Button  <br/>
                Switch  <br/>
                Gen  <br/>
                None  <br/>
                <br/>
                <br/>
              </div>
             
              <div class="digital-input-ch1">
                <fieldset>
                  <legend> 1 </legend>
                  &nbsp;&nbsp;
                  <input type="radio" id="buttonCh1" name="di_channel_1" value=""/>
                  <label for="buttonCh1"></label><br/>
                  <input type="radio" id="switchCh1" name="di_channel_1" value=""/>
                  <label for="switchCh1"></label><br/>
                  <input type="radio" id="genCh1" name="di_channel_1" value=""/>
                  <label for="genCh1"></label><br/>
                  <input type="radio" id="noneCh1" name="di_channel_1" value=""/>
                  <label for="noneCh1"></label><br/>
                  
                </fieldset>
                <div class="digital-input-wrapper">
                  <button class="digital-input-button"></button>    
                </div>
              </div>
             
              <div class="digital-input-ch2">
              <fieldset>
                  <legend> 2 </legend>
                  &nbsp;&nbsp;
                <input type="radio" id="buttonCh2" name="di_channel_2" value=""/>
                <label for="buttonCh2"></label><br/>
                <input type="radio" id="switchCh2" name="di_channel_2" value=""/>
                <label for="switchCh2"></label><br/>
                <input type="radio" id="genCh2" name="di_channel_2" value=""/>
                <label for="genCh2"></label><br/>
                <input type="radio" id="noneCh2" name="di_channel_2" value=""/>
                <label for="noneCh2"></label><br/>
                </fieldset>
                <div class="digital-input-wrapper">
                  <button class="digital-input-switch"></button>    
                </div>
              </div>
              <div class="digital-input-ch3">
              <fieldset>
                  <legend> 3 </legend>
                  &nbsp;&nbsp;
                <input type="radio" id="buttonCh3" name="di_channel_3" value=""/>
                <label for="buttonCh3"></label><br/>
                <input type="radio" id="switchCh3" name="di_channel_3" value=""/>
                <label for="switchCh3"></label><br/>
                <input type="radio" id="genCh3" name="di_channel_3" value=""/>
                <label for="genCh3"></label><br/>
                <input type="radio" id="noneCh3" name="di_channel_3" value=""/>
                <label for="noneCh3"></label><br/>
                <button></button>
                </fieldset>
              </div>
              <div class="digital-input-ch4">
              <fieldset>
                  <legend> 4 </legend>
                  &nbsp;&nbsp;
                <input type="radio" id="buttonCh4" name="di_channel_4" value=""/>
                <label for="buttonCh4"></label><br/>
                <input type="radio" id="switchCh4" name="di_channel_4" value=""/>
                <label for="switchCh4"></label><br/>
                <input type="radio" id="genCh4" name="di_channel_4" value=""/>
                <label for="genCh4"></label><br/>
                <input type="radio" id="noneCh4" name="di_channel_4" value=""/>
                <label for="noneCh4"></label><br/>
                <button></button>
                </fieldset>
              </div>
            </div> */}

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
