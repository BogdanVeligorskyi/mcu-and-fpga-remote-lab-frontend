import { getUrlForRequest } from './utils/get-url-for-request';
import CircularSlider from "@fseehawer/react-circular-slider";
import { Line } from 'react-chartjs-2';
import { useState } from 'react';
import './styles/Scope.css';
import { Chart as ChartJS } from 'chart.js/auto';

let times = [];
let voltagesCH1 = [];
let voltagesCH2 = [];

// fetch voltage values from backend
const fetchChartData = async (isCH1Enabled, isCH2Enabled) => {
  let requestOptions;

  // fetch data for channel 1
  if (isCH1Enabled) {
    if (times.length === 0) {
      requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ channel: 0, isFirstCapture: 1})
      }
    } else {
      requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ channel: 0, isFirstCapture: 0})
      }
    }
    let response = await fetch(getUrlForRequest('/api/scope/get-scope-data'), requestOptions);
    let data = await response.json();
    voltagesCH1 = data["voltages"];
    if (times.length === 0) {
      times = data["times"];
    }
  }

  // fetch data for channel 2
  if (isCH2Enabled) {
    if (times.length === 0) {
      requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ channel: 1, isFirstCapture: 1})
      }
    } else {
      requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ channel: 1, isFirstCapture: 0})
      }
    }
    let response = await fetch(getUrlForRequest('/api/scope/get-scope-data'), requestOptions);
    let data = await response.json();
    voltagesCH2 = data["voltages"];
    if (times.length === 0) {
      times = data["times"];
    }
  }
  
  //console.log(voltages);
  //console.log(times);  
  return {
    labels: times,
    datasets: [
      {
        label: "CH1",
        data: voltagesCH1,
        borderColor: "yellow",
        borderWidth: 5
      },
      {
        label: "CH2",
        data: voltagesCH2,
        borderColor: "#0d99d1",
        borderWidth: 5
      }
    ]
  }
}

