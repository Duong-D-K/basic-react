import instance from "../axios";

export const createSpecialty = (data) => {
    return instance.post(`/api/createSpecialty`, data);
}

export const getAllSpecialties = () => {
    return instance.get(`/api/getAllSpecialties`);
}

export const getSpecialtyById = id => { return instance.get(`/api/getSpecialtyById/${id}`); }


export const updateSpecialty = data => {
    return instance.put(`/api/updateSpecialty`, data);
}

export const deleteSpecialty = id => {
    return instance.delete(`/api/deleteSpecialty/${id}`)
}