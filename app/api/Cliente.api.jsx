import axios from "axios";
import {API_URL} from "../constants/constants";

export const getClientesApi = () =>  axios.get(`${API_URL}/clientes/listar`);

export const getClienteIdApi = (id) =>  axios.get(`${API_URL}/clientes/listar/id/${id}`)  

// export const getClienteRucApi = (ruc) =>(  axios.get(`${API_URL}/clientes/listar/ruc/${ruc}`), console.log(`${API_URL}/clientes/ruc/${ruc}`))
export const getClienteRucApi = (ruc) =>  axios.get(`${API_URL}/clientes/listar/ruc/${ruc}`)