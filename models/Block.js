const { model, Schema } = require("mongoose");

const BlockSchema = new Schema({
    code: {
        type: String,
        uppercase: true,
        minlength: 2,
        maxlength: 2,
        required: true,
    },
    hall: {
        type: Schema.Types.ObjectId,
        ref: 'Hall',
        required: true
    },
    name: {
        type: String,
        uppercase: true,
        required: true
    },
    gender: {
        type: String,
        enum: ["male", "female", "unisex"],
        default: "unisex",
        required: true
    },
    rooms: [{
        type: Schema.Types.ObjectId,
        ref: 'Room',
        require: true
    }]
})

module.exports = model('Block', BlockSchema);