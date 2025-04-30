import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Define the UserSchema
const UserSchema = new Schema({
    userID: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    mobileNo: {
        type: String,
        required: true,  
    },
    address: {
        type: String,
        required: true,  
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });

// Singleton class to ensure only one instance of the User model
class UserModel {
    constructor() {
        if (!UserModel.instance) {
            UserModel.instance = mongoose.model("User", UserSchema);
        }
    }

    getInstance() {
        return UserModel.instance;
    }
}

export default new UserModel().getInstance();
