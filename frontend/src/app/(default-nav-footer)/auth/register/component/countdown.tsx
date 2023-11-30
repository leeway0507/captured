"use client";
import { useEffect, useState } from "react";

export default function Countdown({ refresh }: { refresh?: boolean }) {
    const [countdown, setCountdown] = useState(180); // 3 minutes in seconds

    useEffect(() => {
        refresh && setCountdown(180);
    }, [refresh]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown((prevCountdown) => {
                if (prevCountdown > 0) {
                    return prevCountdown - 1;
                } else {
                    clearInterval(interval); // Stop the countdown when it reaches 0
                    // You can add any additional logic here when the countdown reaches 0
                    return 0;
                }
            });
        }, 1000); // Update every second

        return () => clearInterval(interval); // Cleanup the interval on component unmount
    }, []); // Empty dependency array means useEffect runs once after the initial render

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
    };
    return <div className="text-xs text-gray-500">{formatTime(countdown)}</div>;
}
