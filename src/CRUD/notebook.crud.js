import rawAxios from "axios";
import { api } from "./axios.config";

const API_URL = api.apiUrl;

const GET_NOTEBOOK = "/notebook/";
const CREATE_NOTEBOOK = "/notebook";
const DELETE_NOTEBOOK = '/notebook/'
const EDIT_NOTEBOOK = '/notebook/'

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
  
export function deleteNotebook(notebookId, userId) {
    const QUERY = `?userId=${userId}`;
    return rawAxios.delete(API_URL + DELETE_NOTEBOOK + notebookId + QUERY);
}

export function editNotebook(userId, notebookName, notebookId) {
    const payload = {
      userId, notebookName
    };
    return rawAxios.put(API_URL + EDIT_NOTEBOOK + notebookId , payload);
  }