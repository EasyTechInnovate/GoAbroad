import Joi from "joi"
// ############ AUTH Validation ################
export const ValidateLogin = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

export const ValidateSignup = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});
// ############ AUTH Validation END ################


// ############ PROFILE Validation ################
export const ValidateProfileUpdate = Joi.object({
    programDetails: Joi.object({
        program: Joi.string().allow(null),
        validity: Joi.date().allow(null)
    }).allow(null),
    phoneNumber: Joi.string().allow(null),
    personalDetails: Joi.object({
        dob: Joi.date().allow(null),
        gender: Joi.string().valid('MALE', 'FEMALE', 'OTHER').allow(null),
        address: Joi.string().allow(null),
        profession: Joi.string().allow(null)
    }).allow(null),
    collegeDetails: Joi.object({
        branch: Joi.string().allow(null),
        highestDegree: Joi.string().allow(null),
        university: Joi.string().allow(null),
        college: Joi.string().allow(null),
        gpa: Joi.number().allow(null),
        toppersGPA: Joi.number().allow(null),
        noOfBacklogs: Joi.number().allow(null),
        admissionTerm: Joi.string().allow(null),
        coursesApplying: Joi.array().items(Joi.string()).allow(null)
    }).allow(null),
    greDetails: Joi.object({
        grePlane: Joi.date().allow(null),
        greDate: Joi.date().allow(null),
        greScoreBoard: Joi.string().allow(null),
        greScore: Joi.object({
            verbal: Joi.number().allow(null),
            quant: Joi.number().allow(null),
            awa: Joi.number().allow(null)
        }).allow(null),
        retakingGRE: Joi.string().allow(null)
    }).allow(null),
    ieltsDetails: Joi.object({
        ieltsPlan: Joi.date().allow(null),
        ieltsDate: Joi.date().allow(null),
        ieltsScore: Joi.object({
            reading: Joi.number().allow(null),
            writing: Joi.number().allow(null),
            speaking: Joi.number().allow(null),
            listening: Joi.number().allow(null)
        }).allow(null),
        retakingIELTS: Joi.string().allow(null)
    }).allow(null),
    toeflDetails: Joi.object({
        toeflPlan: Joi.date().allow(null),
        toeflDate: Joi.date().allow(null),
        toeflScore: Joi.object({
            reading: Joi.number().allow(null),
            writing: Joi.number().allow(null),
            speaking: Joi.number().allow(null)
        }).allow(null),
        retakingTOEFL: Joi.string().allow(null)
    }).allow(null),
    visa: Joi.object({
        countriesPlanningToApply: Joi.array().items(Joi.string()).allow(null),
        visaInterviewDate: Joi.date().allow(null),
        visaInterviewLocation: Joi.string().allow(null)
    }).allow(null)
}).unknown(false);
// ############ PROFILE Validation END ################



// ############ MEMBER Validation ################
export const ValidateMemberCreate = Joi.object({
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('ADMIN', 'EDITOR', 'VIEWER').required(),
    status: Joi.string().valid('ACTIVE', 'INACTIVE', 'INVITED').default('INVITED'),
    phone: Joi.string().trim().allow(null),
    address: Joi.string().trim().allow(null),
    profilePicture: Joi.string().allow(null)
});

export const ValidateMemberUpdate = Joi.object({
    firstName: Joi.string().trim().allow(null),
    lastName: Joi.string().trim().allow(null),
    phone: Joi.string().trim().allow(null),
    address: Joi.string().trim().allow(null),
    profilePicture: Joi.string().allow(null)
}).or('firstName', 'lastName', 'phone', 'address', 'profilePicture').unknown(false);

export const ValidatePasswordUpdate = Joi.object({
    oldPassword: Joi.string().min(6).required(),
    newPassword: Joi.string().min(6).required(),
    confirmPassword: Joi.string().min(6).required().valid(Joi.ref('newPassword'))
}).unknown(false);


export const ValidateMembersQuery = Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10)
}).unknown(false);

// ############ MEMBER Validation END ################


// ############ CATEGORY Validation ################
export const ValidateCategory = Joi.object({
    name: Joi.string().trim().optional(),
    description: Joi.string().trim().allow(null)
}).unknown(false);


// ############ CATEGORY Validation END ################

// ############ FAQ Validation ################
export const ValidateFaq = Joi.object({
    question: Joi.string().trim().optional(),
    answer: Joi.string().trim().optional(),
    categoryId: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .optional()
        .messages({
            'string.pattern.base': 'categoryId must be a valid 24-character hexadecimal string',
            'any.required': 'categoryId is required'
        })
}).unknown(false);

// ############ FAQ Validation END ################

export const validateJoiSchema = (schema, value) => {
    const result = schema.validate(value, { abortEarly: false });
    return {
        value: result.value,
        error: result.error,
    };
};