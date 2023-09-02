import axios from "../api/axios";
import { StrategicFunctionType } from "../types/StrategicFunction";

const getSfwSavedWorkload = async (userId: string) => {
  const { data } = await axios.get<StrategicFunctionType>(
    `strategic-function-workload/${userId}/getSavedWorkload`
  );

  return { data };
};

export { getSfwSavedWorkload };
