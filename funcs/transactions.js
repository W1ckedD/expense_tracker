const Transaction = require('../models/Transaction');

exports.createTransaction = async (event, data) => {
    try {
        const { transaction } = data;
        const tsx = await Transaction.create(transaction);
        event.reply('transaction-created', { transaction:JSON.stringify(tsx) })
    } catch (err) {
        console.log(err);
    }
}