function ScopeChart() {

  const [verticalScale, setVerticalScale] = useState("5m");
  const [horizontalScale, setHorizontalScale] = useState("1u");
  const [xScaleOptions, setXScaleOptions] = useState(
    { title: { display: true, text: "Time, us" }, grid: { color: "#919492", }, ticks: { stepSize: 1, color: "white" }, type: 'linear', beginAtZero: false, min: 293, max: 307 }
  );
  const [yScaleOptions, setYScaleOptions] = useState(
    { title: { display: true, text: "Voltage, V" }, grid: { color: "#919492", }, ticks: { stepSize: 0.005, color: "white" }, min: -0.025, max: 0.025 }
  );
  const [buttonName, setButtonName] = useState("Run");
  const [isCH1Enabled, setIsCH1Enabled] = useState(true);
  const [isCH2Enabled, setIsCH2Enabled] = useState(false);
  const [isRun, setIsRun] = useState(false);
  const [isFirstCapture, setIsFirstCapture] = useState(true);
  const [intervalID, setIntervalID] = useState();
  const [chartOptions, setChartOptions] = useState(
    {
      elements: { point: { radius: 0, } },
      animation: { duration: 100 },
      maintainAspectRatio: false,
      plugins: { legend: { labels: { color: "white" } } },
      scales: { 
        xScaleOptions,
        yScaleOptions
      },
    }
  );
  const [chartData, setChartData] = useState({
      labels: [],
      datasets: [
      {
        label: "CH1",
        data: [],
        borderColor: "yellow",
        borderWidth: 1
      }, 
      {
        label: "CH2",
        data: [],
        borderColor: "#0d99d1",
        borderWidth: 1
      }, 
    ]
  });

  const changeButton = () => {
    console.log("isFirstCapture: " + isFirstCapture);
    if (isRun) {
      setButtonName("Run");
      setIsRun(false);
      clearInterval(intervalID);
    } else {
      setButtonName("Stop");
      setIsRun(true);
      setIsFirstCapture(true);
      setIntervalID(setInterval(() => refreshChartData(), 1000));
    }
  };

  const refreshChartData = async () => {
    try {
      const data = await fetchChartData(isCH1Enabled, isCH2Enabled);
      setChartData(data);
      setIsFirstCapture(false);
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };

  const onCH1CBChange = () => {
    setIsCH1Enabled(!isCH1Enabled);
  };

  const onCH2CBChange = () => {
    setIsCH2Enabled(!isCH2Enabled);
  };

  const onVerticalScaleValueChange = value => {
    setVerticalScale(value);
    console.log(value);
    switch (value) {
      case "5m":
        setYScaleOptions(
          { title: { display: true, text: "Voltage, V" }, grid: { color: "#919492", }, ticks: { stepSize: 0.005, color: "white" }, min: -0.025, max: 0.025 }
        );
        setChartOptions(
          {
            elements: { point: { radius: 0, } },
            animation: { duration: 100 },
            maintainAspectRatio: false,
            plugins: { legend: { labels: { color: "white" } } },
            scales: { 
              xScaleOptions,
              y: { title: { display: true, text: "Voltage, V" }, grid: { color: "#919492", }, ticks: { stepSize: 0.005, color: "white" }, min: -0.025, max: 0.025 }
            },
          }
        );
        break;
       case "10m":
        setYScaleOptions(
          { title: { display: true, text: "Voltage, V" }, grid: { color: "#919492", }, ticks: { stepSize: 0.01, color: "white" }, min: -0.05, max: 0.05 }
        );
        setChartOptions(
          {
            elements: { point: { radius: 0, } },
            animation: { duration: 100 },
            maintainAspectRatio: false,
            plugins: { legend: { labels: { color: "white" } } },
            scales: { 
              xScaleOptions,
              y: { title: { display: true, text: "Voltage, V" }, grid: { color: "#919492", }, ticks: { stepSize: 0.01, color: "white" }, min: -0.05, max: 0.05 }
            },
          }
        );
        break;
        case "20m":
        setYScaleOptions(
          { title: { display: true, text: "Voltage, V" }, grid: { color: "#919492", }, ticks: { stepSize: 0.02, color: "white" }, min: -0.1, max: 0.1 }
        );
        setChartOptions(
          {
            elements: { point: { radius: 0, } },
            animation: { duration: 100 },
            maintainAspectRatio: false,
            plugins: { legend: { labels: { color: "white" } } },
            scales: { 
              xScaleOptions,
              y: { title: { display: true, text: "Voltage, V" }, grid: { color: "#919492", }, ticks: { stepSize: 0.02, color: "white" }, min: -0.1, max: 0.1 }
            },
          }
        );
        break;  
        case "50m":
        setYScaleOptions(
          { title: { display: true, text: "Voltage, V" }, grid: { color: "#919492", }, ticks: { stepSize: 0.05, color: "white" }, min: -0.25, max: 0.25 }
        );
        setChartOptions(
          {
            elements: { point: { radius: 0, } },
            animation: { duration: 100 },
            maintainAspectRatio: false,
            plugins: { legend: { labels: { color: "white" } } },
            scales: { 
              xScaleOptions,
              y: { title: { display: true, text: "Voltage, V" }, grid: { color: "#919492", }, ticks: { stepSize: 0.05, color: "white" }, min: -0.25, max: 0.25 }
            },
          }
        );
        break;
        case "0.1":
        setYScaleOptions(
          { title: { display: true, text: "Voltage, V" }, grid: { color: "#919492", }, ticks: { stepSize: 0.1, color: "white" }, min: -0.5, max: 0.5 }
        );
        setChartOptions(
          {
            elements: { point: { radius: 0, } },
            animation: { duration: 100 },
            maintainAspectRatio: false,
            plugins: { legend: { labels: { color: "white" } } },
            scales: { 
              xScaleOptions,
              y: { title: { display: true, text: "Voltage, V" }, grid: { color: "#919492", }, ticks: { stepSize: 0.1, color: "white" }, min: -0.5, max: 0.5 }
            },
          }
        );
        break;
        case "0.2":
        setYScaleOptions(
          { title: { display: true, text: "Voltage, V" }, grid: { color: "#919492", }, ticks: { stepSize: 0.2, color: "white" }, min: -1.0, max: 1.0 }
        );
        setChartOptions(
          {
            elements: { point: { radius: 0, } },
            animation: { duration: 100 },
            maintainAspectRatio: false,
            plugins: { legend: { labels: { color: "white" } } },
            scales: { 
              xScaleOptions,
              y: { title: { display: true, text: "Voltage, V" }, grid: { color: "#919492", }, ticks: { stepSize: 0.2, color: "white" }, min: -1.0, max: 1.0 }
            },
          }
        );
        break;
        case "0.5":
        setYScaleOptions(
          { title: { display: true, text: "Voltage, V" }, grid: { color: "#919492", }, ticks: { stepSize: 0.5, color: "white" }, min: -2.5, max: 2.5 }
        );
        setChartOptions(
          {
            elements: { point: { radius: 0, } },
            animation: { duration: 100 },
            maintainAspectRatio: false,
            plugins: { legend: { labels: { color: "white" } } },
            scales: { 
              xScaleOptions,
              y: { title: { display: true, text: "Voltage, V" }, grid: { color: "#919492", }, ticks: { stepSize: 0.5, color: "white" }, min: -2.5, max: 2.5 }
            },
          }
        );
        break;
        case "1.0":
        setYScaleOptions(
          { title: { display: true, text: "Voltage, V" }, grid: { color: "#919492", }, ticks: { stepSize: 1.0, color: "white" }, min: -5.0, max: 5.0 }
        );
        setChartOptions(
          {
            elements: { point: { radius: 0, } },
            animation: { duration: 100 },
            maintainAspectRatio: false,
            plugins: { legend: { labels: { color: "white" } } },
            scales: { 
              xScaleOptions,
              y: { title: { display: true, text: "Voltage, V" }, grid: { color: "#919492", }, ticks: { stepSize: 1.0, color: "white" }, min: -5.0, max: 5.0 }
            },
          }
        );
        break;
    }
  };

  const onHorizontalScaleValueChange = value => {
    setHorizontalScale(value);
    console.log(value);
    switch (value) {
      case "1u":
        setXScaleOptions(
          { title: { display: true, text: "Time, us" }, grid: { color: "#919492", }, ticks: { stepSize: 1, color: "white" }, type: 'linear', beginAtZero: false, min: 293, max: 307 }
        );
        setChartOptions(
          {
            elements: { point: { radius: 0, } },
            animation: { duration: 100 },
            maintainAspectRatio: false,
            plugins: { legend: { labels: { color: "white" } } },
            scales: { 
              yScaleOptions,
              x: { title: { display: true, text: "Time, us" }, grid: { color: "#919492", }, ticks: { stepSize: 1, color: "white" }, type: 'linear', beginAtZero: false, min: 293, max: 307 }
            },
          }
        );
        break;
        case "10u":
        setXScaleOptions(
          { title: { display: true, text: "Time, us" }, grid: { color: "#919492", }, ticks: { stepSize: 10, color: "white" }, type: 'linear', beginAtZero: false, min: 230, max: 370 }
        );
        setChartOptions(
          {
            elements: { point: { radius: 0, } },
            animation: { duration: 100 },
            maintainAspectRatio: false,
            plugins: { legend: { labels: { color: "white" } } },
            scales: { 
              yScaleOptions,
              x: { title: { display: true, text: "Time, us" }, grid: { color: "#919492", }, ticks: { stepSize: 10, color: "white" }, type: 'linear', beginAtZero: false, min: 230, max: 370 }
            },
          }
        );
        break;
        case "50u":
        setXScaleOptions(
          { title: { display: true, text: "Time, us" }, grid: { color: "#919492", }, ticks: { stepSize: 50, color: "white" }, type: 'linear', beginAtZero: true, min: 0, max: 600 }
        );
        setChartOptions(
          {
            elements: { point: { radius: 0, } },
            animation: { duration: 100 },
            maintainAspectRatio: false,
            plugins: { legend: { labels: { color: "white" } } },
            scales: { 
              yScaleOptions,
              x: { title: { display: true, text: "Time, us" }, grid: { color: "#919492", }, ticks: { stepSize: 50, color: "white" }, type: 'linear', beginAtZero: false, min: 0, max: 600 }
            },
          }
        );
        break;
        case "20u":
        setXScaleOptions(
          { title: { display: true, text: "Time, us" }, grid: { color: "#919492", }, ticks: { stepSize: 20, color: "white" }, type: 'linear', beginAtZero: false, min: 150, max: 430 }
        );
        setChartOptions(
          {
            elements: { point: { radius: 0, } },
            animation: { duration: 100 },
            maintainAspectRatio: false,
            plugins: { legend: { labels: { color: "white" } } },
            scales: { 
              yScaleOptions,
              x: { title: { display: true, text: "Time, us" }, grid: { color: "#919492", }, ticks: { stepSize: 20, color: "white" }, type: 'linear', beginAtZero: false, min: 150, max: 430 }
            },
          }
        );
        break;
    }
  }

  return (
      <div>
        <h2>Scope</h2>

        <input type="checkbox" id="ch1CB" name="ch1CB" value="CH1"
        disabled={isRun === true}
        checked={isCH1Enabled === true}
        onChange={onCH1CBChange}/>
        <label htmlFor="ch1CB">CH1</label>

        <input type="checkbox" id="ch2CB" name="ch2CB" value="CH2"
        disabled={isRun === true}
        checked={isCH2Enabled === true}
        onChange={onCH2CBChange}/>
        <label htmlFor="ch2CB">CH2</label>
        
        <div className="chart">                    
          <Line type="line" data={chartData} options={chartOptions}/>
        </div>
        <div className="btn btn-primary m-2" onClick={changeButton}>{buttonName}</div>
        <div className="row m-1">
          <div className="col-xl m-1 px-1 border-spec">
            <div className="scope-header">
              Vertical
            </div>
            <div className="scope-vertical-channel-name">
            </div>
            <label>Scale</label><br/>
            <label className="round-sliders-label">{verticalScale}V/div</label><br/>
              <div className="round-slider-wrapper">
                <div className="round-slider-vertical-scale-image">
                  <CircularSlider
                    hideLabelValue  
                    data={["5m", "10m", "20m", "50m", "0.1", "0.2", "0.5", "1.0"]} 
                    width={115}
                    trackColor="#ffffff"
                    onChange={onVerticalScaleValueChange}/>
                            
                </div>
              </div>
              <br/>
          </div>
          <div className="col-xl m-1 px-1 border-spec">
            <div className="scope-header">
              Horizontal
            </div>
            <div className="scope-vertical-channel-name">
            </div>
            <label>Scale</label><br/>
            <label className="round-sliders-label">{horizontalScale}/div</label><br/>
              <div className="round-slider-wrapper">
                <div className="round-slider-horizontal-scale-image">
                  <CircularSlider
                    hideLabelValue  
                    data={["1u", "10u", "20u", "50u"]} 
                    width={115}
                    trackColor="#ffffff"
                    onChange={onHorizontalScaleValueChange}/>
                </div>
              </div>
              <br/>
            </div>
        </div>
      </div>
  )
}
export default ScopeChart;