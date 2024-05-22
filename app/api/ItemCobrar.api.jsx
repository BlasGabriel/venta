import axios from "axios";
import { API_URL } from "../constants/constants";

export const cobrar = (id) => axios.patch(`${API_URL}/itemcobro/cobrar/${id}`);