import axios from "axios";
import {API_URL} from "../constants/constants";

export const getProductos = () =>  axios.get(`${API_URL}/producto/listar`);