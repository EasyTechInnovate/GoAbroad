import mongoose from "mongoose";

const studentTaskAssignmentSchema = new mongoose.Schema({
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
    assignedAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ["PENDING", "IN_PROGRESS", "COMPLETED", "REJECTED"],
        default: "PENDING"
    },
    isLocked: {
        type: Boolean,
        default: false
    },
    dueDate:{
        type:Date,
        default:null
    },

}, {
    timestamps: true,
    versionKey: false
});

const StudentTaskAssignment = mongoose.model('StudentTaskAssignment', studentTaskAssignmentSchema);
export default StudentTaskAssignment;