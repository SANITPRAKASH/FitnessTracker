import { faCode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox, IconButton } from "@mui/material";
import React from "react";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useGlobalContextProvider } from "@/app/contextApi";
import { HabitCard } from "./SingleHabitCard";
import { darkModeColor, defaultColor } from "../../../../../colors";

function HabitsCompleted() {
    const { darkModeObject, allFilteredHabitsObject, selectedCurrentDayObject } = useGlobalContextProvider();
    const { selectedCurrentDate } = selectedCurrentDayObject;
    const { isDarkMode } = darkModeObject;
    const { allFilteredHabits } = allFilteredHabitsObject;

    const areAllHabitsNotCompleted = allFilteredHabits.every((singleHabit) => {
        return !singleHabit.completedDays.some(
            (day) => day.date === selectedCurrentDate
        );
    });

    return (
        <div
            style={{
                color: isDarkMode ? darkModeColor.textColor : defaultColor.textColor50,
                backgroundColor: isDarkMode
                    ? darkModeColor.background
                    : defaultColor.background,
            }}
            className="mt-7 p-8 rounded-md">
            <span className="font-bold text-lg mb-2">Habits Completed</span>
            <div className="mt-7 opacity-50">
                <div className="mt-10 w-full flex justify-center">
                    {areAllHabitsNotCompleted && (
                        <p className="text-sm  w-72 text-center">{`Habit stacking is like a superpower! Don't let it go to waste!`}</p>
                    )}
                </div>

                {allFilteredHabits.map((singleHabit, index) => (
                    <div key={index}>
                        {singleHabit.completedDays.some(
                            (day) => day.date === selectedCurrentDate
                        ) === true && <HabitCard singleHabit={singleHabit} />}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HabitsCompleted;

/*
  <div className=" flex p-3 items-center justify-between ">
            <Checkbox
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<CheckCircleIcon />}
                sx={{
                    color: defaultColor.default,
                    "&.Mui-checked": {
                        color: defaultColor.default,
                    },
                }}
            />

            <div
                style={{
                    backgroundColor: isDarkMode ?
                        darkModeColor.backgroundSlate : defaultColor.backgroundSlate,
                }}
                className="flex justify-between gap-2 w-full p-3 py-4 rounded-md ">

                <div className=" w-full">
                    <div className=" flex gap-2 justify-between ">
                        <div className=" flex gap-2 items-center">
                            <FontAwesomeIcon
                                className=" p-3 rounded-full w-4 h-4 bg-customBlue text-white"
                                height={20}
                                width={20}
                                icon={faCode}
                            />
                            <span className="">Coding</span>
                        </div>
                    </div>

                    <div className=" flex gap-2 mt-3">
                        <div
                            style={{
                                color: isDarkMode ? darkModeColor.textColor : defaultColor.default,
                                backgroundColor: isDarkMode
                                    ? defaultColor[50]
                                    : defaultColor[100],
                            }}
                            className="p-1 text-[12px] rounded-md px-2"
                        >
                            <span className="">Area1</span>
                        </div>

                        <div
                            style={{
                                color: isDarkMode ? darkModeColor.textColor : defaultColor.default,
                                backgroundColor: isDarkMode
                                    ? defaultColor[50]
                                    : defaultColor[100],
                            }} className="p-1 text-[12px] rounded-md px-2"
                        >
                            <span className="">Area1</span>
                        </div>
                    </div>
                </div>
                <div className="w-10 flex items-center justify-center ">
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
        </div>
        */