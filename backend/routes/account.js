const express = require('express');
const authenticateUser = require('../middleware/authenticateUser');
const { AccountController } = require('../controllers/account/account');
const { EditProfilePictureController } = require('../controllers/account/editProfilePicture');
const router = express.Router();
const multer = require('multer');
const { EditAccountController } = require('../controllers/account/editAccount');
const { ForgotPasswordController } = require('../controllers/account/forgotPassword');
const { UserSubscriptionDataController } = require('../controllers/account/subscriptionData');
const getUserSubscription = require('../middleware/getUserSubscription');
const getUserSubscriptionPlan = require('../middleware/getUserSubscriptionPlan');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const myAccountController = new AccountController();
router.get(
    '/', 
        async (req,res,next) => authenticateUser(req,res,next),
        async (req,res) =>{
            await myAccountController.do(req,res)
        }
    );

const editProfilePictureController = new EditProfilePictureController();
router.post(
    '/edit/image',
    async (req,res,next) => authenticateUser(req,res,next),
    upload.single('file'),
    async (req, res) =>{
        await editProfilePictureController.do(req,res)
    }
)

const editProfileInfoController = new EditAccountController();
router.patch(
    '/', 
        async (req,res,next) => authenticateUser(req,res,next),
        async (req,res) =>{
            await editProfileInfoController.do(req,res)
        }
    );

const forgotPasswordController = new ForgotPasswordController();
router.post('/support/forgot-password',
        async (req,res) => {
            await forgotPasswordController.do(req,res)
        }
);

const mySubscriptionController = new UserSubscriptionDataController();
router.get(
    '/subscription/info', 
        async (req,res,next) => authenticateUser(req,res,next),
        async (req,res,next) => getUserSubscription(req,res,next),
        async (req,res,next) => getUserSubscriptionPlan(req,res,next),
        async (req,res) =>{
            await mySubscriptionController.do(req,res)
        }
    );

module.exports = router;