const Profile = require('../models/Profile');

exports.createProfile = (event, data) => {
    const { name, initialBalance } = data;
    console.log(name, initialBalance);
    Profile.create({
        name,
        balance: parseFloat(initialBalance),
    })
        .then((res) => {
            event.reply('profile-created', res);
        })
        .catch((err) => console.log(err));
};
