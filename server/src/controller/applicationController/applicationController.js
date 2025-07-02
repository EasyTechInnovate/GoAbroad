import httpError from '../../util/httpError.js';
import responseMessage from '../../constant/responseMessage.js';
import httpResponse from '../../util/httpResponse.js';
import { ValidateCreateApplication, ValidateUpdateApplication, ValidateFilterApplications, validateJoiSchema } from '../../service/validationService.js';
import StudentUniversityAssignment from '../../model/studentUniversityAssignmentModel.js';
import Response from '../../model/responseModel.js';
import StudentTaskAssignment from '../../model/studentTaskAssignmentModel.js';
import Application from '../../model/applicationModel.js';
import Student from '../../model/studentModel.js';

import University from '../../model/universityModel.js';
import TaskSubtaskAssignment from '../../model/taskSubtaskAssignmentModel.js';
import Member from '../../model/membersModel.js';
import SubtaskQuestionnaireAssignment from '../../model/subtaskQuestionnaireAssignmentModel.js';
import Document from '../../model/documentModel.js';
export default {
    // Create a new application (ADMIN only)
    createApplication: async (req, res, next) => {
        try {
            const { value, error } = validateJoiSchema(ValidateCreateApplication, req.body);
            if (error) return httpError(next, error, req, 422);

            const { studentId, universityId, taskAssignments, assignTo } = value;

            const student = await Student.findById(studentId).lean();
            if (!student) {
                return httpError(next, new Error('Student not found'), req, 404);
            }

            const university = await University.findById(universityId).lean();
            if (!university) {
                return httpError(next, new Error('University not found'), req, 404);
            }

            const studentUniversityAssignment = await StudentUniversityAssignment.findOne({
                studentId,
                universityId
            }).lean();
            if (!studentUniversityAssignment) {
                return httpError(next, new Error('Student is not associated with this university'), req, 400);
            }

            const taskAssignmentIds = taskAssignments;
            const validAssignments = await StudentTaskAssignment.find({ taskId: { $in: taskAssignmentIds }, studentId }).lean();
            if (validAssignments.length !== taskAssignmentIds.length) {
                return httpError(next, new Error('One or more task assignments are invalid or not assigned to the student'), req, 400);
            }

            let assingToMember = null
            if (assignTo) {
                const isMemberExist = await Member.findById(assignTo)
                if (!isMemberExist) {
                    return httpError(next, new Error('Member Not Found'), req, 400);
                }
                assingToMember = isMemberExist
            }

            const application = new Application({
                studentId,
                universityId,
                taskAssignments: taskAssignments.map(taskAssignmentId => ({ taskAssignmentId })),
                assignTo: assingToMember?._id || req.authenticatedMember._id
            });
            await application.save();

            const populatedApplication = await Application.findById(application._id)
                .populate('studentId', 'name email')
                .populate('universityId', 'name program')
                .populate('assignTo', 'name email role')
                .populate('taskAssignments.taskAssignmentId', 'taskId status assignedAt')
                .lean();

            httpResponse(req, res, 201, responseMessage.SUCCESS, {
                message: 'Application created successfully',
                application: populatedApplication
            });
        } catch (err) {
            httpError(next, err, req, 500);
        }
    },

    updateApplication: async (req, res, next) => {
        try {
            const { value, error } = validateJoiSchema(ValidateUpdateApplication, { ...req.params, ...req.body });
            if (error) return httpError(next, error, req, 422);

            const { applicationId } = req.params;
            const { status, progress, taskAssignments, assignTo } = value;

            const application = await Application.findById(applicationId);
            if (!application) {
                return httpError(next, new Error(responseMessage.NOT_FOUND('Application')), req, 404);
            }

            if (status) application.status = status;
            if (progress !== undefined) application.progress = progress;
            if (taskAssignments) {
                const taskAssignmentIds = taskAssignments;
                const validAssignments = await StudentTaskAssignment.find({ taskId: { $in: taskAssignmentIds }, studentId: application.studentId }).lean();
                if (validAssignments.length !== taskAssignmentIds.length) {
                    return httpError(next, new Error('One or more task assignments are invalid or not assigned to the student'), req, 400);
                }
                application.taskAssignments = taskAssignments.map(taskAssignmentId => ({ taskAssignmentId }));
            }
            if (assignTo) {
                let assingToMember = null
                const isMemberExist = await Member.findById(assignTo)
                if (!isMemberExist) {
                    return httpError(next, new Error('Member Not Found'), req, 400);
                }
                assingToMember = isMemberExist
                application.assignTo = assingToMember?._id;
            }

            await application.save();

            const populatedApplication = await Application.findById(application._id)
                .populate('studentId', 'name email')
                .populate('universityId', 'name program')
                .populate('assignTo', 'name email role')
                .populate('taskAssignments.taskAssignmentId', 'taskId status assignedAt')
                .lean();

            httpResponse(req, res, 200, responseMessage.SUCCESS, {
                message: 'Application updated successfully',
                application: populatedApplication
            });
        } catch (err) {
            httpError(next, err, req, 500);
        }
    },
    // Delete application (ADMIN and EDITOR only)
    deleteApplication: async (req, res, next) => {
        try {
            const { applicationId } = req.params;


            const application = await Application.findById(applicationId);
            if (!application) {
                return httpError(next, new Error(responseMessage.NOT_FOUND('Application')), req, 404);
            }

            await Application.findByIdAndDelete(applicationId);

            httpResponse(req, res, 200, responseMessage.SUCCESS, {
                message: 'Application deleted successfully'
            });
        } catch (err) {
            httpError(next, err, req, 500);
        }
    },

    // Get all applications with pagination, search, and filters (all members)
    getApplications: async (req, res, next) => {
        try {
            const { value, error } = validateJoiSchema(ValidateFilterApplications, { ...req.query });
            if (error) return httpError(next, error, req, 422);

            const { status, studentId, universityId, search, page, limit } = value;
            const skip = (page - 1) * limit;

            const query = {};
            if (status) query.status = status;
            if (studentId) query.studentId = studentId;
            if (universityId) query.universityId = universityId;
            if (search) {
                query.$or = [
                    { 'studentId': { $regex: search, $options: 'i' } },
                    { 'universityId': { $regex: search, $options: 'i' } }
                ];
            }

            const totalApplications = await Application.countDocuments(query);

            const applications = await Application.find(query)
                .skip(skip)
                .limit(limit)
                .populate('studentId', 'name email')
                .populate('universityId', 'name program')
                .populate('assignTo', 'name email role')
                .populate('taskAssignments.taskAssignmentId', 'taskId status assignedAt')
                .lean();

            const pagination = {
                total: totalApplications,
                page,
                limit,
                totalPages: Math.ceil(totalApplications / limit),
                hasNextPage: page < Math.ceil(totalApplications / limit),
                hasPrevPage: page > 1
            };

            httpResponse(req, res, 200, responseMessage.SUCCESS, {
                applications,
                pagination
            });
        } catch (err) {
            httpError(next, err, req, 500);
        }
    },

    // Get application by ID with detailed information (all members)
    getApplicationById: async (req, res, next) => {
        try {
            const { applicationId } = req.params;
            const application = await Application.findById(applicationId)
                .populate('studentId', 'name email')
                .populate('universityId', 'name program location ranking')
                .populate('assignTo', 'name email role')
                .populate({
                    path: 'taskAssignments.taskAssignmentId',
                    populate: {
                        path: 'taskId',
                        select: 'title description priority'
                    }
                })
                .lean();
            if (!application) {
                return httpError(next, new Error(responseMessage.NOT_FOUND('Application')), req, 404);
            }

            const studentId = application.studentId._id;
            const subtaskAssignments = await TaskSubtaskAssignment.find({
                studentId,
                taskId: { $in: application.taskAssignments.map(ta => ta.taskAssignmentId.taskId._id) }
            }).lean();

            const questionnaireAssignments = await SubtaskQuestionnaireAssignment.find({
                subtaskId: { $in: subtaskAssignments.map(a => a.subtaskId) }
            })
                .populate('questionnaireId', 'title description status')
                .lean();

            const documents = await Document.find({
                studentId,
                subtaskId: { $in: subtaskAssignments.map(a => a.subtaskId) },
                taskId: { $in: application.taskAssignments.map(ta => ta.taskAssignmentId.taskId._id) }
            }).lean();

            const questionnairesBySubtask = questionnaireAssignments.reduce((acc, qa) => {
                const sid = qa.subtaskId.toString();
                acc[sid] = acc[sid] || [];
                acc[sid].push({
                    _id: qa._id,
                    questionnaire: qa.questionnaireId,
                    status: qa.status,
                    assignedAt: qa.assignedAt
                });
                return acc;
            }, {});

            const documentsBySubtask = documents.reduce((acc, doc) => {
                const sid = doc.subtaskId.toString();
                acc[sid] = acc[sid] || [];
                acc[sid].push(doc);
                return acc;
            }, {});

            const tasks = application.taskAssignments.map(ta => {
                const t = ta.taskAssignmentId.taskId._id.toString();
                const related = subtaskAssignments.filter(s => s.taskId.toString() === t);

                const subtasks = related.map(sa => ({
                    _id: sa.subtaskId,
                    assignedAt: sa.assignedAt,
                    status: sa.status,
                    questionnaires: questionnairesBySubtask[sa.subtaskId.toString()] || [],
                    documents: documentsBySubtask[sa.subtaskId.toString()] || []
                }));

                return {
                    task: {
                        _id: ta.taskAssignmentId.taskId._id,
                        title: ta.taskAssignmentId.taskId.title,
                        description: ta.taskAssignmentId.taskId.description,
                        priority: ta.taskAssignmentId.taskId.priority,
                        status: ta.taskAssignmentId.status,
                        assignedAt: ta.taskAssignmentId.assignedAt
                    },
                    subtasks
                };
            });

            const responseData = {
                applicationDetails: {
                    _id: application._id,
                    studentId: application.studentId,
                    universityId: application.universityId,
                    assignTo: application.assignTo,
                    status: application.status,
                    progress: application.progress,
                    createdAt: application.createdAt,
                    updatedAt: application.updatedAt
                },
                tasks
            };

            httpResponse(req, res, 200, responseMessage.SUCCESS, responseData);

        } catch (err) {
            httpError(next, err, req, 500);
        }
    }

};