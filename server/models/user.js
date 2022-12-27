import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    faculty: { type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true},
    status: {
        type: String,
        enum: ['Pending', 'Active'],
        default: 'Pending'
    },
    role: {
        type: String,
        enum: ['Student', 'Teacher'],
        default: 'Student'
    },
    requestTeacherRole: {
        type: Boolean,
        default: false
    },
    id : { type: String },
    imageUrl : { type: String, default: "" },
    createdAt: {
        type: Date,
        default: new Date()
    },
    lastLoginAt: {
        type: Date,
        default: new Date()
    }
})

const User = mongoose.model('User', userSchema);

export default User