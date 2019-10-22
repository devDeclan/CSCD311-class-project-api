const { model, Schema } = require("mongoose");

const ProgrammeSchema = new Schema({
    code: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
})

module.exports = model("Programme", ProgrammeSchema);