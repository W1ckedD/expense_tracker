const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
    },
    amount: {
        type: Number,
        required: true,
    },
    newBalance: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    createdAd: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Transaction', transactionSchema);
