import { GoHome } from "react-icons/go";
import { FaC, FaCode } from "react-icons/fa6";
import { SlPeople } from "react-icons/sl";
import { GrStorage } from "react-icons/gr";
import { PiRanking } from "react-icons/pi";

export const sidebarLinks = [
  {
    label: "Home",
    imageUrl: GoHome,
    route: "/home",
  },
  {
    label: "Code Room",
    imageUrl: FaCode,
    route: "/code-room",
  },
  {
    label: "Buddies",
    imageUrl: SlPeople,
    route: "/buddies",
  },
  {
    label: "Leaderboard",
    imageUrl: PiRanking,
    route: "/leaderboard",
  },
  {
    label: "Storage",
    imageUrl: GrStorage,
    route: "/storage",
  },
];

export const rankings = [
  { minPoints: 0, maxPoints: 99, title: "Apprentice Coder" },
  { minPoints: 100, maxPoints: 299, title: "Junior Developer" },
  { minPoints: 300, maxPoints: 599, title: "Code Ninja" },
  { minPoints: 600, maxPoints: 999, title: "Script Master" },
  { minPoints: 1000, maxPoints: 1499, title: "Tech Architect" },
  { minPoints: 1500, maxPoints: 1999, title: "Coding Maestro" },
  { minPoints: 2000, maxPoints: Infinity, title: "Programming Guru" },
];
