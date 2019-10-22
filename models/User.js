const { model, Schema } = require("mongoose");
const autoIncrement  = require("mongoose-auto-increment-reworked").MongooseAutoIncrementID;

const UserSchema = new Schema({
    student_id: {
        type: String,
        required: true,
        unique: true
    },
    pin: {
        type: String,
        default: Math.floor(Math.random() * Math.floor(99999)),
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    profile: {
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    }
})

UserSchema.plugin(autoIncrement.plugin, {
    modelName: "User",
    field: "student_id",
    startAt: 10800000,
    incrementBy: 1
})

module.exports = model("User", UserSchema);