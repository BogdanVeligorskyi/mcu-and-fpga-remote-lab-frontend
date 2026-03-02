import { Chart } from 'chart.js/auto';
import CircularSlider from "@fseehawer/react-circular-slider";
import { Line } from 'react-chartjs-2';
import { useRef, useState } from 'react';
import './styles/LogicAnalyzer.css';


Chart.register({
  id: 'someBackgroundForLogicAnalyzer',
  beforeDraw: (chartRef, args, opts) => {
    const context = chartRef.canvas.getContext('2d');
    if (!context) {
      return;
    }
    // context.save();
    // context.globalCompositeOperation = 'destination-over';
    // context.fillStyle = 'white';
    // context.fillRect(0, 0, chartRef.width, chartRef.height);
    // context.restore();
  },
});

function LogicAnalyzer({tokenId, deviceType}) {

    let voltagesCH0 = [];
    let voltagesCH1 = [];
    let voltagesCH2 = [];
    let voltagesCH3 = [];
    let voltagesCH4 = [];
    let voltagesCH5 = [];
    let voltagesCH6 = [];
    let voltagesCH7 = [];
    let voltagesCH8 = [];
    let voltagesCH9 = [];
    let voltagesCH10 = [];
    let voltagesCH11 = [];
    let voltagesCH12 = [];
    let voltagesCH13 = [];
    let voltagesCH14 = [];
    let voltagesCH15 = [];
    let times = [];
    let currentIteration = 0;

    const chartRef = useRef(null);
    const [ch0, setCh0] = useState(false);
    const [ch1, setCh1] = useState(false);
    const [ch2, setCh2] = useState(false);
    const [ch3, setCh3] = useState(false);
    const [ch4, setCh4] = useState(false);
    const [ch5, setCh5] = useState(false);
    const [ch6, setCh6] = useState(false);
    const [ch7, setCh7] = useState(false);
    const [ch8, setCh8] = useState(false);
    const [ch9, setCh9] = useState(false);
    const [ch10, setCh10] = useState(false);
    const [ch11, setCh11] = useState(false);
    const [ch12, setCh12] = useState(false);
    const [ch13, setCh13] = useState(false);
    const [ch14, setCh14] = useState(false);
    const [ch15, setCh15] = useState(false);
    const [triggerType, setTriggerType] = useState("fall-edge");
    const [isRun, setIsRun] = useState(false);
    const [isRecordRun, setIsRecordRun] = useState(false);
    const [isFirstCapture, setIsFirstCapture] = useState(true);
    const [intervalID, setIntervalID] = useState();
    // const [intervalIDRecord, setIntervalIDRecord] = useState();
    const [defaultMode, setDefaultMode] = useState("live-data");
    const [xInputMin, setXInputMin] = useState(294);
    const [xInputMax, setXInputMax] = useState(306);
    const [xCenterValue, setXCenterValue] = useState(300);

    const [list, setList] = useState([]);
    const [listTimeout, setListTimeout] = useState(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
    ]);
    
    const [selectedChannel, setSelectedChannel] = useState("");
    const [selectedTimeout, setSelectedTimeout] = useState(1);

    const addNewElemToList = (newListElem) => {
      let temp = [...list, newListElem];
      temp.sort();
      setList(temp);
    }

    const removeElemFromList = (channelName) => {
      let arr = [...list];
      var index = arr.indexOf(channelName);
      if (index !== -1) {
        arr.splice(index, 1);
        setList(arr);
      }
    }

    const onTriggerTypeChange = e => {
      setTriggerType(e.target.value);
    }

    const onChannel0Change = () => {
      setCh0(!ch0);  
      if (!ch0) {
        addNewElemToList("CH0");       
      } else {
        removeElemFromList("CH0");
      }
    }

    const onChannel1Change = () => {
      setCh1(!ch1);
      if (!ch1) {
        addNewElemToList("CH1");       
      } else {
        removeElemFromList("CH1");
      }
    }

    const onChannel2Change = () => {
      setCh2(!ch2);
      if (!ch2) {
        addNewElemToList("CH2");       
      } else {
        removeElemFromList("CH2");
      }
    }

    const onChannel3Change = () => {
        setCh3(!ch3);
        if (!ch3) {
            addNewElemToList("CH3");       
        } else {
            removeElemFromList("CH3");
        }
    }

    const onChannel4Change = () => {
        setCh4(!ch4);
        if (!ch4) {
            addNewElemToList("CH4");       
        } else {
            removeElemFromList("CH4");
        }
    }

    const onChannel5Change = () => {
        setCh5(!ch5);
        if (!ch5) {
            addNewElemToList("CH5");       
        } else {
            removeElemFromList("CH5");
        }
    }

    const onChannel6Change = () => {
        setCh6(!ch6);
        if (!ch6) {
            addNewElemToList("CH6");       
        } else {
            removeElemFromList("CH6");
        }
    }

    const onChannel7Change = () => {
        setCh7(!ch7);
        if (!ch7) {
            addNewElemToList("CH7");       
        } else {
            removeElemFromList("CH7");
        }
    }

    const onChannel8Change = () => {
        setCh8(!ch8);
        if (!ch8) {
            addNewElemToList("CH8");       
        } else {
            removeElemFromList("CH8");
        }
    }

    const onChannel9Change = () => {
        setCh9(!ch9);
        if (!ch9) {
            addNewElemToList("CH9");       
        } else {
            removeElemFromList("CH9");
        }
    }

    const onChannel10Change = () => {
        setCh10(!ch10);
        if (!ch10) {
            addNewElemToList("CH10");       
        } else {
            removeElemFromList("CH10");
        }
    }

    const onChannel11Change = () => {
        setCh11(!ch11);
        if (!ch11) {
            addNewElemToList("CH11");       
        } else {
            removeElemFromList("CH11");
        }
    }

    const onChannel12Change = () => {
        setCh12(!ch12);
        if (!ch12) {
            addNewElemToList("CH12");       
        } else {
            removeElemFromList("CH12");
        }
    }

    const onChannel13Change = () => {
        setCh13(!ch13);
        if (!ch13) {
            addNewElemToList("CH13");       
        } else {
            removeElemFromList("CH13");
        }
    }

    const onChannel14Change = () => {
        setCh14(!ch14);
        if (!ch14) {
            addNewElemToList("CH14");       
        } else {
            removeElemFromList("CH14");
        }
    }

    const onChannel15Change = () => {
      setCh15(!ch15);
      if (!ch15) {
        addNewElemToList("CH15");       
      } else {
        removeElemFromList("CH15");
      }
    }

    const fetchChartRecordData = async (ch0, ch1, ch2, ch3, ch4, ch5, ch6, ch7,
      ch8, ch9, ch10, ch11, ch12, ch13, ch14, ch15) => {
        if (process.env.REACT_APP_IS_FRONTEND_DEV_MODE.toUpperCase() === "TRUE") {
          console.log("in here");
          for (let i = currentIteration * 1000000; i < ((currentIteration + 1) * 1000000); i++) {
            if (ch0) {
              voltagesCH0[i] = Math.floor(Math.random() * 2.0);
            }
            if (ch1) {
              voltagesCH1[i] = Math.floor(Math.random() * 2.0);
            }
            if (ch2) {
              voltagesCH2[i] = Math.floor(Math.random() * 2.0);
            }
            if (ch3) {
              voltagesCH3[i] = Math.floor(Math.random() * 2.0);
            }
            if (ch4) {
              voltagesCH4[i] = Math.floor(Math.random() * 2.0);
            }
            if (ch5) {
              voltagesCH5[i] = Math.floor(Math.random() * 2.0);
            }
            if (ch6) {
              voltagesCH6[i] = Math.floor(Math.random() * 2.0);
            }
            if (ch7) {
              voltagesCH7[i] = Math.floor(Math.random() * 2.0);
            }
            if (ch8) {
              voltagesCH8[i] = Math.floor(Math.random() * 2.0);
            }
            if (ch9) {
              voltagesCH9[i] = Math.floor(Math.random() * 2.0);
            }
            if (ch10) {
              voltagesCH10[i] = Math.floor(Math.random() * 2.0);
            }
            if (ch11) {
              voltagesCH11[i] = Math.floor(Math.random() * 2.0);
            }
            if (ch12) {
              voltagesCH12[i] = Math.floor(Math.random() * 2.0);
            }
            if (ch13) {
              voltagesCH13[i] = Math.floor(Math.random() * 2.0);
            }
            if (ch14) {
              voltagesCH14[i] = Math.floor(Math.random() * 2.0);
            }
            if (ch15) {
              voltagesCH15[i] = Math.floor(Math.random() * 2.0);
            }
            
            times[i] = i+1;
          }
          setChartData0({
              labels: times,
              datasets: [
              {
                label: "CH0",
                data: voltagesCH0,
                borderColor: "yellow",
                borderWidth: 1,
                stepped: true
              }
            ]
          });
          setChartData1({
              labels: times,
              datasets: [
              {
                label: "CH1",
                data: voltagesCH1,
                borderColor: "#0d99d1",
                borderWidth: 1,
                stepped: true
              }
            ]
          });
          setChartData2({
              labels: times,
              datasets: [
              {
                label: "CH2",
                data: voltagesCH2,
                borderColor: "green",
                borderWidth: 1,
                stepped: true
              }
            ]
          });
          setChartData3({
              labels: times,
              datasets: [
              {
                label: "CH3",
                data: voltagesCH3,
                borderColor: "red",
                borderWidth: 1,
                stepped: true
              }
            ]
          });
          setChartData4(
              {
              labels: times,
              datasets: [
              {
                label: "CH4",
                data: voltagesCH4,
                borderColor: "orange",
                borderWidth: 1,
                stepped: true
              }
            ]
          }
          );
          setChartData5({
              labels: times,
              datasets: [
              {
                label: "CH5",
                data: voltagesCH5,
                borderColor: "pink",
                borderWidth: 1,
                stepped: true
              }
            ]
          });
          setChartData6({
              labels: times,
              datasets: [
              {
                label: "CH6",
                data: voltagesCH6,
                borderColor: "brown",
                borderWidth: 1,
                stepped: true
              }
            ]
          });
          setChartData7({
              labels: times,
              datasets: [
              {
                label: "CH7",
                data: voltagesCH7,
                borderColor: "purple",
                borderWidth: 1,
                stepped: true
              }
            ]
          });
          setChartData8({
              labels: times,
              datasets: [
              {
                label: "CH8",
                data: voltagesCH8,
                borderColor: "#917833",
                borderWidth: 1,
                stepped: true
              }
            ]
          });
          setChartData9({
              labels: times,
              datasets: [
              {
                label: "CH9",
                data: voltagesCH9,
                borderColor: "#5110e8",
                borderWidth: 1,
                stepped: true
              }
            ]
          });
          setChartData10({
              labels: times,
              datasets: [
              {
                label: "CH10",
                data: voltagesCH10,
                borderColor: "#f2070b",
                borderWidth: 1,
                stepped: true
              }
            ]
          });
          setChartData11({
              labels: times,
              datasets: [
              {
                label: "CH11",
                data: voltagesCH11,
                borderColor: "#d9c80f",
                borderWidth: 1,
                stepped: true
              }
            ]
          });
          setChartData12({
              labels: times,
              datasets: [
              {
                label: "CH12",
                data: voltagesCH12,
                borderColor: "#797adb",
                borderWidth: 1,
                stepped: true
              }
            ]
          });
          setChartData13({
              labels: times,
              datasets: [
              {
                label: "CH13",
                data: voltagesCH13,
                borderColor: "#32d4ed",
                borderWidth: 1,
                stepped: true
              }
            ]
          });
          setChartData14({
              labels: times,
              datasets: [
              {
                label: "CH14",
                data: voltagesCH14,
                borderColor: "#c77130",
                borderWidth: 1,
                stepped: true
              }
            ]
          });
          setChartData15({
              labels: times,
              datasets: [
              {
                label: "CH15",
                data: voltagesCH15,
                borderColor: "#47dec2",
                borderWidth: 1,
                stepped: true
              }
            ]
          });
        
        currentIteration++;
        
    }
  }

    // fetch voltage values from backend
    const fetchChartData = async (ch0, ch1, ch2, ch3, ch4, ch5, ch6, ch7,
        ch8, ch9, ch10, ch11, ch12, ch13, ch14, ch15) => {
    
      let requestOptions;
    
      console.log("fetchChartData");

      // offline mode
      if (process.env.REACT_APP_IS_FRONTEND_DEV_MODE.toUpperCase() === "TRUE") {
        console.log("in here");
        for (let i = 0; i < 600; i++) {
          if (ch0) {
            voltagesCH0[i] = Math.floor(Math.random() * 2.0);
          }
          if (ch1) {
            voltagesCH1[i] = Math.floor(Math.random() * 2.0);
          }
          if (ch2) {
            voltagesCH2[i] = Math.floor(Math.random() * 2.0);
          }
          if (ch3) {
            voltagesCH3[i] = Math.floor(Math.random() * 2.0);
          }
          if (ch4) {
            voltagesCH4[i] = Math.floor(Math.random() * 2.0);
          }
          if (ch5) {
            voltagesCH5[i] = Math.floor(Math.random() * 2.0);
          }
          if (ch6) {
            voltagesCH6[i] = Math.floor(Math.random() * 2.0);
          }
          if (ch7) {
            voltagesCH7[i] = Math.floor(Math.random() * 2.0);
          }
          if (ch8) {
            voltagesCH8[i] = Math.floor(Math.random() * 2.0);
          }
          if (ch9) {
            voltagesCH9[i] = Math.floor(Math.random() * 2.0);
          }
          if (ch10) {
            voltagesCH10[i] = Math.floor(Math.random() * 2.0);
          }
          if (ch11) {
            voltagesCH11[i] = Math.floor(Math.random() * 2.0);
          }
          if (ch12) {
            voltagesCH12[i] = Math.floor(Math.random() * 2.0);
          }
          if (ch13) {
            voltagesCH13[i] = Math.floor(Math.random() * 2.0);
          }
          if (ch14) {
            voltagesCH14[i] = Math.floor(Math.random() * 2.0);
          }
          if (ch15) {
            voltagesCH15[i] = Math.floor(Math.random() * 2.0);
          }
          
          times[i] = i+1;
        }
        setChartData0({
            labels: times,
            datasets: [
            {
              label: "CH0",
              data: voltagesCH0,
              borderColor: "yellow",
              borderWidth: 1,
              stepped: true
            }
          ]
        });
        setChartData1({
            labels: times,
            datasets: [
            {
              label: "CH1",
              data: voltagesCH1,
              borderColor: "#0d99d1",
              borderWidth: 1,
              stepped: true
            }
          ]
        });
        setChartData2({
            labels: times,
            datasets: [
            {
              label: "CH2",
              data: voltagesCH2,
              borderColor: "green",
              borderWidth: 1,
              stepped: true
            }
          ]
        });
        setChartData3({
            labels: times,
            datasets: [
            {
              label: "CH3",
              data: voltagesCH3,
              borderColor: "red",
              borderWidth: 1,
              stepped: true
            }
          ]
        });
        setChartData4(
            {
            labels: times,
            datasets: [
            {
              label: "CH4",
              data: voltagesCH4,
              borderColor: "orange",
              borderWidth: 1,
              stepped: true
            }
          ]
        }
        );
        setChartData5({
            labels: times,
            datasets: [
            {
              label: "CH5",
              data: voltagesCH5,
              borderColor: "pink",
              borderWidth: 1,
              stepped: true
            }
          ]
        });
        setChartData6({
            labels: times,
            datasets: [
            {
              label: "CH6",
              data: voltagesCH6,
              borderColor: "brown",
              borderWidth: 1,
              stepped: true
            }
          ]
        });
        setChartData7({
            labels: times,
            datasets: [
            {
              label: "CH7",
              data: voltagesCH7,
              borderColor: "purple",
              borderWidth: 1,
              stepped: true
            }
          ]
        });
        setChartData8({
            labels: times,
            datasets: [
            {
              label: "CH8",
              data: voltagesCH8,
              borderColor: "#917833",
              borderWidth: 1,
              stepped: true
            }
          ]
        });
        setChartData9({
            labels: times,
            datasets: [
            {
              label: "CH9",
              data: voltagesCH9,
              borderColor: "#5110e8",
              borderWidth: 1,
              stepped: true
            }
          ]
        });
        setChartData10({
            labels: times,
            datasets: [
            {
              label: "CH10",
              data: voltagesCH10,
              borderColor: "#f2070b",
              borderWidth: 1,
              stepped: true
            }
          ]
        });
        setChartData11({
            labels: times,
            datasets: [
            {
              label: "CH11",
              data: voltagesCH11,
              borderColor: "#d9c80f",
              borderWidth: 1,
              stepped: true
            }
          ]
        });
        setChartData12({
            labels: times,
            datasets: [
            {
              label: "CH12",
              data: voltagesCH12,
              borderColor: "#797adb",
              borderWidth: 1,
              stepped: true
            }
          ]
        });
        setChartData13({
            labels: times,
            datasets: [
            {
              label: "CH13",
              data: voltagesCH13,
              borderColor: "#32d4ed",
              borderWidth: 1,
              stepped: true
            }
          ]
        });
        setChartData14({
            labels: times,
            datasets: [
            {
              label: "CH14",
              data: voltagesCH14,
              borderColor: "#c77130",
              borderWidth: 1,
              stepped: true
            }
          ]
        });
        setChartData15({
            labels: times,
            datasets: [
            {
              label: "CH15",
              data: voltagesCH15,
              borderColor: "#47dec2",
              borderWidth: 1,
              stepped: true
            }
          ]
        });
        // online mode
      } else {
    
      // fetch data for channel 1
      /*if (isCH1Enabled) {
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
      }*/
    }
    }

    const renderChart0 = (ch0) => {
        if (ch0) {
            return <div className="row"><div className="chart-logic-analyzer">                    
            <Line type="line" 
                data={chartData0} 
                options={chartOptions} 
                ref={chartRef}/>
                    </div>
                    </div>
    }
    }
    const renderChart1 = (ch1) => {
        if (ch1) {
            return <div className="row"><div className="chart-logic-analyzer">                    
            <Line type="line" 
                data={chartData1} 
                options={chartOptions} 
                ref={chartRef}/>
                    </div>
                    </div>
    }
    }

    const renderChart2 = (ch2) => {
        if (ch2) {
            return <div className="row"><div className="chart-logic-analyzer">                    
            <Line type="line" 
                data={chartData2} 
                options={chartOptions} 
                ref={chartRef}/>
                    </div>
                    </div>
    }
    }

    const renderChart3 = (ch3) => {
        if (ch3) {
            return <div className="row"><div className="chart-logic-analyzer">                    
            <Line type="line" 
                data={chartData3} 
                options={chartOptions} 
                ref={chartRef}/>
                    </div>
                    </div>
    }
    }

    const renderChart4 = (ch4) => {
        if (ch4) {
            return <div className="row"><div className="chart-logic-analyzer">                    
            <Line type="line" 
                data={chartData4} 
                options={chartOptions} 
                ref={chartRef}/>
                    </div>
                    </div>
    }
    }

    const renderChart5 = (ch5) => {
        if (ch5) {
            return <div className="row"><div className="chart-logic-analyzer">                    
            <Line type="line" 
                data={chartData5} 
                options={chartOptions} 
                ref={chartRef}/>
                    </div>
                    </div>
    }
    }

    const renderChart6 = (ch6) => {
        if (ch6) {
            return <div className="row"><div className="chart-logic-analyzer">                    
            <Line type="line" 
                data={chartData6} 
                options={chartOptions} 
                ref={chartRef}/>
                    </div>
                    </div>
    }
    }

    const renderChart7 = (ch7) => {
        if (ch7) {
            return <div className="row"><div className="chart-logic-analyzer">                    
            <Line type="line" 
                data={chartData7} 
                options={chartOptions} 
                ref={chartRef}/>
                    </div>
                    </div>
    }
    }

    const renderChart8 = (ch8) => {
        if (ch8) {
            return <div className="row"><div className="chart-logic-analyzer">                    
            <Line type="line" 
                data={chartData8} 
                options={chartOptions} 
                ref={chartRef}/>
                    </div>
                    </div>
    }
    }


    const renderChart9 = (ch9) => {
        if (ch9) {
            return <div className="row"><div className="chart-logic-analyzer">                    
            <Line type="line" 
                data={chartData9} 
                options={chartOptions} 
                ref={chartRef}/>
                    </div>
                    </div>
    }
    }

    const renderChart10 = (ch10) => {
        if (ch10) {
            return <div className="row"><div className="chart-logic-analyzer">                    
            <Line type="line" 
                data={chartData10} 
                options={chartOptions} 
                ref={chartRef}/>
                    </div>
                    </div>
    }
    }

    const renderChart11 = (ch11) => {
        if (ch11) {
            return <div className="row"><div className="chart-logic-analyzer">                    
            <Line type="line" 
                data={chartData11} 
                options={chartOptions} 
                ref={chartRef}/>
                    </div>
                    </div>
    }
    }

    const renderChart12 = (ch12) => {
        if (ch12) {
            return <div className="row"><div className="chart-logic-analyzer">                    
            <Line type="line" 
                data={chartData12} 
                options={chartOptions} 
                ref={chartRef}/>
                    </div>
                    </div>
    }
    }

    const renderChart13 = (ch13) => {
        if (ch13) {
            return <div className="row"><div className="chart-logic-analyzer">                    
            <Line type="line" 
                data={chartData13} 
                options={chartOptions} 
                ref={chartRef}/>
                    </div>
                    </div>
    }
    }

    const renderChart14 = (ch14) => {
        if (ch14) {
            return <div className="row"><div className="chart-logic-analyzer">                    
            <Line type="line" 
                data={chartData14} 
                options={chartOptions} 
                ref={chartRef}/>
                    </div>
                    </div>
    }
    }

    const renderChart15 = (ch15) => {
        if (ch15) {
            return <div className="row"><div className="chart-logic-analyzer">                    
            <Line type="line" 
                data={chartData15} 
                options={chartOptions} 
                ref={chartRef}/>
                    </div>
                    </div>
    }
    }

    const [xStepSize, setXStepSize] = useState(1);
    const [horizontalScale, setHorizontalScale] = useState("1us");

    const [xScaleOptions, setXScaleOptions] = useState(
        { title: { display: false }, grid: { color: "#393b3d", }, ticks: { stepSize: xStepSize, color: "black", font: {size: 14} }, type: 'linear', min: 294, max: 306 }
      );
      const [yScaleOptions, setYScaleOptions] = useState(
        { title: { display: false }, grid: { color: "#393b3d", }, ticks: { stepSize: 1, color: "white", font: {size: 14} }, min: 0.0, max: 1.0 }
      );

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

    const [chartSpecOptions, setChartSpecOptions] = useState(
      {
        elements: { point: { radius: 0, } },
        animation: { duration: 100 },
        maintainAspectRatio: false,
        plugins: { legend: { display: false, labels: { color: "white", display: false } }, title: { display: false } },
        scales: { 
          x: { title: { display: true, text: "Time, us", color: "white", font: {size: 18} }, grid: { display: true, color: "#000000", }, ticks: { display: true, stepSize: 1, color: "white", font: {size: 14} }, type: 'linear', min: 294, max: 306 },
          y: { title: { display: false, color: "white", font: {size: 18} }, grid: { display: false, color: "#FFFFFF", }, ticks: { stepSize: 1, color: "black", font: {size: 14} }, min: 0.0, max: 1.0 }
        },
      }
    );

      const [chartData0, setChartData0] = useState(
        { labels: [], datasets: [ { label: "CH0", data: [], borderColor: "yellow", borderWidth: 1, stepped: true } ] }
      );

      const [chartData1, setChartData1] = useState({
          labels: [],
          datasets: [
          {
            label: "CH1",
            data: [],
            borderColor: "#0d99d1",
            borderWidth: 1,
            stepped: true
          }
        ]
      });

    const [chartData2, setChartData2] = useState({
        labels: [],
        datasets: [
        {
          label: "CH2",
          data: [],
          borderColor: "green",
          borderWidth: 1,
          stepped: true
        }
      ]
    });

    const [chartData3, setChartData3] = useState({
        labels: [],
        datasets: [
        {
          label: "CH3",
          data: [],
          borderColor: "red",
          borderWidth: 1,
          stepped: true
        }
      ]
    });

    const [chartData4, setChartData4] = useState({
        labels: [],
        datasets: [
        {
          label: "CH4",
          data: [],
          borderColor: "orange",
          borderWidth: 1,
          stepped: true
        }
      ]
    });

    const [chartData5, setChartData5] = useState({
        labels: [],
        datasets: [
        {
          label: "CH5",
          data: [],
          borderColor: "pink",
          borderWidth: 1,
          stepped: true
        }
      ]
    });

    const [chartData6, setChartData6] = useState({
        labels: [],
        datasets: [
        {
          label: "CH6",
          data: [],
          borderColor: "brown",
          borderWidth: 1,
          stepped: true
        }
      ]
    });

    const [chartData7, setChartData7] = useState({
        labels: [],
        datasets: [
        {
          label: "CH7",
          data: [],
          borderColor: "purple",
          borderWidth: 1,
          stepped: true
        }
      ]
    });

    const [chartData8, setChartData8] = useState({
        labels: [],
        datasets: [
        {
          label: "CH8",
          data: [],
          borderColor: "#917833",
          borderWidth: 1,
          stepped: true
        }
      ]
    });

    const [chartData9, setChartData9] = useState({
        labels: [],
        datasets: [
        {
          label: "CH9",
          data: [],
          borderColor: "#5110e8",
          borderWidth: 1,
          stepped: true
        }
      ]
    });

    const [chartData10, setChartData10] = useState({
        labels: [],
        datasets: [
        {
          label: "CH10",
          data: [],
          borderColor: "#f2070b",
          borderWidth: 1,
          stepped: true
        }
      ]
    });

    const [chartData11, setChartData11] = useState({
        labels: [],
        datasets: [
        {
          label: "CH11",
          data: [],
          borderColor: "#d9c80f",
          borderWidth: 1,
          stepped: true
        }
      ]
    });

    const [chartData12, setChartData12] = useState({
        labels: [],
        datasets: [
        {
          label: "CH12",
          data: [],
          borderColor: "#797adb",
          borderWidth: 1,
          stepped: true
        }
      ]
    });

    const [chartData13, setChartData13] = useState({
        labels: [],
        datasets: [
        {
          label: "CH13",
          data: [],
          borderColor: "#32d4ed",
          borderWidth: 1,
          stepped: true
        }
      ]
    });

    const [chartData14, setChartData14] = useState({
        labels: [],
        datasets: [
        {
          label: "CH14",
          data: [],
          borderColor: "#c77130",
          borderWidth: 1,
          stepped: true
        }
      ]
    });

    const [chartData15, setChartData15] = useState({
        labels: [],
        datasets: [
        {
          label: "CH15",
          data: [],
          borderColor: "#47dec2",
          borderWidth: 1,
          stepped: true
        }
      ]
    });

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

  const renderChartXAxis = (list) => {
    if (list.length !== 0) {
      return <div className="row"><div className="chart-logic-analyzer-x">                    
      <Line type="line" 
        data={{
        labels: [],
        datasets: [
          {
            data: times
          }
        ]
        }} 
        options={chartSpecOptions} 
        ref={chartRef}/>
        </div></div>
    }
  }

    const changeButton = () => {
      setDefaultMode("live-data");
      console.log("isFirstCapture: " + isFirstCapture);
      if (isRun) {
        setIsRun(false);
        clearInterval(intervalID);
      } else {
        setIsRun(true);
        setIsFirstCapture(true);
        setIntervalID(setInterval(() => refreshChartData(), 1000));
      }
    };

    const changeRecordButton = () => {
      setDefaultMode("record-data");
      console.log("heree");
      setIsRecordRun(true);
      console.log(selectedTimeout);
      let i = setInterval(() => refreshChartRecordData(), 1000);
      setTimeout(function() { setIsRecordRun(false); clearInterval( i ); currentIteration = 0; }, 1000 * (Number(selectedTimeout)));
    };

    const onTimeoutValueChange = (e) => {
      setSelectedTimeout(Number(e.target.value));
      console.log(e.target.value);
    };
    
      // refresh chart points according to values from oscilloscope
      const refreshChartData = async () => {
        try {
          await fetchChartData(ch0, ch1, ch2, ch3, ch4, ch5, ch6, ch7,
            ch8, ch9, ch10, ch11, ch12, ch13, ch14, ch15);
        //   setChartData(data);
          setIsFirstCapture(false);
        } catch (error) {
          console.error("Error fetching chart data:", error);
        }
      };

      const refreshChartRecordData = async () => {
        try {
          await fetchChartRecordData(ch0, ch1, ch2, ch3, ch4, ch5, ch6, ch7,
            ch8, ch9, ch10, ch11, ch12, ch13, ch14, ch15);
        //   setChartData(data);
          // setIsFirstCapture(false);
        } catch (error) {
          console.error("Error fetching chart record data:", error);
        }
      }

      const renderScaleScroll = (scaleName) => {
        if (scaleName.toUpperCase() === "X") {
          if (xStepSize === 50) {
            return <div className="scope-scroll-slider-none"></div>;
          } else {
            return (
              <input className="scope-scroll-slider"
                type="range" 
                id={("xScaleRangeLA")} 
                name={("xScaleRangeLA")} 
                title='Use this slider to move through X-Scale (LEFT/RIGHT)'
                min={xInputMin} 
                step={xStepSize} 
                max={xInputMax}
                value={xCenterValue} 
                onChange={onXScaleInputChange} />);
          }
        }
      }

      // handler for X-scale change
  const onHorizontalScaleValueChange = value => {
    setHorizontalScale(value);
    console.log(value);
    if (defaultMode === "live-data") {
    switch (value) {
      case "1us":
        setXStepSize(1);
        setXCenterValue(300);
        setXInputMin(6);
        setXInputMax(594);
        setXScaleOptions(
          { title: { display: true, text: "Time, us", color: "black", font: {size: 18} }, grid: { color: "#393b3d", }, ticks: { stepSize: 1, color: "black", font: {size: 14} }, type: 'linear', beginAtZero: false, min: 294, max: 306 }
        );
        setChartSpecOptions(
          {
            elements: { point: { radius: 0, } },
            animation: { duration: 100 },
            maintainAspectRatio: false,
            plugins: { legend: { display: false, labels: { color: "white", display: false } }, title: { display: false } },
            scales: { 
              x: { title: { display: true, text: "Time, us", color: "white", font: {size: 18} }, grid: { display: true, color: "#000000", }, ticks: { display: true, stepSize: 1, color: "white", font: {size: 14} }, type: 'linear', min: 294, max: 306 },
              y: { title: { display: false, color: "white", font: {size: 18} }, grid: { display: false, color: "#FFFFFF", }, ticks: { stepSize: 1, color: "black", font: {size: 14} }, min: 0.0, max: 1.0 }
            },
          }
        );
        setChartOptions(
          {
            elements: { point: { radius: 0, } },
            animation: { duration: 100 },
            maintainAspectRatio: false,
            plugins: { legend: { labels: { color: "white" } } },
            scales: { 
              x: { title: { display: true, text: "Time, us", color: "black", font: {size: 18} }, grid: { color: "#393b3d", }, ticks: { stepSize: 1, color: "black", font: {size: 14} }, type: 'linear', beginAtZero: false, min: 294, max: 306 },
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
          { title: { display: true, text: "Time, us", color: "black", font: {size: 18} }, grid: { color: "#393b3d", }, ticks: { stepSize: 10, color: "black", font: {size: 14} }, type: 'linear', beginAtZero: false, min: 240, max: 360 }
        );
        setChartSpecOptions(
          {
            elements: { point: { radius: 0, } },
            animation: { duration: 100 },
            maintainAspectRatio: false,
            plugins: { legend: { display: false, labels: { color: "white", display: false } }, title: { display: false } },
            scales: { 
              x: { title: { display: true, text: "Time, us", color: "white", font: {size: 18} }, grid: { display: true, color: "#000000", }, ticks: { display: true, stepSize: 10, color: "white", font: {size: 14} }, type: 'linear', min: 240, max: 360 },
              y: { title: { display: false, color: "white", font: {size: 18} }, grid: { display: false, color: "#FFFFFF", }, ticks: { stepSize: 10, color: "black", font: {size: 14} }, min: 0.0, max: 1.0 }
            },
          }
        );
        setChartOptions(
          {
            elements: { point: { radius: 0, } },
            animation: { duration: 100 },
            maintainAspectRatio: false,
            plugins: { legend: { labels: { color: "white" } } },
            scales: { 
              x: { title: { display: true, text: "Time, us", color: "black", font: {size: 18} }, grid: { color: "#393b3d", }, ticks: { stepSize: 10, color: "black", font: {size: 14} }, type: 'linear', beginAtZero: false, min: 240, max: 360 },
              y: yScaleOptions
            },
          }
        );
        break;
      case "50us":
        setXStepSize(50);
        setXScaleOptions(
          { title: { display: true, text: "Time, us", color: "black", font: {size: 18} }, grid: { color: "#393b3d", }, ticks: { stepSize: 50, color: "black", font: {size: 14} }, type: 'linear', beginAtZero: true, min: 0, max: 600 }
        );
        setChartSpecOptions(
          {
            elements: { point: { radius: 0, } },
            animation: { duration: 100 },
            maintainAspectRatio: false,
            plugins: { legend: { display: false, labels: { color: "white", display: false } }, title: { display: false } },
            scales: { 
              x: { title: { display: true, text: "Time, us", color: "white", font: {size: 18} }, grid: { display: true, color: "#000000", }, ticks: { display: true, stepSize: 50, color: "white", font: {size: 14} }, type: 'linear', min: 0, max: 600 },
              y: { title: { display: false, color: "white", font: {size: 18} }, grid: { display: false, color: "#FFFFFF", }, ticks: { stepSize: 50, color: "black", font: {size: 14} }, min: 0.0, max: 1.0 }
            },
          }
        );
        setChartOptions(
          {
            elements: { point: { radius: 0, } },
            animation: { duration: 100 },
            maintainAspectRatio: false,
            plugins: { legend: { labels: { color: "white" } } },
            scales: { 
              x: { title: { display: true, text: "Time, us", color: "black", font: {size: 18} }, grid: { color: "#393b3d", }, ticks: { stepSize: 50, color: "black", font: {size: 14} }, type: 'linear', beginAtZero: false, min: 0, max: 600 },
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
          { title: { display: true, text: "Time, us", color: "black", font: {size: 18} }, grid: { color: "#393b3d", }, ticks: { stepSize: 20, color: "black", font: {size: 14} }, type: 'linear', beginAtZero: false, min: 170, max: 410 }
        );
        setChartSpecOptions(
          {
            elements: { point: { radius: 0, } },
            animation: { duration: 100 },
            maintainAspectRatio: false,
            plugins: { legend: { display: false, labels: { color: "white", display: false } }, title: { display: false } },
            scales: { 
              x: { title: { display: true, text: "Time, us", color: "white", font: {size: 18} }, grid: { display: true, color: "#000000", }, ticks: { display: true, stepSize: 20, color: "white", font: {size: 14} }, type: 'linear', min: 170, max: 410 },
              y: { title: { display: false, color: "white", font: {size: 18} }, grid: { display: false, color: "#FFFFFF", }, ticks: { stepSize: 20, color: "black", font: {size: 14} }, min: 0.0, max: 1.0 }
            },
          }
        );
        setChartOptions(
          {
            elements: { point: { radius: 0, } },
            animation: { duration: 100 },
            maintainAspectRatio: false,
            plugins: { legend: { labels: { color: "white" } } },
            scales: { 
              x: { title: { display: true, text: "Time, us", color: "black", font: {size: 18} }, grid: { color: "#393b3d", }, ticks: { stepSize: 20, color: "black", font: {size: 14} }, type: 'linear', beginAtZero: false, min: 170, max: 410 },
              y: yScaleOptions
            },
          }
        );
        break;
      default:
        setXStepSize(xStepSize);
        setXScaleOptions(xScaleOptions);
        setChartOptions(chartOptions);
        setChartSpecOptions(chartSpecOptions);
    }
    }
    if (defaultMode === "record-data") {
      switch (value) {
        case "1us":
          setXStepSize(1);
          setXCenterValue((Number(selectedTimeout)) * 1000000 / 2);
          setXInputMin(6);
          setXInputMax((Number(selectedTimeout)) * 1000000 - 6);
          setXScaleOptions(
            { title: { display: true, text: "Time, us", color: "black", font: {size: 18} }, grid: { color: "#393b3d", }, ticks: { stepSize: 1, color: "black", font: {size: 14} }, type: 'linear', beginAtZero: false, min: (Number(selectedTimeout)) * 1000000 / 2 - 6, max: (Number(selectedTimeout)) * 1000000 / 2 + 6 }
          );
          setChartSpecOptions(
            {
              elements: { point: { radius: 0, } },
              animation: { duration: 100 },
              maintainAspectRatio: false,
              plugins: { legend: { display: false, labels: { color: "white", display: false } }, title: { display: false } },
              scales: { 
                x: { title: { display: true, text: "Time, us", color: "white", font: {size: 18} }, grid: { display: true, color: "#000000", }, ticks: { display: true, stepSize: 1, color: "white", font: {size: 14} }, type: 'linear', min: (Number(selectedTimeout)) * 1000000 / 2 - 6, max: (Number(selectedTimeout)) * 1000000 / 2 + 6 },
                y: { title: { display: false, color: "white", font: {size: 18} }, grid: { display: false, color: "#FFFFFF", }, ticks: { stepSize: 1, color: "black", font: {size: 14} }, min: 0.0, max: 1.0 }
              },
            }
          );
          setChartOptions(
            {
              elements: { point: { radius: 0, } },
              animation: { duration: 100 },
              maintainAspectRatio: false,
              plugins: { legend: { labels: { color: "white" } } },
              scales: { 
                x: { title: { display: true, text: "Time, us", color: "black", font: {size: 18} }, grid: { color: "#393b3d", }, ticks: { stepSize: 1, color: "black", font: {size: 14} }, type: 'linear', beginAtZero: false, min: (Number(selectedTimeout)) * 1000000 / 2 - 6, max: (Number(selectedTimeout)) * 1000000 / 2 + 6 },
                y: yScaleOptions
              },
            }
          );
          break;
        case "10us":
          setXStepSize(10);
          setXCenterValue((Number(selectedTimeout)) * 1000000 / 2);
          setXInputMin(60);
          setXInputMax((Number(selectedTimeout)) * 1000000 - 60);
          setXScaleOptions(
            { title: { display: true, text: "Time, us", color: "black", font: {size: 18} }, grid: { color: "#393b3d", }, ticks: { stepSize: 10, color: "black", font: {size: 14} }, type: 'linear', beginAtZero: false, min: (Number(selectedTimeout)) * 1000000 / 2 - 60, max: (Number(selectedTimeout)) * 1000000 / 2 + 60 }
          );
          setChartSpecOptions(
            {
              elements: { point: { radius: 0, } },
              animation: { duration: 100 },
              maintainAspectRatio: false,
              plugins: { legend: { display: false, labels: { color: "white", display: false } }, title: { display: false } },
              scales: { 
                x: { title: { display: true, text: "Time, us", color: "white", font: {size: 18} }, grid: { display: true, color: "#000000", }, ticks: { display: true, stepSize: 10, color: "white", font: {size: 14} }, type: 'linear', min: (Number(selectedTimeout)) * 1000000 / 2 - 60, max: (Number(selectedTimeout)) * 1000000 / 2 + 60 },
                y: { title: { display: false, color: "white", font: {size: 18} }, grid: { display: false, color: "#FFFFFF", }, ticks: { stepSize: 10, color: "black", font: {size: 14} }, min: 0.0, max: 1.0 }
              },
            }
          );
          setChartOptions(
            {
              elements: { point: { radius: 0, } },
              animation: { duration: 100 },
              maintainAspectRatio: false,
              plugins: { legend: { labels: { color: "white" } } },
              scales: { 
                x: { title: { display: true, text: "Time, us", color: "black", font: {size: 18} }, grid: { color: "#393b3d", }, ticks: { stepSize: 10, color: "black", font: {size: 14} }, type: 'linear', beginAtZero: false, min: (Number(selectedTimeout)) * 1000000 / 2 - 60, max: (Number(selectedTimeout)) * 1000000 / 2 + 60 },
                y: yScaleOptions
              },
            }
          );
          break;
        case "50us":
          setXCenterValue((Number(selectedTimeout)) * 1000000 / 2);
          setXStepSize(50);
          setXInputMax((Number(selectedTimeout)) * 1000000 - 300);
          setXScaleOptions(
            { title: { display: true, text: "Time, us", color: "black", font: {size: 18} }, grid: { color: "#393b3d", }, ticks: { stepSize: 50, color: "black", font: {size: 14} }, type: 'linear', beginAtZero: true, min: 0, max: (Number(selectedTimeout)) * 1000000 / 2 + 300 }
          );
          setChartSpecOptions(
            {
              elements: { point: { radius: 0, } },
              animation: { duration: 100 },
              maintainAspectRatio: false,
              plugins: { legend: { display: false, labels: { color: "white", display: false } }, title: { display: false } },
              scales: { 
                x: { title: { display: true, text: "Time, us", color: "white", font: {size: 18} }, grid: { display: true, color: "#000000", }, ticks: { display: true, stepSize: 50, color: "white", font: {size: 14} }, type: 'linear', min: 0, max: (Number(selectedTimeout)) * 1000000 / 2 + 300 },
                y: { title: { display: false, color: "white", font: {size: 18} }, grid: { display: false, color: "#FFFFFF", }, ticks: { stepSize: 50, color: "black", font: {size: 14} }, min: 0.0, max: 1.0 }
              },
            }
          );
          setChartOptions(
            {
              elements: { point: { radius: 0, } },
              animation: { duration: 100 },
              maintainAspectRatio: false,
              plugins: { legend: { labels: { color: "white" } } },
              scales: { 
                x: { title: { display: true, text: "Time, us", color: "black", font: {size: 18} }, grid: { color: "#393b3d", }, ticks: { stepSize: 50, color: "black", font: {size: 14} }, type: 'linear', beginAtZero: false, min: 0, max: (Number(selectedTimeout)) * 1000000 / 2 + 300 },
                y: yScaleOptions
              },
            }
          );
          break;
        case "20us":
          setXStepSize(20);
          setXCenterValue((Number(selectedTimeout)) * 1000000 / 2);
          setXInputMin(120);
          setXInputMax((Number(selectedTimeout)) * 1000000 - 120);
          setXScaleOptions(
            { title: { display: true, text: "Time, us", color: "black", font: {size: 18} }, grid: { color: "#393b3d", }, ticks: { stepSize: 20, color: "black", font: {size: 14} }, type: 'linear', beginAtZero: false, min: (Number(selectedTimeout)) * 1000000 / 2 - 130, max: (Number(selectedTimeout)) * 1000000 / 2 + 110 }
          );
          setChartSpecOptions(
            {
              elements: { point: { radius: 0, } },
              animation: { duration: 100 },
              maintainAspectRatio: false,
              plugins: { legend: { display: false, labels: { color: "white", display: false } }, title: { display: false } },
              scales: { 
                x: { title: { display: true, text: "Time, us", color: "white", font: {size: 18} }, grid: { display: true, color: "#000000", }, ticks: { display: true, stepSize: 20, color: "white", font: {size: 14} }, type: 'linear', min: (Number(selectedTimeout)) * 1000000 / 2 - 130, max: (Number(selectedTimeout)) * 1000000 / 2 + 110 },
                y: { title: { display: false, color: "white", font: {size: 18} }, grid: { display: false, color: "#FFFFFF", }, ticks: { stepSize: 20, color: "black", font: {size: 14} }, min: 0.0, max: 1.0 }
              },
            }
          );
          setChartOptions(
            {
              elements: { point: { radius: 0, } },
              animation: { duration: 100 },
              maintainAspectRatio: false,
              plugins: { legend: { labels: { color: "white" } } },
              scales: { 
                x: { title: { display: true, text: "Time, us", color: "black", font: {size: 18} }, grid: { color: "#393b3d", }, ticks: { stepSize: 20, color: "black", font: {size: 14} }, type: 'linear', beginAtZero: false, min: (Number(selectedTimeout)) * 1000000 / 2 - 130, max: (Number(selectedTimeout)) * 1000000 / 2 + 110 },
                y: yScaleOptions
              },
            }
          );
          break;
        default:
          setXStepSize(xStepSize);
          setXScaleOptions(xScaleOptions);
          setChartOptions(chartOptions);
          setChartSpecOptions(chartSpecOptions);
      }
    }
  };

  const onXScaleInputChange = e => {
    setXCenterValue(e.target.value);
    setXScaleOptions(
      { title: { display: true, text: "Time, us", color: "black", font: {size: 18} }, grid: { color: "#393b3d", }, ticks: { stepSize: xStepSize, color: "black", font: {size: 14} }, type: 'linear', beginAtZero: false, min: (Number(e.target.value) - 6 * xStepSize), max: (Number(e.target.value) + 6 * xStepSize) }
    );
    setChartOptions(
      {
        elements: { point: { radius: 0, } },
        animation: { duration: 100 },
        maintainAspectRatio: false,
        plugins: { legend: { labels: { color: "white" } } },
        scales: { 
          x: { title: { display: true, text: "Time, us", color: "black", font: {size: 18} }, grid: { color: "#393b3d", }, ticks: { stepSize: xStepSize, color: "black", font: {size: 14} }, type: 'linear', beginAtZero: false, min: (Number(e.target.value) - 6 * xStepSize), max: (Number(e.target.value) + 6 * xStepSize) },
          y: yScaleOptions
        },
      }
    );
    setChartSpecOptions(
      {
        elements: { point: { radius: 0, } },
        animation: { duration: 100 },
        maintainAspectRatio: false,
        plugins: { legend: { display: false, labels: { color: "white", display: false } }, title: { display: false } },
        scales: { 
          x: { title: { display: true, text: "Time, us", color: "white", font: {size: 18} }, grid: { display: true, color: "#000000", }, ticks: { stepSize: xStepSize, color: "white", font: {size: 14} }, type: 'linear', beginAtZero: false, min: (Number(e.target.value) - 6 * xStepSize), max: (Number(e.target.value) + 6 * xStepSize) },
          y: { title: { display: false, color: "white", font: {size: 18} }, grid: { display: false, color: "#FFFFFF", }, ticks: { stepSize: 20, color: "black", font: {size: 14} }, min: 0.0, max: 1.0 }
        },
      }
    );
  }
      

    return (
        <div>
          <h2>Logic Analyzer</h2>
            {renderChart0(ch0)}
            {renderChart1(ch1)}
            {renderChart2(ch2)}
            {renderChart3(ch3)}
            {renderChart4(ch4)}
            {renderChart5(ch5)}
            {renderChart6(ch6)}
            {renderChart7(ch7)}
            {renderChart8(ch8)}
            {renderChart9(ch9)}
            {renderChart10(ch10)}
            {renderChart11(ch11)}
            {renderChart12(ch12)}
            {renderChart13(ch13)}
            {renderChart14(ch14)}
            {renderChart15(ch15)}
            {renderChartXAxis(list)}
            <div className="col-6 my-auto mx-auto">
              <button className="btn btn-md btn-primary m-2" disabled={isRecordRun}
              onClick={changeButton}><i className={isRun ? "bi bi-pause" : "bi bi-caret-right"}></i></button>

              <button className="btn btn-md btn-primary m-2" disabled={isRecordRun || isRun}
              onClick={changeRecordButton}><i className="bi bi-record-circle"></i></button>

              <button className="btn btn-md btn-primary m-2" 
              onClick={saveWaveform}><i className="bi bi-download"></i></button>
            </div>
          <div className="">
            <div className="">
              <div className="">
              <div className="logic-analyzer-table">
              <h3>Channels</h3>
                <table>
                  <tbody>
                    <tr>
                      <td>CH0</td>
                      <td>
                        <input type="checkbox" id="ch0" name="ch0" value="Ch0"
                          checked={ch0 === true}
                          disabled={isRecordRun || isRun}
                          onChange={onChannel0Change}/>
                      </td>
                      <td>CH4</td>
                      <td>
                        <input type="checkbox" id="ch4" name="ch4" value="Ch4"
                          checked={ch4 === true}
                          disabled={isRecordRun || isRun}
                          onChange={onChannel4Change}/>
                      </td>
                      <td>CH8</td>
                      <td>
                        <input type="checkbox" id="ch8" name="ch8" value="Ch8"
                          checked={ch8 === true}
                          disabled={isRecordRun || isRun}
                          onChange={onChannel8Change}/>
                      </td>
                      <td>CH12</td>
                      <td>
                        <input type="checkbox" id="ch12" name="ch12" value="Ch12"
                          checked={ch12 === true}
                          disabled={isRecordRun || isRun}
                          onChange={onChannel12Change}/>
                      </td>
                    </tr>
                    <tr>
                      <td>CH1</td>
                      <td>
                        <input type="checkbox" id="ch1" name="ch1" value="Ch1"
                          checked={ch1 === true}
                          disabled={isRecordRun || isRun}
                          onChange={onChannel1Change}/>
                      </td>
                      <td>CH5</td>
                      <td>
                        <input type="checkbox" id="ch5" name="ch5" value="Ch5"
                          checked={ch5 === true}
                          disabled={isRecordRun || isRun}
                          onChange={onChannel5Change}/>
                      </td>
                      <td>CH9</td>
                      <td>
                        <input type="checkbox" id="ch9" name="ch9" value="Ch9"
                          checked={ch9 === true}
                          disabled={isRecordRun || isRun}
                          onChange={onChannel9Change}/>
                      </td>
                      <td>CH13</td>
                      <td>
                        <input type="checkbox" id="ch13" name="ch13" value="Ch13"
                          checked={ch13 === true}
                          disabled={isRecordRun || isRun}
                          onChange={onChannel13Change}/>
                      </td>
                    </tr>
                    <tr>
                      <td>CH2</td>
                      <td>
                        <input type="checkbox" id="ch2" name="ch2" value="Ch2"
                          checked={ch2 === true}
                          disabled={isRecordRun || isRun}
                          onChange={onChannel2Change}/>
                      </td>
                      <td>CH6</td>
                      <td>
                        <input type="checkbox" id="ch6" name="ch6" value="Ch6"
                          checked={ch6 === true}
                          disabled={isRecordRun || isRun}
                          onChange={onChannel6Change}/>
                      </td>
                      <td>CH10</td>
                      <td>
                        <input type="checkbox" id="ch10" name="ch10" value="Ch10"
                          checked={ch10 === true}
                          disabled={isRecordRun || isRun}
                          onChange={onChannel10Change}/>
                      </td>
                      <td>CH14</td>
                      <td>
                        <input type="checkbox" id="ch14" name="ch14" value="Ch14"
                          checked={ch14 === true}
                          disabled={isRecordRun || isRun}
                          onChange={onChannel14Change}/>
                      </td>
                    </tr>
                    <tr>
                      <td>CH3</td>
                      <td>
                        <input type="checkbox" id="ch3" name="ch3" value="Ch3"
                          checked={ch3 === true}
                          disabled={isRecordRun || isRun}
                          onChange={onChannel3Change}/>
                      </td>
                      <td>CH7</td>
                      <td>
                        <input type="checkbox" id="ch7" name="ch7" value="Ch7"
                          checked={ch7 === true}
                          disabled={isRecordRun || isRun}
                          onChange={onChannel7Change}/>
                      </td>
                      <td>CH11</td>
                      <td>
                        <input type="checkbox" id="ch11" name="ch11" value="Ch11"
                          checked={ch11 === true}
                          disabled={isRecordRun || isRun}
                          onChange={onChannel11Change}/>
                      </td>
                      <td>CH15</td>
                      <td>
                        <input type="checkbox" id="ch15" name="ch15" value="Ch15"
                          checked={ch15 === true}
                          disabled={isRecordRun || isRun}
                          onChange={onChannel15Change}/>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="logic-analyzer-table">
                Source
                <div className="tables-in-row">
                <select disabled={triggerType === "immediate" || isRecordRun || isRun} className="logic-analyzer-select" name="logicAnalyzerChannels">
                    {list.map((channel)=> {
                        return (
                            <option key={channel}>
                                {channel}
                            </option>
                        )
                    })}
                </select>
                </div>
                </div>
                <div className="logic-analyzer-table">
                <div className="tables-in-row">
                Timeout, s
                <select value={selectedTimeout} onChange={onTimeoutValueChange} disabled={isRecordRun || isRun} className="logic-analyzer-select" name="logicAnalyzerTimeout">
                    {listTimeout.map((channel)=> {
                        return (
                            <option key={channel}>
                                {channel}
                            </option>
                        )
                    })}
                </select>
                </div>
                </div>
                </div>
              <div className="logic-analyzer-table">
                <h3>Trigger</h3>
                <table>
                    <tbody>
                        <tr>
                            <td><span className="fall-edge"></span></td>
                            <td>
                                <input type="radio" 
                                id="triggerFallEdge" 
                                name="triggerFallEdge"
                                value="fall-edge"
                                checked={triggerType === "fall-edge"}
                                disabled={isRecordRun || isRun}
                                onChange={onTriggerTypeChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td><span className="rise-edge"></span></td>
                            <td>
                                <input type="radio" 
                                id="triggerRiseEdge" 
                                name="triggerRiseEdge"
                                value="rise-edge"
                                checked={triggerType === "rise-edge"}
                                disabled={isRecordRun || isRun}
                                onChange={onTriggerTypeChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td>Immediate</td>
                            <td>
                                <input type="radio" 
                                id="triggerImmediate" 
                                name="triggerImmediate"
                                value="immediate"
                                checked={triggerType === "immediate"}
                                disabled={isRecordRun || isRun}
                                onChange={onTriggerTypeChange}/>
                            </td>
                        </tr>
                    </tbody>
                </table>
              </div>
              <div className="logic-analyzer-table">
                X-Scale<br/>
                <label className={"round-sliders-label " + (deviceType==="mcu" ? "mcu-lab-background-special" : "fpga-lab-background-special")}>
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
        </div>
        </div>

    );
}

export default LogicAnalyzer;