import { IconProp } from "@fortawesome/fontawesome-svg-core";

import {
    faCalculator,
    faFlask,
    faGlobe,
    faBook,
    faDumbbell,
    faLaptopCode,
    faBookMedical,
    faPalette,
    faComments,
    faPhoneAlt,
    faEnvelope,
    faSearch,
    faMusic,
    faCamera,
    faQuestion,
    faCogs,
    faUser,
    faGraduationCap,
    faUsers,
    faMoneyBill,
    faBriefcase,
    faTools,
    faLightbulb,
    faPlaneDeparture,
    faBasketShopping,
    faPersonWalking,
    faBasketball,
    faCar,
    faFaceMeh,
    faFaceGrinStars,
    faStar,
} from "@fortawesome/free-solid-svg-icons"

type iconData = {
    faIcon: IconProp;
    isSelected: boolean;
}

export const iconsData: iconData[] = [
    {
        faIcon: faCalculator,
        isSelected: true,
    },
    {
        faIcon: faFlask,
        isSelected: false,
    },
    {
        faIcon: faGlobe,
        isSelected: false,
    },
    {
        faIcon: faBook,
        isSelected: false,
    },
    {
        faIcon: faDumbbell,
        isSelected: false,
    },
    {
        faIcon: faLaptopCode,
        isSelected: false,
    },
    {
        faIcon: faBookMedical,
        isSelected: false,
    },
    {
        faIcon: faPalette,
        isSelected: false,
    },
    {
        faIcon: faComments,
        isSelected: false,
    },
    {
        faIcon: faPhoneAlt,
        isSelected: false,
    },
    {
        faIcon: faEnvelope,
        isSelected: false,
    },
    {
        faIcon: faSearch,
        isSelected: false,
    },
    {
        faIcon: faMusic,
        isSelected: false,
    },
    {
        faIcon: faCamera,
        isSelected: false,
    },
    {
        faIcon: faQuestion,
        isSelected: false,
    },
    {
        faIcon: faCogs,
        isSelected: false,
    },
    {
        faIcon: faUser,
        isSelected: false,
    },
    {
        faIcon: faGraduationCap,
        isSelected: false,
    },
    {
        faIcon: faUsers,
        isSelected: false,
    },
    {
        faIcon: faMoneyBill,
        isSelected: false,
    },
    {
        faIcon: faBriefcase,
        isSelected: false,
    },
    {
        faIcon: faTools,
        isSelected: false,
    },
    {
        faIcon: faLightbulb,
        isSelected: false,
    },
    {
        faIcon: faPlaneDeparture,
        isSelected: false,
    },
    {
        faIcon: faBasketShopping,
        isSelected: false,
    },
    {
        faIcon: faPersonWalking,
        isSelected: false,
    },
    {
        faIcon: faBasketball,
        isSelected: false,
    },
    {
        faIcon: faCar,
        isSelected: false,
    },
    {
        faIcon: faFaceGrinStars,
        isSelected: false,
    },
    {
        faIcon: faFaceMeh,
        isSelected: false,
    },
];

export function textToIcon(iconText: string): IconProp | string {
    switch (iconText) {
        case "faCalculator":
            return faCalculator;
        case "faFlask":
            return faFlask;
        case "faGlobe":
            return faGlobe;
        case "faBook":
            return faBook;
        case "faDumbbell":
            return faDumbbell;
        case "faLaptopCode":
            return faLaptopCode;
        case "faBookMedical":
            return faBookMedical;
        case "faPalette":
            return faPalette;
        case "faComments":
            return faComments;
        case "faPhoneAlt":
            return faPhoneAlt;
        case "faEnvelope":
            return faEnvelope;
        case "faSearch":
            return faSearch;
        case "faMusic":
            return faMusic;
        case "faCamera":
            return faCamera;
        case "faQuestion":
            return faQuestion;
        case "faCogs":
            return faCogs;
        case "faUser":
            return faUser;
        case "faGraduationCap":
            return faGraduationCap;
        case "faUsers":
            return faUsers;
        case "faMoneyBill":
            return faMoneyBill;
        case "faBriefcase":
            return faBriefcase;
        case "faTools":
            return faTools;
        case "faLightbulb":
            return faLightbulb;
        case "faPlaneDeparture":
            return faPlaneDeparture;
        case "faBasketShopping":
            return faBasketShopping;
        case "faPersonWalking":
            return faPersonWalking;
        case "faBasketball":
            return faBasketball;
        case "faCar":
            return faCar;
        case "faFaceMeh":
            return faFaceMeh;
        case "faFaceGrinStars":
            return faFaceGrinStars;
        case "faStar":
            return faStar;
        default:
            return faStar;
    }
}
export function iconToText(icon: any): string {
    switch (icon.iconName) {
        case "calculator":
            return "faCalculator";

        case "flask":
            return "faFlask";

        case "globe":
            return "faGlobe";

        case "book":
            return "faBook";

        case "dumbbell":
            return "faDumbbell";

        case "laptop-code":
            return "faLaptopCode";

        case "book-medical":
            return "faBookMedical";

        case "palette":
            return "faPalette";

        case "comments":
            return "faComments";

        case "phone-alt":
            return "faPhoneAlt";

        case "envelope":
            return "faEnvelope";

        case "search":
            return "faSearch";

        case "music":
            return "faMusic";

        case "camera":
            return "faCamera";

        case "question":
            return "faQuestion";

        case "cogs":
            return "faCogs";

        case "user":
            return "faUser";

        case "graduation-cap":
            return "faGraduationCap";

        case "users":
            return "faUsers";

        case "money-bill":
            return "faMoneyBill";

        case "briefcase":
            return "faBriefcase";

        case "tools":
            return "faTools";

        case "lightbulb":
            return "faLightbulb";

        case "planeDeparture":
            return "faPlaneDeparture";

        case "basket-shopping":
            return "faBasketShopping";

        case "person-walking":
            return "faPersonWalking";

        case "basketball":
            return "faBasketball";

        case "car":
            return "faCar";

        case "faceMeh":
            return "faFaceMeh";

        case "face-grin-stars":
            return "faFaceGrinStars";

        case "star":
            return "faStar";
            
        default:
            return "faStar";
    }
}