
"use client";

import { useGlobalContextProvider } from "@/app/contextApi"
import { faArrowAltCircleDown } from "@fortawesome/free-regular-svg-icons"
import { faStar, faChevronDown, faClose, faQuestion } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { memo, useRef, useEffect, useState } from "react";
import IconsWindow from "./IconsWindow/IconsWindow";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import HabitWindowAreas from "./HabitWindow/HabitWindowAreas"
import { AreaType } from "@/app/Types/GlobalTypes";
import { addNewHabit } from "@/app/utils/allHabitsUtils/addNewHabit"
import toast from "react-hot-toast"
import { editHabit } from "@/app/utils/allHabitsUtils/editHabits"
import { deleteHabit } from "@/app/utils/allHabitsUtils/deleteHabit";
const { v4: uuidv4 } = require('uuid');
import { useUser } from "@clerk/nextjs";
import { darkModeColor, defaultColor } from "../../../../../colors";


type completedDays = {
    _id: string,
    date: string,
}

type FrequencyType = {
    type: string;
    days: string[];
    number: number;
}

type HabitType = {
    _id?: string;
    name: string;
    icon: IconProp;
    clerkUserId: string;
    frequency: FrequencyType[];
    areas: AreaType[];
    completedDays: completedDays[];
}

type RepeatOption = {
    name: string;
    isSelected: boolean;
}

type DayOption = {
    id: number,
    name: string,
    isSelected: boolean;
}

// const HeaderMemo = memo(Header);
// const InputNameAndIconButtonMemo = memo(InputNameAndIconButton);

function HabitWindow() {
    const { habitWindowObject, darkModeObject, selectedItemsObject } = useGlobalContextProvider();
    const { openHabitWindow } = habitWindowObject;
    const { isDarkMode } = darkModeObject;
    const { selectedItems, setSelectedItems } = selectedItemsObject;
    const { user } = useUser();
    
    const [habitItem, setHabitItem] = useState<HabitType>({
        _id: "",
        name: "",
        icon: faStar,
        clerkUserId: user?.id || "",
        frequency: [{ type: "Daily", days: ["Mo"], number: 1 }],
        areas: [],
        completedDays: [],
    });

    const [openIconWindow, setOpenIconWindow] = useState<boolean>(false);
    const [iconSelected, setIconSelected] = useState<IconProp>(habitItem.icon);

    useEffect(() => {
        if (!openHabitWindow) {
            setHabitItem({
                _id: "",
                name: "",
                icon: faStar,
                clerkUserId: user?.id || "",
                frequency: [{ type: "Daily", days: ["Mo"], number: 1 }],
                areas: [],
                completedDays: [],
            });
        } else {
            if (selectedItems) {
                setHabitItem(selectedItems as HabitType);
            }
        }
    }, [openHabitWindow]);

    useEffect(() => {
        if (selectedItems) {
            setHabitItem(selectedItems as HabitType);
        }
    }, [selectedItems])


    //change here
    const onUpdateHabitName = (inputText: string) => {
        const copyHabitItem = { ...habitItem };
        copyHabitItem.name = inputText;
        setHabitItem(copyHabitItem);
    };

    function getSelectedAreaItems(selectedAreaItems: AreaType[]) {
        const copyHabitsItem = { ...habitItem };

        copyHabitsItem.areas = selectedAreaItems;
        setHabitItem(copyHabitsItem);
    }

    function changeRepeatOption(repeatOptions: RepeatOption[]) {
        const filterIsSelected = repeatOptions.filter(
            (singleOption) => singleOption.isSelected
        );

        const nameOfSelectedOption = filterIsSelected[0].name;

        const copyHabitsItem = { ...habitItem };

        copyHabitsItem.frequency[0].type = nameOfSelectedOption;

        setHabitItem(copyHabitsItem);
    }

    function changeDaysOption(allDays: DayOption[]) {
        const selectedDays = allDays.filter((singleDay) => singleDay.isSelected).map((day => day.name));

        const copyHabitsItem = { ...habitItem };

        copyHabitsItem.frequency[0].days = selectedDays;

        setHabitItem(copyHabitsItem);
    }

    function changeWeeksOption(weeks: number) {

        const copyHabitsItem = { ...habitItem };

        copyHabitsItem.frequency[0].number = weeks;

        setHabitItem(copyHabitsItem);
    }



    useEffect(() => {
        const copyHabitItem = { ...habitItem };
        copyHabitItem.icon = iconSelected;
        setHabitItem(copyHabitItem);
    }, [iconSelected]);


    // this use effect was messing some things up.
    // useEffect(() => {
    //     if (openHabitWindow && !selectedItems) {
    //         setHabitItem({
    //             _id: "",
    //             name: "",
    //             icon: faStar,
    //             frequency: [{ type: "Daily", days: ["Mo"], number: 1 }],
    //             areas: [],
    //             completedDays: [],
    //         });
    //     }
    // }, [openHabitWindow]);


    return (
        <div
            style={{
                backgroundColor: isDarkMode ? darkModeColor.background : "white",
                color: isDarkMode ? darkModeColor.textColor : "black",
            }}
            className={` top-[3%] left-1/2 transform -translate-x-1/2 w-[80%] z-50 p-10
                rounded-md shadow-md ${openHabitWindow ? "absolute" : "hidden"}`}
        >
            <IconsWindow
                openIconWindow={openIconWindow}
                setOpenIconWindow={setOpenIconWindow}
                iconSelected={iconSelected}
                setIconSelected={setIconSelected}
            />
            <Header />
            {!selectedItems && (
                <InputNameAndIconButton
                    onUpdateHabitName={onUpdateHabitName}
                    habitName={habitItem.name}
                    setOpenIconWindow={setOpenIconWindow}
                    iconSelected={iconSelected}
                    setIconSelected={setIconSelected}
                />
            )}
            <Repeat onChangeOption={changeRepeatOption} onChangeDaysOption={changeDaysOption} onChangeWeeksOption={changeWeeksOption} />
            <HabitWindowAreas onChange={getSelectedAreaItems} />
            <SaveButton habit={habitItem} />
        </div>
    )
}

