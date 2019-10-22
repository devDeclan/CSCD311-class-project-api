const { model, Schema } = require("mongoose");

const RoomSchema = new Schema({
    number: {
        type: Number,
        required: true
    },
    block: {
        type: Schema.Types.ObjectId,
        ref: 'Block'
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: true
    },
    capacity: {
        type: Number,
        enum: [1,2,4],
        required: true
    },
    occupants: [{
        type: Schema.Types.ObjectId,
        ref: 'Profile',
        maxlength: this.capacity
    }]
})

module.exports = model("Room", RoomSchema);