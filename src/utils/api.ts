import axios from "axios";

const token = "a63b9aef250a061830e2f594c3310c5e";
const url = "https://ami-dev.telkom.co.id/restapi/v1";

export const api = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    },
});