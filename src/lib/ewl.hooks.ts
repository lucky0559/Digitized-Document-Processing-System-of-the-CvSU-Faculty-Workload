import axios from "../api/axios";
import { ExtensionWorkloadType } from "../types/ExtensionWorkload";

const getEwlSavedWorkload = async (userId: string) => {
  const { data } = await axios.get<ExtensionWorkloadType>(
    `extension-workload/${userId}/getSavedWorkload`
  );

  return { data };
};

export { getEwlSavedWorkload };
