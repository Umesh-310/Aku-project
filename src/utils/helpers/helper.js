import axiosClient from '../../api/axios'
import axios from "axios";

export async function getRequest(URL) {
  const response = await axiosClient.get(`/${URL}`);
  return response;
}

export async function postRequest(URL, payload) {
  const response = await axiosClient.post(`/${URL}`, payload);
  return response;
}
export async function putRequest(URL, payload) {
  const response = await axiosClient.put(`/${URL}`, payload);
  return response;
}

export async function deleteRequest(URL) {
  const response = await axiosClient.delete(`/${URL}`);
  return response;
}
