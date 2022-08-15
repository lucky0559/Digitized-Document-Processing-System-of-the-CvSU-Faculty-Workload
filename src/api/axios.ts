import axios from "axios";
import { Default } from "../constants/Defaults";

export default axios.create({
  baseURL: Default.API_URL
});
