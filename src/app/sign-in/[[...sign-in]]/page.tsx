"use client"; // ✅ Marking as a Client Component

import { SignIn, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation"; // ✅ Use next/navigation
import { useEffect } from "react";

export default function SignInPage() {
    const { isSignedIn } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (isSignedIn) {
            router.push("/dashboard"); // Redirect signed-in users to dashboard
        }
    }, [isSignedIn, router]);

    const defaultColor = "blue";
    const gradientColor = `linear-gradient(to bottom, ${defaultColor}, #0440ff)`;

    if (isSignedIn) return null; // Prevent rendering SignIn if user is logged in

    return (
        <div
            style={{ background: gradientColor }}
            className="flex justify-center items-center flex-col gap-10 w-full h-screen"
        >
            <SignIn />
        </div>
    );
}
