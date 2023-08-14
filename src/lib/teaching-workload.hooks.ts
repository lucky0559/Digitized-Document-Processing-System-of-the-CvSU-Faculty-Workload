import axios from "../api/axios";
import { TeachingWorkLoadType } from "../types/TeachingWorkload";

const getTwlSavedWorkload = async (userId: string) => {
  const { data } = await axios.get<TeachingWorkLoadType>(
    `teaching-workload/${userId}/getSavedWorkload`
  );

  return { data };
};

export { getTwlSavedWorkload };
