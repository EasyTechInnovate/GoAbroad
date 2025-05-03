import httpResponse from '../../util/httpResponse.js';
import responseMessage from '../../constant/responseMessage.js';
import httpError from '../../util/httpError.js';
import { getStudentsSchema, studentIdSchema, validateJoiSchema } from '../../service/validationService.js';
import Student from '../../model/studentModel.js';

export default {
    getStudents: async (req, res, next) => {
        try {
            const query = req.query;

            // Validate query parameters
            const { error, value } = validateJoiSchema(getStudentsSchema, query);
            if (error) {
                return httpError(next,error,req,400)
            }

            const { page, limit, search, status, isVerified, sortBy, sortOrder } = value;

            // Build the query object
            const queryObj = {};
            if (status) queryObj.status = status;
            if (isVerified !== undefined) queryObj.isVerified = isVerified;
            if (search) {
                queryObj.$or = [
                    { email: { $regex: search, $options: 'i' } },
                    { 'personalDetails.address': { $regex: search, $options: 'i' } },
                    { 'collegeDetails.branch': { $regex: search, $options: 'i' } },
                    { 'collegeDetails.university': { $regex: search, $options: 'i' } },
                ];
            }

            // Pagination and sorting
            const skip = (page - 1) * limit;
            const sortObj = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

            const students = await Student.find(queryObj)
                .select('-password')
                .sort(sortObj)
                .skip(skip)
                .limit(limit)
                .lean();

            // Get total count for pagination metadata
            const totalStudents = await Student.countDocuments(queryObj);
            const totalPages = Math.ceil(totalStudents / limit);

            // Prepare response data
            const data = {
                students,
                pagination: {
                    currentPage: page,
                    totalPages,
                    totalStudents,
                    limit,
                    hasNext: page < totalPages,
                    hasPrev: page > 1,
                },
            };

            httpResponse(req, res, 200, responseMessage.SUCCESS, data);
        } catch (err) {
            httpError(next, err, req, 500);
        }
    },

    getStudentById: async (req, res, next) => {
        try {
            const params = req.params;

            const { error, value } = validateJoiSchema(studentIdSchema, params);
            if (error) {
                return httpError(next, error, req, 400);
            }

            const { studentId } = value;

            const student = await Student.findById(studentId)
                .select('-password')
                .lean();

            if (!student) {
                return httpError(next, new Error('Student not found'), req, 404);
            }

            const data = {
                student,
            };

            httpResponse(req, res, 200, responseMessage.SUCCESS, data);
        } catch (err) {
            httpError(next, err, req, 500);
        }
    },

    deleteStudent: async (req, res, next) => {
        try {
            const params = req.params;

            const { error, value } = validateJoiSchema(studentIdSchema, params);
            if (error) {
                return httpError(next, error, req, 400);
            }

            const { studentId } = value;

            const student = await Student.findById(studentId);
            if (!student) {
                return httpError(next, new Error('Student not found'), req, 404);
            }

            await Student.findByIdAndDelete(studentId);

            const data = {
                message: 'Student deleted successfully',
                studentId,
            };

            httpResponse(req, res, 200, responseMessage.SUCCESS, data);
        } catch (err) {
            httpError(next, err, req, 500);
        }
    },
};