const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeesSchema = new Schema({
    Employee_name: {
        type: String,
        required: true
    },
    Salary: {
        type: Number,
        required: true
    },
})

module.exports = mongoose.model('Employee', employeesSchema);