import mongoose from "mongoose";

export const dbConnection = () => {
    mongoose
        .connect(
            process.env.MONGO_URI,
             { dbName: "MERN_STACK_EVENT_MESSAGE" })
        .then(() => {
            console.log("Database connected successfully");
        })
        .catch((err) => {
            console.log("Database connection failed", err);
        });
};
