import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { useGlobalContextProvider } from "@/app/contextApi";
import { HabitType } from "@/app/Types/GlobalTypes";
import { getCurrentDayName } from "@/app/utils/allHabitsUtils/DateFunctions";
import AllHabits from "../../AllHabits";
import { calculateStreak } from "@/app/Pages/Statistics/Components/StatisticsBoard";
import { darkModeColor, defaultColor } from "../../../../../../colors";


function MainStatistics() {
    const { darkModeObject, selectedCurrentDayObject, allHabitsObject } = useGlobalContextProvider();
    const { isDarkMode } = darkModeObject;
    const { selectedCurrentDate } = selectedCurrentDayObject;
    const { allHabits, setAllHabits } = allHabitsObject;


    const [statisticsInfo, setStatisticsInfo] = useState([
        { id: 1, num: 7, subTitle: "Best streaks" },
    ]);

    const [progress, setProgress] = useState<number>(0);

    function calculateThePercentageOfTodaysProgress(
        allHabits: HabitType[]
    ): number {
        if (allHabits.length === 0 || !selectedCurrentDate) {
            return 0;
        }

        let totalHabitsOfCompletedDays = 0;
        let totalAllHabitsOfCurrentDay = 0;

        if (allHabits) {
            const completedHabitsOfCurrentDate: HabitType[] = allHabits.filter(
                (habit) =>
                    habit.completedDays.some((day) => day.date === selectedCurrentDate)
            );

            totalHabitsOfCompletedDays = completedHabitsOfCurrentDate.length;

            const getTwoLetterOfCurrentDay = getCurrentDayName(selectedCurrentDate).slice(0, 2);

            const allhabitsOfCurrentDay = allHabits.filter((habit) =>
                habit.frequency[0].days.some((day) => day === getTwoLetterOfCurrentDay)
            );

            totalAllHabitsOfCurrentDay = allhabitsOfCurrentDay.length;
            const result = parseFloat(((totalHabitsOfCompletedDays / totalAllHabitsOfCurrentDay) * 100).toFixed(2));
            
            if (result === undefined || isNaN(result)) {
                return 0;
            }
            return result ?? 0;
        }
        return 0;
    }

    useEffect(() => {
        setProgress(calculateThePercentageOfTodaysProgress(allHabits));
    }, [selectedCurrentDate, allHabits])

    useEffect(() => {
        const streaks = allHabits.map((habit) => calculateStreak(habit));
        const totalStreak = streaks.reduce((a, b) => a + b, 0);

        const copyStatsInfo = [...statisticsInfo];
        copyStatsInfo[0].num = totalStreak;
        setStatisticsInfo(copyStatsInfo);
    }, [allHabits])

    return (
        <div
            style={{
                backgroundColor: isDarkMode
                    ? darkModeColor.backgroundSlate
                    : defaultColor.backgroundSlate,
            }}
            className=" flex mx-4 flex-col gap-6 justify-center items-center mt-14 rounded-xl p-5 pt-7 "
        >
            <span className="font-bold text-xl cursor-pointer hover:text-customBlue">
                Statistics
            </span>

            <div className="relative pt-3">
                <CircularProgressBar progress={calculateThePercentageOfTodaysProgress(allHabits)} />
                <div className="flex flex-col justify-center items-center absolute top-[54%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
                    <span className="font-bold text-xl text-customBlue">{calculateThePercentageOfTodaysProgress(allHabits)}%</span>
                    <span className="text-[11px]">{`Today's Progress`}</span>
                </div>
            </div>

            <div className=" my-4 flex justify-center gap-6 flex-wrap items-center w-full">
                {statisticsInfo.map((singleItem, singleItemIndex) => (
                    <div className="flex items-center gap-3 " key={singleItemIndex}>
                        <div className="w-2 h-2 bg-customBlue rounded-full"></div>
                        <div className="text-[12px]">
                            <span className="flex flex-col font-bold ">{singleItem.num}</span>
                            <span
                                style={{
                                    color: isDarkMode
                                        ? darkModeColor.textColor
                                        : defaultColor.textColor50,
                                }}
                                className=" "
                            >
                                {singleItem.subTitle}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

interface CircularProgressBarProps {
    progress: number;
}
const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
    progress,
}) => {
    const data = [
        { name: "Completed", value: progress },
        { name: "Remaining", value: 100 - progress }
    ];

    const COLORS = ["#0000FF", "#edf2f4"];

    return (
        <PieChart
            width={200}
            height={160}
            margin={{ top: -20, right: 0, bottom: 40, left: 0 }}
        >
            <Pie
                data={data}
                cx={100}
                cy={100}
                startAngle={180}
                endAngle={-180}
                innerRadius={66}
                outerRadius={progress === 100 ? 80 : 78}
                fill="#888fd8"
                paddingAngle={0}
                dataKey="value"
                stroke="none"
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
        </PieChart>
    );
};

export default MainStatistics;