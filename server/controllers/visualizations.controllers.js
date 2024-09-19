const Viz = require("../models/visualizations.models.js");

const brightColors = [
    "#FF6384",
    "#FF9F40",
    "#FFCD56",
    "#4BC0C0",
    "#36A2EB",
    "#9966FF",
    "#FF6384",
    "#00FFFF",
    "#FF00FF",
    "#BFFF00",
    "#00FFFF",
    "#FF7F50",
    "#20B2AA",
    "#FFD700",
    "#87CEEB",
    "#4B0082",
    "#EE82EE",
    "#DC143C",
    "#40E0D0",
    "#7FFF00"
];


const randomColorPicker = () => {
    return brightColors[Math.floor(Math.random() * 20) + 1];
}
