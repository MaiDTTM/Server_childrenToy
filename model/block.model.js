const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let BlockCoin = new Schema(
    {
        nonce: {
            type: String,
            required: true,
            default: '',
        },
        hash: {
            type: String,
            required: true,
            default: '',
        },
        previousHash: {
            type: String,
            required: true,
            default: '',
        },
        transactions: {
            type: Array,
            default: [],
        },
        timestamp: {
            type: Date,
            required: true,
            default: new Date().getTime(),
        },
    },
    {
        collection: 'block',
    },
);

module.exports = mongoose.model('block', BlockCoin);
