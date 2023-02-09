import { Fragment, useEffect, useState, useMemo } from "react";
import Countdown from 'react-countdown';
const CountDownTimer = (props) => {

    const [index, setIndex] = useState(0);

    const time = useMemo(() => {
        return Date.now() + 90000    
    }, [index, props.current]);

    const renderer = ({ minutes, seconds, completed }) => {
        if (!completed) {
            return <span>{minutes}:{ seconds > 9 ? "" + seconds: "0" + seconds}</span>;
        }
    };

    const timeCompleted = () => {
        props.timeEnd();
        setIndex(index => index + 1);
    }

    return (
        <Countdown key={index} onComplete={timeCompleted} date={time} 
            renderer={renderer}
        />
    )
}

export default CountDownTimer;