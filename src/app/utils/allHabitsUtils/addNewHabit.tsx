import { AreaType, HabitType } from "@/app/Types/GlobalTypes";
import React, { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast"
import { iconToText } from "@/app/Pages/AllHabits/Components/IconsWindow/IconData"
import { IconProp } from "@fortawesome/fontawesome-svg-core"

export async function addNewHabit({
    allHabits,
    setAllHabits,
    habit,
}: {
    allHabits: HabitType[];
    setAllHabits: React.Dispatch<React.SetStateAction<HabitType[]>>;
    habit: Omit<HabitType, "_id">;
}) {
    const { icon, areas } = habit;

    const habitIconText = iconToText(icon);

    const areasCopy = areas.map((area) => ({
        ...area,
        icon: iconToText(area.icon as IconProp),
    }));

    const updatedHabit = { ...habit, icon: habitIconText, areas: areasCopy };

    try {
        const response = await fetch("/api/habits", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(updatedHabit),
        });

        if (!response.ok) {
            throw new Error("Failed to add habit");
        }

        const data = await response.json();
        const { _id } = data.habit;
        const updatedIdOfHabit = { ...habit, _id: _id };
        setAllHabits([...allHabits, habit]);
        toast.success("Habit added successfully!");
    } catch (error) {
        toast.error("Something went wrong!...")

    }
}