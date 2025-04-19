import { Router } from 'express'
import apiController from '../controller/apiController.js'
import authController from '../controller/authController.js'
import paymentController from '../controller/paymentController.js'
import authentication, { paymentMiddleWare } from '../middleware/authentication.js'
import userController from '../controller/userController.js'
import { uploadFiles } from '../middleware/multerHandler.js'
import adminController from '../controller/adminController.js'
import { adminOnly, memberAccess } from '../middleware/rbacMiddleware.js'
import faqController from '../controller/faqController.js'
import categoryController from '../controller/categoryController.js'

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


// Admins route
router.route('/admin/auth/login').post(adminController.login);
router.route('/admin/auth/update-password').post(memberAccess, adminController.updatePassword);

router.route('/admin/create-member').post(adminOnly, adminController.addNewMember);
router.route('/admin/update-profile/:id').put(adminOnly, adminController.updateProfileByAdmin);
router.route('/admin/members').get(adminOnly, adminController.getAllMembers);
router.route('/admin/members/:id').delete(adminOnly, adminController.deleteMember);


router.route('/admin/self').get(memberAccess, adminController.getSelfData);
router.route('/admin/profile').put(memberAccess, adminController.updateProfile);


// category routes
router.route('/categories').get(categoryController.getAllCategories);//Public Access
router.route('/admin/categories').post(adminOnly, categoryController.createCategory);
router.route('/admin/categories/:id').put(adminOnly, categoryController.updateCategory);
router.route('/admin/categories/:id').delete(adminOnly, categoryController.deleteCategory);

// faq routes
router.route('/faqs').get(faqController.getFaqs);//Public Access 
router.route('/admin/faqs').post(adminOnly, faqController.createFaq);
router.route('/admin/faqs/:id').put(adminOnly, faqController.updateFaq);
router.route('/admin/faqs/:id').delete(adminOnly, faqController.deleteFaq);

export default router