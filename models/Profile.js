const { model, Schema } = require("mongoose");

const ProfileSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    other_names: {
        type: String
    },
    email_address: {
        type: String,
        unique: true,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: true
    },
    programme: {
        type: Schema.Types.ObjectId,
        ref: 'Programme'
    },
    admission_year: {
        type: Date,
        required: true
    },
    room: {
        type: Schema.Types.ObjectId,
        ref: 'Room'
    }
})

module.exports = model("Profile", ProfileSchema);