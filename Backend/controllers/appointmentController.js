import appointment from "../model/appointment.js";
import Add from "../model/add.js";
import nodemailer from "nodemailer";

const sendEmail = async (email, subject, messageBody) => {
  const transporter = nodemailer.createTransport({
    host: "mail.koreanautospareparts.com",
    port: 465,
    secure: true,
    auth: {
      user: "help@koreanautospareparts.com",
      pass: "G4atlU-QTKxM",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailData = {
    from: '"MediConnect" <help@koreanautospareparts.com>',
    to: email,
    subject: subject,
    html: messageBody,
  };

  try {
    const info = await transporter.sendMail(mailData);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.log("Error sending email:", error);
  }
};

export const AddNew = async (req, res) => {
  try {
    const prefix = "AID";
    const AID = prefix + "_" + Date.now();

    const addID = req.body.AddID;
    const checkCount = await Add.findOne({ AddID: addID });

    if (!checkCount) {
      return res.status(404).json({ message: "Appointment not found." });
    } else if (checkCount.filledCount >= checkCount.totCount) {
      return res
        .status(400)
        .json({ message: "No available slots for this appointment." });
    }

    const no = checkCount.filledCount + 1;

    // Create a new entry using the request data
    const newAppointment = new appointment({
      AID: AID,
      AddID: addID,
      userName: req.body.userName,
      mobileNo: req.body.mobileNo,
      address: req.body.address,
      email: req.body.email,
      doctorName: req.body.doctorName,
      hospital: req.body.hospital,
      specialization: req.body.specialization,
      date: req.body.date,
      number: no,
    });

    // Save the new entry to the database
    const savedAppointment = await newAppointment.save();
    if (savedAppointment) {
      await Add.updateOne({ AddID: addID }, { $set: { filledCount: no } });

      // Generate email body
      const messageBody = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #333;">Hello ${req.body.userName},</h2>
        <p>Your appointment has been successfully booked. Please find the appointment details below:</p>
        <table style="border-collapse: collapse; width: 100%;">
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;"><strong>Appointment ID:</strong></td>
            <td style="border: 1px solid #ddd; padding: 8px;">${
              savedAppointment.AID
            }</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;"><strong>Doctor Name:</strong></td>
            <td style="border: 1px solid #ddd; padding: 8px;">${
              req.body.doctorName
            }</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;"><strong>Specialization:</strong></td>
            <td style="border: 1px solid #ddd; padding: 8px;">${
              req.body.specialization
            }</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;"><strong>Hospital:</strong></td>
            <td style="border: 1px solid #ddd; padding: 8px;">${
              req.body.hospital
            }</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;"><strong>Appointment Date:</strong></td>
            <td style="border: 1px solid #ddd; padding: 8px;">${new Date(
              req.body.date
            ).toLocaleDateString("en-GB")}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;"><strong>Arrival Time:</strong></td>
            <td style="border: 1px solid #ddd; padding: 8px;">${
              req.body.arrivalTime || "Not Provided"
            }</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;"><strong>Your Appointment Number:</strong></td>
            <td style="border: 1px solid #ddd; padding: 8px;">${no}</td>
          </tr>
        </table>
        <br>
        <p style="font-size: 16px;">Please make sure to arrive at the hospital on time. If you need to reschedule, kindly contact the hospital.</p>
        <p>Thank you for choosing our service!</p>
        <hr style="border: 0; height: 1px; background: #ccc;">
        <p style="font-size: 12px; color: #666;">This is an automated message. Please do not reply to this email.</p>
      </div>
    `;

      // Send response to client first
      res.status(201).json({
        message: "New entry added successfully..!",
        payload: savedAppointment,
      });

      // Send email asynchronously after sending the response
      const mail = req.body.email;
      sendEmail(mail, "New Appointment Placed", messageBody);
    } else {
      res.status(404).json({
        message: "Something went wrong while adding new entry..!.",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong..!.",
      error: error,
    });
  }
};

export const retirveAll = async (req, res) => {
  try {
    const email = req.body.email;
    const details = await appointment.find({ email: email });

    if (details.length > 0) {
      res.status(200).json({
        message: "Data fetched..!",
        payload: details,
      });
    } else {
      res.status(404).json({
        message: "Data Not found..!",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong..!",
      error: error.message,
    });
  }
};
export const deleteAppointment = async (req, res) => {
  try {
    const { AID, email, AddID } = req.body;

    if (!AID) {
      return res.status(400).json({
        message: "AID is required to delete an appointment.",
      });
    }

    const deletedAppointment = await appointment.findOneAndDelete({ AID: AID });

    if (deletedAppointment) {
      const checkCount = await Add.findOne({ AddID: AddID });

      if (checkCount) {
        const newCount = checkCount.filledCount - 1;

        // Update the filledCount
        const response = await Add.updateOne(
          { AddID: AddID },
          { $set: { filledCount: newCount } }
        );

        // Check if the update was successful
        if (response.nModified > 0 || response.modifiedCount > 0) {
          // Fetch the updated appointment details
          const details = await appointment.find({ email: email });

          if (details.length > 0) {
            return res.status(200).json({
              message: "Appointment deleted successfully.",
              payload: details,
            });
          } else {
            return res.status(200).json({
              message:
                "Appointment deleted successfully. No remaining appointments found.",
              payload: details,
            });
          }
        } else {
          return res.status(500).json({
            message: "Failed to update filledCount.",
          });
        }
      } else {
        return res.status(404).json({
          message: "AddID not found in the Add collection.",
        });
      }
    } else {
      return res.status(404).json({
        message: "Appointment not found.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong..!",
      error: error.message,
    });
  }
};
