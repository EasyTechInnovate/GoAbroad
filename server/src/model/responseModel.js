import mongoose from "mongoose";

const responseSchema = new mongoose.Schema({
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
    questionnaireId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Questionnaire',
        required: true
    },
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true // Reference to the embedded question in Questionnaire
    },
    answer: {
        type: mongoose.Schema.Types.Mixed, // Can be String, Array, File URL, etc.
        required: true
    },
    status: {
        type: String,
        enum: ["PENDING", "SUBMITTED", "REVIEWED"],
        default: "PENDING"
    },
    feedback: {
        type: String,
        default: null
    },

}, {
    timestamps: true,
    versionKey: false
});

const Response = mongoose.model('Response', responseSchema);
export default Response;