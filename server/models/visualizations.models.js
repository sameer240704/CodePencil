const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const visualizationsSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        chartType: {
            type: String,
            required: true,
            enum: ["Bar", "Line", "Pie"]
        },
        labels: {
            type: [String],
            required: true
        },
        datasets: [
            {
                label: {
                    type: String,
                    required: true,
                },
                data: {
                    type: [Number],
                    required: true,
                },
                borderColor: {
                    type: String,
                },
                backgroundColor: {
                    type: [String],
                },
                borderWidth: {
                    type: Number,
                    default: 1,
                },
                tension: {
                    type: Number,
                },
            },
        ]
    }
);