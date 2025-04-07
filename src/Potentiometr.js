import './styles/Potentiometr.css'
import CircularSlider from '@fseehawer/react-circular-slider';

// set of instructions (recommendations)
function Potentiometr() {
  return(
    <div>
      <h2>Potentiometr</h2>
      <div className="potentiometr">
        
        <br/>Value <br/>
        <div className="round-sliders-label">
            <label>0 Ohm</label>
        </div>
          <div className="round-slider-wrapper">
            <div className="round-slider-vertical-scale-image">
              <CircularSlider
                hideLabelValue  
                data={["5m", "10m", "20m", "50m", "0.1", "0.2", "0.5", "1.0"]}
                dataIndex={7} 
                width={115}
                trackColor="#ffffff"
                onChange={this}/>           
                </div>
              </div>
      </div>
    </div>
  );
}

export default Potentiometr;