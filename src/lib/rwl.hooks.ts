import axios from "../api/axios";
import { ResearchWorkLoadType } from "../types/ResearchWorkLoad";

const getRwlSavedWorkload = async (userId: string) => {
  const { data } = await axios.get<ResearchWorkLoadType>(
    `research-workload/${userId}/getSavedWorkload`
  );

  return { data };
};

export { getRwlSavedWorkload };
