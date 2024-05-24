const responseHandler = require("../handlers/response.handler.js");
const User = require('../models/user.model.js');
const Review = require('../models/review.model.js');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { EmailTransporter } = require('../config/email.config.js');
const UserVerification = require('../models/user.verification.js');
 
class AccountController {
    async signUp(req, res) {
        const newUser = req.body;
        try {
            const find = await User.findOne({email: newUser.email})
            const findUsername = await User.findOne({username: newUser.username});
            if (!find ) {
                if(!findUsername){
                // Hash the password before storing it
                const hashedPassword = await bcrypt.hash(newUser.password, 10); // 10 is the saltRounds
                newUser.password = hashedPassword;
                const user = await User.create(newUser);
                res.send({success: true, email: user.email, _id: user._id});
                console.log("success");
                }else{
                    res.send({success: false, username: false, email:true, message: 'Username already exists'});
                }
            } else {
                res.send({success: false,username: true, email:false, message: 'Email already exists'});
            }
        } catch (error) {
            res.send({success: false, username: false, email:false, message: 'Internal Server Error'});
        }
    }
    
    async login(req, res) {
        const authUser = req.body;
        try {
            const user = await User.findOne({ email: authUser.email });
            if (user) {
                // Compare hashed password with the provided password
                const token = jwt.sign({ _id: user._id, username: user.username},process.env.TOKEN_SECRET_KEY, { expiresIn: '24h' }); // token expires in 1 hour
                // console.log(user);
                const match = await bcrypt.compare(authUser.password, user.password);
                if (match) {
                   // res.send({ success: true, message: 'Login successful', user, token});
                    res.status(200).send({ success: true, token: token, user});
                } else {
                    res.send({ success: false, message: 'Invalid credentials' });
                }
            } else {
                res.send({ success: false, message: 'Email not found' });
            }
        } catch (error) {
            console.error(error);
            res.status(200).send('Internal Server Error');
        }
    }

    async getDetails(req, res) {
        try{
            const user = await User.findOne({username: req.params.username});
            if(user) {
                res.send(user);
            } else {
                res.send('0');
            }
        }catch {
            res.send('can not find user');
        }
    }
    async getAllUsers(req, res) {
        try {
            const data = await User.find();
            if(data){
                res.send({data: data, success: true, message: "get all users success"});
            }else {
                res.send({success: false, message: "can not get all users"});
            }
        }catch (error){
            console.log(error);
            res.send({success: false, message: "error to get all users"});
        }
    }

    async getCart(req, res) {
        try{
            const user = await User.findOne({username: req.params.username});
            if(user && user.CartFilm) {
                res.send(user.CartFilm);
            } else {
                res.send('0');
            }
        }catch {
            res.send('can not find user');
        }
    }
    async addCart(req, res) {
        const { username, movieId } = req.params;
    
        function isValidMovieId(movieId) {
            const movieIdNumber = Number(movieId);
            return Number.isInteger(movieIdNumber) && movieIdNumber > 0;
        }
    
        try {
            if (!movieId) {
                res.status(400).send({ success: false, message: "Movie ID is required" });
                return;
            }
            if (!isValidMovieId(movieId)) {
                res.status(400).send({ success: false, message: "Invalid Movie ID" });
                return;
            }
    
            const user = await User.findOne({ username: username });
            if (!user) {
                res.status(404).send({ success: false, message: "User not found" });
                return;
            }
    
            if (user.CartFilm.includes(movieId)) {
                res.status(409).send({ success: false, message: "Movie already in Carts" });
                return;
            }
    
            user.CartFilm.push(movieId);
            user.save();
            res.status(200).send({ success: true, message: "Add Cart film success", Cart: user.CartFilm });
        } catch (error) {
            console.error("Error occurred:", error);
            res.status(500).send({ success: false, message: "Error occurred" });
        }
    }
    
    
    async removeCart(req, res){
        const { username, movieId } = req.params;
        try{
            const user = await User.findOne({username: username});
            if(user && user.CartFilm.findIndex(film => film === movieId) !== -1){
                user.CartFilm = user.CartFilm.filter(film => film !== movieId);
                user.save();
                res.send({success: true, message: "remove Cart film success",Cart: user.CartFilm});
            }
            else {
                res.send({message: 'Movie not found in Cart list'});
            }
        } catch {
            res.send({message: 'can not find user'});
        } 
    }
    async updateProfile(req, res){
        const { username } = req.params;
        const {name, gender} = req.body;
        try {
            const user = await User.findOne({username: username});
            if(user){
                user.name = name;
                user.gender = gender;
                user.save();
                res.send({success: true, message: "update profile success"});
            } else {
                res.send('0');
            }
            
        } catch{
            res.send('0');
        }
    }
    async updatePassword(req, res){
        const { username } = req.params;
        const {oldPassword, newPassword } = req.body;
        try {
            const user = await User.findOne({username: username});
            if(user){
                
                const match = await bcrypt.compare(oldPassword, user.password);
                if(match){
                    const hashedPassword = await bcrypt.hash(newPassword, 10);
                    user.password = hashedPassword;
                    user.save();
                    res.send({success: true, message: "update password success"});
                }else{
                    res.send({success: false, message: "password not match"});
                }
            } else {
                res.send({success: false, message: "user not found"});
            }
        } catch {
            res.send({success: false, message: "error to update password"});
        }
    }
    async deleteAccount(req, res){
        const { username } = req.params;
        try {
            const user = await User.findOne({username : username});
            if(user){
                await User.deleteOne({username: username});
                res.send({success: true, message: "remove account success"});
            } else {
                res.send({success: false, message: "user not found"});
            }
        }catch {
            res.send({success: false, message: "error to remove account"});
        }
    }
    
