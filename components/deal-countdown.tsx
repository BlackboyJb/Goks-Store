"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";

//static target date
const Target_Date = new Date("2025-04-18T00:00:00");

//function to caculate time remaining
const caculateTimeRemaining = (targetDate: Date) => {
    const currentTime = new Date();
    const timeDifference = Math.max(Number(targetDate) - Number(currentTime), 0);
    return {
        days: Math.floor(timeDifference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
            (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((timeDifference % (1000 * 60)) / 1000),
    };
};

const DealCountdown = () => {
    const [time, setTime] = useState<ReturnType<typeof caculateTimeRemaining>>();

    useEffect(() => {
        //caculate remaining time on client
        setTime(caculateTimeRemaining(Target_Date));

        const timeInterval = setInterval(() => {
            const newTime = caculateTimeRemaining(Target_Date);
            setTime(newTime);

            if (
                newTime.days === 0 &&
                newTime.hours === 0 &&
                newTime.minutes === 0 &&
                newTime.seconds === 0
            ) {
                clearInterval(timeInterval);
            }
            return () => clearInterval(timeInterval);
        }, 1000);
    }, []);

    //if there's no time
    if (!time) {
        return (
            <section className="grid grid-cols-1 md:grid-cols-2 my-20">
                <div className="flex flex-col gap-2 justify-center">
                    <h3 className="text-3xl font-bold">Countdown Coming....</h3>
                </div>
            </section>
        );
    }

    //when deal has ended
    if (time.days === 0 &&
        time.hours === 0 &&
        time.minutes === 0 &&
        time.seconds === 0) {
        return (
            <section className="min-h-[20vh] flex justify-center items-center my-20 text-center">
                <div className="flex flex-col gap-4 items-center">
                    <h3 className="text-3xl font-bold">Deal has Ended</h3>
                    <p>Look out for new Promotions...</p>
                    <Button asChild>
                        <Link href="/search">View all Products</Link>
                    </Button>
                </div>
            </section>


        );
    }

    return (
        <section className="grid grid-cols-1 md:grid-cols-2 my-20">
            <div className="flex flex-col gap-2 justify-center">
                <h3 className="text-3xl font-bold">Holiday deals</h3>
                <p>
                    Get ready for a shopping experience like never before with our Deals
                    of the Month! Every purchase comes with exclusive perks and offers,
                    making this month a celebration of savvy choices and amazing deals.
                    Don&apos;t miss out! 🎁🛒
                </p>
                <ul className="grid grid-cols-4">
                    <StatBox label="Days" value={time.days} />
                    <StatBox label="Hours" value={time.hours} />
                    <StatBox label="Minute" value={time.minutes} />
                    <StatBox label="Seconds" value={time.seconds} />
                </ul>
                <div className="text-center">
                    <Button asChild>
                        <Link href="/search">View all Products</Link>
                    </Button>
                </div>
            </div>
            <div className="flex justify-center">
                <Image
                    src="/images/promo.jpg"
                    alt="promotion"
                    width={300}
                    height={200}
                />
            </div>
        </section>
    );
};

const StatBox = ({ label, value }: { label: string; value: number }) => {
    return (
        <li className="p-4 w-full text-center">
            <p className="text-3xl font-bold">{value}</p>
            <p>{label}</p>
        </li>
    );
};

export default DealCountdown;
