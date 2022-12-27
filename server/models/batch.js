import mongoose from 'mongoose';

const batchSchema = mongoose.Schema({
    userId: { type: String, required: true },
    problemId: { type: String, required: true },
    createdAt: { type: Date, default: new Date() },
    code: {type: String, required: true },
    comments: {type: [mongoose.Types.Mixed], default: [] },
    language: Number,
    numberOfTests: Number,
    submissions: { type: [String], default: [] }
});

const Batch = mongoose.model('Batch', batchSchema);

export default Batch;