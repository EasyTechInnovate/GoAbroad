import { createCustomToken, getFirestore } from '../../config/firebase.js';
import httpResponse from '../../util/httpResponse.js';
import httpError from '../../util/httpError.js';
import responseMessage from '../../constant/responseMessage.js';
import Student from '../../model/studentModel.js';
import Member from '../../model/membersModel.js';
import mongoose from 'mongoose';

export default {
    generateChatToken: async (req, res, next) => {
        try {
            const { authenticatedStudent, authenticatedMember } = req;
            const { targetId } = req.body; // Student provides memberId, Member provides studentId

            if (!targetId) {
                return httpError(next, new Error('Target ID is required'), req, 400);
            }

            if (!mongoose.Types.ObjectId.isValid(targetId)) {
                return httpError(next, new Error('Invalid Id'), req, 400);
            }

            let student, member, chatRoomId;

            // Determine user role and fetch participants
            if (authenticatedStudent) {
                // Student initiating chat with a Member
                student = authenticatedStudent;
                member = await Member.findById(targetId).select('-password');
                if (!member || member.status !== 'ACTIVE') {
                    return httpError(next, new Error('Member not found or inactive'), req, 404);
                }
                chatRoomId = `${student._id}_${member._id}`;
            } else if (authenticatedMember) {
                member = authenticatedMember;
                student = await Student.findById(targetId).select('-password');
                if (!student || !student.isVerified || !student.isFeePaid) {
                    return httpError(next, new Error('Student not found, unverified, or fee not paid'), req, 404);
                }
                chatRoomId = `${student._id}_${member._id}`;
            } else {
                return httpError(next, new Error('Unauthorized: No valid user found'), req, 401);
            }

            // Initialize Firestore
            const db = getFirestore();
            if (!db) {
                return httpError(next, new Error('Failed to initialize Firestore'), req, 500);
            }

            // Check if chat room exists
            const chatRoomRef = db.collection('chatRooms').doc(chatRoomId);
            const chatRoomDoc = await chatRoomRef.get();

            if (!chatRoomDoc.exists) {
                // Create new chat room
                await chatRoomRef.set({
                    studentId: student._id.toString(),
                    memberId: member._id.toString(),
                    status: 'active',
                    createdAt: new Date(),
                    participants: {
                        student: {
                            id: student._id.toString(),
                            name: student.name || 'Student',
                        },
                        member: {
                            id: member._id.toString(),
                            name: `${member.firstName} ${member.lastName}`.trim() || 'Member',
                        },
                    },
                }, { merge: true });
            } else {
                // Ensure chat room is active
                const chatRoomData = chatRoomDoc.data();
                if (chatRoomData.status !== 'active') {
                    await chatRoomRef.update({ status: 'active' });
                }
            }

            // Generate Firebase custom token
            const userId = authenticatedStudent ? student._id.toString() : member._id.toString();
            const customClaims = {
                chatRoomId,
                role: authenticatedStudent ? 'STUDENT' : 'MEMBER',
            };

            const firebaseToken = await createCustomToken(userId, customClaims);

            // Response
            httpResponse(req, res, 200, responseMessage.SUCCESS, {
                firebaseToken,
                chatRoomId,
                userInfo: {
                    id: userId,
                    name: authenticatedStudent ? student.name : `${member.firstName} ${member.lastName}`.trim(),
                    role: authenticatedStudent ? 'STUDENT' : 'MEMBER',
                },
                targetInfo: {
                    id: authenticatedStudent ? member._id.toString() : student._id.toString(),
                    name: authenticatedStudent ? `${member.firstName} ${member.lastName}`.trim() : student.name,
                    role: authenticatedStudent ? 'MEMBER' : 'STUDENT',
                },
            });
        } catch (error) {
            console.error('Generate chat token error:', error);
            httpError(next, error, req, 500);
        }
    },

    //  Get list of chat rooms 
    getChatRooms: async (req, res, next) => {
        try {
            const { authenticatedStudent, authenticatedMember } = req;
            const db = getFirestore();
            if (!db) {
                return httpError(next, new Error('Failed to initialize Firestore'), req, 500);
            }

            let query;
            const userId = authenticatedStudent ? authenticatedStudent._id.toString() : authenticatedMember._id.toString();
            const role = authenticatedStudent ? 'studentId' : 'memberId';

            // Query chat rooms where user is a participant
            query = db.collection('chatRooms').where(role, '==', userId).where('status', '==', 'active');

            const snapshot = await query.get();
            let chatRooms = snapshot.docs.map(doc => ({
                chatRoomId: doc.id,
                ...doc.data(),
            }));

            if (authenticatedStudent) {
                // For students: Fetch member details
                const memberIds = chatRooms.map(room => room.memberId);
                const members = await Member.find({ _id: { $in: memberIds }, status: 'ACTIVE' })
                    .select('firstName lastName email profilePicture')
                    .lean();

                // Create a map for quick lookup
                const memberMap = members.reduce((acc, member) => {
                    acc[member._id.toString()] = {
                        id: member._id.toString(),
                        name: `${member.firstName} ${member.lastName}`.trim() || 'Unnamed Member',
                        email: member.email,
                        profilePicture: member.profilePicture || null,
                    };
                    return acc;
                }, {});

                chatRooms = chatRooms.map(room => ({
                    ...room,
                    participants: {
                        ...room.participants,
                        member: memberMap[room.memberId] || room.participants.member,
                    },
                }));
            } else if (authenticatedMember) {
                // For admins: Fetch student details
                const studentIds = chatRooms.map(room => room.studentId);
                const students = await Student.find({ _id: { $in: studentIds } })
                    .select('name email profilePicture isVerified isFeePaid status')
                    .lean();

                // Create a map for quick lookup
                const studentMap = students.reduce((acc, student) => {
                    acc[student._id.toString()] = {
                        id: student._id.toString(),
                        name: student.name || 'Unnamed Student',
                        email: student.email,
                        profilePicture: student.profilePicture || null,
                        isVerified: student.isVerified,
                        isFeePaid: student.isFeePaid,
                        status: student.status,
                    };
                    return acc;
                }, {});

                chatRooms = chatRooms.map(room => ({
                    ...room,
                    participants: {
                        ...room.participants,
                        student: studentMap[room.studentId] || room.participants.student,
                    },
                }));
            }

            httpResponse(req, res, 200, responseMessage.SUCCESS, { chatRooms });
        } catch (error) {
            console.error('Get chat rooms error:', error);
            httpError(next, error, req, 500);
        }
    },

    //  Get all students with pagination (for admins)
    getAllStudents: async (req, res, next) => {
        try {
            const { authenticatedMember } = req;
            if (!authenticatedMember || authenticatedMember.role !== 'ADMIN') {
                return httpError(next, new Error('Unauthorized: Admin access required'), req, 403);
            }

            // Extract and validate pagination parameters
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            if (page < 1 || limit < 1) {
                return httpError(next, new Error('Invalid page or limit parameters'), req, 400);
            }

            // Calculate skip value for pagination
            const skip = (page - 1) * limit;

            // Fetch total count of students
            const totalItems = await Student.countDocuments();

            const students = await Student.find()
                .select('name email profilePicture isVerified isFeePaid status')
                .skip(skip)
                .limit(limit)
                .lean();

            const sanitizedStudents = students.map(student => ({
                id: student._id.toString(),
                name: student.name || 'Unnamed Student',
                email: student.email,
                profilePicture: student.profilePicture || null,
                isVerified: student.isVerified,
                isFeePaid: student.isFeePaid,
                status: student.status,
            }));

            const totalPages = Math.ceil(totalItems / limit);

            httpResponse(req, res, 200, responseMessage.SUCCESS, {
                students: sanitizedStudents,
                pagination: {
                    totalItems,
                    currentPage: page,
                    totalPages,
                    limit,
                },
            });
        } catch (error) {
            console.error('Get all students error:', error);
            httpError(next, error, req, 500);
        }
    },

    // Get all active members with pagination (for students)
    getAllMembers: async (req, res, next) => {
        try {
            const { authenticatedStudent } = req;
            if (!authenticatedStudent) {
                return httpError(next, new Error('Unauthorized: Student access required'), req, 403);
            }

            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            if (page < 1 || limit < 1) {
                return httpError(next, new Error('Invalid page or limit parameters'), req, 400);
            }

            const skip = (page - 1) * limit;

            const totalItems = await Member.countDocuments({ status: 'ACTIVE' });

            const members = await Member.find({ status: 'ACTIVE' })
                .select('firstName lastName email profilePicture')
                .skip(skip)
                .limit(limit)
                .lean();

            const sanitizedMembers = members.map(member => ({
                id: member._id.toString(),
                name: `${member.firstName} ${member.lastName}`.trim() || 'Unnamed Member',
                email: member.email,
                profilePicture: member.profilePicture || null,
            }));

            const totalPages = Math.ceil(totalItems / limit);

            httpResponse(req, res, 200, responseMessage.SUCCESS, {
                members: sanitizedMembers,
                pagination: {
                    totalItems,
                    currentPage: page,
                    totalPages,
                    limit,
                },
            });
        } catch (error) {
            console.error('Get all members error:', error);
            httpError(next, error, req, 500);
        }
    },

    // Clean up chat data after consultation ends
    cleanupChatRoom: async (req, res, next) => {
        try {
            const { chatId } = req.params;


            const db = getFirestore();

            const messagesRef = db.collection('chatRooms').doc(chatId).collection('messages');
            const messages = await messagesRef.get();

            const batch = db.batch();
            messages.docs.forEach(doc => {
                batch.delete(doc.ref);
            });

            // Delete chat room
            batch.delete(db.collection('chatRooms').doc(chatId));

            await batch.commit();

            httpResponse(req, res, 200, responseMessage.SUCCESS, {
                message: 'Chat room cleaned up successfully'
            });

        } catch (error) {
            console.error('Cleanup chat room error:', error);
            httpError(next, error, req, 500);
        }
    }
};