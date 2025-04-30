import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define the AppointmentSchema
const AppointmentSchema = new Schema({
    AID: {
        type: String,
        required: true,
    },
    AddID: {
        type: String,
        required: true,
    },
    userName: {
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
    doctorName: {
        type: String,
        required: true,
    },
    specialization: {
        type: String,
        required: true,
    },
    hospital: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    number: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

// Singleton class to ensure only one instance of the Appointment model
class AppointmentModel {
    constructor() {
        if (!AppointmentModel.instance) {
            AppointmentModel.instance = mongoose.model("Appointment", AppointmentSchema);
        }
    }

    getInstance() {
        return AppointmentModel.instance;
    }
}

export default new AppointmentModel().getInstance();
