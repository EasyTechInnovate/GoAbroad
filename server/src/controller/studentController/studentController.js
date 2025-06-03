import httpResponse from '../../util/httpResponse.js';
import responseMessage from '../../constant/responseMessage.js';
import httpError from '../../util/httpError.js';
import { ValidateFilterAssignedUniversities, ValidateProfileUpdate, ValidateUpdateAssignedUniversityStatus, validateJoiSchema } from '../../service/validationService.js';
import Student from '../../model/studentModel.js';
import StudentUniversityAssignment from '../../model/studentUniversityAssignmentModel.js';
import mongoose from 'mongoose';

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
    },

     // Get all universities assigned to the authenticated student with pagination and filtering
    getAssignedUniversities: async (req, res, next) => {
        try {
            // Validate filter query
            const { value, error } = validateJoiSchema(ValidateFilterAssignedUniversities, { ...req.query });
            if (error) return httpError(next, error, req, 422);

            const { universityId, admissionStatus, universityStatus, page, limit ,sortOrder } = value;
            const skip = (page - 1) * limit;

            const query = { studentId: req.authenticatedStudent._id };
            if (universityId) query.universityId = universityId;
            if (admissionStatus) query.admissionStatus = admissionStatus;
            if (universityStatus) query.universityStatus = universityStatus;

            const totalAssignments = await StudentUniversityAssignment.countDocuments(query);

            const assignments = await StudentUniversityAssignment.find(query)
                .skip(skip)
                .limit(limit)
                .sort({ assignedAt: sortOrder === 'asc' ? 1 : -1 })
                .populate('studentId', 'name email')
                .populate('universityId')
                .populate('assignedBy', 'name email')
                .lean();

            // Pagination metadata
            const pagination = {
                total: totalAssignments,
                page,
                limit,
                totalPages: Math.ceil(totalAssignments / limit),
                hasNextPage: page < Math.ceil(totalAssignments / limit),
                hasPrevPage: page > 1
            };

            httpResponse(req, res, 200, responseMessage.SUCCESS, {
                assignments,
                pagination
            });
        } catch (err) {
            httpError(next, err, req, 500);
        }
    },

    // Update admissionStatus and universityStatus of an assigned university (student only)
    updateAssignedUniversityStatus: async (req, res, next) => {
        try {
            const {assignmentId} = req.params
            const { value, error } = validateJoiSchema(ValidateUpdateAssignedUniversityStatus, req.body);
            if (error) return httpError(next, error, req, 422);
            if(!assignmentId || !mongoose.Types.ObjectId.isValid(assignmentId)){
                return httpError(next,new Error(responseMessage.CUSTOM_MESSAGE("Assignent ID Required")),req,404)
            }
            const { admissionStatus, universityStatus } = value;

            const assignment = await StudentUniversityAssignment.findById(assignmentId);
            if (!assignment) {
                return httpError(next, new Error(responseMessage.NOT_FOUND('Student-university assignment')), req, 404);
            }


            if (assignment.studentId.toString() !== req.authenticatedStudent._id.toString()) {
                return httpError(next, new Error(responseMessage.UNAUTHORIZED), req, 403);
            }

            if (admissionStatus !== undefined) assignment.admissionStatus = admissionStatus;
            if (universityStatus !== undefined) assignment.universityStatus = universityStatus;

            await assignment.save();

            const populatedAssignment = await StudentUniversityAssignment.findById(assignment._id)
                .populate('studentId', 'name email')
                .populate('universityId')
                .populate('assignedBy', 'name email')
                .lean();

            httpResponse(req, res, 200, responseMessage.SUCCESS, {
                message: 'Assigned university status updated successfully',
                assignment: populatedAssignment
            });
        } catch (err) {
            console.log(err);
            
            httpError(next, err, req, 500);
        }
    }
};