export default HabitWindow;

function Header() {
    const { habitWindowObject, selectedItemsObject } = useGlobalContextProvider();
    const { setOpenHabitWindow, openHabitWindow } = habitWindowObject;
    const { setSelectedItems, selectedItems } = selectedItemsObject;
    const [header, setHeader] = useState("Add New Habit");

    useEffect(() => {
        selectedItems ? setHeader("Edit Habit") : setHeader("Add New Habit");
    }, [openHabitWindow])

    return (
        <div className="flex justify-between items-center">
            <span className="font-bold text-xl">
                {header}
            </span>
            <FontAwesomeIcon
                onClick={() => {
                    setOpenHabitWindow(false);
                    setSelectedItems(null);
                }}
                className=" text-gray-400 cursor-pointer"
                icon={faClose}
            />
        </div>
    )
}

function InputNameAndIconButton({
    onUpdateHabitName,
    habitName,
    setOpenIconWindow,
    iconSelected,
    setIconSelected
}: {
    onUpdateHabitName: (inputText: string) => void;
    habitName: string;
    setOpenIconWindow: React.Dispatch<React.SetStateAction<boolean>>;
    iconSelected: IconProp;
    setIconSelected: React.Dispatch<React.SetStateAction<IconProp>>;
}) {
    const inputRef = useRef<HTMLInputElement>(null);
    const { habitWindowObject, darkModeObject, selectedItemsObject } = useGlobalContextProvider();
    const { openHabitWindow } = habitWindowObject;
    const { isDarkMode } = darkModeObject;
    const { setSelectedItems, selectedItems } = selectedItemsObject

    function updateInputHabit(event: React.ChangeEvent<HTMLInputElement>) {
        onUpdateHabitName(event.target.value);
    }

    useEffect(() => {
        setTimeout(() => {
            inputRef.current?.focus();
        }, 500);

        if (!openHabitWindow) {
            onUpdateHabitName("");
        }
        //important
        else {
            if (selectedItems) {
                onUpdateHabitName(selectedItems.name);
                setIconSelected(selectedItems.icon);
            }
        }
    }, [openHabitWindow]);

    useEffect(() => {
        inputRef.current?.focus();
    }, [iconSelected]);

    return (
        <div className="flex flex-col gap-2 mt-10 px-3">
            <span className="opacity-80 font-semibold">Habit Name</span>
            <div
                className="flex gap-4 justify-between items-center">
                <input
                    style={{
                        backgroundColor: isDarkMode ? darkModeColor.background : "white",
                    }}
                    ref={inputRef}
                    value={habitName}
                    onChange={(event) => updateInputHabit(event)}
                    className={`border w-full border-gray-200 outline-none p-4 rounded-md text-[13px]`}
                    placeholder="Type a name for the habit..."
                />

                <FontAwesomeIcon
                    onClick={() => setOpenIconWindow(true)}
                    className="bg-mainColor mt-[1px] p-4 rounded-md text-white cursor-pointer bg-customBlue"
                    icon={iconSelected}
                    height={16}
                    width={20}
                />
            </div>
        </div>
    )
}

