import axios from "axios";
import {API_URL} from "../constants/constants";

export const getUsuario = (user) =>   axios.post(`${API_URL}/usuario/login`, user)