    async adminDeleteAccount(req, res){
        const { username } = req.body;
        try {
            const user = await User.findOne({username: username});
            if(user){
                await Review.deleteMany({username: user.username});
                await User.deleteOne({_id: user._id});
                res.send({success: true, message: "remove account success"});
            } else {
                res.send({success: false, message: "user not found"});
            }
        }catch(error) {
            console.log(error);
            res.send({success: false, message: "error to remove account"});
        }
    }
    async resetPassword(req, res){
        const {email, password } = req.body;
        try {
            const user = await User.findOne({email: email});
            if(user){
                const hashedPassword = await bcrypt.hash(password, 10);
                user.password = hashedPassword;
                user.save();
                res.send({success: true, message: "set up password success"});
            } else {
                res.send({success: false, message: "user not found"});
            }
        } catch {
            res.send({success: false, message: "error to set up password"});
        }
    }
    async verifyOTP(req, res){
        const {email, otp} = req.body;
        try{
            // Reset verified field to false at the start of verification
            await User.updateOne({email: email}, {verified: false});

            const userVerification = await UserVerification.findOne({email: email});
            if(userVerification){
                const expireAt = userVerification.expireAt;
                if(Date.now() > expireAt){
                    await UserVerification.deleteMany({email: email});
                    throw new Error("OTP expired");
                }
                const match = await bcrypt.compare(otp, userVerification.otp);
                if(match){
                    const newPassword = `${Math.floor(100000 + Math.random() * 900000)}`;
                    const hashedPassword = await bcrypt.hash(newPassword, 10);
                    await User.updateOne({email: email},{password: hashedPassword}, {verified: true});
                    await UserVerification.deleteMany({email: email});
                    
                    const mailOptions = {
                        from: process.env.EMAIL,
                        to: email,
                        subject: 'New Password',
                        html: `<h1>Your new password is ${newPassword}</h1>
                        <p> link to login: <a href="http://localhost:3000/login">Login</a> </p>`
                    };
                    const transporter = await EmailTransporter();
                    transporter.sendMail(mailOptions);
                    res.send({email: email,password: newPassword,success: true, message: "OTP verification successful. A new password has been sent to your email."});
                } else {
                    res.send({success: false, message: "OTP not match"});
                }
            } else {
                res.send({success: false, message: "OTP not found"});
            }
        }catch(error){
            console.log(error);
            res.send({error: error, success: false, message: "error to verify otp"});

        }
    }
    async verifyEmailOTP(req, res) {
        const { email, otp } = req.body;
        try {
            const userVerification = await UserVerification.findOne({ email: email });
            if (userVerification) {
                const expireAt = userVerification.expireAt;
                if (Date.now() > expireAt) {
                    await UserVerification.deleteMany({ email: email });
                    throw new Error("OTP expired");
                }
                const match = await bcrypt.compare(otp, userVerification.otp);
                if (match) {
                    await User.updateOne({ email: email }, { verified: true });
                    await UserVerification.deleteMany({ email: email });
                    
                    res.send({ email: email, success: true, message: "OTP verification successful. Your email has been verified." });
                } else {
                    res.send({ success: false, message: "OTP not match" });
                }
            } else {
                res.send({ success: false, message: "OTP not found" });
            }
        } catch (error) {
            console.log(error);
            res.send({ error: error.message, success: false, message: "Error verifying OTP" });
        }
    }
    async sendOTPVerification(req, res){
        const { email} = req.body;
        try {
            const check = await User.findOne({email: email});
            if(check){
                if(email){
                const opt = `${Math.floor(1000 + Math.random() * 9000)}`;
                const mailOptions = {
                    from: process.env.EMAIL,
                    to: email,
                    
                    subject: 'OTP Verification',
                    html: `<h1>Your OTP is ${opt}</h1>`
                };
                const hashOTP = await bcrypt.hash(opt, 10);
                const newOTPVerification = new UserVerification( {
                    email: email,
                    otp: hashOTP,
                    createdAt: Date.now(),
                    expireAt: Date.now() + 60000,
                });
                await newOTPVerification.save();
                try{
                    const transporter = await EmailTransporter();
                    transporter.sendMail(mailOptions);
                    res.send({
                        success: true, 
                        message: "send otp success",
                        data: {
                            verify: newOTPVerification
                        }});
                } catch {
                    res.send({success: false, message: "Error to send email"})
                }
                } else {
                    res.send({success: false, message: "Email is error"});
                    // throw new Error("Email is required");
                }
        } else{
            res.send({success: false, message: "Email is not found"});
        }

        }
        catch(error)
        {
            console.log(error);
            res.send({error: error, success: false, message: "send otp fail"});
        }
    }
    
}
module.exports = new AccountController();
