import rawAxios from "axios";
import { api } from "./axios.config";

const API_URL = api.apiUrl;

const GET_NOTEBOOK = "/notebook/";
const CREATE_NOTEBOOK = "/notebook";

export function createNotebook(userId, notebookName) {
  const payload = {
    userId, notebookName
  };
  return rawAxios.post(API_URL + CREATE_NOTEBOOK, payload);
}

export function getNotebook(userId) {
    const QUERY = `?userId=${userId}`;
    return rawAxios.get(API_URL + GET_NOTEBOOK + QUERY);
}
  
