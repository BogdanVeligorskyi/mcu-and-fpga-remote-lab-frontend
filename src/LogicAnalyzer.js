import { Chart } from 'chart.js/auto';
import { getUrlForRequest } from './utils/get-url-for-request';
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
    const [triggerType, setTriggerType] = useState("falling");
    const [isRun, setIsRun] = useState(false);
    const [isRecordRun, setIsRecordRun] = useState(false);
    const [isFirstCapture, setIsFirstCapture] = useState(true);
    const [intervalID, setIntervalID] = useState();
    const [defaultMode, setDefaultMode] = useState("live-data");
    
    const [xInputMin, setXInputMin] = useState(294);
    const [xInputMax, setXInputMax] = useState(306);
    const [xCenterValue, setXCenterValue] = useState(300);

    const [listChannels, setListChannels] = useState([]);
    const [listTimeout, setListTimeout] = useState(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']);
    
    const [selectedChannel, setSelectedChannel] = useState("");
    const [selectedTimeout, setSelectedTimeout] = useState(1);

    const addNewChannelToList = (newChannel) => {
      let temp = [...listChannels, newChannel];
      temp.sort();
      setListChannels(temp);
    }

    const removeChannelFromList = (channelName) => {
      let arr = [...listChannels];
      var index = arr.indexOf(channelName);
      if (index !== -1) {
        arr.splice(index, 1);
        setListChannels(arr);
      }
    }

    const onTriggerTypeChange = e => {
      setTriggerType(e.target.value);
    }

    const onChannel0Change = () => {
      setCh0(!ch0);  
      if (!ch0) {
        addNewChannelToList(0);       
      } else {
        removeChannelFromList(0);
      }
    }

    const onChannel1Change = () => {
      setCh1(!ch1);
      if (!ch1) {
        addNewChannelToList(1);       
      } else {
        removeChannelFromList(1);
      }
    }

    const onChannel2Change = () => {
      setCh2(!ch2);
      if (!ch2) {
        addNewChannelToList(2);       
      } else {
        removeChannelFromList(2);
      }
    }

    const onChannel3Change = () => {
      setCh3(!ch3);
      if (!ch3) {
        addNewChannelToList(3);       
      } else {
        removeChannelFromList(3);
      }
    }

    const onChannel4Change = () => {
      setCh4(!ch4);
      if (!ch4) {
        addNewChannelToList(4);       
      } else {
        removeChannelFromList(4);
      }
    }

    const onChannel5Change = () => {
      setCh5(!ch5);
      if (!ch5) {
        addNewChannelToList(5);       
      } else {
        removeChannelFromList(5);
      }
    }

    const onChannel6Change = () => {
      setCh6(!ch6);
      if (!ch6) {
        addNewChannelToList(6);       
      } else {
        removeChannelFromList(6);
      }
    }

    const onChannel7Change = () => {
      setCh7(!ch7);
      if (!ch7) {
        addNewChannelToList(7);       
      } else {
        removeChannelFromList(7);
      }
    }

    const onChannel8Change = () => {
      setCh8(!ch8);
      if (!ch8) {
        addNewChannelToList(8);       
      } else {
        removeChannelFromList(8);
      }
    }

    const onChannel9Change = () => {
      setCh9(!ch9);
      if (!ch9) {
        addNewChannelToList(9);       
      } else {
        removeChannelFromList(9);
      }
    }

    const onChannel10Change = () => {
      setCh10(!ch10);
      if (!ch10) {
        addNewChannelToList(10);       
      } else {
        removeChannelFromList(10);
      }
    }

    const onChannel11Change = () => {
      setCh11(!ch11);
      if (!ch11) {
        addNewChannelToList(11);       
      } else {
        removeChannelFromList(11);
      }
    }

    const onChannel12Change = () => {
      setCh12(!ch12);
      if (!ch12) {
        addNewChannelToList(12);       
      } else {
        removeChannelFromList(12);
      }
    }

    const onChannel13Change = () => {
      setCh13(!ch13);
      if (!ch13) {
        addNewChannelToList(13);       
      } else {
        removeChannelFromList(13);
      }
    }

    const onChannel14Change = () => {
      setCh14(!ch14);
      if (!ch14) {
        addNewChannelToList(14);       
      } else {
        removeChannelFromList(14);
      }
    }

    const onChannel15Change = () => {
      setCh15(!ch15);
      if (!ch15) {
        addNewChannelToList(15);       
      } else {
        removeChannelFromList(15);
      }
    }

    const setChartData = (times, labelName, voltagesArr, color) => {
      return {
        labels: times,
        datasets: [
        {
          label: labelName,
          data: voltagesArr,
          borderColor: color,
          borderWidth: 1,
          stepped: true
        }
        ]
      }
    }

    const setChartOptionsUnified = (step, minValue, maxValue, yScaleOptions) => {
      return {
        elements: { point: { radius: 0, } },
        spanGaps: false,
        animation: false,
        maintainAspectRatio: false,
        plugins: { legend: { labels: { color: "white" } } },
        scales: { 
          x: { title: { display: true, text: "Time, us", color: "black", font: {size: 18} }, grid: { color: "#393b3d", }, ticks: { stepSize: step, color: "black", font: {size: 14} }, type: 'linear', beginAtZero: false, min: minValue, max: maxValue},
          y: yScaleOptions
        },
      }
    }

    const setChartSpecOptionsUnified = (step, minValue, maxValue) => {
      return {
        elements: { point: { radius: 0, } },
        spanGaps: false,
        animation: false,
        maintainAspectRatio: false,
        plugins: { legend: { display: false, labels: { color: "white", display: false } }, title: { display: false } },
        scales: { 
          x: { title: { display: true, text: "Time, us", color: "white", font: {size: 18} }, grid: { display: true, color: "#000000", }, ticks: { display: true, stepSize: step, color: "white", font: {size: 14} }, type: 'linear', min: minValue, max: maxValue },
          y: { title: { display: false, color: "white", font: {size: 18} }, grid: { display: false, color: "#FFFFFF", }, ticks: { stepSize: 20, color: "black", font: {size: 14} }, min: 0.0, max: 1.0 }
        },
      }
    }

    // get data fron logic analyzer in record mode
    const fetchChartRecordData = async (ch0, ch1, ch2, ch3, ch4, ch5, ch6, ch7,
      ch8, ch9, ch10, ch11, ch12, ch13, ch14, ch15) => {
        if (process.env.REACT_APP_IS_FRONTEND_DEV_MODE.toUpperCase() === "TRUE") {
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
          setChartData0(setChartData(times, "CH0", voltagesCH0, "yellow"));
          setChartData1(setChartData(times, "CH1", voltagesCH1, "#0d99d1"));
          setChartData2(setChartData(times, "CH2", voltagesCH2, "green"));
          setChartData3(setChartData(times, "CH3", voltagesCH3, "red"));
          setChartData4(setChartData(times, "CH4", voltagesCH4, "orange"));
          setChartData5(setChartData(times, "CH5", voltagesCH5, "pink"));
          setChartData6(setChartData(times, "CH6", voltagesCH6, "brown"));
          setChartData7(setChartData(times, "CH7", voltagesCH7, "purple"));
          setChartData8(setChartData(times, "CH8", voltagesCH8, "#917833"));
          setChartData9(setChartData(times, "CH9", voltagesCH9, "#5110e8"));
          setChartData10(setChartData(times, "CH10", voltagesCH10, "#f2070b"));
          setChartData11(setChartData(times, "CH11", voltagesCH11, "#d9c80f"));
          setChartData12(setChartData(times, "CH12", voltagesCH12, "#797adb"));
          setChartData13(setChartData(times, "CH13", voltagesCH13, "#32d4ed"));
          setChartData14(setChartData(times, "CH14", voltagesCH14, "#c77130"));
          setChartData15(setChartData(times, "CH15", voltagesCH15, "#47dec2"));
        
        currentIteration++;
        } else {
      /*let requestOptions;
      let trigger = (triggerType !== "immediate" ? "edge" : "immediate");
      console.log(trigger);
      console.log(listChannels);
      requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': tokenId },
        body: JSON.stringify({ 
          measurementTimeUs: 100, 
          channels: listChannels,
          trigger: {
            type: trigger,
            channel: Number(selectedChannel),
            edge: triggerType,
            timeoutSec: Number(selectedTimeout),
          }
        }),
        credentials: 'include'
      }
    let response = await fetch(getUrlForRequest('/api/logic-analyzer/capture'), requestOptions);
    let data = await response.json();
    let measurementTimeUs = data["measurementTimeUs"];
    let sampleRateHz = data["sampleRateHz"];
    let triggered = data["triggered"];
    let triggerTimestampUs = data["triggerTimestampUs"];
    let warnings = data["warnings"];
    console.log("measurementTimeUs: " + measurementTimeUs);
    console.log("sampleRateHz: " + sampleRateHz);
    console.log("triggered: " + triggered);
    console.log("triggerTimestampUs: " + triggerTimestampUs);
    console.log("warnings:" + warnings);
        */}
    
  }

    // fetch voltage values from backend
    const fetchChartData = async (ch0, ch1, ch2, ch3, ch4, ch5, ch6, ch7,
        ch8, ch9, ch10, ch11, ch12, ch13, ch14, ch15) => {
    
      let requestOptions;
    
      console.log("fetchChartData");

      // offline mode
      if (process.env.REACT_APP_IS_FRONTEND_DEV_MODE.toUpperCase() === "TRUE") {
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
        setChartData0(setChartData(times, "CH0", voltagesCH0, "yellow"));
        setChartData1(setChartData(times, "CH1", voltagesCH1, "#0d99d1"));
        setChartData2(setChartData(times, "CH2", voltagesCH2, "green"));
        setChartData3(setChartData(times, "CH3", voltagesCH3, "red"));
        setChartData4(setChartData(times, "CH4", voltagesCH4, "orange"));
        setChartData5(setChartData(times, "CH5", voltagesCH5, "pink"));
        setChartData6(setChartData(times, "CH6", voltagesCH6, "brown"));
        setChartData7(setChartData(times, "CH7", voltagesCH7, "purple"));
        setChartData8(setChartData(times, "CH8", voltagesCH8, "#917833"));
        setChartData9(setChartData(times, "CH9", voltagesCH9, "#5110e8"));
        setChartData10(setChartData(times, "CH10", voltagesCH10, "#f2070b"));
        setChartData11(setChartData(times, "CH11", voltagesCH11, "#d9c80f"));
        setChartData12(setChartData(times, "CH12", voltagesCH12, "#797adb"));
        setChartData13(setChartData(times, "CH13", voltagesCH13, "#32d4ed"));
        setChartData14(setChartData(times, "CH14", voltagesCH14, "#c77130"));
        setChartData15(setChartData(times, "CH15", voltagesCH15, "#47dec2"));

        // online mode
      } else {
        let trigger = (triggerType !== "immediate" ? "edge" : "immediate");
        console.log(trigger);
        console.log(listChannels);
        requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': tokenId },
          body: JSON.stringify({ 
            measurementTimeUs: 600, 
            channels: listChannels,
            trigger: {
              type: "immediate",
              channel: Number(selectedChannel),
              edge: "immediate",
              timeoutSec: 0,
            }
          }),
          credentials: 'include'
        }
        let response = await fetch(getUrlForRequest('/api/logic-analyzer/capture'), requestOptions);
        let data = await response.json();

        let measurementTimeUs = data["measurementTimeUs"];
        let sampleRateHz = data["sampleRateHz"];
        let triggered = data["triggered"];
        let triggerTimestampUs = data["triggerTimestampUs"];
        let warnings = data["warnings"];
        for (let k = 0; k < 600; k++) {
          for (let j = 0; j < listChannels.length; j++) {
            let channel = data["channels"][(String(j))]["channel"];
            if (channel === 0) {
              let channelTransitions = data["channels"][(String(j))]["transitions"];
              for (let m = 0; m < channelTransitions.length; m++) {
                if (data["channels"][(String(j))]["transitions"][(String(m))]["tUs"] === k) {
                  voltagesCH0[k] = data["channels"][(String(j))]["transitions"][(String(m))]["value"];
                  console.log("AA");
                } else {
                  voltagesCH0[k] = voltagesCH0[k-1];
                }
              }
            }  
            if (channel === 1) {
              let channelTransitions = data["channels"][(String(j))]["transitions"];
              for (let m = 0; m < channelTransitions.length; m++) {
                if (data["channels"][(String(j))]["transitions"][(String(m))]["tUs"] === k) {
                  voltagesCH1[k] = data["channels"][(String(j))]["transitions"][(String(m))]["value"];
                } else {
                  voltagesCH1[k] = voltagesCH1[k-1];
                }
              }
            }
            if (channel === 2) {
              let channelTransitions = data["channels"][(String(j))]["transitions"];
              for (let m = 0; m < channelTransitions.length; m++) {
                if (data["channels"][(String(j))]["transitions"][(String(m))]["tUs"] === k) {
                  voltagesCH2[k] = data["channels"][(String(j))]["transitions"][(String(m))]["value"];
                } else {
                  voltagesCH2[k] = voltagesCH2[k-1];
                }
              }
            }
            if (channel === 3) {
              let channelTransitions = data["channels"][(String(j))]["transitions"];
              for (let m = 0; m < channelTransitions.length; m++) {
                if (data["channels"][(String(j))]["transitions"][(String(m))]["tUs"] === k) {
                  voltagesCH3[k] = data["channels"][(String(j))]["transitions"][(String(m))]["value"];
                } else {
                  voltagesCH3[k] = voltagesCH3[k-1];
                }
              }
            }
            if (channel === 4) {
              let channelTransitions = data["channels"][(String(j))]["transitions"];
              for (let m = 0; m < channelTransitions.length; m++) {
                if (data["channels"][(String(j))]["transitions"][(String(m))]["tUs"] === k) {
                  voltagesCH4[k] = data["channels"][(String(j))]["transitions"][(String(m))]["value"];
                } else {
                  voltagesCH4[k] = voltagesCH4[k-1];
                }
              }
            }
            if (channel === 5) {
              let channelTransitions = data["channels"][(String(j))]["transitions"];
              for (let m = 0; m < channelTransitions.length; m++) {
                if (data["channels"][(String(j))]["transitions"][(String(m))]["tUs"] === k) {
                  voltagesCH5[k] = data["channels"][(String(j))]["transitions"][(String(m))]["value"];
                } else {
                  voltagesCH5[k] = voltagesCH5[k-1];
                }
              }
            }
            if (channel === 6) {
              let channelTransitions = data["channels"][(String(j))]["transitions"];
              for (let m = 0; m < channelTransitions.length; m++) {
                if (data["channels"][(String(j))]["transitions"][(String(m))]["tUs"] === k) {
                  voltagesCH6[k] = data["channels"][(String(j))]["transitions"][(String(m))]["value"];
                } else {
                  voltagesCH6[k] = voltagesCH6[k-1];
                }
              }
            }
            if (channel === 7) {
              let channelTransitions = data["channels"][(String(j))]["transitions"];
              for (let m = 0; m < channelTransitions.length; m++) {
                if (data["channels"][(String(j))]["transitions"][(String(m))]["tUs"] === k) {
                  voltagesCH7[k] = data["channels"][(String(j))]["transitions"][(String(m))]["value"];
                } else {
                  voltagesCH7[k] = voltagesCH7[k-1];
                }
              }
            }
            if (channel === 8) {
              let channelTransitions = data["channels"][(String(j))]["transitions"];
              for (let m = 0; m < channelTransitions.length; m++) {
                if (data["channels"][(String(j))]["transitions"][(String(m))]["tUs"] === k) {
                  voltagesCH8[k] = data["channels"][(String(j))]["transitions"][(String(m))]["value"];
                } else {
                  voltagesCH8[k] = voltagesCH8[k-1];
                }
              }
            }
            if (channel === 9) {
              let channelTransitions = data["channels"][(String(j))]["transitions"];
              for (let m = 0; m < channelTransitions.length; m++) {
                if (data["channels"][(String(j))]["transitions"][(String(m))]["tUs"] === k) {
                  voltagesCH9[k] = data["channels"][(String(j))]["transitions"][(String(m))]["value"];
                } else {
                  voltagesCH9[k] = voltagesCH9[k-1];
                }
              }
            }
            if (channel === 10) {
              let channelTransitions = data["channels"][(String(j))]["transitions"];
              for (let m = 0; m < channelTransitions.length; m++) {
                if (data["channels"][(String(j))]["transitions"][(String(m))]["tUs"] === k) {
                  voltagesCH10[k] = data["channels"][(String(j))]["transitions"][(String(m))]["value"];
                } else {
                  voltagesCH10[k] = voltagesCH10[k-1];
                }
              }
            }
            if (channel === 11) {
              let channelTransitions = data["channels"][(String(j))]["transitions"];
              for (let m = 0; m < channelTransitions.length; m++) {
                if (data["channels"][(String(j))]["transitions"][(String(m))]["tUs"] === k) {
                  voltagesCH11[k] = data["channels"][(String(j))]["transitions"][(String(m))]["value"];
                } else {
                  voltagesCH11[k] = voltagesCH11[k-1];
                }
              }
            }
            if (channel === 12) {
              let channelTransitions = data["channels"][(String(j))]["transitions"];
              for (let m = 0; m < channelTransitions.length; m++) {
                if (data["channels"][(String(j))]["transitions"][(String(m))]["tUs"] === k) {
                  voltagesCH12[k] = data["channels"][(String(j))]["transitions"][(String(m))]["value"];
                } else {
                  voltagesCH12[k] = voltagesCH12[k-1];
                }
              }
            }
            if (channel === 13) {
              let channelTransitions = data["channels"][(String(j))]["transitions"];
              for (let m = 0; m < channelTransitions.length; m++) {
                if (data["channels"][(String(j))]["transitions"][(String(m))]["tUs"] === k) {
                  voltagesCH13[k] = data["channels"][(String(j))]["transitions"][(String(m))]["value"];
                } else {
                  voltagesCH13[k] = voltagesCH13[k-1];
                }
              }
            }
            if (channel === 14) {
              let channelTransitions = data["channels"][(String(j))]["transitions"];
              for (let m = 0; m < channelTransitions.length; m++) {
                if (data["channels"][(String(j))]["transitions"][(String(m))]["tUs"] === k) {
                  voltagesCH14[k] = data["channels"][(String(j))]["transitions"][(String(m))]["value"];
                } else {
                  voltagesCH14[k] = voltagesCH14[k-1];
                }
              }
            }
            if (channel === 15) {
              let channelTransitions = data["channels"][(String(j))]["transitions"];
              for (let m = 0; m < channelTransitions.length; m++) {
                if (data["channels"][(String(j))]["transitions"][(String(m))]["tUs"] === k) {
                  voltagesCH15[k] = data["channels"][(String(j))]["transitions"][(String(m))]["value"];
                } else {
                  voltagesCH15[k] = voltagesCH15[k-1];
                }
              }
            }
          times[k] = k;
          //console.log(channel);
        }
        }
        setChartData0(setChartData(times, "CH0", voltagesCH0, "yellow"));
        setChartData1(setChartData(times, "CH1", voltagesCH1, "#0d99d1"));
        setChartData2(setChartData(times, "CH2", voltagesCH2, "green"));
        setChartData3(setChartData(times, "CH3", voltagesCH3, "red"));
        setChartData4(setChartData(times, "CH4", voltagesCH4, "orange"));
        setChartData5(setChartData(times, "CH5", voltagesCH5, "pink"));
        setChartData6(setChartData(times, "CH6", voltagesCH6, "brown"));
        setChartData7(setChartData(times, "CH7", voltagesCH7, "purple"));
        setChartData8(setChartData(times, "CH8", voltagesCH8, "#917833"));
        setChartData9(setChartData(times, "CH9", voltagesCH9, "#5110e8"));
        setChartData10(setChartData(times, "CH10", voltagesCH10, "#f2070b"));
        setChartData11(setChartData(times, "CH11", voltagesCH11, "#d9c80f"));
        setChartData12(setChartData(times, "CH12", voltagesCH12, "#797adb"));
        setChartData13(setChartData(times, "CH13", voltagesCH13, "#32d4ed"));
        setChartData14(setChartData(times, "CH14", voltagesCH14, "#c77130"));
        setChartData15(setChartData(times, "CH15", voltagesCH15, "#47dec2"));

        /*if (ch0) {
          voltagesCH0[i] = ;
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
        }*/
        
        console.log(data);
        console.log("measurementTimeUs: " + measurementTimeUs);
        console.log("sampleRateHz: " + sampleRateHz);
        console.log("triggered: " + triggered);
        console.log("triggerTimestampUs: " + triggerTimestampUs);
        console.log("warnings:" + warnings);
        //data["warnings"]
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
          spanGaps: false,
          animation: false,
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
        animation: false,
        spanGaps: false,
        maintainAspectRatio: false,
        plugins: { legend: { display: false, labels: { color: "white", display: false } }, title: { display: false } },
        scales: { 
          x: { title: { display: true, text: "Time, us", color: "white", font: {size: 18} }, grid: { display: true, color: "#000000", }, ticks: { display: true, stepSize: 1, color: "white", font: {size: 14} }, type: 'linear', min: 294, max: 306 },
          y: { title: { display: false, color: "white", font: {size: 18} }, grid: { display: false, color: "#FFFFFF", }, ticks: { stepSize: 1, color: "black", font: {size: 14} }, min: 0.0, max: 1.0 }
        },
      }
    );

    const [chartData0, setChartData0] = useState(setChartData([], "CH0", [], "yellow"));
    const [chartData1, setChartData1] = useState(setChartData([], "CH1", [], "#0d99d1"));
    const [chartData2, setChartData2] = useState(setChartData([], "CH2", [], "green"));
    const [chartData3, setChartData3] = useState(setChartData([], "CH3", [], "red"));
    const [chartData4, setChartData4] = useState(setChartData([], "CH4", [], "orange"));
    const [chartData5, setChartData5] = useState(setChartData([], "CH5", [], "pink"));
    const [chartData6, setChartData6] = useState(setChartData([], "CH6", [], "brown"));
    const [chartData7, setChartData7] = useState(setChartData([], "CH7", [], "purple"));
    const [chartData8, setChartData8] = useState(setChartData([], "CH8", [], "#917833"));
    const [chartData9, setChartData9] = useState(setChartData([], "CH9", [], "#5110e8"));
    const [chartData10, setChartData10] = useState(setChartData([], "CH10", [], "#f2070b"));
    const [chartData11, setChartData11] = useState(setChartData([], "CH11", [], "#d9c80f"));
    const [chartData12, setChartData12] = useState(setChartData([], "CH12", [], "#797adb"));
    const [chartData13, setChartData13] = useState(setChartData([], "CH13", [], "#32d4ed"));
    const [chartData14, setChartData14] = useState(setChartData([], "CH14", [], "#c77130"));
    const [chartData15, setChartData15] = useState(setChartData([], "CH15", [], "#47dec2"));

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

  const renderChartXAxis = (listChannels) => {
    if (listChannels.length !== 0) {
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
      if (defaultMode === "record-data") {
        configureScalesForLiveMode(horizontalScale);
      } 

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
      if (defaultMode === "live-data") {
        configureScalesForRecordMode(horizontalScale);
      }
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

    const onSelectedChannelValueChange = (e) => {
      setSelectedChannel(Number(e.target.value));
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
          if (xStepSize === 50 && defaultMode === "live-data") {
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

  const configureScalesForRecordMode = (value) => {
    switch (value) {
      case "1us":
        setXStepSize(1);
        setXCenterValue((Number(selectedTimeout)) * 1000000 / 2);
        setXInputMin(6);
        setXInputMax((Number(selectedTimeout)) * 1000000 - 6);
        setXScaleOptions(
          { title: { display: true, text: "Time, us", color: "black", font: {size: 18} }, grid: { color: "#393b3d", }, ticks: { stepSize: 1, color: "black", font: {size: 14} }, type: 'linear', beginAtZero: false, min: (Number(selectedTimeout)) * 1000000 / 2 - 6, max: (Number(selectedTimeout)) * 1000000 / 2 + 6 }
        );
        setChartSpecOptions(setChartSpecOptionsUnified(1, (Number(selectedTimeout)) * 1000000 / 2 - 6, (Number(selectedTimeout)) * 1000000 / 2 + 6));
        setChartOptions(setChartOptionsUnified(1, (Number(selectedTimeout)) * 1000000 / 2 - 6, (Number(selectedTimeout)) * 1000000 / 2 + 6, yScaleOptions));
        break;
      case "10us":
        setXStepSize(10);
        setXCenterValue((Number(selectedTimeout)) * 1000000 / 2);
        setXInputMin(60);
        setXInputMax((Number(selectedTimeout)) * 1000000 - 60);
        setXScaleOptions(
          { title: { display: true, text: "Time, us", color: "black", font: {size: 18} }, grid: { color: "#393b3d", }, ticks: { stepSize: 10, color: "black", font: {size: 14} }, type: 'linear', beginAtZero: false, min: (Number(selectedTimeout)) * 1000000 / 2 - 60, max: (Number(selectedTimeout)) * 1000000 / 2 + 60 }
        );
        setChartSpecOptions(setChartSpecOptionsUnified(10, (Number(selectedTimeout)) * 1000000 / 2 - 60, (Number(selectedTimeout)) * 1000000 / 2 + 60));
        setChartOptions(setChartOptionsUnified(10, (Number(selectedTimeout)) * 1000000 / 2 - 60, (Number(selectedTimeout)) * 1000000 / 2 + 60, yScaleOptions));
        break;
      case "50us":
        setXCenterValue((Number(selectedTimeout)) * 1000000 / 2);
        setXStepSize(50);
        setXInputMin(300);
        setXInputMax((Number(selectedTimeout)) * 1000000 - 300);
        setXScaleOptions(
          { title: { display: true, text: "Time, us", color: "black", font: {size: 18} }, grid: { color: "#393b3d", }, ticks: { stepSize: 50, color: "black", font: {size: 14} }, type: 'linear', beginAtZero: true, min: (Number(selectedTimeout)) * 1000000 / 2 - 300, max: (Number(selectedTimeout)) * 1000000 / 2 + 300 }
        );
        setChartSpecOptions(setChartSpecOptionsUnified(50, (Number(selectedTimeout)) * 1000000 / 2 - 300, (Number(selectedTimeout)) * 1000000 / 2 + 300));
        setChartOptions(setChartOptionsUnified(50, (Number(selectedTimeout)) * 1000000 / 2 - 300, (Number(selectedTimeout)) * 1000000 / 2 + 300, yScaleOptions));
        break;
      case "20us":
        setXStepSize(20);
        setXCenterValue((Number(selectedTimeout)) * 1000000 / 2);
        setXInputMin(120);
        setXInputMax((Number(selectedTimeout)) * 1000000 - 120);
        setXScaleOptions(
          { title: { display: true, text: "Time, us", color: "black", font: {size: 18} }, grid: { color: "#393b3d", }, ticks: { stepSize: 20, color: "black", font: {size: 14} }, type: 'linear', beginAtZero: false, min: (Number(selectedTimeout)) * 1000000 / 2 - 130, max: (Number(selectedTimeout)) * 1000000 / 2 + 110 }
        );
        setChartSpecOptions(setChartSpecOptionsUnified(20, (Number(selectedTimeout)) * 1000000 / 2 - 130, (Number(selectedTimeout)) * 1000000 / 2 + 110));
        setChartOptions(setChartOptionsUnified(20, (Number(selectedTimeout)) * 1000000 / 2 - 130, (Number(selectedTimeout)) * 1000000 / 2 + 110, yScaleOptions));
        break;
      default:
        setXStepSize(xStepSize);
        setXScaleOptions(xScaleOptions);
        setChartOptions(chartOptions);
        setChartSpecOptions(chartSpecOptions);
    }
  }

  const configureScalesForLiveMode = (value) => {
    switch (value) {
      case "1us":
        setXStepSize(1);
        setXCenterValue(300);
        setXInputMin(6);
        setXInputMax(594);
        setXScaleOptions(
          { title: { display: true, text: "Time, us", color: "black", font: {size: 18} }, grid: { color: "#393b3d", }, ticks: { stepSize: 1, color: "black", font: {size: 14} }, type: 'linear', beginAtZero: false, min: 294, max: 306 }
        );
        setChartSpecOptions(setChartSpecOptionsUnified(1, 294, 306));
        setChartOptions(setChartOptionsUnified(1, 294, 306, yScaleOptions));
        break;
      case "10us":
        setXStepSize(10);
        setXCenterValue(300);
        setXInputMin(60);
        setXInputMax(540);
        setXScaleOptions(
          { title: { display: true, text: "Time, us", color: "black", font: {size: 18} }, grid: { color: "#393b3d", }, ticks: { stepSize: 10, color: "black", font: {size: 14} }, type: 'linear', beginAtZero: false, min: 240, max: 360 }
        );
        setChartSpecOptions(setChartSpecOptionsUnified(10, 240, 360));
        setChartOptions(setChartOptionsUnified(10, 240, 360, yScaleOptions));
        break;
      case "50us":
        setXStepSize(50);
        setXScaleOptions(
          { title: { display: true, text: "Time, us", color: "black", font: {size: 18} }, grid: { color: "#393b3d", }, ticks: { stepSize: 50, color: "black", font: {size: 14} }, type: 'linear', beginAtZero: true, min: 0, max: 600 }
        );
        setChartSpecOptions(setChartSpecOptionsUnified(50, 0, 600));
        setChartOptions(setChartOptionsUnified(50, 0, 600, yScaleOptions));
        break;
      case "20us":
        setXStepSize(20);
        setXCenterValue(300);
        setXInputMin(120);
        setXInputMax(480);
        setXScaleOptions(
          { title: { display: true, text: "Time, us", color: "black", font: {size: 18} }, grid: { color: "#393b3d", }, ticks: { stepSize: 20, color: "black", font: {size: 14} }, type: 'linear', beginAtZero: false, min: 170, max: 410 }
        );
        setChartSpecOptions(setChartSpecOptionsUnified(20, 170, 410));
        setChartOptions(setChartOptionsUnified(20, 170, 410, yScaleOptions));
        break;
      default:
        setXStepSize(xStepSize);
        setXScaleOptions(xScaleOptions);
        setChartOptions(chartOptions);
        setChartSpecOptions(chartSpecOptions);
    }
  }

      // handler for X-scale change
  const onHorizontalScaleValueChange = value => {
    setHorizontalScale(value);
    console.log(value);
    if (defaultMode === "live-data") {
      configureScalesForLiveMode(value);
    }
    if (defaultMode === "record-data") {
      configureScalesForRecordMode(value);
    }
  };

  const onXScaleInputChange = e => {
    setXCenterValue(e.target.value);
    setXScaleOptions(
      { title: { display: true, text: "Time, us", color: "black", font: {size: 18} }, grid: { color: "#393b3d", }, ticks: { stepSize: xStepSize, color: "black", font: {size: 14} }, type: 'linear', beginAtZero: false, min: (Number(e.target.value) - 6 * xStepSize), max: (Number(e.target.value) + 6 * xStepSize) }
    );
    setChartOptions(setChartOptionsUnified(xStepSize, (Number(e.target.value) - 6 * xStepSize), (Number(e.target.value) + 6 * xStepSize), yScaleOptions));
    setChartSpecOptions(setChartSpecOptionsUnified(xStepSize, (Number(e.target.value) - 6 * xStepSize), (Number(e.target.value) + 6 * xStepSize)));
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
            {renderChartXAxis(listChannels)}
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
                <select value={selectedChannel} onChange={onSelectedChannelValueChange} disabled={triggerType === "immediate" || isRecordRun || isRun} className="logic-analyzer-select" name="logicAnalyzerChannels">
                    {listChannels.map((channel)=> {
                        return (
                            <option key={channel}>
                                CH{channel}
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
                                value="falling"
                                checked={triggerType === "falling"}
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
                                value="rising"
                                checked={triggerType === "rising"}
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