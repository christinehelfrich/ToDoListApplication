var mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    priority: {type: String, required: true}
});

module.exports = mongoose.model('ToDo', todoSchema);