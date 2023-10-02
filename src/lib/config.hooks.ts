import axios from "../api/axios";
import { Config } from "../types/Config";

const getConfig = async () => {
  const { data } = await axios.get<Config>("config");

  return { data };
};

const updateSemester = async (semester: string) => {
  const { data } = await axios.patch(`config/${semester}/update/semester`);

  return { data };
};

const updateSchoolYear = async (
  schoolYearStart: number,
  schoolYearEnd: number
) => {
  const { data } = await axios.patch(
    `config/${schoolYearStart}/${schoolYearEnd}/update/school-year`
  );

  return { data };
};

const updateSubmissionRange = async (
  submissionDateStart: Date,
  submissionDateEnd: Date
) => {
  const { data } = await axios.patch(
    `config/${submissionDateStart}/${submissionDateEnd}/update/submission-range`
  );

  return { data };
};

const updateHourlyRate = async (hourlyRate: number) => {
  const { data } = await axios.patch(`config/${hourlyRate}/update/hourly-rate`);

  return { data };
};

export {
  getConfig,
  updateSemester,
  updateSchoolYear,
  updateSubmissionRange,
  updateHourlyRate
};
