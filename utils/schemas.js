const { z } = require('zod');

const clientSchema = z.object({
    name: z
    .string()
    .min(2, "name must have at least two characters")
    .nonempty("name is a mandatory field"),

    age: z
        .number({
        required_error: "age is a mandatory field",
        invalid_type_error: "age must be a number",
        })
        .int("age must be an integer")
        .min(18, "age should be equal or above legal age")
        .max(120, "age out of reasonable range"),

    spentAmount: z
        .number({
        required_error: "mandatory field",
        invalid_type_error: "this field must be a number",
        })
        .min(20.01, "the amount must be above 20") // estrictamente mayor a 20
        .nonnegative("amount can not be negative"),

    city: z
        .enum(['CDMX', 'Guadalajara', 'Monterrey'], {
        errorMap: () => ({ message: "Not valid city" }),
        }),

    email: z
        .string()
        .email("invalid email"),
});

module.exports = { clientSchema };