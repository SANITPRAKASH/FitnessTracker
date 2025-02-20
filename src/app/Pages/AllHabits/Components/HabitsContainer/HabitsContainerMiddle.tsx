import { faCode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useGlobalContextProvider } from "@/app/contextApi";
import { HabitType } from "@/app/Types/GlobalTypes";
import { getCurrentDayName } from "@/app/utils/allHabitsUtils/DateFunctions";
import EmptyHabitsPlaceHolder from "@/app/EmptyPlaceHolders/HabitsEmptyPlaceHolder";
import { HabitCard } from "../SingleHabitCard";
import { SuccessIcon } from "@/app/Assests/SuccessIcon";
import { defaultColor } from "../../../../../../colors";

const { v4: uuidv4 } = require("uuid");

export default function HabitsContainerMiddle() {
  const {
    allHabitsObject,
    selectedCurrentDayObject,
    selectedAreaStringObject,
    allFilteredHabitsObject,
  } = useGlobalContextProvider();
  const { allHabits } = allHabitsObject;
  const { allFilteredHabits, setAllFilteredHabits } = allFilteredHabitsObject;
  const { selectedCurrentDate } = selectedCurrentDayObject;
  const { selectedAreaString } = selectedAreaStringObject;

  useEffect(() => {
    const getTwoFirstDayLetter = getCurrentDayName(selectedCurrentDate).slice(0, 2);

    let filteredHabitsByArea: HabitType[] = [];
    const filteredHabitsByFrequency = allHabits.filter((singleHabit) =>
      singleHabit.frequency[0].days.some((day) => day === getTwoFirstDayLetter)
    );

    if (selectedAreaString !== "All") {
      filteredHabitsByArea = filteredHabitsByFrequency.filter((habit) =>
        habit.areas.some((area) => area.name === selectedAreaString)
      );
    } else {
      filteredHabitsByArea = filteredHabitsByFrequency;
    }

    setAllFilteredHabits(filteredHabitsByArea);
  }, [selectedCurrentDate, allHabits, selectedAreaString]);

  const isAllHabitsCompleted =
    allFilteredHabits.length > 0 &&
    allFilteredHabits.every((habit) =>
      habit.completedDays.some((day) => day.date === selectedCurrentDate)
    );

    return (
        <div className="p-3 text-default"> {/* Apply global text color */}
          {allFilteredHabits.length === 0 ? (
            <EmptyHabitsPlaceHolder />
          ) : (
            <>
              {isAllHabitsCompleted && (
                <div className="flex justify-center items-center p-5 flex-col text-default">
                  <SuccessIcon color={defaultColor.textColor50} />
                  <span className="text-[13px] text-default w-64 text-center mt-6">
                    {`Great job! You've completed all your habits for today! ⭐`}
                  </span>
                </div>
              )}
      
              {allFilteredHabits.map((singleHabit, singleHabitIndex) => (
                <div key={singleHabitIndex} className="text-default">
                  {singleHabit.completedDays.some(
                    (day) => day.date === selectedCurrentDate
                  ) === false && <HabitCard singleHabit={singleHabit} />}
                </div>
              ))}
            </>
          )}
        </div>
      );
      
}
