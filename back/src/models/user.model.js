const { verify } = require("jsonwebtoken");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const user = new Schema({
    username: { type: String, default: ''},
    name: { type: String, default: 'Guest' },
    gender: {type: String, default: null},
    email: { type: String, unique: true, required: true},
    password: { type: String, required: true},
    favoriteFilm: {type: Array, default: [] },
    avatar: {type: String, default: 'https://img.freepik.com/free-photo/3d-illustration-cute-cartoon-boy-with-backpack-his-back_1142-40542.jpg?t=st=1714662956~exp=1714666556~hmac=352287f31e54b4b693b7eb0225febdf3dacd79680533321504120e4a1f5ddcbd&w=740'},
    create: { type: Date, default: Date.now },
    admin: { type: Boolean, default: false },
    verified: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', user);