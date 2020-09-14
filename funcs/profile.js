const Profile = require('../models/Profile');

exports.createProfile = async (event, data) => {
    try {
        const { name, initialBalance } = data;
        const profile = await Profile.create({
            name,
            balance: parseFloat(initialBalance),
        });
        event.reply('profile-created', { profile: JSON.stringify(profile) });
    } catch (err) {
        console.log(err);
    }
};

exports.getAllProfiles = async (event, data) => {
    try {
        const profiles = await Profile.find();
        event.reply('all-profiles-sent', {
            profiles: JSON.stringify(profiles),
        });
    } catch (err) {
        console.log(err);
    }
};

exports.selectProfile = async (event, data) => {
    try {
        const { name } = data;
        const profile = await Profile.findOne({ name });
        event.reply('profile-selected', { profile: JSON.stringify(profile) });
    } catch (err) {
        console.log(err);
    }
};
