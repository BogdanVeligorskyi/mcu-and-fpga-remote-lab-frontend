import { getUrlForRequest } from './utils/get-url-for-request';
import CircularSlider from "@fseehawer/react-circular-slider";
import { Line } from 'react-chartjs-2';
import { useRef, useState } from 'react';
import './styles/Scope.css';
import { Chart } from 'chart.js/auto';

Chart.register({
  id: 'someBackground',
  beforeDraw: (chartRef, args, opts) => {
    const context = chartRef.canvas.getContext('2d');
    if (!context) {
      return;
    }
    context.save();
    context.globalCompositeOperation = 'destination-over';
    context.fillStyle = 'black';
    context.fillRect(0, 0, chartRef.width, chartRef.height);
    context.restore();
  },
});

function ScopeChart({tokenId}) {

  let times = [];
  let voltagesCH1 = [];
  let voltagesCH2 = [];

  // fetch voltage values from backend
const fetchChartData = async (isCH1Enabled, isCH2Enabled) => {

  let requestOptions;

  console.log("fetchChartData");
  if (process.env.REACT_APP_IS_FRONTEND_DEV_MODE.toUpperCase() === "TRUE") {
    console.log("in here");
    for (let i = 0; i < 600; i++) {
      voltagesCH1[i] = Math.floor(Math.random() * 4.0);
      voltagesCH2[i] = 0;
      times[i] = i+1;
    }
  } else {

  // fetch data for channel 1
  if (isCH1Enabled) {
    if (times.length === 0) {
      requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': tokenId },
        body: JSON.stringify({ channel: 0, isFirstCapture: 1}),
        credentials: 'include'
      }
    } else {
      requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': tokenId },
        body: JSON.stringify({ channel: 0, isFirstCapture: 0}),
        credentials: 'include'
      }
    }
    let response = await fetch(getUrlForRequest('/api/scope/get-scope-data'), 
    requestOptions);
    let data = await response.json();
    voltagesCH1 = data["voltages"];
    if (times.length === 0) {
      times = data["times"];
    }
  } else {
    voltagesCH1 = [];
  }

  // fetch data for channel 2
  if (isCH2Enabled) {
    if (times.length === 0) {
      requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': tokenId },
        body: JSON.stringify({ channel: 1, isFirstCapture: 1}),
        credentials: 'include'
      }
    } else {
      requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': tokenId },
        body: JSON.stringify({ channel: 1, isFirstCapture: 0}),
        credentials: 'include'
      }
    }
    let response = await fetch(getUrlForRequest('/api/scope/get-scope-data'), 
    requestOptions);
    let data = await response.json();
    voltagesCH2 = data["voltages"];
    if (times.length === 0) {
      times = data["times"];
    }
  } else {
    voltagesCH2 = [];
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

  const chartRef = useRef(null);
  const [verticalScale, setVerticalScale] = useState("1.0");
  const [horizontalScale, setHorizontalScale] = useState("1us");
  const [xCenterValue, setXCenterValue] = useState(300);
  const [yCenterValue, setYCenterValue] = useState(0.0);
  const [xInputMin, setXInputMin] = useState();
  const [yInputMin, setYInputMin] = useState();
  const [xInputMax, setXInputMax] = useState();
  const [yInputMax, setYInputMax] = useState();
  const [xStepSize, setXStepSize] = useState(1);
  const [yStepSize, setYStepSize] = useState(0.005);
  const [xScaleOptions, setXScaleOptions] = useState(
    { title: { display: true, text: "Time, us", color: "white" }, grid: { color: "#919492", }, ticks: { stepSize: xStepSize, color: "white" }, type: 'linear', min: 0, max: 600 }
  );
  const [yScaleOptions, setYScaleOptions] = useState(
    { title: { display: true, text: "Voltage, V", color: "white" }, grid: { color: "#919492", }, ticks: { stepSize: yStepSize, color: "white" }, min: -4.0, max: 4.0 }
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
        x: xScaleOptions,
        y: yScaleOptions
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

  // refresh chart points according to values from oscilloscope
  const refreshChartData = async () => {
    try {
      const data = await fetchChartData(isCH1Enabled, isCH2Enabled);
      setChartData(data);
      setIsFirstCapture(false);
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };

  // handler for 'Save Waveform' button
  const saveWaveform = () => {
    if (chartRef === null) {
      return;
    }
    let a = document.createElement('a');
    a.href = chartRef.current.toBase64Image();
    a.download = 'waveform.png';
    a.click();
};

  const renderScaleScroll = (scaleName) => {
    if (scaleName.toUpperCase() === "X") {
      if (xStepSize === 50) {
        return <div className="scope-scroll-slider-none"></div>;
      } else {
        return (
          <input className="scope-scroll-slider"
            type="range" 
            id={("xScaleRange")} 
            name={("xScaleRange")} 
            title='Use this slider to move through X-Scale (LEFT/RIGHT)'
            min={xInputMin} 
            step={xStepSize} 
            max={xInputMax}
            value={xCenterValue} 
            onChange={onXScaleInputChange} />);
      }
    }
    if (scaleName.toUpperCase() === "Y") {
      if (yStepSize === 1.0) {
        return <div className="scope-scroll-slider-none"></div>;
      } else {
        return (
          <input className="scope-scroll-slider"
            type="range" 
            id={("yScaleRange")} 
            name={("yScaleRange")} 
            title='Use this slider to move through Y-Scale (UP/DOWN)'
            min={yInputMin} 
            step={yStepSize} 
            max={yInputMax}
            value={yCenterValue} 
            onChange={onYScaleInputChange} />);
      }
    }
  }

  const onCH1CBChange = () => {
    setIsCH1Enabled(!isCH1Enabled);
  };

  const onCH2CBChange = () => {
    setIsCH2Enabled(!isCH2Enabled);
  };

  const onXScaleInputChange = e => {
    setXCenterValue(e.target.value);
    setXScaleOptions(
      { title: { display: true, text: "Time, us", color: "white" }, grid: { color: "#919492", }, ticks: { stepSize: xStepSize, color: "white" }, type: 'linear', beginAtZero: false, min: (Number(e.target.value) - 6 * xStepSize), max: (Number(e.target.value) + 6 * xStepSize) }
    );
    setChartOptions(
      {
        elements: { point: { radius: 0, } },
        animation: { duration: 100 },
        maintainAspectRatio: false,
        plugins: { legend: { labels: { color: "white" } } },
        scales: { 
          x: { title: { display: true, text: "Time, us", color: "white" }, grid: { color: "#919492", }, ticks: { stepSize: xStepSize, color: "white" }, type: 'linear', beginAtZero: false, min: (Number(e.target.value) - 6 * xStepSize), max: (Number(e.target.value) + 6 * xStepSize) },
          y: yScaleOptions
        },
      }
    );
  }

  const onYScaleInputChange = e => {
    setYCenterValue(e.target.value);
    setYScaleOptions(
      { title: { display: true, text: "Voltage, V", color: "white" }, grid: { color: "#919492", }, ticks: { stepSize: yStepSize, color: "white" }, min: (Number(e.target.value) - 5 * yStepSize), max: (Number(e.target.value) + 5 * yStepSize ) }
    );
    setChartOptions(
      {
        elements: { point: { radius: 0, } },
        animation: { duration: 100 },
        maintainAspectRatio: false,
        plugins: { legend: { labels: { color: "white" } } },
        scales: { 
          x: xScaleOptions,
          y: { title: { display: true, text: "Voltage, V", color: "white" }, grid: { color: "#919492", }, ticks: { stepSize: yStepSize, color: "white" }, min: (Number(e.target.value) - 5 * yStepSize), max: (Number(e.target.value) + 5 * yStepSize ) }
        },
      });
  }

  // handler for Y-scale change
  const onVerticalScaleValueChange = value => {
    setVerticalScale(value);
    switch (value) {
      case "5m":
        setYStepSize(0.005);
        setYCenterValue(0);
        setYInputMin(-3.975);
        setYInputMax(3.975);
        setYScaleOptions(
          { title: { display: true, text: "Voltage, V", color: "white" }, grid: { color: "#919492", }, ticks: { stepSize: 0.005, color: "white" }, min: -0.025, max: 0.025 }
        );
        setChartOptions(
          {
            elements: { point: { radius: 0, } },
            animation: { duration: 100 },
            maintainAspectRatio: false,
            plugins: { legend: { labels: { color: "white" } } },
            scales: { 
              x: xScaleOptions,
              y: { title: { display: true, text: "Voltage, V", color: "white" }, grid: { color: "#919492", }, ticks: { stepSize: 0.005, color: "white" }, min: -0.025, max: 0.025 }
            },
          }
        );
        break;
      case "10m":
        setYStepSize(0.01);
        setYCenterValue(0);
        setYInputMin(-3.95);
        setYInputMax(3.95);
        setYScaleOptions(
          { title: { display: true, text: "Voltage, V", color: "white" }, grid: { color: "#919492", }, ticks: { stepSize: 0.01, color: "white" }, min: -0.05, max: 0.05 }
        );
        setChartOptions(
          {
            elements: { point: { radius: 0, } },
            animation: { duration: 100 },
            maintainAspectRatio: false,
            plugins: { legend: { labels: { color: "white" } } },
            scales: { 
              x: xScaleOptions,
              y: { title: { display: true, text: "Voltage, V", color: "white" }, grid: { color: "#919492", }, ticks: { stepSize: 0.01, color: "white" }, min: -0.05, max: 0.05 }
            },
          }
        );
        break;
      case "20m":
        setYStepSize(0.02);
        setYCenterValue(0);
        setYInputMin(-3.9);
        setYInputMax(3.9);
        setYScaleOptions(
          { title: { display: true, text: "Voltage, V", color: "white" }, grid: { color: "#919492", }, ticks: { stepSize: 0.02, color: "white" }, min: -0.1, max: 0.1 }
        );
        setChartOptions(
          {
            elements: { point: { radius: 0, } },
            animation: { duration: 100 },
            maintainAspectRatio: false,
            plugins: { legend: { labels: { color: "white" } } },
            scales: { 
              x: xScaleOptions,
              y: { title: { display: true, text: "Voltage, V", color: "white" }, grid: { color: "#919492", }, ticks: { stepSize: 0.02, color: "white" }, min: -0.1, max: 0.1 }
            },
          }
        );
        break;  
      case "50m":
        setYStepSize(0.05);
        setYCenterValue(0);
        setYInputMin(-3.75);
        setYInputMax(3.75);
        setYScaleOptions(
          { title: { display: true, text: "Voltage, V", color: "white" }, grid: { color: "#919492", }, ticks: { stepSize: 0.05, color: "white" }, min: -0.25, max: 0.25 }
        );
        setChartOptions(
          {
            elements: { point: { radius: 0, } },
            animation: { duration: 100 },
            maintainAspectRatio: false,
            plugins: { legend: { labels: { color: "white" } } },
            scales: { 
              x: xScaleOptions,
              y: { title: { display: true, text: "Voltage, V", color: "white" }, grid: { color: "#919492", }, ticks: { stepSize: 0.05, color: "white" }, min: -0.25, max: 0.25 }
            },
          }
        );
        break;
      case "0.1":
        setYStepSize(0.1);
        setYCenterValue(0);
        setYInputMin(-3.5);
        setYInputMax(3.5);
        setYScaleOptions(
          { title: { display: true, text: "Voltage, V", color: "white" }, grid: { color: "#919492", }, ticks: { stepSize: 0.1, color: "white" }, min: -0.5, max: 0.5 }
        );
        setChartOptions(
          {
            elements: { point: { radius: 0, } },
            animation: { duration: 100 },
            maintainAspectRatio: false,
            plugins: { legend: { labels: { color: "white" } } },
            scales: { 
              x: xScaleOptions,
              y: { title: { display: true, text: "Voltage, V", color: "white" }, grid: { color: "#919492", }, ticks: { stepSize: 0.1, color: "white" }, min: -0.5, max: 0.5 }
            },
          }
        );
        break;
      case "0.2":
        setYStepSize(0.2);
        setYCenterValue(0);
        setYInputMin(-3.0);
        setYInputMax(3.0);
        setYScaleOptions(
          { title: { display: true, text: "Voltage, V", color: "white" }, grid: { color: "#919492", }, ticks: { stepSize: 0.2, color: "white" }, min: -1.0, max: 1.0 }
        );
        setChartOptions(
          {
            elements: { point: { radius: 0, } },
            animation: { duration: 100 },
            maintainAspectRatio: false,
            plugins: { legend: { labels: { color: "white" } } },
            scales: { 
              x: xScaleOptions,
              y: { title: { display: true, text: "Voltage, V", color: "white" }, grid: { color: "#919492", }, ticks: { stepSize: 0.2, color: "white" }, min: -1.0, max: 1.0 }
            },
          }
        );
        break;
      case "0.5":
        setYStepSize(0.5);
        setYCenterValue(0);
        setYInputMin(-1.5);
        setYInputMax(1.5);
        setYScaleOptions(
          { title: { display: true, text: "Voltage, V", color: "white" }, grid: { color: "#919492", }, ticks: { stepSize: 0.5, color: "white" }, min: -2.5, max: 2.5 }
        );
        setChartOptions(
          {
            elements: { point: { radius: 0, } },
            animation: { duration: 100 },
            maintainAspectRatio: false,
            plugins: { legend: { labels: { color: "white" } } },
            scales: { 
              x: xScaleOptions,
              y: { title: { display: true, text: "Voltage, V", color: "white" }, grid: { color: "#919492", }, ticks: { stepSize: 0.5, color: "white" }, min: -2.5, max: 2.5 }
            },
          }
        );
        break;
      case "1.0":
        setYStepSize(1.0);
        setYScaleOptions(
          { title: { display: true, text: "Voltage, V", color: "white" }, grid: { color: "#919492", }, ticks: { stepSize: 1.0, color: "white" }, min: -4.0, max: 4.0 }
        );
        setChartOptions(
          {
            elements: { point: { radius: 0, } },
            animation: { duration: 100 },
            maintainAspectRatio: false,
            plugins: { legend: { labels: { color: "white" } } },
            scales: { 
              x: xScaleOptions,
              y: { title: { display: true, text: "Voltage, V", color: "white" }, grid: { color: "#919492", }, ticks: { stepSize: 1.0, color: "white" }, min: -4.0, max: 4.0 }
            },
          }
        );
        break;
      default:
        setYStepSize(yStepSize);
        setYScaleOptions(yScaleOptions);
        setChartOptions(chartOptions);
    }
  };

  // handler for X-scale change
  const onHorizontalScaleValueChange = value => {
    setHorizontalScale(value);
    console.log(value);
    switch (value) {
      case "1us":
        setXStepSize(1);
        setXCenterValue(300);
        setXInputMin(6);
        setXInputMax(594);
        setXScaleOptions(
          { title: { display: true, text: "Time, us", color: "white" }, grid: { color: "#919492", }, ticks: { stepSize: 1, color: "white" }, type: 'linear', beginAtZero: false, min: 294, max: 306 }
        );
        setChartOptions(
          {
            elements: { point: { radius: 0, } },
            animation: { duration: 100 },
            maintainAspectRatio: false,
            plugins: { legend: { labels: { color: "white" } } },
            scales: { 
              x: { title: { display: true, text: "Time, us", color: "white" }, grid: { color: "#919492", }, ticks: { stepSize: 1, color: "white" }, type: 'linear', beginAtZero: false, min: 294, max: 306 },
              y: yScaleOptions
            },
          }
        );
        break;
      case "10us":
        setXStepSize(10);
        setXCenterValue(300);
        setXInputMin(60);
        setXInputMax(540);
        setXScaleOptions(
          { title: { display: true, text: "Time, us", color: "white" }, grid: { color: "#919492", }, ticks: { stepSize: 10, color: "white" }, type: 'linear', beginAtZero: false, min: 240, max: 360 }
        );
        setChartOptions(
          {
            elements: { point: { radius: 0, } },
            animation: { duration: 100 },
            maintainAspectRatio: false,
            plugins: { legend: { labels: { color: "white" } } },
            scales: { 
              x: { title: { display: true, text: "Time, us", color: "white" }, grid: { color: "#919492", }, ticks: { stepSize: 10, color: "white" }, type: 'linear', beginAtZero: false, min: 240, max: 360 },
              y: yScaleOptions
            },
          }
        );
        break;
      case "50us":
        setXStepSize(50);
        setXScaleOptions(
          { title: { display: true, text: "Time, us", color: "white" }, grid: { color: "#919492", }, ticks: { stepSize: 50, color: "white" }, type: 'linear', beginAtZero: true, min: 0, max: 600 }
        );
        setChartOptions(
          {
            elements: { point: { radius: 0, } },
            animation: { duration: 100 },
            maintainAspectRatio: false,
            plugins: { legend: { labels: { color: "white" } } },
            scales: { 
              x: { title: { display: true, text: "Time, us", color: "white" }, grid: { color: "#919492", }, ticks: { stepSize: 50, color: "white" }, type: 'linear', beginAtZero: false, min: 0, max: 600 },
              y: yScaleOptions
            },
          }
        );
        break;
      case "20us":
        setXStepSize(20);
        setXCenterValue(300);
        setXInputMin(120);
        setXInputMax(480);
        setXScaleOptions(
          { title: { display: true, text: "Time, us", color: "white" }, grid: { color: "#919492", }, ticks: { stepSize: 20, color: "white" }, type: 'linear', beginAtZero: false, min: 170, max: 410 }
        );
        setChartOptions(
          {
            elements: { point: { radius: 0, } },
            animation: { duration: 100 },
            maintainAspectRatio: false,
            plugins: { legend: { labels: { color: "white" } } },
            scales: { 
              x: { title: { display: true, text: "Time, us", color: "white" }, grid: { color: "#919492", }, ticks: { stepSize: 20, color: "white" }, type: 'linear', beginAtZero: false, min: 170, max: 410 },
              y: yScaleOptions
            },
          }
        );
        break;
      default:
        setXStepSize(xStepSize);
        setXScaleOptions(xScaleOptions);
        setChartOptions(chartOptions);
    }
  };

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
        <div className="row">
          <div className="chart">                    
            <Line type="line" 
            data={chartData} 
            options={chartOptions} 
            ref={chartRef}/>
          </div>
        </div>
        <div className="row m-1">
          <div className="col-6">
            <button className="btn btn-md btn-primary m-2" 
            onClick={changeButton}>{buttonName + " Scope "}</button>
          </div>
          <div className="col-6">
            <button className="btn btn-md btn-primary m-2" 
            onClick={saveWaveform}>Save Chart</button>
          </div>
        </div>
        <div className="row m-1">
          <div className="col m-1 px-1 border-spec">
            <label>Y-Scale</label><br/>
            <label className="round-sliders-label mcu-lab-background-special">
              {verticalScale}V/div</label>
              <div className="round-slider-wrapper">
                <div className="round-slider-vertical-scale-image">
                  <CircularSlider
                    hideLabelValue  
                    data={["5m", "10m", "20m", "50m", "0.1", "0.2", "0.5", "1.0"]}
                    dataIndex={7} 
                    width={115}
                    trackColor="#ffffff"
                    onChange={onVerticalScaleValueChange}/>           
                </div>
              </div>
              {renderScaleScroll("Y")}
          </div>
          <div className="col m-1 px-1 border-spec">
            <label>X-Scale</label><br/>
            <label className="round-sliders-label mcu-lab-background-special">
              {horizontalScale}/div</label>
              <div className="round-slider-wrapper">
                <div className="round-slider-horizontal-scale-image">
                  <CircularSlider
                    hideLabelValue  
                    data={["1us", "10us", "20us", "50us"]} 
                    width={115}
                    trackColor="#ffffff"
                    onChange={onHorizontalScaleValueChange}/>
                </div>
              </div>
              {renderScaleScroll("X")}
            </div>
        </div>
      </div>
  )
}
export default ScopeChart;