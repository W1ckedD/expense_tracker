const mongoose = require('mongoose');

module.exports = async () => {
    try {
        const conn = await mongoose.connect(
            'mongodb://localhost:27017/expense_tracker',
            {
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true,
            }
        );
        console.log(`Connected to MongoDB: ${conn.connection.host}`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};
