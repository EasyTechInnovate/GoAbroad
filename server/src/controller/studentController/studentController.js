import httpResponse from '../../util/httpResponse.js';
import responseMessage from '../../constant/responseMessage.js';
import httpError from '../../util/httpError.js';
import { ValidateProfileUpdate, validateJoiSchema } from '../../service/validationService.js';
import Student from '../../model/studentModel.js';

export default {
    getSelfData: async (req, res, next) => {
        try {
            const student = await Student.findById(req.authenticatedStudent._id).select('-password');
            if (!student) {
                return httpError(next, new Error(responseMessage.NOT_FOUND('Student')), req, 404);
            }

            httpResponse(req, res, 200, responseMessage.SUCCESS, student);
        } catch (err) {
            httpError(next, err, req, 500);
        }
    },

    updateProfile: async (req, res, next) => {
        try {
            const studentId = req.authenticatedStudent._id;
            const updateData = req.body;

            // Validate update data
            const validationResult = validateJoiSchema(ValidateProfileUpdate, updateData);
            if (validationResult.error) {
                return httpError(next, validationResult.error, req, 422);
            }

            // Prevent changes to isFeePaid, isVerified, and role
            const restrictedFields = ['isFeePaid', 'isVerified', 'role',"password"];
            restrictedFields.forEach(field => {
                if (updateData[field] !== undefined) {
                    return httpError(next, new Error(responseMessage.CUSTOM_MESSAGE(`Cannot update ${field}`)), req, 403);
                }
            });

            // Update only the provided fields
            const updatedStudent = await Student.findByIdAndUpdate(
                studentId,
                { $set: updateData },
                { new: true, runValidators: true, select: '-password' }
            );

            if (!updatedStudent) {
                return httpError(next, new Error(responseMessage.NOT_FOUND('Student')), req, 404);
            }

            httpResponse(req, res, 200, responseMessage.SUCCESS, updatedStudent);
        } catch (err) {
            httpError(next, err, req, 500);
        }
    }
};