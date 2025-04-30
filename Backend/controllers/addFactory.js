// AddFactory.js
import Add from "../model/add.js";

class AddFactory {
    static createAdd(data) {
        const prefix = "ADD";
        const AddID = `${prefix}_${Date.now()}`;
        return new Add({
            AddID: AddID,
            doctorName: data.doctorName,
            specialization: data.specialization,
            hospital: data.hospital,
            date: data.date,
            arrivalTime: data.arrivalTime,
            totCount: data.totCount,
            filledCount: data.filledCount,
            imgUrl: data.imgUrl,
        });
    }
}

export default AddFactory;
