import axios from "axios";
import { API_URL } from "../constants/constants";

export const getDeudasCobrar = () => axios.get(`${API_URL}/cobros/listar`);
