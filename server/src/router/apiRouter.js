import { Router } from 'express'
import apiController from '../controller/apiController.js'
import authController from '../controller/authController.js'
import paymentController from '../controller/paymentController.js'
import authentication, { paymentMiddleWare } from '../middleware/authentication.js'
import userController from '../controller/userController.js'
import { uploadFiles } from '../middleware/multerHandler.js'

const router = Router()


// public Routes
router.route('/self').get(apiController.self)
router.route('/health').get(apiController.health)
router.route('/upload-file').post(uploadFiles, apiController.uploadFile);

// auth routes
router.route('/auth/login').post(authController.login);
router.route('/auth/signup').post(authController.signup);


// payment routes
router.route('/payment/initiate').post(paymentMiddleWare, paymentController.initiatePayment);
router.route('/payment/verify').post(paymentMiddleWare, paymentController.verifyPayment);


// user routes
router.route('/user/self').get(authentication, userController.getSelfData);
router.route('/user/profile').put(authentication, userController.updateProfile);

export default router