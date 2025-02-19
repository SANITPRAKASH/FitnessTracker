import { faCode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox, Icon, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useGlobalContextProvider } from "@/app/contextApi";
import { AreaType, HabitType } from "@/app/Types/GlobalTypes";
import { getCurrentDayName } from "@/app/utils/allHabitsUtils/DateFunctions";
import EmptyHabitsPlaceHolder from "@/app/EmptyPlaceHolders/HabitsEmptyPlaceHolder"
import WellDonePlaceHolder from "@/app/EmptyPlaceHolders/HabitsEmptyPlaceHolder";
import convertIconsToTextOfHabits from "@/app/utils/allHabitsUtils/editHabits";
import { darkModeColor, defaultColor } from "../../../../../colors";
const { v4: uuidv4 } = require('uuid');


export function HabitCard({ singleHabit }: { singleHabit: HabitType }) {
    const { darkModeObject, allHabitsObject, selectedCurrentDayObject, openDropDownObject, dropDownPositionsObject, selectedItemsObject } = useGlobalContextProvider();
    const { isDarkMode } = darkModeObject;
    const { allHabits, setAllHabits } = allHabitsObject;
    const { selectedCurrentDate } = selectedCurrentDayObject;
    const { setOpenDropDown } = openDropDownObject;
    const {setDropDownPositions } = dropDownPositionsObject;
    const { setSelectedItems } = selectedItemsObject;

    const [checked, setChecked] = useState(
        singleHabit.completedDays.some((day) => day.date === selectedCurrentDate)
    );
    
    function handleClickedCheckbox(event: React.ChangeEvent<HTMLInputElement>) {
        const checked = event.target.checked;
        setChecked(checked);

        if(checked) {
            checkHabit();
        } else {
            uncheckTheHabit();
        }
    }

    function checkHabit() {
        const completedDay = {
            _id: uuidv4(),
            date: selectedCurrentDate,
        };

        const updatedHabits: HabitType = {
            ...singleHabit,
            completedDays: [...singleHabit.completedDays, completedDay],
        };

        const habitToUpdateInTheServer = convertIconsToTextOfHabits(updatedHabits);
        editTheHabitInServer(habitToUpdateInTheServer);
        
        const updateAllHabits: HabitType[] = allHabits.map((habit) => {
            if(habit._id === updatedHabits._id) {
                return updatedHabits;
            } else {
                return habit;
            }
        });
        setAllHabits(updateAllHabits);
    }



    function uncheckTheHabit() {
        const updatedHabits: HabitType = {
            ...singleHabit,
            completedDays: singleHabit.completedDays.filter(
                (day) => day.date !== selectedCurrentDate
            ),
        };

        const updateAllHabits: HabitType[] = allHabits.map((habit) => {
            if(habit._id === updatedHabits._id) {
                return updatedHabits;
            } else {
                return habit;
            }
        });
        setAllHabits(updateAllHabits);
    }

    function handleClickThreeDots(event: React.MouseEvent<HTMLButtonElement>) {
        const target = event.target as HTMLElement;
        const rect = target.getBoundingClientRect();
        const top = rect.top;
        const left = rect.left;
        setDropDownPositions({top, left});

        event.stopPropagation();
        setOpenDropDown(true);

        setSelectedItems(singleHabit);
    }

    useEffect(() => {
        const isCompleted = singleHabit.completedDays.some(
            (day) => day.date === selectedCurrentDate
        );
        setChecked(isCompleted);
    }, [singleHabit, selectedCurrentDate, allHabits]);

    return (
        <div className=" flex p-3 items-center justify-between ">
            <Checkbox
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<CheckCircleIcon />}
                checked = {checked}
                onChange = {handleClickedCheckbox}
                sx={{
                    color: defaultColor.default,
                    "&.Mui-checked": {
                        color: defaultColor.default,
                    },
                }}
            />
            <div
                style={{
                    backgroundColor: isDarkMode
                        ? darkModeColor.backgroundSlate
                        : defaultColor.backgroundSlate,
                }}
                className=" flex justify-between gap-2 w-full p-3 py-4 rounded-md "
            >
                <div className=" w-full ">

                    <div className=" flex gap-2 justify-between ">
                        <div className=" flex gap-2 items-center ">
                            <FontAwesomeIcon
                                className=" p-3 rounded-full w-4 h-4 bg-customBlue text-white"
                                height={20}
                                width={20}
                                icon={singleHabit.icon}
                            />
                            <span className="">{singleHabit.name}</span>
                        </div>
                    </div>

                    <div className=" flex gap-2 mt-3 ">
                        {singleHabit.areas.map((singleArea, index) => (
                            <div
                                key={index}
                                style={{
                                    color: isDarkMode
                                        ? darkModeColor.textColor
                                        : defaultColor.default,
                                    backgroundColor: isDarkMode
                                        ? defaultColor[50]
                                        : defaultColor[100],
                                }}
                                className=" p-1 text-[12px] rounded-md px-2"
                            >
                                <span className="">{singleArea.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-10 flex items-center justify-center ">
                    <IconButton onClick = {handleClickThreeDots}> 
                        <MoreVertIcon sx={{ color: isDarkMode ? "white" : "gray" }} />
                    </IconButton>
                </div>
            </div>
        </div>
    );
}

async function editTheHabitInServer(habit: HabitType) {
    const response = await fetch(`/api/habits?habitId=${habit._id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify({
            name: habit.name,
            icon: habit.icon,
            areas: habit.areas,
            frequency: habit.frequency,
            completedDays: habit.completedDays,
        }),
    });

    if(!response.ok) {
        //throw new Error("Failed to edit habit");
    }
}