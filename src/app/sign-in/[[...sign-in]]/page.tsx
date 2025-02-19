import { SignIn } from "@clerk/nextjs";
import React from "react";

export default function SignInPage() {
    const defaultColor = "blue";
    const gradientColor = `linear-gradient(to bottom, ${defaultColor}, #0440ff)`;

    return (
        <div
            style={{ background: gradientColor }}
            className="flex justify-center items-center flex-col gap-10 w-full h-screen"
        >
            <SignIn />
        </div>
    );
}