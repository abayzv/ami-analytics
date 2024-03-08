import axios from "axios";

const token = "bf8ca238cd472ed37f26207178ffbce4";
const url = "https://ami-dev.telkom.co.id/restapi/v1";

export const api = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    },
});