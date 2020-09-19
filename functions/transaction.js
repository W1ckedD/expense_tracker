const Transaction = require('../models/Transaction');
const User = require('../models/User');

exports.getUserTransactions = async (event, data) => {
    try {
        const { userId } = data;
        const transactions = await Transaction.find({ userId }).sort({ 'date': 'desc' });
        event.reply('user-transactions-sent', { transactions: JSON.stringify(transactions) });
    } catch (err) {
        console.log(err);
        event.reply('error', 'Something went wrong');
    }
}

exports.addTransaction = async (event, data) => {
    try {
        const transaction = JSON.parse(data.transaction);
        const user = await User.findById(transaction.userId);
        if (transaction.type === 'income') {
            user.currentBalance += transaction.amount;
        } else {
            user.currentBalance -= transaction.amount;
        }
        await user.save();
        const tsx = await Transaction.create(transaction);
        event.reply('transaction-added', { transaction: JSON.stringify(tsx) });
    } catch (err) {
        console.log(err);
        event.reply('error', 'Something went wrong');
    }
}