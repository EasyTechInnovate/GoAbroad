import { Router } from 'express'
import loanController from '../controller/Loan/loanController.js'
import universityController from '../controller/University/universityController.js'
import apiController from '../controller/apiController/apiController.js'
import { uploadFiles } from '../middleware/multerHandler.js'
import authController from '../controller/authController/authController.js'
import authentication, { paymentMiddleWare } from '../middleware/authentication.js'
import adminController from '../controller/adminController/adminController.js'
import { adminOnly, memberAccess } from '../middleware/rbacMiddleware.js'
import categoryController from '../controller/faqController/categoryController.js'
import faqController from '../controller/faqController/faqController.js'
import paymentController from '../controller/paymentController/paymentController.js'
import studentController from '../controller/studentController/studentController.js'
import adminStudentManagementController from '../controller/adminController/adminStudentManagementController.js'
import questionnaireController from '../controller/questionnaireController/questionnaireController.js'
import subtaskController from '../controller/subtaskController/subtaskController.js'
import subtaskQuestionnaireAssignmentController from '../controller/subtaskController/subtaskQuestionnaireAssignmentController.js'

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

// ******************** USER ROUTES ***********************************
// user routes
router.route('/student/self').get(authentication, studentController.getSelfData);
router.route('/student/profile').put(authentication, studentController.updateProfile);
// ******************** USER ROUTES ***********************************


// ******************** ADMIN ROUTES ***********************************
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

//Loans Routes
router.route("/loans/apply").post(authentication,loanController.applyForLoan)
router.route("/loans").get(memberAccess,loanController.getAllLoans)

// University routes
router.route('/admin/universities').post(memberAccess, universityController.createUniversity);
router.route('/admin/universities').get(memberAccess, universityController.getAllUniversities);
router.route('/universities/:id').get(authentication, universityController.getUniversityById); // Access By the Student
router.route('/admin/universities/:id').get(memberAccess, universityController.getUniversityById); // Access By the Admin Side
router.route('/admin/universities/:id').put(memberAccess, universityController.updateUniversity);
router.route('/admin/universities/:id').delete(adminOnly, universityController.deleteUniversity);

//Student Management
router.route('/admin/students').get(memberAccess, adminStudentManagementController.getStudents);
router.route('/admin/students/:studentId')
    .get(memberAccess, adminStudentManagementController.getStudentById)
    .delete(adminOnly, adminStudentManagementController.deleteStudent);
// ******************** ADMIN ROUTES ***********************************


// ******************** QUESTIONNAIRE ROUTES ***********************************
// Routes for all members (read-only)
router.route('/admin/questionnaires')
    .get(memberAccess, questionnaireController.getAllQuestionnaires);

// Routes for ADMIN only (create, update, delete)
router.route('/admin/questionnaires')
    .post(adminOnly, questionnaireController.createQuestionnaire);

router.route('/admin/questionnaires/:questionnaireId')
    .get(memberAccess, questionnaireController.getQuestionnaireById)
    .put(adminOnly, questionnaireController.updateQuestionnaire)
    .delete(adminOnly, questionnaireController.deleteQuestionnaire);

// Routes for managing questions (ADMIN only)
router.route('/admin/questionnaires/:questionnaireId/questions')
    .post(adminOnly, questionnaireController.addQuestion)
    .delete(adminOnly, questionnaireController.deleteQuestion);
// ******************** QUESTIONNAIRE ROUTES END ***********************************

// ******************** SUBTASK ROUTES  ***********************************
// Routes for all members (read-only)
router.route('/admin/subtasks')
    .get(memberAccess, subtaskController.getAllSubtasks);

// Routes for ADMIN only (create, update, delete)
router.route('/admin/subtasks')
    .post(adminOnly, subtaskController.createSubtask);

router.route('/admin/subtasks/:subtaskId')
    .get(memberAccess, subtaskController.getSubtaskById)
    .put(adminOnly, subtaskController.updateSubtask)
    .delete(adminOnly, subtaskController.deleteSubtask);

// Update Stautus 
router.route('/admin/subtask-questionnaire-assignments/update-status')
    .put(adminOnly, subtaskQuestionnaireAssignmentController.updateAssignmentStatus);
// ******************** SUBTASK ROUTES END ***********************************



export default router