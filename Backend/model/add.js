import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define the AddSchema
const AddSchema = new Schema({
    AddID: {
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
        type: String,
        required: true,
    },
    arrivalTime: {
        type: String,
        required: true,
    },
    totCount: {
        type: Number,
        required: true,
    },
    filledCount: {
        type: Number,
        required: true,
    },
    imgUrl: {
        type: String,
        required: true,
    },
}, { timestamps: true });

// Singleton class to ensure only one instance of the Add model
class AddModel {
    constructor() {
        if (!AddModel.instance) {
            // Create the Add model only once
            AddModel.instance = mongoose.model("Add", AddSchema);
        }
    }

    getInstance() {
        return AddModel.instance;
    }
}

export default new AddModel().getInstance();