function Repeat({
    onChangeOption,
    onChangeDaysOption,
    onChangeWeeksOption,
}: {
    onChangeOption: (repeatOptions: RepeatOption[]) => void;
    onChangeDaysOption: (allDays: DayOption[]) => void;
    onChangeWeeksOption: (weeks: number) => void
}) {

    const [repeatOptions, setRepeatOptions] = useState<RepeatOption[]>([
        { name: "Daily", isSelected: true },
        { name: "Weekly", isSelected: false },
    ]);

    const days: DayOption[] = [
        { id: 1, name: "Mo", isSelected: true },
        { id: 2, name: "Tu", isSelected: false },
        { id: 3, name: "We", isSelected: false },
        { id: 4, name: "Th", isSelected: false },
        { id: 5, name: "Fr", isSelected: false },
        { id: 6, name: "Sa", isSelected: false },
        { id: 7, name: "Su", isSelected: false }

    ];

    const [allDays, setAllDays] = useState<DayOption[]>(days);
    const [weeks, setWeeks] = useState(1);

    const { darkModeObject, selectedItemsObject, habitWindowObject } = useGlobalContextProvider();
    const { openHabitWindow } = habitWindowObject;
    const { selectedItems } = selectedItemsObject;
    const { isDarkMode } = darkModeObject;
    const [nameOfSelectedOption, setNameOfSelectedOption] = useState("");

    function changeOption(indexClicked: number) {
        const updateRepeatOptions = repeatOptions.map((singleOption, index) => {
            if (index === indexClicked) {
                return { ...singleOption, isSelected: true };
            }
            return { ...singleOption, isSelected: false }
        });
        setRepeatOptions(updateRepeatOptions);
        onChangeOption(updateRepeatOptions);
    }

    useEffect(() => {
        onChangeDaysOption(allDays);
    }, [allDays])

    useEffect(() => {
        onChangeWeeksOption(weeks);
    }, [weeks])

    useEffect(() => {
        if (!openHabitWindow) {
            const getNameOptionSelected = repeatOptions.filter(
                (singleOption) => singleOption.isSelected
            )[0].name;
            setNameOfSelectedOption(getNameOptionSelected);
        }
        if (selectedItems) {
            const currentHabitSelected = selectedItems as HabitType;
            const selectedOptionOfHabitSelected = currentHabitSelected.frequency[0].type;

            const copyRepeatOptions = repeatOptions.map((singleOption) => {
                if (singleOption.name === selectedOptionOfHabitSelected) {
                    return { ...singleOption, isSelected: true };
                }
                return { ...singleOption, isSelected: false };
            });
            setNameOfSelectedOption(selectedItems.name);

            setRepeatOptions(copyRepeatOptions);
        } else {
            const copyRepeatOptions = repeatOptions.map((singleOption) => {
                return { ...singleOption, isSelected: false };
            });

            copyRepeatOptions[0].isSelected = true;
            setRepeatOptions(copyRepeatOptions);
        }
    }, [openHabitWindow]);

    useEffect(() => {
        const getNameOptionSelected = repeatOptions.filter(
            (singleOption) => singleOption.isSelected
        )[0].name;
        setNameOfSelectedOption(getNameOptionSelected);
    }, [repeatOptions])



    return (
        <div className="flex flex-col gap-2 mt-10 px-3">
            <span className="font-semibold text-[17px] ">Repeat</span>

            <div className="flex gap-4 mt-2 items-center">
                {repeatOptions.map((singleOption, index) => (
                    <button
                        key={index}
                        onClick={() => changeOption(index)}
                        style={{
                            color: !singleOption.isSelected
                                ? !isDarkMode
                                    ? defaultColor.default
                                    : darkModeColor.textColor : "",
                            backgroundColor: singleOption.isSelected
                                ? defaultColor.default
                                : !isDarkMode
                                    ? defaultColor[100]
                                    : defaultColor[50],
                        }}
                        className=" p-2 px-3 rounded-md text-white cursor-pointer "
                    >
                        {singleOption.name}
                    </button>
                ))}
            </div>
            {nameOfSelectedOption === "Daily" ? (<DailyOptions allDays={allDays} setAllDays={setAllDays} />) : (
                <WeeklyOption weeks={weeks} setWeek={setWeeks} />
            )}
        </div>
    )
}

