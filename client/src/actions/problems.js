import * as api from '../api'

// Action Creators
export const getProblem = (id) => async (dispatch) => {
    try {
        const { data } = await api.fetchProblem(id);

        dispatch({ type: 'FETCH_PROBLEM', payload: data });
        dispatch({ type: 'CLEAR_TEST_RESULTS' });
    } catch (error) {
        console.log(error.message);
    }
}

export const editProblem = (newProblem, id) => async (dispatch) => {
    try {
        const { data } = await api.editProblem(newProblem, id);

        dispatch({ type: 'FETCH_PROBLEM', payload: data });
        dispatch({ type: 'CLEAR_TEST_RESULTS' });
    } catch (error) {
        console.log(error.message)
    }
}

export const getProblems = (navigate) => async (dispatch) => {
    try {
        const { data } = await api.fetchProblems();
        dispatch({ type: 'FETCH_ALL', payload: { data: data} });
    } catch (error) {
        console.log(error.message);
        if (error.message === "Request failed with status code 401")
            navigate("/unauthorized")
    }

}

export const getFavoriteProblems = (userId, navigate) => async (dispatch) => {
    try {
        const { data } = await api.getFavoriteProblems(userId);

        dispatch({ type: 'FETCH_FAVORITES', payload: { data: data} });
    } catch (error) {
        console.log(error.message);
        if (error.message === "Request failed with status code 401")
            navigate("/unauthorized")
    }

}

export const createProblem = (problem) => async (dispatch) => {
    try {
        const { data } = await api.createProblem(problem);

        dispatch({ type: 'CREATE', payload: data })
    } catch (error) {
        console.log(error.message)
    }
}

export const deleteProblem = (id) => async (dispatch) => {
    try {
        await api.deleteProblem(id);
    } catch (error) {
        console.log(error.message)
    }

}

export const addProblemToFavorites = (id) => async (dispatch) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    // console.log(user)
    try {
        const { data } = await api.addToFavorites(id, user?.token);

        dispatch({ type: api.addToFavorites, payload: data });
    } catch (error) {
        console.log(error.message)
    }
}

export const getProblemBatchesForAllUsers = (problemId) => async (dispatch) => {
    try {
        const users = await api.getUsers();
        const usersData = users.data
            .filter((user) => user.role === "Student" && user.status === "Active")
            .map((user) => ({ _id: user._id, firstName: user.firstName, role: user.role, status: user.status, lastName: user.lastName, avatar: user.imageUrl, result: {} }))
            .sort((user1, user2) => {
                return `${user1.lastName} ${user1.firstName}`.localeCompare(`${user2.lastName} ${user2.firstName}`)
            })
  
        const { data } = await api.fetchProblem(problemId);
        const { userResults } = data;

        const updatedUsersData = []
        const userResultsMap = new Map(Object.entries(userResults));
        for (let i = 0; i < usersData.length; i++) {
            
            if (userResultsMap.has(usersData[i]._id)) {
                const result = userResultsMap.get(usersData[i]._id);
                const tokens = result.submissions.join(",");
                const res = await api.getSubmissionsBatch(tokens);
                const newResult = {...result, submissions: res.data.submissions};
                updatedUsersData.push({...usersData[i], result: newResult})
            } else {
                updatedUsersData.push(usersData[i])
            }
        }

        dispatch({ type: 'GET_PROBLEM_RESULTS', payload: updatedUsersData })

    } catch (error) {
        console.log(error.message)
    }
}

export const addCommentToResult = (problemId, userId, comment) => async (dispatch) => {
    try {
        await api.updateResultComments(problemId, userId, {comment: comment});
        dispatch({ type: 'RESET_COMMENTS' });
    } catch (error) {
        console.log(error.message)
    }
}

export const fetchCommentsForUserResult = (problemId, userId) => async (dispatch) => {
    try {
        
        const { data } = await api.fetchCommentsForUserResult(problemId, userId);
        
        const comments = [];

        for (let i = 0; i < data.length; i++) {
            const user = (await api.getUserById(data[i].userId)).data;

            comments.push({...data[i], name: `${user.firstName} ${user.lastName}`, avatar: user.imageUrl});
        }

        dispatch({ type: 'FETCH_COMMENTS', payload: comments });
        // return comments;

    } catch (error) {
        console.log(error.message);
    }
}