import mongoose from 'mongoose';
import Problem from '../models/problem.js';

export const getProblem = async (req, res) => {
    const { id } = req.params;
    
    try {
        const problem = await Problem.findById(id);

        res.status(200).json(problem);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getFavoriteProblems = async (req, res) => {
    const {userId} = req.params;

    try {
        const problems = await Problem.find();
        // console.log(problems)
        const favoriteProblems = problems.filter((problem) => problem.favorites.includes(userId))

        res.status(200).json(favoriteProblems);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getProblems = async (req, res) => {
    if (res.statusCode === 401)
        return;
    
    try {
        const postProblems = await Problem.find();

        res.status(200).json(postProblems);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createProblem = async (req, res) => {
    const problem = req.body;
    
    const newProblem = new Problem(problem);

    try {
        await newProblem.save();

        res.status(201).json(newProblem);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const addProblemToFavorites = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No problem with id: ${id}`);
    
    const problem = await Problem.findById(id);

    const index = problem.favorites.findIndex((id) => id === String(req.userId));

    if (index === -1) {
        problem.favorites.push(req.userId);
    } else {
        problem.favorites = problem.favorites.filter((id) => id !== String(req.userId));
    }

    const updatedProblem = await Problem.findByIdAndUpdate(id, problem, { new: true });
    res.status(200).json(updatedProblem);
}

export const updateUserResult = async (req, res) => {
    const {id, userId} = req.params
    const { batch } = req.body

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No problem with id: ${id}`);

    const problem = await Problem.findById(id);

    problem.userResults.set(userId, batch);

    const updatedProblem = await Problem.findByIdAndUpdate(id, problem, { new: true });
    res.status(200).json(updatedProblem);
}

export const updateResultComments = async (req, res) => {
    const {id, userId} = req.params
    const { comment } = req.body

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No problem with id: ${id}`);

    const problem = await Problem.findById(id);

    const batch = problem.userResults.get(userId);

    const newBatch = {...batch, comments: [...batch.comments, comment]};

    problem.userResults.set(userId, newBatch);

    const updatedProblem = await Problem.findByIdAndUpdate(id, problem, { new: true });
    res.status(200).json(updatedProblem);
}

export const getComments = async (req, res) => {
    const { id, userId } = req.params

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No problem with id: ${id}`);

    const problem = await Problem.findById(id);
    const batch = problem.userResults.get(userId);

    res.status(200).json(batch.comments);
}

export const editProblem = async (req, res) => {
    const { id } = req.params
    const { problem } = req.body

    try {
        const existingProblem = await Problem.findById(id);

        if (!existingProblem) return res.status(404).send(`No problem with id: ${id}`);

        existingProblem.acceptedLanguages = problem.acceptedLanguages
        existingProblem.availableFrom = problem.availableFrom
        existingProblem.availableFromEnabled = problem.availableFromEnabled
        existingProblem.content = problem.content
        existingProblem.dueDate = problem.dueDate
        existingProblem.dueDateEnabled = problem.dueDateEnabled
        existingProblem.inputFiles = problem.inputFiles
        existingProblem.outputFiles = problem.outputFiles
        existingProblem.numberOfTests = problem.numberOfTests
        existingProblem.title = problem.title

        const updatedProblem = await Problem.findByIdAndUpdate(id, existingProblem, { new: true });

        res.status(200).json(updatedProblem)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

export const deleteProblem = async (req, res) => {
    const { id } = req.params

    try {
        await Problem.findByIdAndDelete(id);

        res.status(200).json({ message: "Problem deleted"});
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}