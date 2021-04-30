const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let Catalog = new Schema(
    {
        name: {
            type: String,
            required: true,
            default: '',
        },
        description: {
            type: String,
            default: '',
        },
        paramId: {
            type: String,
            required: true,
            default: '-1',
        },
        created: {
            type: Date,
            required: true,
            default: new Date().getTime(),
        },
    },
    {
        collection: 'catalog',
    },
);

module.exports = mongoose.model('Catalog', Catalog);
