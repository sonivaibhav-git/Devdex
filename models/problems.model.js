const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({

    description: {
        type: String,
        required: true,
        index: true
    },

    technologies: [
        {
            type: String,
            lowercase:true,
            index: true
        }
    ],
    // tags:[{
    //         type: String,
    //         lowercase:true,
    //         index: true
    // }],
    creator: {

        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true
        }
    }

}, { timestamps: true });


// Text based searching 

problemSchema.index({
    description: "text",
    technologies: "text"
});


//Sorting 

problemSchema.index({
    createdAt: -1
});

module.exports = mongoose.model(
    "Problem",
    problemSchema
);