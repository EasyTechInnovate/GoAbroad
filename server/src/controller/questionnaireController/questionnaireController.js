import httpResponse from '../../util/httpResponse.js';
import responseMessage from '../../constant/responseMessage.js';
import httpError from '../../util/httpError.js';
import { ValidateCreateQuestionnaire, ValidateUpdateQuestionnaire, ValidateDeleteQuestion, validateJoiSchema, questionSchema } from '../../service/validationService.js';
import Questionnaire from '../../model/questionnaireModel.js';
import Joi from 'joi'
export default {
    // Create a new questionnaire (ADMIN only)
    createQuestionnaire: async (req, res, next) => {
        try {
            // Validate input
            const { value, error } = validateJoiSchema(ValidateCreateQuestionnaire, req.body);
            if (error) return httpError(next, error, req, 422);

            // Check role (optional, since middleware already handles it, but added for clarity)
            if (req.authenticatedMember.role !== 'ADMIN') {
                return httpError(next, new Error(responseMessage.UNAUTHORIZED), req, 403);
            }

            // Create new questionnaire
            const questionnaire = new Questionnaire(value);
            await questionnaire.save();

            httpResponse(req, res, 201, responseMessage.SUCCESS, {
                message: 'Questionnaire created successfully',
                questionnaire
            });
        } catch (err) {
            httpError(next, err, req, 500);
        }
    },

    // Update an existing questionnaire (ADMIN only)
    updateQuestionnaire: async (req, res, next) => {
        try {
            const { questionnaireId } = req.params;
            const { value, error } = validateJoiSchema(ValidateUpdateQuestionnaire, req.body);
            if (error) return httpError(next, error, req, 422);

            // Check role
            if (req.authenticatedMember.role !== 'ADMIN') {
                return httpError(next, new Error(responseMessage.UNAUTHORIZED), req, 403);
            }

            // Find questionnaire
            const questionnaire = await Questionnaire.findById(questionnaireId);
            if (!questionnaire) {
                return httpError(next, new Error(responseMessage.NOT_FOUND('Questionnaire')), req, 404);
            }

            // Update fields
            if (value.title) questionnaire.title = value.title;
            if (value.description !== undefined) questionnaire.description = value.description;
            if (value.status) questionnaire.status = value.status;

            // If questions are provided, replace the existing questions
            if (value.questions) {
                questionnaire.questions = value.questions;
            }

            await questionnaire.save();

            httpResponse(req, res, 200, responseMessage.SUCCESS, {
                message: 'Questionnaire updated successfully',
                questionnaire
            });
        } catch (err) {
            httpError(next, err, req, 500);
        }
    },

    // Add a new question to an existing questionnaire (ADMIN only)
    addQuestion: async (req, res, next) => {
        try {
            const { questionnaireId } = req.params;
            const { value, error } = validateJoiSchema(Joi.object({ question: questionSchema.required() }), req.body);
            if (error) return httpError(next, error, req, 422);

            // Check role
            if (req.authenticatedMember.role !== 'ADMIN') {
                return httpError(next, new Error(responseMessage.UNAUTHORIZED), req, 403);
            }

            // Find questionnaire and add question
            const questionnaire = await Questionnaire.findById(questionnaireId);
            if (!questionnaire) {
                return httpError(next, new Error(responseMessage.NOT_FOUND('Questionnaire')), req, 404);
            }

            questionnaire.questions.push(value.question);
            await questionnaire.save();

            httpResponse(req, res, 200, responseMessage.SUCCESS, {
                message: 'Question added successfully',
                questionnaire
            });
        } catch (err) {
            httpError(next, err, req, 500);
        }
    },

    // Delete a specific question from a questionnaire (ADMIN only)
    deleteQuestion: async (req, res, next) => {
        try {
            const { value, error } = validateJoiSchema(ValidateDeleteQuestion, req.body);
            if (error) return httpError(next, error, req, 422);

            const { questionnaireId, questionId } = value;

            // Check role
            if (req.authenticatedMember.role !== 'ADMIN') {
                return httpError(next, new Error(responseMessage.UNAUTHORIZED), req, 403);
            }

            // Find questionnaire and remove question
            const questionnaire = await Questionnaire.findById(questionnaireId);
            if (!questionnaire) {
                return httpError(next, new Error(responseMessage.NOT_FOUND('Questionnaire')), req, 404);
            }

            const questionIndex = questionnaire.questions.findIndex(q => q._id.toString() === questionId);
            if (questionIndex === -1) {
                return httpError(next, new Error(responseMessage.NOT_FOUND('Question')), req, 404);
            }

            questionnaire.questions.splice(questionIndex, 1);
            await questionnaire.save();

            httpResponse(req, res, 200, responseMessage.SUCCESS, {
                message: 'Question deleted successfully',
                questionnaire
            });
        } catch (err) {
            httpError(next, err, req, 500);
        }
    },

    // Delete an entire questionnaire (ADMIN only)
    deleteQuestionnaire: async (req, res, next) => {
        try {
            const { questionnaireId } = req.params;

            // Check role
            if (req.authenticatedMember.role !== 'ADMIN') {
                return httpError(next, new Error(responseMessage.UNAUTHORIZED), req, 403);
            }

            // Find and delete questionnaire
            const questionnaire = await Questionnaire.findByIdAndDelete(questionnaireId);
            if (!questionnaire) {
                return httpError(next, new Error(responseMessage.NOT_FOUND('Questionnaire')), req, 404);
            }

            httpResponse(req, res, 200, responseMessage.SUCCESS, {
                message: 'Questionnaire deleted successfully'
            });
        } catch (err) {
            httpError(next, err, req, 500);
        }
    },

    // Get all questionnaires (accessible to all members)
    getAllQuestionnaires: async (req, res, next) => {
        try {
            const questionnaires = await Questionnaire.find().lean();
            httpResponse(req, res, 200, responseMessage.SUCCESS, questionnaires);
        } catch (err) {
            httpError(next, err, req, 500);
        }
    },

    // Get a specific questionnaire by ID (accessible to all members)
    getQuestionnaireById: async (req, res, next) => {
        try {
            const { questionnaireId } = req.params;
            const questionnaire = await Questionnaire.findById(questionnaireId).lean();
            if (!questionnaire) {
                return httpError(next, new Error(responseMessage.NOT_FOUND('Questionnaire')), req, 404);
            }

            httpResponse(req, res, 200, responseMessage.SUCCESS, questionnaire);
        } catch (err) {
            httpError(next, err, req, 500);
        }
    }
};