import mongoose from 'mongoose';
import Batch from '../models/batch.js';

export const addBatch = async (req, res) => {
    const batch = req.body;
    
    const newBatch = new Batch(batch);

    try {
        await newBatch.save();

        res.status(201).json(newBatch);
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const getBatchesByUserIdAndProblemId = async (req, res) => {
    const { userId, problemId } = req.params

    try {
        const batches = await Batch.find();
        
        const filteredBatches = batches
            .filter((batch) => batch.userId === userId && batch.problemId === problemId)
            .sort((batch1, batch2) => batch2.createdAt - batch1.createdAt)

        res.status(200).json(filteredBatches);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

}