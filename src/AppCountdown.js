import Countdown, { zeroPad } from 'react-countdown';
import { useState } from 'react';

//const getLocalStorageValue = (s) => localStorage.getItem(s);

// formatting countdown
const renderer = ({ minutes, seconds }) => {
    return <span>{zeroPad(minutes)}:{zeroPad(seconds)}</span>;
};

function AppCountdown({timeLeft, isStart}) {

    const [isCompleted, setIsCompleted] = useState(false);
    const [isCompletedOk, setIsCompletedOk] = useState(false);
    const [data, setData] = useState({ date: Date.now(), delay: timeLeft });

    // ----- Countdown -----
    /*useEffect(() => {

        const savedDate = getLocalStorageValue("end_time");
        // console.log(savedDate);
        if (savedDate != null && !isNaN(savedDate)) {
            const currentTime = Date.now();
            const delta = parseInt(savedDate, 10) - currentTime;

        if (wantedDelay < delta) {
            if (localStorage.getItem("end_time").length > 0)
                localStorage.removeItem("end_time");
            } else {
                setData({ date: currentTime, delay: delta });
            }
        }
    }, [wantedDelay]);*/

    // invoked when countdown is completed (00:00)
    const onCountdownComplete = () => {
        console.log("onCountdownComplete");
        if (localStorage.getItem("end_time") != null) {
          localStorage.removeItem("end_time");
        }
        setIsCompleted(true);
    }

    // invoked when countdown is started
    const onCountdownStart = () => {
        if (localStorage.getItem("end_time") == null) {
            localStorage.setItem("end_time", 
            JSON.stringify(data.date + data.delay));
        }
    }

    const onCountdownCompletedOk = () => {
        setIsCompletedOk(true);
    }

    const renderOnCountdownComplete = (isCompleted) => {
        if (isCompleted) {
          if (!isCompletedOk) {
          return <div className="countdown-completed">
            <div className="countdown-completed-info">Your experiment time is over! 
            <br/>Please, let other students use this lab.<br/>
            <button className="btn btn-primary countdown-completed-ok" 
            onClick={onCountdownCompletedOk}>Ok</button></div>
          </div>
          } else {
            return <div className="countdown-completed"></div>
          }
        }
      }

    return (
            <div className="countdown">
                <span className="bi bi-stopwatch"></span>
                <div className="countdown-value">
                  <Countdown 
                    date={data.date + data.delay}
                    autoStart={isStart}
                    renderer={renderer}
                    onStart={onCountdownStart}
                    onComplete={onCountdownComplete}/>
                  {renderOnCountdownComplete(isCompleted)}
                </div>
            </div>
    );

}

export default AppCountdown;