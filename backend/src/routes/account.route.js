const express = require('express');
const router = express.Router();
const accountController = require('../controllers/AccountController.js');
const tokenMiddleware = require('../middlewares/token.middleware.js');

router.post('/signup', accountController.signUp);
//Login
router.post('/login', accountController.login);
router.get('/all', accountController.getAllUsers);
router.get('/:username', accountController.getDetails);
router.get('/:username/Cart',accountController.getCart);
router.post('/:username/addCart/:movieId',tokenMiddleware.authenticateToken,accountController.addCart);
router.post('/:username/removeCart/:movieId',tokenMiddleware.authenticateToken,accountController.removeCart);
router.put('/:username/update-profile',tokenMiddleware.authenticateToken,accountController.updateProfile);
router.put('/:username/update-password',tokenMiddleware.authenticateToken,accountController.updatePassword);
router.put('/reset-password', accountController.resetPassword);
router.delete('/:username/delete', tokenMiddleware.authenticateToken, accountController.deleteAccount);
router.delete('/admin-delete',accountController.adminDeleteAccount);
router.post('/send-otp', accountController.sendOTPVerification);
router.post('/verify-otp', accountController.verifyOTP);
router.post('/verify-email-otp', accountController.verifyEmailOTP);
 


module.exports = router;