
import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useGlobalContextProvider } from "./contextApi";
import { breadcrumbsClasses } from "@mui/material";

interface dropMenuItem {
    name: string;
    icon: IconProp;
}

function DropDown() {
    const { darkModeObject, openDropDownObject, dropDownPositionsObject, openConfirmationWindowObject, selectedItemsObject, habitWindowObject } = useGlobalContextProvider();
    const { isDarkMode } = darkModeObject;
    const { openDropDown, setOpenDropDown } = openDropDownObject;
    const { dropDownPositions } = dropDownPositionsObject;
    const { openConfirmationWindow, setOpenConfirmationWindow } = openConfirmationWindowObject;
    const { setSelectedItems } = selectedItemsObject;
    const { openHabitWindow, setOpenHabitWindow } = habitWindowObject;

    const ref = useRef<HTMLDivElement>(null);
    const dropDownMenuItems: dropMenuItem[] = [
        { name: "Edit", icon: faPencil },
        { name: "Remove", icon: faTrash },
    ];

    const [hover, setHover] = useState(false);
    const [indexHovered, setIndexHovered] = useState(0);

    function handleHoverChange(index: number, state: boolean) {
        setIndexHovered(index);
        setHover(state);
    }

    function handleClickOption(index: number) {
        switch (index) {
            case 0:
                setOpenHabitWindow(true);
                setOpenDropDown(false);
                break;
            case 1:
                setOpenConfirmationWindow(true);
                setOpenDropDown(false);
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        function handleOutsideClick(event: MouseEvent) {
            if (ref && !ref.current?.contains(event.target as Node)) {
                setOpenDropDown(false);
                if (!openConfirmationWindow && !openHabitWindow) {
                    setSelectedItems(null);
                }
            }
        }

        document.addEventListener("click", handleOutsideClick);
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, [openDropDown]);

    //5:34
    return (
        <div
            ref={ref}
            style={{
                left: dropDownPositions.left - 135,
                top: dropDownPositions.top + 40,
                backgroundColor: isDarkMode
                    ? "#003049"
                    : "#FFFFFF",
            }}
            className={`p-3 w-40 fixed z-[60] shadow-md flex rounded-lg flex-col gap-3
            text-[16px] top-11 left-1/3 ${openDropDown ? "block" : "hidden"}`}
        >
            {dropDownMenuItems.map((menuItem, index) => (
                <div
                    style={{
                        backgroundColor:
                            hover && index === indexHovered ? "#0000FF" : "",
                        color: hover && index === indexHovered ? "#ffffff" : "",
                    }}
                    key={index}
                    onMouseEnter={() => handleHoverChange(index, true)}
                    onMouseLeave={() => handleHoverChange(index, false)}
                    className={`flex gap-2 items-center rounded-md p-3
                    select-none cursor-pointer transition-all `}
                    onClick={() => handleClickOption(index)}
                >
                    <FontAwesomeIcon
                        style={{
                            color:
                                hover && index === indexHovered
                                    ? "#ffffff"
                                    : "#0000FF",
                        }}
                        className=" size-4 "
                        icon={menuItem.icon}
                    />

                    <div
                        style={{
                            color:
                                hover && index === indexHovered
                                    ? "#ffffff"
                                    : !isDarkMode
                                        ? "black"
                                        : "white",
                        }}
                        className={` }`}
                    >
                        {menuItem.name}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default DropDown;
