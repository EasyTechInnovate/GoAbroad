import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required: true
    },
    subtaskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subtask',
        required: true
    },
    uploads: [
        {
            uploader: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Member',
                required: true
            },
            fileUrl: {
                type: String,
                required: true 
            },
            fileName: {
                type: String,
                required: true,
                trim: true
            },
            fileType: {
                type: String,
                required: true,
                trim: true // e.g., "PDF", "DOCX"
            },
            uploadedAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
}, {
    timestamps: true,
    versionKey: false
});

const Document = mongoose.model('Document', documentSchema);
export default Document;