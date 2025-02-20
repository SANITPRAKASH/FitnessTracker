import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBorderAll,
    faChartSimple,
    faCheck,
    faFaceSmile
} from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useGlobalContextProvider } from "@/app/contextApi";
import { getCurrentDayName } from "@/app/utils/allHabitsUtils/DateFunctions";
import { HabitType } from "@/app/Types/GlobalTypes";
import { darkModeColor, defaultColor } from "../../../../../colors";

type StatisticsCard = {
    id: number;
    icon: IconProp;
    counter: number;
    text: string;
};

export default function StatisticsBoard() {
    const [statisticsCard, setStatisticsCard] = useState<StatisticsCard[]>([
        { id: 1, icon: faFaceSmile, counter: 0, text: "Total Habits" },
        { id: 2, icon: faBorderAll, counter: 0, text: "Total Perfect Days" },
        { id: 3, icon: faChartSimple, counter: 0, text: "Average Per Daily" },
        { id: 4, icon: faCheck, counter: 0, text: "Best Streak" },
    ]);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const {
        darkModeObject: { isDarkMode },
        allHabitsObject: { allHabits },
    } = useGlobalContextProvider();

    const filteredStatisticsCard =
        windowWidth < 640
            ? statisticsCard.filter((card) => card.text !== "Average Per Daily")
            : statisticsCard;

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (allHabits.length === 0) return;

        const dateCounts: { [key: string]: number } = {};
        allHabits.forEach((habit) => {
            habit.completedDays.forEach((day) => {
                dateCounts[day.date] = (dateCounts[day.date] || 0) + 1;
            });
        });

        let perfectDayCount = 0;
        let totalHabitsInEachDay: { [key: string]: number } = {};
        const uniqueDates = Object.keys(dateCounts);

        for (const date of uniqueDates) {
            const dayAbbreviation = getCurrentDayName(date).slice(0, 2);
            const numberOfHabitsEachDay = allHabits.filter((habit) =>
                habit.frequency[0].days.includes(dayAbbreviation)
            ).length;

            totalHabitsInEachDay[date] = numberOfHabitsEachDay;
        }

        for (const date in totalHabitsInEachDay) {
            if (totalHabitsInEachDay[date] === dateCounts[date]) {
                perfectDayCount++;
            }
        }

        const totalCompletedHabits = Object.values(dateCounts).reduce((a, b) => a + b, 0);
        const averagePerDaily = uniqueDates.length
            ? (totalCompletedHabits / uniqueDates.length).toFixed(2)
            : "0.00";

        const totalStreak = allHabits.reduce((acc, habit) => acc + calculateStreak(habit), 0);

        setStatisticsCard([
            { id: 1, icon: faFaceSmile, counter: allHabits.length, text: "Total Habits" },
            { id: 2, icon: faBorderAll, counter: perfectDayCount, text: "Total Perfect Days" },
            { id: 3, icon: faChartSimple, counter: parseFloat(averagePerDaily), text: "Average Per Daily" },
            { id: 4, icon: faCheck, counter: totalStreak, text: "Best Streak" },
        ]);
    }, [allHabits]);

    return (
        <div
            style={{
                backgroundColor: isDarkMode ? darkModeColor.background : "white",
                color: isDarkMode ? darkModeColor.textColor : "black",
            }}
            className="p-5 mt-4 rounded-md grid grid-cols-4 gap-4 max-sm:grid-cols-3"
        >
            {filteredStatisticsCard.map((card) => (
                <div
                    key={card.id}
                    style={{
                        backgroundColor: isDarkMode
                            ? darkModeColor.backgroundSlate
                            : defaultColor.backgroundSlate,
                    }}
                    className="flex flex-col gap-1 items-start p-5 rounded-md"
                >
                    <FontAwesomeIcon className="text-customBlue" icon={card.icon} />
                    <span className="font-bold text-xl mt-3">{card.counter}</span>
                    <span className="font-light text-sm">{card.text}</span>
                </div>
            ))}
        </div>
    );
}

export function calculateStreak(habit: HabitType): number {
    const getDayOfWeek = (dateString: string): string => {
        const date = new Date(dateString);
        const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
        return days[date.getUTCDay()];
    };

    const completedDays = habit.completedDays.map((day) => day.date);
    const frequency = habit.frequency[0].days;
    const completedDaysOfWeek = completedDays.map(getDayOfWeek);

    let streak = 0;
    let maxStreak = 0;
    let lastIndex = -1;

    completedDaysOfWeek.forEach((day) => {
        const currentIndex = frequency.indexOf(day);
        if (currentIndex === -1) {
            streak = 0;
        } else {
            if (lastIndex === -1 || currentIndex === (lastIndex + 1) % frequency.length) {
                streak++;
            } else {
                streak = 1;
            }
            lastIndex = currentIndex;
            maxStreak = Math.max(maxStreak, streak);
        }
    });

    return maxStreak;
}
