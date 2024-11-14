import { Line } from 'react-chartjs-2';
import './styles/LogicAnalyzer.css';
import { Chart as ChartJS } from 'chart.js/auto';

const data = {
    labels: ["1", "2", "3"],
    datasets: [
        {
            label: "Values",
            data: [50, 45, 5],
            backgroundColor: ["#45f45f", "#aaaaaa", "#ffffff"],
            borderColor: "#f44336",
            borderWidth: 1,
        },
    ],
};

function LogicAnalyzerTimingDiagram() {
    return (
        <div>
            <div className="chart"> 
                <Line data={data}/>
            </div>
        </div>
    )
}
export default LogicAnalyzerTimingDiagram;