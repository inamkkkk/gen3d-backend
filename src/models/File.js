const mongoose = require('mongoose');
const fileSchema = new mongoose.Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    filename: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['sketch', 'model', 'render'],
        required: true
    },
    path: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('File', fileSchema);