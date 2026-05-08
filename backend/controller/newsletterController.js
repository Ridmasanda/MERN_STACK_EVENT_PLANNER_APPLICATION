import { Newsletter } from "../models/newsletterSchema.js";

export const subscribeNewsletter = async (req, res) => {
    try {
        const { email } = req.body;
        
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required!",
            });
        }

        // Check if email already subscribed
        const existingSubscriber = await Newsletter.findOne({ email });
        if (existingSubscriber) {
            return res.status(400).json({
                success: false,
                message: "This email is already subscribed!",
            });
        }

        const subscriber = await Newsletter.create({ email });
        console.log("Newsletter subscriber saved:", subscriber);
        
        res.status(201).json({
            success: true,
            message: "Successfully subscribed to our newsletter!",
            data: subscriber,
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            let errorMessage = "";
            if (error.errors.email) {
                errorMessage = error.errors.email.message;
            }
            return res.status(400).json({
                success: false,
                message: errorMessage,
            });
        }

        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "This email is already subscribed!",
            });
        }

        return res.status(500).json({
            success: false,
            message: "Unknown error occurred!",
        });
    }
};
