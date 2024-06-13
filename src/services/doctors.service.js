import instance from "../axios";

export const createDoctor = (data) => { return instance.post(`/api/createDoctor`, data); }
export const getAllDoctors = () => { return instance.get(`/api/getAllDoctors`); }
export const getDoctorById = id => { return instance.get(`/api/getDoctorById/${id}`); }
export const deleteDoctor = id => { return instance.delete(`/api/deleteDoctor/${id}`) };
export const updateDoctor = data => { return instance.put(`/api/updateDoctor`, data); }


export const getAllSchedules = () => { return instance.get(`/api/getAllSchedules`); }
export const createSchedule = data => { return instance.post(`/api/createSchedule`, data); }
export const getAllSchedulesByDateAndDoctorIdService = (doctorId, date) => { return instance.get(`/api/getAllSchedulesByDateAndDoctorId?doctorId=${doctorId}&date=${date}`); }