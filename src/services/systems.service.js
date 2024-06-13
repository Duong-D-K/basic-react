import instance from "../axios";

export const login = (data) => { return instance.post(`/api/login`, data); }
