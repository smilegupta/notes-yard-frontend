import rawAxios from "axios";
import { api } from "./axios.config";

const API_URL = api.apiUrl;

const GET_PASTEBIN = "/pasteBin/";
const CREATE_PASTEBIN = "/pasteBin";

export function createPasteBin(details) {
  const payload = {
    details,
  };
  return rawAxios.post(API_URL + CREATE_PASTEBIN, payload);
}

export function getPasteBin(pasteBinId) {
    return rawAxios.get(API_URL + GET_PASTEBIN + pasteBinId);
}
  