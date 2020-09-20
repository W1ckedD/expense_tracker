const mongoose = require('mongoose');

module.exports = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_CONN_STR, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });

        console.log(`Connected to MongoDB: ${conn.connection.host}`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}