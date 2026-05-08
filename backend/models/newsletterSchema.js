import mongoose from "mongoose";
import validator from "validator";

const newsletterSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: [validator.isEmail, "Please provide a valid email address"],
        unique: true,
    },
    subscribedAt: {
        type: Date,
        default: Date.now,
    },
});

export const Newsletter = mongoose.model("Newsletter", newsletterSchema);
