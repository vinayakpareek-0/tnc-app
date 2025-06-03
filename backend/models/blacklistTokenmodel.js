const mongoosse = require('mongoose');

const blacklistTokenSchema = new mongoosse.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 60 * 24 // 24 hours in seconds
    }
});

module.exports = mongoosse.model('BlacklistToken', blacklistTokenSchema);