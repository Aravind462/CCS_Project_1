import axios from "axios";
import { SERVER_BASE_URL } from "./serverBaseURL";

export const signupAPI = async (signupDetails)=>{
    return await axios.post(`${SERVER_BASE_URL}/signup`, signupDetails);
}

export const loginAPI = async (loginDetails)=>{
    return await axios.post(`${SERVER_BASE_URL}/login`, loginDetails);
}

export const addProfilePicAPI = async (file, reqHeader)=>{
    return await axios.put(`${SERVER_BASE_URL}/profile/add-pic`, file, { headers: reqHeader });
}