"use client"

import { ReactNode, createContext, useState, useContext, useEffect } from "react";

import { GlobalContextType } from "./Types/GlobalContextType";
import { faSlack, faUpwork } from "@fortawesome/free-brands-svg-icons";
import {
    faBorderAll,
    faBriefcase,
    faCode,
    faGraduationCap,
    faSortAmountDesc,
    faUsers,
} from "@fortawesome/free-solid-svg-icons"
import {
    faChartSimple,
    faLayerGroup,
    faList,
    faRectangleList,
    faSun,
    faMoon,
    faDumbbell,
    faGlobe
} from "@fortawesome/free-solid-svg-icons";
import { DarkModeItem } from "./Types/DarkModeTypes";
import { AreaType, HabitType } from "./Types/GlobalTypes";
import AllHabits from "./Pages/AllHabits/AllHabits";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { textToIcon } from "./Pages/AllHabits/Components/IconsWindow/IconData";
const { v4: uuidv4 } = require('uuid');
import { useUser } from "@clerk/nextjs";
import { menuItemType } from "./Types/MenuItemType";
import { getDateString } from "./utils/allHabitsUtils/DateFunctions";
//import { v4 as uuidv4 } from "uuid";

const GlobalContext = createContext<GlobalContextType>({
    menuItemsObject: {
        menuItems: [],
        setMenuItems: () => { },
    },
    openSideBarObject: {
        openSideBar: false,
        setOpenSideBar: () => { },
    },
    darkModeObject: {
        isDarkMode: false,
        setDarkMode: () => { },
        darkModeItems: [],
        setDarkModeItems: () => { },
    },
    habitWindowObject: {
        openHabitWindow: false,
        setOpenHabitWindow: () => { },
    },
    allAreasObject: {
        allAreas: [],
        setAllAreas: () => { },
    },
    allHabitsObject: {
        allHabits: [],
        setAllHabits: () => { },
    },
    selectedCurrentDayObject: {
        selectedCurrentDate: "",
        setSelectedCurrentDate: () => { },
    },
    offsetDayObject: {
        offsetDay: 0,
        setOffsetDay: () => { }
    },
    selectedAreaStringObject: {
        selectedAreaString: "",
        setSelectedAreaString: () => { },
    },
    allFilteredHabitsObject: {
        allFilteredHabits: [],
        setAllFilteredHabits: () => { },
    },
    openDropDownObject: {
        openDropDown: false,
        setOpenDropDown: () => { },
    },
    dropDownPositionsObject: {
        dropDownPositions: {
            top: 0,
            left: 0,
        },
        setDropDownPositions: () => { },
    },
    openConfirmationWindowObject: {
        openConfirmationWindow: false,
        setOpenConfirmationWindow: () => { },
    },
    selectedItemsObject: {
        selectedItems: null,
        setSelectedItems: () => { },
    }
});

