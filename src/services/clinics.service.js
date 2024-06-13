import instance from "../axios";

export const createClinic = (data) => { return instance.post(`/api/createClinic`, data); }

export const getAllClinics = () => { return instance.get(`/api/getAllClinics`); }

export const getClinicById = id => { return instance.get(`/api/getClinicById/${id}`); }

export const updateClinic = data => { return instance.put(`/api/updateClinic`, data); }

export const deleteClinic = id => { return instance.delete(`/api/deleteClinic/${id}`) }