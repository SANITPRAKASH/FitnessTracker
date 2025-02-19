import { IconProp } from "@fortawesome/fontawesome-svg-core"

export type AreaType = {
    _id: number;
    icon: any;
    name: string;
}

export type HabitType = {
    _id?: string;
    name: string;
    icon: any;
    clerkUserId: string;
    frequency: FrequencyType[];
    areas: AreaType[];
    completedDays: completedDays[];
}


type FrequencyType = {
    type: string;
    days: string[];
    number: number;
}


type completedDays = {
    _id?: string,
    date: string,
}