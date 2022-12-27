import mongoose from "mongoose";

const problemSchema = mongoose.Schema({
    title: String,
    content: String,
    creator: String,
    createdAt: {
        type: Date,
        default: new Date()
    },
    availableFromEnabled: Boolean,
    availableFrom: Date,
    dueDateEnabled: Boolean,
    dueDate: Date,
    acceptedLanguages: {
        type: [String],
        default: [],
    },
    numberOfTests: Number,
    inputFiles: [String],
    outputFiles: [String],
    favorites: {
        type: [String],
        default: []
    },
    userResults: {
        type: Map,
        of: mongoose.SchemaType.Mixed,
        default: {}
    }
});

const Problem = mongoose.model('Problem', problemSchema);

export default Problem;