function GlobalContextProvider({ children }: { children: ReactNode }) {
    const [menuItems, setMenuItems] = useState<menuItemType[]>([
        { name: "All Habits", isSelected: true, icon: faRectangleList },
        { name: "Statistics", isSelected: false, icon: faChartSimple },
        { name: "Areas", isSelected: false, icon: faLayerGroup },
    ]);

    const [allHabits, setAllHabits] = useState<HabitType[]>([]);

    const [darkModeItems, setDarkModeItems] = useState<DarkModeItem[]>([
        { id: 1, icon: faSun, isSelected: true },
        { id: 2, icon: faMoon, isSelected: false },

    ]);

    const [allAreas, setAllAreas] = useState<AreaType[]>([]);

    const [openSideBar, setOpenSideBar] = useState<boolean>(false);
    const [isDarkMode, setDarkMode] = useState<boolean>(false);
    const [openHabitWindow, setOpenHabitWindow] = useState<boolean>(false);
    const [selectedCurrentDate, setSelectedCurrentDate] = useState(() =>
        getDateString(new Date())
    );
    const [offsetDay, setOffsetDay] = useState(0);
    const [selectedAreaString, setSelectedAreaString] = useState<string>("All");
    const [allFilteredHabits, setAllFilteredHabits] = useState<HabitType[]>([]);
    const [openDropDown, setOpenDropDown] = useState(false);
    const [dropDownPositions, setDropDownPositions] = useState({
        top: 0,
        left: 0,
    });

    const [openConfirmationWindow, setOpenConfirmationWindow] = useState(false);
    const [selectedItems, setSelectedItems] = useState<
        HabitType | AreaType | null
    >(null);
    const { isLoaded, isSignedIn, user } = useUser();



    //us based dat
    useEffect(() => {

        const fetchAllHabits = async () => {
            try {
                const response = await fetch(`/api/habits?clerkId=${user?.id}`);
                if(!response.ok) {
                    throw new Error("Failed to fetch habits");
                }
                const data: {habits: HabitType[]} = await response.json();

                const updatedHabits = data.habits.map((habit: HabitType) => {
                    if(typeof habit.icon === "string") {
                        return {
                            ...habit,
                            icon: textToIcon(habit.icon) as IconProp,
                        };
                    }
                    return habit;
                });
                
                const updatedHabitsWithAreas = updatedHabits.map((habit: HabitType) => {
                    const updatedAreas = habit.areas.map((area: AreaType) => {
                        if(typeof area.icon === "string") {
                            return {
                                ...area,
                                icon: textToIcon(area.icon) as IconProp,
                            };
                        }
                        return area;
                    });
                    return { ...habit, areas: updatedAreas};
                });
                setAllHabits(updatedHabitsWithAreas);
            } catch(error) {
                console.error("Error fetching projects:", error)
            }
        };

        function fetchAllAreas() {
            const allAreasData: AreaType[] = [
                { _id: uuidv4(), icon: textToIcon("faGlobe"), name: "All" },
                { _id: uuidv4(), icon: textToIcon("faGraduationCap"), name: "Water" },
                { _id: uuidv4(), icon: textToIcon("faDumbbell"), name: "Exercise" },
                { _id: uuidv4(), icon: textToIcon("faBriefcase"), name: "Diet" },
            ];

            setAllAreas(allAreasData);
        }

        //fetchData();
        fetchAllHabits();
        fetchAllAreas();
    }, [isLoaded, isSignedIn]);

    useEffect(() => {
        setOpenSideBar(false);
    }, [menuItems]);

    return (
        <GlobalContext.Provider
            value={{
                menuItemsObject: { menuItems, setMenuItems },
                openSideBarObject: { openSideBar, setOpenSideBar },
                darkModeObject: {
                    isDarkMode,
                    setDarkMode,
                    darkModeItems,
                    setDarkModeItems,
                },
                habitWindowObject: {
                    openHabitWindow,
                    setOpenHabitWindow,
                },
                allAreasObject: {
                    allAreas,
                    setAllAreas,
                },
                allHabitsObject: {
                    allHabits,
                    setAllHabits,
                },
                selectedCurrentDayObject: {
                    selectedCurrentDate,
                    setSelectedCurrentDate,
                },
                offsetDayObject: {
                    offsetDay,
                    setOffsetDay,
                },
                selectedAreaStringObject: {
                    selectedAreaString,
                    setSelectedAreaString,
                },
                allFilteredHabitsObject: {
                    allFilteredHabits,
                    setAllFilteredHabits,
                },
                openDropDownObject: {
                    openDropDown,
                    setOpenDropDown,
                },
                dropDownPositionsObject: {
                    dropDownPositions,
                    setDropDownPositions,
                },
                openConfirmationWindowObject: {
                    openConfirmationWindow,
                    setOpenConfirmationWindow,
                },
                selectedItemsObject: {
                    selectedItems,
                    setSelectedItems,
                }
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

export function useGlobalContextProvider() {
    return useContext(GlobalContext);
}

export default GlobalContextProvider;