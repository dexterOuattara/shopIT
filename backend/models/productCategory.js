const mongoose = require('mongoose')
const validator = require('validator');

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter title category'],
        trim: true,
        maxLength: [100, 'Title category cannot exceed 100 characters'],
        unique: true
    },
    description: {
        type: String,
        required: [true, 'Please enter product description'],
    }    ,
    tag: {
        type: String,
        required: [true, 'Please select the right tag'],
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Category', categorySchema);