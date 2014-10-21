var mongoose        = require('mongoose');
var Schema          = mongoose.Schema;

mongoose.connect('mongodb://localhost/essencial');

var users       = new Schema({
    name: {
        type: String, trim: true, default: '', required: true
    },
    gender: {
        type: String, trim: true, default: ''
    },
    image: {
        type: String, trim: true, default: './app/img/avatar.png'
    },
    email: {
        type: String, required: true, unique: true, trim: true
    },
    password: {
        type: String, required: true,trim: true
    },
    level: {
        type: Number, required: true, trim: true
    },
    createdAt: {
        type: Date, default: Date.now, trim: true
    },
    updatedAt: {
        type: Date, default: Date.now, trim: true
    },
    deletedAt: {
        type: Date, trim: true
    }
});

module.exports = mongoose.model('Users',users);