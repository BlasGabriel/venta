import axios from "axios";
import {API_URL} from "../constants/constants";

export const insertarVentaApi = (venta) =>  axios.post(`${API_URL}/ventas/insertar`, venta);