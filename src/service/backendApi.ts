import axios from "axios";

const backendApi = axios.create({
  baseURL: "https://poke-backend.adaptable.app/",
});

export default backendApi;
