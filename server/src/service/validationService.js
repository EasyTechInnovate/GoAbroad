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

export const validateJoiSchema = (schema, value) => {
    const result = schema.validate(value, { abortEarly: false });
    return {
        value: result.value,
        error: result.error,
    };
};