function DailyOptions({
    allDays,
    setAllDays,
}: {
    allDays: DayOption[];
    setAllDays: React.Dispatch<React.SetStateAction<DayOption[]>>;
}) {
    const { darkModeObject, habitWindowObject, selectedItemsObject } = useGlobalContextProvider();
    const { openHabitWindow } = habitWindowObject;
    const { isDarkMode } = darkModeObject;
    const { selectedItems, setSelectedItems } = selectedItemsObject;

    function selectedDays(singleDayIndex: number) {
        const selectedCount: number = allDays.filter(
            (singleDay) => singleDay.isSelected
        ).length;

        const updatedAllDays = allDays.map((singleDay, index) => {
            if (
                selectedCount === 1 &&
                singleDay.isSelected === true &&
                index === singleDayIndex
            ) {
                return singleDay;
            }

            return index === singleDayIndex
                ? { ...singleDay, isSelected: !singleDay.isSelected }
                : singleDay;
        });
        setAllDays(updatedAllDays);
    }

    useEffect(() => {
        if (openHabitWindow) {
            if (!selectedItems) {
                const updateSelectedDays = allDays.map((singleDay) => {
                    return { ...singleDay, isSelected: false };
                });

                updateSelectedDays[0].isSelected = true;
                setAllDays(updateSelectedDays);
            } else {
                const currentHabitSelected = selectedItems as HabitType;
                const selectedOptionOfHabitSelected =
                    currentHabitSelected.frequency[0].days

                const updateSelectedDays = allDays.map((singleDay) => {
                    if (selectedOptionOfHabitSelected.includes(singleDay.name)) {
                        return { ...singleDay, isSelected: true };
                    } else {
                        return { ...singleDay, isSelected: false };
                    }
                });
                setAllDays(updateSelectedDays);
            }
        }
    }, [openHabitWindow]);

    return (
        <div className="mt-5 flex flex-col gap-4">
            <span className="font-medium opacity-85">On These Days</span>
            <div className="flex gap-3 w-full">
                {allDays.map((singleDay, singleDayIndex) => (
                    <span
                        onClick={() => selectedDays(singleDayIndex)}
                        style={{
                            color: !singleDay.isSelected
                                ? !isDarkMode
                                    ? defaultColor.default
                                    : darkModeColor.textColor : "",
                            backgroundColor: singleDay.isSelected
                                ? defaultColor.default
                                : !isDarkMode
                                    ? defaultColor[100]
                                    : defaultColor[50],
                        }}
                        key={singleDayIndex}
                        className={`p-2 px-3 w-11 text-center  rounded-md select-none cursor-pointer ${singleDay.isSelected ? "text-white" : "text-gray-400"
                            }`}
                    >
                        {singleDay.name}
                    </span>
                ))}
            </div>
        </div>
    )
}

