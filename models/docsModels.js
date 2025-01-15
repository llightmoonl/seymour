import mongoose from "mongoose";

const docsSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    }, 
    shortUrl: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
}, 
{
    timestamps: true
})

export const Docs = mongoose.model('docs', docsSchema);