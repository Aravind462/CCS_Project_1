import axios from "axios";
import  { SERVER_BASE_URL } from './serverBaseURL'

export const getAllPersonAPI = async ()=>{
    return await axios.get(`${SERVER_BASE_URL}/person/all`);
}

export const getPersonAuthorisedAPI = async (reqHeader)=>{
    return await axios.get(`${SERVER_BASE_URL}/person/authorised`, { headers: reqHeader });
}

export const addPersonAPI = async (personDetails, reqHeader)=>{
    return await axios.post(`${SERVER_BASE_URL}/person/add`, personDetails, { headers: reqHeader });
}

export const getOnePersonAPI = async (id, reqHeader)=>{
    return await axios.get(`${SERVER_BASE_URL}/person/${id}`, { headers: reqHeader });
}

export const editPersonAPI = async (id, personDetails, reqHeader)=>{
    return await axios.put(`${SERVER_BASE_URL}/person/${id}/edit`, personDetails, { headers: reqHeader });
}

export const deletePersonAPI = async (id, reqHeader)=>{
    return await axios.delete(`${SERVER_BASE_URL}/person/${id}`, { headers: reqHeader });
}