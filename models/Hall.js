const { model, Schema } = require("mongoose");

const HallSchema = new Schema({
    code: {
        type: String,
        uppercase: true,
        minlength: 2,
        maxlength: 2,
        required: true,
        unique: true
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
    blocks: [{
        type: Schema.Types.ObjectId,
        ref: 'Block',
        require: true
    }],
})

module.exports = model("Hall", HallSchema);