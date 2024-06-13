import instance from "../axios"

export const getAllRoles = () => {
    return instance.get(`/api/getAllRoles`)
}
export const getAllStatuses = () => {
    return instance.get(`/api/getAllStatuses`)
}
export const getAllTimes = () => {
    return instance.get(`/api/getAllTimes`)
}
export const getAllPositions = () => {
    return instance.get(`/api/getAllPositions`)
}
export const getAllGenders = () => {
    return instance.get(`/api/getAllGenders`)
}
export const getAllPrices = () => {
    return instance.get(`/api/getAllPrices`)
}
export const getAllPayments = () => {
    return instance.get(`/api/getAllPayments`)
}
