import React from "react";
import Link from "next/link";

export default function HeroSection() {
    return (
        <div className="flex flex-col mx-16 items-center mt-[100px] gap-6">
            <span className="font-bold text-3xl text-center">
            Crush Your  <span className="text-customBlue">Fitness Goals.</span>.
            </span>
            <p className="text-center text-sm sm:w-[430px] w-[370px]">
            Stay on track with this easy-to-use fitness tracker that helps you plan workouts, monitor progress, and achieve peak performance.
            </p>
            
            <Link href={"/sign-up"}>
            <button
                className={`block text-sm font-light rounded-lg px-9 py-3 text-white transition bg-customBlue focus:outline-none`}
                type="button"
            >
                {`Let's get started!`}
            </button>
            </Link>
        </div>
    );
}