import * as chai from 'chai';  
import chaiHttp from 'chai-http'; 
import express from 'express';
import mongoose from 'mongoose';
import appointmentRoutes from '../routes/appointmentRoutes.js';
import sinon from 'sinon';
import dotenv from 'dotenv';  

dotenv.config();  

chai.use(chaiHttp);  
const { expect } = chai;

const app = express();
app.use(express.json());
app.use('/api/appointments', appointmentRoutes);

// Mock the database models
import appointment from '../model/appointment.js';
import Add from '../model/add.js';

let sandbox;

describe('Appointment API', () => {
  before(async () => {
    // Connect to the MongoDB using the URI from the environment variable
    const dbUri = process.env.MONGODB_URL; 
    if (!dbUri) {
      throw new Error("MONGODB_URI is not defined in the environment");
    }

    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  after(async () => {
    // Close the Mongoose connection after all tests are done
    await mongoose.connection.close();
  });

  beforeEach(() => {
    // Create a new sandbox for each test
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    // Restore the sandbox after each test
    sandbox.restore();
  });

  it('should create a new appointment and send an email', async () => {
    const mockAddData = {
      AddID: 'ADD_123',
      filledCount: 1,
      totCount: 5,
    };

    const mockAppointmentData = {
      AID: 'AID_123',
      AddID: 'ADD_123',
      userName: 'John Doe',
      mobileNo: '1234567890',
      address: '123 Street',
      email: 'johndoe@example.com',
      doctorName: 'Dr. Smith',
      hospital: 'City Hospital',
      specialization: 'Cardiology',
      date: '2023-10-30',
      number: 2,
    };

    // Stub the Add.findOne method to return mockAddData
    sandbox.stub(Add, 'findOne').resolves(mockAddData);

    // Stub the appointment.save method to return mockAppointmentData
    sandbox.stub(appointment.prototype, 'save').resolves(mockAppointmentData);

    const res = await chai
      .request(app)  // Make HTTP request using chai-http
      .post('/api/appointments/add')
      .send(mockAppointmentData);

    // Check if the status is 201 and the payload contains AID
    expect(res.status).to.equal(201);
    expect(res.body.payload).to.have.property('AID');
  });

  it('should retrieve all appointments for a user', async () => {
    const mockAppointments = [
      {
        AID: 'AID_123',
        email: 'johndoe@example.com',
      },
    ];

    // Stub the appointment.find method to return mockAppointments
    sandbox.stub(appointment, 'find').resolves(mockAppointments);

    const res = await chai
      .request(app)
      .get('/api/appointments/get')
      .send({ email: 'johndoe@example.com' });

    // Check if the status is 200 and the payload matches the mock data
    expect(res.status).to.equal(200);
    expect(res.body.payload).to.deep.equal(mockAppointments);
  });

  it('should delete an appointment and update filledCount', async () => {
    const mockDeletedAppointment = {
      AID: 'AID_123',
      email: 'johndoe@example.com',
    };

    // Stub Add.findOne to simulate retrieving the Add document
    sandbox.stub(Add, 'findOne').resolves({
      AddID: 'ADD_123',
      filledCount: 2,
    });

    // Stub appointment.findOneAndDelete to simulate deleting an appointment
    sandbox.stub(appointment, 'findOneAndDelete').resolves(mockDeletedAppointment);

    const res = await chai
      .request(app)
      .delete('/api/appointments/delete')
      .send({
        AID: 'AID_123',
        AddID: 'ADD_123',
        email: 'johndoe@example.com',
      });

    // Check if the status is 200 and the message indicates success
    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal('Appointment deleted successfully.');
  });
});
