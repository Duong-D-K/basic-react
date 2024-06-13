import instance from "../axios";

export const createBooking = (data) => {
    return instance.post('/api/createBooking', data);
}

export const confirmBooking = data => {
    return instance.post('/api/confirmBooking', data);
}

export const getAllPatientsByDateAndDoctorId = (date, doctorId) => {
    return instance.get(`/api/getAllPatientsByDateAndDoctorId?date=${date}&doctorId=${doctorId}`);
}

export const sendPrescription = (data) => {
    return instance.post('/api/sendPrescription', data);
}
