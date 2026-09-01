import axios from "axios";

const endpoint = axios.create({
  baseURL: (import.meta as ImportMeta & {
    env: { VITE_SERVER_URL: string };
  }).env.VITE_SERVER_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default endpoint;