function WeeklyOption({
    weeks,
    setWeek,
}: {
    weeks: number;
    setWeek: React.Dispatch<React.SetStateAction<number>>;
}) {
    const { darkModeObject } = useGlobalContextProvider();
    const { isDarkMode } = darkModeObject;

    function updateCounter(option: string) {
        if (option === "up") {
            setWeek((prev) => (prev < 7 ? prev + 1 : 7));
        }

        if (option === "down") {
            setWeek((prev) => (prev > 1 ? prev - 1 : 1));
        }
    }
    return (
        <div className="mt-7 flex gap-20">
            <div className="flex flex-col gap-2">
                <span className="font-semibold">Frequency</span>
                <span className="text-sm font-light text-gray-400">
                    {weeks} times a week
                </span>
            </div>
            <div className="flex items-center justify-center">
                <button
                    onClick={() => updateCounter("down")}
                    style={{
                        backgroundColor: !isDarkMode ? defaultColor[100] : defaultColor[50],
                        color: !isDarkMode ? defaultColor.default : darkModeColor.textColor,
                    }}
                    className="p-3 w-10 rounded-md text-white"
                >
                    -
                </button>
                <span className="p-4 px-5 select-none">{weeks}</span>
                <button
                    onClick={() => updateCounter("up")}
                    style={{
                        backgroundColor: !isDarkMode ? defaultColor[100] : defaultColor[50],
                        color: !isDarkMode ? defaultColor.default : darkModeColor.textColor,
                    }}
                    className="p-3 w-10 rounded-md text-white"
                >
                    +
                </button>
            </div>
        </div>
    )
}


function SaveButton({ habit }: { habit: HabitType }) {
    const { allHabitsObject, habitWindowObject, selectedItemsObject } = useGlobalContextProvider();
    const { allHabits, setAllHabits } = allHabitsObject;
    const { openHabitWindow, setOpenHabitWindow } = habitWindowObject;
    const { selectedItems, setSelectedItems } = selectedItemsObject;
    const [buttonText, setButtonText] = useState("Add a Habit")

    //test
    useEffect(() => {
        selectedItems ? setButtonText("Edit Habit") : setButtonText("Add a Habit");
    }, [openHabitWindow])

    function checkHabitObject() {
        if (!selectedItems) {
            if (habit.name.trim() === "") {
                return toast.error("The habit name field is still empty!")
            }
        }

        const habitExist = allHabits.some(
            (singleHabit) => singleHabit.name === habit.name
        );

        if (!habitExist) {
            addNewHabit({ allHabits, setAllHabits, habit });
            setOpenHabitWindow(false);
        }
        else {
            //deleteHabit(allHabits, setAllHabits, habit);
            console.log("we editing");
            editHabit({ allHabits, setAllHabits, habit, selectedItems });
            setOpenHabitWindow(false);
        }
        setSelectedItems(null);
    }

    return (
        <div className="w-full flex justify-center mt-9">
            <button
                onClick={checkHabitObject}
                className="bg-customBlue p-4 w-[98%] rounded-md text-white"
            >
                {buttonText}
            </button>
        </div>
    )
}
