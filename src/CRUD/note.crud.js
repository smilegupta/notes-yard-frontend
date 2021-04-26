import rawAxios from "axios";
import { api } from "./axios.config";

const API_URL = api.apiUrl;

const NOTBOOK_CONSTANT = "/notebook/"
const CREATE_NOTE = "/note"
const GET_NOTE = "/note"
const DELETE_NOTE = "/note/"
const EDIT_NOTE = "/note/"

export function getNotes(notebookId) {
    return rawAxios.get(API_URL + NOTBOOK_CONSTANT + notebookId + GET_NOTE );
}

export function createNote(userId, notebookId, noteTitle, note) {
    const payload = {
      userId, noteTitle, note
    };
    return rawAxios.post(API_URL + NOTBOOK_CONSTANT + notebookId + CREATE_NOTE,  payload);
}

export function deleteNote(notebookId, userId, noteId) {
    const QUERY = `?userId=${userId}`;
    return rawAxios.delete(API_URL + NOTBOOK_CONSTANT + notebookId + DELETE_NOTE + noteId + QUERY);
}

export function editNotebook(userId, notebookId, noteTitle, note, noteId ) {
    const payload = {
        userId, noteTitle, note
      };
    return rawAxios.put(API_URL + NOTBOOK_CONSTANT + notebookId + EDIT_NOTE + noteId , payload);
}