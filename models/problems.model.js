const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
    problem: {
        type: String,
        required: true
    },
    technologies: [String],
    creator: {
        id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
              }
    }
}, { timestamps: true });

module.exports = mongoose.model(
    "Problem",
    problemSchema
);