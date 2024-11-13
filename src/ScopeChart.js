import { Bar } from 'react-chartjs-2';
import './styles/Scope.css';
import { Chart as ChartJS } from 'chart.js/auto';

const data = {
    labels: ["1", "2", "3"],
    datasets: [
        {
            label: "Values",
            data: [39, 40, 21],
            backgroundColor: ["#45f45f", "#aaaaaa", "#ffffff"],
            borderColor: "#f44336",
            borderWidth: 1,
        },
    ],
};

function ScopeChart() {
    return (
        <div>
            <div className="logic-analyzer-diagram">
                <Bar data={data}/>
            </div>
        </div>
    )
}
export default ScopeChart;