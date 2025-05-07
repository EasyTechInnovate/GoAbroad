import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    universityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'University',
        required: true
    },
    status: {
        type: String,
        enum: ["UNDER_REVIEW", "SUBMITTED", "REVIEWED", "APPROVED", "DRAFT", "REJECTED"],
        default: "UNDER_REVIEW"
    },
    progress:{
        type:Number,
        default:0
    },
    tasks: [
        {
            taskId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Task',
                required: true
            },
            assignedAt: {
                type: Date,
                default: Date.now
            }
        }
    ],

}, {
    timestamps: true,
    versionKey: false
});

const Application = mongoose.model('Application', applicationSchema);
export default Application;