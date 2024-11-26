import { getUrlForRequest } from './utils/get-url-for-request';
import { Line } from 'react-chartjs-2';
import { useState } from 'react';
import './styles/Scope.css';
import { Chart as ChartJS } from 'chart.js/auto';

const fetchChartData = async () => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }
  const response = await fetch(getUrlForRequest('/api/scope/get-scope-data'), requestOptions);
  const data = await response.json();
  console.log(data);
  return {
    label: data && data.map((item) => item.time),
    datasets: [
      {
        data: data.map((item) => item.voltage),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0"
        ],
        borderColor: "black",
        borderWidth: 2
      }
    ]
  }
}

function ScopeChart() {

  const [chartData, setChartData] = useState({
    
      labels: [],
      datasets: [
      {
        label: "Users Gained",
        data: [],
        backgroundColor: [],
        borderColor: "black",
        borderWidth: 2
      }
    ]
  });

  const refreshChartData = async () => {
    try {
      const data = await fetchChartData();
      setChartData(data);
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };

  return (
      <div>
          <div className="chart">
              <Line data={chartData}/>
          </div>
          <button onClick={refreshChartData}>Refresh chart</button>
      </div>
  )
}
export default ScopeChart;