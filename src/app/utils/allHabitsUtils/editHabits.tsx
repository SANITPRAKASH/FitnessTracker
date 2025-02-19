import { iconToText } from "@/app/Pages/AllHabits/Components/IconsWindow/IconData";
import { HabitType, AreaType } from "@/app/Types/GlobalTypes"
import React from "react";
import toast from "react-hot-toast";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export default function convertIconsToTextOfHabits(habit: HabitType) {
    const { icon, areas } = habit;

    const habitIconToText = iconToText(icon as IconProp);

    const areasCopy = areas.map((area) => ({
        ...area,
        icon: iconToText(area.icon as IconProp),
    }));

    const updatedHabit = { ...habit, icon: habitIconToText, areas: areasCopy };

    return updatedHabit;
}

export async function editHabit({
    allHabits,
    setAllHabits,
    selectedItems,
    habit,
}: {
    allHabits: HabitType[],
    setAllHabits: React.Dispatch<React.SetStateAction<HabitType[]>>;
    selectedItems: AreaType | HabitType | null;
    habit: HabitType;
}) {
    try {
        const currentHabitSelected = selectedItems as HabitType;

        const findTheHabit = allHabits.findIndex(
            (singleHabit) => singleHabit.name === currentHabitSelected.name
        );


        const copyAllHabits = [...allHabits];

        copyAllHabits[findTheHabit] = habit;

        const { icon, areas } = habit;
        const habitIconToText = iconToText(icon as IconProp);

        const areasCopy = areas.map((area) => ({
            ...area,
            icon: iconToText(area.icon as IconProp),
        }));

        const updatedHabit = { ...habit, icon: habitIconToText, areas: areasCopy };

        const response = await fetch(
            `/api/habits?habitId=${currentHabitSelected._id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: updatedHabit.name,
                    icon: updatedHabit.icon,
                    areas: updatedHabit.areas,
                    frequency: updatedHabit.frequency,
                    completedDays: updatedHabit.completedDays,
                }),
            }
        );

        if (!response.ok) {
            const errorData = await response.json();

            setAllHabits(copyAllHabits);
            toast.success("Habit has been updated successfully");
        }
    } catch (error) {
        toast.error("Something went wrong")
    }
}

// figure out why the name doesn't save