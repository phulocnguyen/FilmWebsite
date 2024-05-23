const mongoose = require("mongoose");
const { use } = require("../routes/account.route");
const Schema = mongoose.Schema;
const userVerification = new Schema({
    email: {type: String, default: ''},
    otp: {type: String, default: ''},
    createAt: {type: Date, default:  () => new Date(new Date().getTime() + 7*60*60*1000) },
    expireAt: {type: Date, default: () => new Date(new Date().getTime() + 7*60*60*1000) + 600000},
});
module.exports = mongoose.model('UserVerification', userVerification);