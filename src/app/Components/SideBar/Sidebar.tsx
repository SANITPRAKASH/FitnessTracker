import React, { useRef, useEffect } from "react"
import LogoAndName from "../LogoAndName"
import { useGlobalContextProvider } from "@/app/contextApi"
import MenuSelection from "./MenuSelection"
import LogoutSection from "./LogoutSection"
import { darkModeColor, defaultColor } from "../../../../colors"

function Sidebar() {
    const { openSideBarObject, darkModeObject } = useGlobalContextProvider();
    const { openSideBar, setOpenSideBar } = openSideBarObject;
    const { isDarkMode } = darkModeObject;
    const sideBarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleOutsideClicked(event: MouseEvent) {
            if (!sideBarRef.current?.contains(event.target as Node)) {
                setOpenSideBar(false);
            }
        }
        document.addEventListener("click", handleOutsideClicked);
        return () => {
            document.removeEventListener("click", handleOutsideClicked);
        };
    }, [openSideBar]);

    return (
        <div
            style={{
                color: isDarkMode ? darkModeColor.textColor : defaultColor.textColor,
                backgroundColor: isDarkMode
                    ? darkModeColor.background 
                    : defaultColor.background,
            }}
            ref={sideBarRef}
            className={`${!openSideBar ? " max-xl:hidden " : "fixed shadow-lg"
                } flex-grow z-50 p-10 flex-col bg-white min-h-screen transition-all`}
        >
            <LogoAndName />
            <MenuSelection />
            <LogoutSection />
        </div>
    );
}

export default Sidebar;
