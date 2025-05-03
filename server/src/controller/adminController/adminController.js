import httpResponse from '../../util/httpResponse.js';
import responseMessage from '../../constant/responseMessage.js';
import httpError from '../../util/httpError.js';
import { ValidateMemberCreate, ValidateMemberUpdate, ValidatePasswordUpdate, ValidateLogin, validateJoiSchema, ValidateMembersQuery } from '../../service/validationService.js';
import quicker from '../../util/quicker.js';
import config from '../../config/config.js';
import Member from "../../model/membersModel.js"

export default {
    // All members: Login with cookie
    login: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const validationResult = validateJoiSchema(ValidateLogin, req.body);
            if (validationResult.error) {
                return httpError(next, validationResult.error, req, 422);
            }

            const member = await Member.findOne({ email });
            if (!member || !await quicker.comparePassword(password, member.password)) {
                return httpError(next, new Error(responseMessage.INVALID_CREDENTIALS), req, 401);
            }

            if (member.status === 'INVITED') {
                await Member.findByIdAndUpdate(member._id, { status: 'ACTIVE' });
            }

            const accessToken = quicker.generateToken({ id: member._id, email, role: member.role }, config.ACCESS_TOKEN.SECRET, config.ACCESS_TOKEN.EXPIRY);
            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 24 * 60 * 60 * 1000, // 24 hours
                path: '/',
                sameSite: 'strict'
            });

            const userData = { ...member.toObject(), password: undefined };
            httpResponse(req, res, 200, responseMessage.SUCCESS, { user: userData, accessToken });
        } catch (err) {
            httpError(next, err, req, 500);
        }
    },

    /**
     * **************************************************
     *                      ADMIN ONLY ROUTES
     * **************************************************
     */
    // Admin-only: Add new member
    addNewMember: async (req, res, next) => {
        try {

            const validationResult = validateJoiSchema(ValidateMemberCreate, req.body);
            if (validationResult.error) {
                return httpError(next, validationResult.error, req, 422);
            }
            const { firstName, lastName, email, password, role, phone, address, profilePicture, bio } = validationResult.value;

            const hashedPassword = await quicker.hashPassword(password);
            const member = new Member({
                firstName,
                lastName,
                email,
                bio,
                password: hashedPassword,
                role,
                status: 'INVITED',
                phone,
                address,
                profilePicture
            });
            await member.save();

            // TODO: Implement email notification in future
            httpResponse(req, res, 201, responseMessage.SUCCESS, { message: 'Member invited successfully', memberId: member._id });
        } catch (err) {
            httpError(next, err, req, 500);
        }
    },

    // Admin-only: Update any member's profile (not self)
    updateProfileByAdmin: async (req, res, next) => {
        try {
            const admin = req.authenticatedMember;
            if (admin.role !== 'ADMIN') {
                return httpError(next, new Error(responseMessage.UNAUTHORIZED), req, 403);
            }

            const memberId = req.params.id;

            if (memberId === admin._id.toString()) {
                return httpError(next, new Error(responseMessage.CUSTOM_MESSAGE("CANNOT UPDATE YOURSELF")), req, 403);
            }

            const { value, error } = validateJoiSchema(ValidateMemberUpdate, req.body);
            if (error) {
                return httpError(next, error, req, 422);
            }

            const updateData = value;

            if (updateData.password) {
                return httpError(next, new Error(responseMessage.CUSTOM_MESSAGE("Cannot update password via this endpoint")), req, 403);
            }

            const updatedMember = await Member.findByIdAndUpdate(
                memberId,
                { $set: updateData },
                { new: true, runValidators: true, select: '-password' }
            );

            if (!updatedMember) {
                return httpError(next, new Error(responseMessage.NOT_FOUND('Member')), req, 404);
            }

            httpResponse(req, res, 200, responseMessage.SUCCESS, updatedMember);
        } catch (err) {
            httpError(next, err, req, 500);
        }
    },


    // Admin-only: Get all members 
    getAllMembers: async (req, res, next) => {
        try {
            const { page, limit } = validateJoiSchema(ValidateMembersQuery, req.query).value;
            const skip = (page - 1) * limit;

            // Fetch members excluding the authenticated member
            const members = await Member.find({ _id: { $ne: req.authenticatedMember._id } })
                .select('-password')
                .skip(skip)
                .limit(limit);

            // Sort in memory by createdDate (ascending) and role (ADMIN > EDITOR > VIEWER)
            const roleOrder = { ADMIN: 0, EDITOR: 1, VIEWER: 2 };
            members.sort((a, b) => {
                if (a.createdDate.getTime() !== b.createdDate.getTime()) {
                    return a.createdDate - b.createdDate; // Sort by createdDate first
                }
                return (roleOrder[a.role] || 3) - (roleOrder[b.role] || 3); // Then by role
            });

            const total = await Member.countDocuments({ _id: { $ne: req.authenticatedMember._id } });
            const totalPages = Math.ceil(total / limit);

            httpResponse(req, res, 200, responseMessage.SUCCESS, {
                members,
                pagination: {
                    currentPage: page,
                    totalPages,
                    totalItems: total,
                    itemsPerPage: limit
                }
            });
        } catch (err) {
            httpError(next, err, req, 500);
        }
    },

    // Admin Only Delete Member
    deleteMember: async (req, res, next) => {
        try {
            const { id } = req.params

            if (id === req.authenticatedMember._id.toString()) {
                return httpError(next, new Error(responseMessage.CUSTOM_MESSAGE("Cannot Delete YourSelf")), req, 403);
            }

            const checkisMemberAdmin = await Member.findOne({
                _id: id,
                role: "ADMIN"
            })



            if (checkisMemberAdmin) {
                return httpError(next, new Error(responseMessage.CUSTOM_MESSAGE("Cannot Delete Admin Member")), req, 403);
            }

            const deleteMember = await Member.findByIdAndDelete(id)

            console.log(deleteMember);


            if (!deleteMember) {
                return httpError(next, new Error(responseMessage.CUSTOM_MESSAGE("Member Not Found for Delete")), req, 404);
            }

            httpResponse(req, res, 200, "Member Deleted Succefully", {})
        } catch (error) {
            httpError(next, error, req, 500)
        }
    },

    /**
   * **************************************************
   *                      ADMIN ONLY ROUTES END
   * **************************************************
   */

    /**
    * **************************************************
    *                      ALL MEMBERS ROUTES
    * **************************************************
    */

    // All members: Get self data
    getSelfData: async (req, res, next) => {
        try {
            const member = await Member.findById(req.authenticatedMember._id).select('-password');
            if (!member) {
                return httpError(next, new Error(responseMessage.NOT_FOUND('Member')), req, 404);
            }
            httpResponse(req, res, 200, responseMessage.SUCCESS, member);
        } catch (err) {
            httpError(next, err, req, 500);
        }
    },

    // All members: Update self profile
    updateProfile: async (req, res, next) => {
        try {
            const memberId = req.authenticatedMember._id;
            const { value, error } = validateJoiSchema(ValidateMemberUpdate, req.body);
            if (error) {
                return httpError(next, error, req, 422);
            }

            const updateData = value;

            // Prevent changes to restricted fields
            const restrictedFields = ['password', 'role', 'status'];
            restrictedFields.forEach(field => {
                if (updateData[field] !== undefined) {
                    return httpError(next, new Error(responseMessage.CUSTOM_MESSAGE(`Cannot update ${field}`)), req, 403);
                }
            });

            const updatedMember = await Member.findByIdAndUpdate(
                memberId,
                { $set: updateData },
                { new: true, runValidators: true, select: '-password' }
            );

            if (!updatedMember) {
                return httpError(next, new Error(responseMessage.NOT_FOUND('Member')), req, 404);
            }

            httpResponse(req, res, 200, responseMessage.SUCCESS, updatedMember);
        } catch (err) {
            httpError(next, err, req, 500);
        }
    },

    // All members: Update password
    updatePassword: async (req, res, next) => {
        try {
            const memberId = req.authenticatedMember._id;
            const { oldPassword, newPassword, confirmPassword } = req.body;

            const validationResult = validateJoiSchema(ValidatePasswordUpdate, req.body);
            if (validationResult.error) {
                return httpError(next, validationResult.error, req, 422);
            }

            const member = await Member.findById(memberId).select('+password');
            if (!member || !await quicker.comparePassword(oldPassword, member.password)) {
                return httpError(next, new Error(responseMessage.INVALID_CREDENTIALS), req, 401);
            }

            const hashedPassword = await quicker.hashPassword(newPassword);
            await Member.findByIdAndUpdate(memberId, { password: hashedPassword });

            httpResponse(req, res, 200, responseMessage.SUCCESS, { message: 'Password updated successfully' });
        } catch (err) {
            httpError(next, err, req, 500);
        }
    }

    /**
    * **************************************************
    *                      ALL MEMBERS ROUTES END
    * **************************************************
    */
};