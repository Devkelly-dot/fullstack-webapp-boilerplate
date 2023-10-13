const express = require('express');
const RegisterController = require('../controllers/auth/register');
const SigninController = require('../controllers/auth/signin');
const { ChangePasswordController } = require('../controllers/auth/changePassword');
const authenticateUser = require('../middleware/authenticateUser');
const { RecoveryCodeController } = require('../controllers/auth/recoveryCode');
const router = express.Router();

const registerController = new RegisterController();

router.post(
    '/register', 
        async (req,res)=>{await registerController.do(req,res)}
    );

const signinUserController = new SigninController();
router.post(
    '/login', 
        async (req,res)=>{await signinUserController.do(req,res)}
    );

const changePasswordController = new ChangePasswordController();
router.post(
    '/change-password', 
        async (req,res,next) => authenticateUser(req,res,next),
        async (req,res)=>{await changePasswordController.do(req,res)}
    );

const recoveryCodeController = new RecoveryCodeController();
router.post(
    '/recover', 
        async (req,res)=>{await recoveryCodeController.do(req,res)}
    );
module.exports = router;