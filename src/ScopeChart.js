import { getUrlForRequest } from './utils/get-url-for-request';
import { Line } from 'react-chartjs-2';
import { useState } from 'react';
import './styles/Scope.css';
import { Chart as ChartJS } from 'chart.js/auto';

const fetchChartData = async (isFirstCapture) => {
  let requestOptions;
  if (isFirstCapture) {
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
  const response = await fetch(getUrlForRequest('/api/scope/get-scope-data'), requestOptions);
  const data = await response.json();
  let voltages = data["voltages"];
  let times = data["times"];
  //console.log(voltages);
  //console.log(times);  
  return {
    labels: times,
    datasets: [
      {
        label: "CH1",
        data: voltages,
        borderColor: "yellow",
        borderWidth: 2
      }
    ]
  }
}

function ScopeChart() {

  const [buttonName, setButtonName] = useState("Run");
  const [isRun, setIsRun] = useState(false);
  const [isFirstCapture, setIsFirstCapture] = useState(true);
  const [intervalID, setIntervalID] = useState();
  const [chartOptions, setChartOptions] = useState(
    {
      animation: {
        duration: 100
      },
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: "yellow",
          }
        }
      },
      scales: {
        x: {
          grid: {
            color: "#919492",
          },
          ticks: {
            stepSize: 50,
            color: "white"
          },
          min: 0,
          max: 600
        },
        y: {
          grid: {
            color: "#919492",
          },
          ticks: {
            stepSize: 1.0,
            color: "white"
          },
          min: -5.0,
          max: 5.0
        }
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
        borderWidth: 2
      }
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
      setIntervalID(setInterval(() => refreshChartData(), 400));
    }
  };

  const refreshChartData = async () => {
    
    try {
      const data = await fetchChartData(isFirstCapture);
      setChartData(data);
      setIsFirstCapture(false);
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };

  return (
      <div>
          <div className="chart">
              <Line type="line" data={chartData} options={chartOptions}/>
          </div>
          
          <div className="btn btn-primary" onClick={changeButton}>{buttonName}</div>
      </div>
  )
}
export default ScopeChart;