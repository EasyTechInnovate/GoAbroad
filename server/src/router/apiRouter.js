import { Router } from 'express'
import apiController from '../controller/apiController.js'
import authController from '../controller/authController.js'

const router = Router()


// public Routes
router.route('/self').get(apiController.self)
router.route('/health').get(apiController.health)

// auth routes
router.route('/auth/login').post(authController.login);
router.route('/auth/signup').post(authController.signup);

export default router