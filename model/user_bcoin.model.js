const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Boolean = mongoose.Schema.Types.Boolean;
// const Number = mongoose.Schema.Types.N;
// Define collection and schema for Business
let UserCoin = new Schema(
    {
        name: {
            type: String,
            required: true,
            default: '',
        },
        password: {
            type: String,
            required: true,
            default: '',
        },
        pritaveKey: {
            type: String,
            required: true,
            default: '',
        },
        publicKey: {
            type: String,
            required: true,
            default: '',
        },
        extends: {
            type: String,
            required: true,
            default: '',
        },
        created: {
            type: Date,
            required: true,
            default: new Date().getTime(),
        },
    },
    {
        collection: 'user_bcoin',
    },
);

module.exports = mongoose.model('UserCoin', UserCoin);
