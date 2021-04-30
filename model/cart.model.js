const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define collection and schema for Business
const Boolean = mongoose.Schema.Types.Boolean;

let Cart = new Schema({
    catalog_id: {
        type: String,
        required: true,
        default: ''
    },
    product_id: {
        type: String,
        required: true,
        default: '',
    },
    // True thì sẽ được chuyển đến giao hàng
    status: {
        type: Boolean,
        required: true,
        default: false,
    },
    user_id: {
        type: String,
        required: true,
        default: '',
    },
    amount: {
        type: Number,
        required: true,
        default: 1,
    },
    created: {
        type: Date,
        required: true,
        default: new Date().getTime()
    }
}, {
    collection: 'cart'
});

module.exports = mongoose.model('Cart', Cart);
