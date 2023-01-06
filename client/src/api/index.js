import axios from 'axios';

const API = axios.create({ baseURL: 'http://35.247.78.161:5001' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
});

export const fetchProblems = () => API.get('/problems');
export const fetchProblem = (id) => API.get(`/problems/${id}`);
export const createProblem = (newProblem) => API.post(`/problems/create`, newProblem);
export const editProblem = (newProblem, id) => API.patch(`/problems/${id}/edit`, newProblem);
export const getFavoriteProblems = (userId) => API.get(`/problems/favorites/${userId}`);
export const deleteProblem = (id) => API.delete(`/problems/${id}/delete`);
export const addToFavorites = (id) => API.patch(`/problems/${id}/addToFavorites`);
export const updateUserResult = (problemId, userId, result) => API.patch(`/problems/${problemId}/updateResult/${userId}`, result); 
export const updateResultComments = (problemId, userId, comment) => API.patch(`/problems/${problemId}/updateResultComments/${userId}`, comment);
export const fetchCommentsForUserResult = (problemId, userId) => API.get(`/problems/${problemId}/comments/${userId}`);


export const logIn = (formData) => API.post('/users/login', formData);
export const signUp = (formData) => API.post('/users/signup', formData);
export const getUserById = (id) => API.get(`/users/${id}`);
export const getUserByEmail = (email) => API.get(`/users/email/${email}`);
export const getUsers = () => API.get('/users');
export const updateUserProfile = (newUser, id) => API.patch(`/users/${id}/updateProfile`, newUser);
export const updateUserAvatar = (avatar, id) => API.patch(`/users/${id}/updateAvatar`, avatar);
export const verifyUser = (id) => API.patch(`/users/${id}/confirm`);
export const confirmTeacherApproval = (id) => API.post(`users/${id}/confirmTeacherApproval`);
export const sendResetPasswordLink = (id) => API.post(`users/${id}/sendResetPasswordLink`);
export const changePassword = (password, id) => API.patch(`users/${id}/changePassword`, password);
export const changePasswordWithAuth = (passwordData, id) => API.patch(`users/${id}/changePasswordWithAuth`, passwordData);
export const requestTeacherAccount = (id) => API.patch(`users/${id}/requestTeacherAccount`);

export const addBatch = (newBatch) => API.post(`/batch/add`, newBatch);
export const getBatchesByUserIdAndProblemId = (userId, problemId) => API.get(`/batch/${userId}/${problemId}`);



const Judge0API = axios.create({ baseURL: 'http://35.230.47.207:80' });

export const addSubmission = (submissionData) => Judge0API.post('/submissions', submissionData);
export const getSubmission = (id) => Judge0API.get(`/submissions/${id}`);
export const postSubmissionsBatch = (batchData) => Judge0API.post('/submissions/batch', batchData);
export const getSubmissionsBatch = (tokens) => Judge0API.get(`/submissions/batch/?tokens=${tokens}`);