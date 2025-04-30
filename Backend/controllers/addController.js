import AddFactory from "./addFactory.js"; 
import Add from "../model/add.js"; 

export const AddNew = async (req, res) => {
    try {
        // Use the factory to create a new Add object
        const newAdd = AddFactory.createAdd(req.body);
        const savedAdd = await newAdd.save();
        if (savedAdd) {
            res.status(201).json({
                message: "New entry added successfully..!",
                payload: savedAdd
            });
        } else {
            res.status(404).json({
                message: "Something went wrong while adding new entry..!"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong..!",
            error: error
        });
    }
};

export const getAllAdds = async (req, res) => {
    try {
        const posts = await Add.find();
        if (posts) {
            res.status(200).json({
                message: "Success..!!",
                payload: posts
            });
        } else {
            res.status(404).json({
                message: "Error...!"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
        });
    }
};
