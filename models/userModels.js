import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    shortUrl: {
        type: String, 
        required: true,
        unique: true,
    },
    role: {
        type: String, 
        required: true,
    },
    avatarUrl: String,
})

export const Users = mongoose.model("users", userSchema);
