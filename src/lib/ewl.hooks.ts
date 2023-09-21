import axios from "../api/axios";
import { ExtensionWorkloadType } from "../types/ExtensionWorkload";

const getEwlSavedWorkload = async (userId: string) => {
  const { data } = await axios.get<ExtensionWorkloadType>(
    `extension-workload/${userId}/getSavedWorkload`
  );

  return { data };
};

const submitEwlWorkload = async (id: string) => {
  return await axios.patch(`extension-workload/${id}/submit-workload`);
};

export { getEwlSavedWorkload, submitEwlWorkload };
