import { Line } from 'react-chartjs-2';
import './styles/Scope.css';
import { Chart as ChartJS } from 'chart.js/auto';

const data = {

        labels: [0, 10, 15, 20],
        datasets: [
          {
            type: 'line',
            label: 'CH1',
            data: [4.1, 3.0, 2.9, 4.2],
          },
        ],
        options: {
            elements: {
                point: {
                    radius: 0,
                },
            },
  
        maintainAspectRatio: false,
        responsive: true,
  
        scales: {
          x: {
            title: {
              display: true,
              text: 'Time, us',
              color: '#3062b3',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Voltage, V',
              color: '#911',
            },
          },
          
        },
  
        datasets: {
          line: {
            animation: {
              duration: 0,
            },
          },
        },
      },
};

function ScopeChart() {
    return (
        <div>
            <div className="chart">
                <Line data={data}/>
            </div>
        </div>
    )
}
export default ScopeChart;