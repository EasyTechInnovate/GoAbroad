import mongoose from "mongoose";
const paymentSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    orderId: {
        type: String,

    },
    paymentId: {
        type: String,
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        default: 'INR'
    },
    status: {
        type: String,
        enum: ['PENDING', 'SUCCESS', 'FAILED'],
        default: 'PENDING'
    },
}, {
    timestamps: true,
    versionKey: false
});

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment