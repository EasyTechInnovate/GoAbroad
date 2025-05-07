import mongoose from "mongoose";

const studentUniversityAssignmentSchema = new mongoose.Schema({
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
    assignedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member',
        required: true
    },
    assignedAt: {
        type: Date,
        default: Date.now
    },
    isAdmitted: {
        type: Boolean,
        default: false
    },
    admissionStatus: {
        type: String,
        enum: ["PENDING", "APPLIED", "ACCEPTED", "REJECTED", "ENROLLED"],
        default: "PENDING"
    },
    admissionComments: {
        type: String,
        trim: true,
        default: null
    },

}, {
    timestamps: true,
    versionKey: false
});

const StudentUniversityAssignment = mongoose.model('StudentUniversityAssignment', studentUniversityAssignmentSchema);
export default StudentUniversityAssignment;