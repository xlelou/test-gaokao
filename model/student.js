const mongoose = require('../util/db')

const student = mongoose.Schema({
    name: {
        type: "String"
    },
    school: {
        type: "String",
    },
    sex: {
        type: "String"
    },
    img:{
        type:"String"
    },
    pubTime: Date

}, {
    toObject: {
        virtuals: true
    }
});

module.exports = mongoose.model("student", student, 'student');