import React from "react";

import { defaultColor } from "../../../colors";
import AppIcon from "../SVG_Icons/AppIcon";


export default function LogoAndName() {
    return (
        <div className="flex gap-2 items-center sm:justify-start justify-center">
            <span className="text-2xl font-light flex items-center gap-2">
                <div style={{ backgroundColor: defaultColor.default}} className=" p-2 rounded-md">
                    <AppIcon color="#ffffff" height="34" width="34" />
                </div>
                {/*name here */}
                <span
                    style={{ color: defaultColor.default}}
                    className="font-bold text-mainColor"
                >
                    Fitness
                </span>
                <span className="font-light">Tracker</span>
            </span>
        </div>
    )
}