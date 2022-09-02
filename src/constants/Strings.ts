export enum ErrorMessages {
  INVALID_EMAIL = "Email already used",
  REQUIRED = "Required",
  PASSWORD_NOT_MATCH = "Password not match",
  INVALID_SESSION = "Invalid session",
  INVALID_USERNAME = "Username already taken"
}

export const DROPDOWN_LISTS = {
  CAMPUS: [
    "Main Campus",
    "Bacoor Campus",
    "Carmona Campus",
    "Cavite City Campus",
    "Gen. Trias Campus",
    "Imus Campus",
    "Silang Campus",
    "Tanza Campus",
    "Trece Campus"
  ],
  DEPARTMENT: [
    "CAFENR",
    "CAS",
    "CCJ",
    "CED",
    "CEIT",
    "CEMDS",
    "CON",
    "CSPEAR",
    "CVMBS"
  ],
  ACADEMIC_RANK: [
    "Instructor I",
    "Instructor II",
    "Instructor III",
    "Assistant Professor I",
    "Assistant Professor II",
    "Assistant Professor III",
    "Assistant Professor IV",
    "Associate Professor I",
    "Associate Professor II",
    "Associate Professor III",
    "Associate Professor IV",
    "Associate Professor V",
    "Professor I",
    "Professor II",
    "Professor III",
    "Professor IV",
    "Professor V",
    "Professor VI"
  ],
  FUNDING_OF_STUDY: ["CvSU Research Grant", "Externally Funded"],
  DESIGNATION_IN_THE_STUDY: [
    "Program Leader/Co-Program Leader",
    "Project Leader/Co-Project Leader",
    "Study Leader/Co-Study Leader"
  ],
  FUND_GENERATED_PER_SEMESTER: [
    "Above 1,000,000.00",
    "500,001.00 - 1,000,000.00",
    "500,000.00 and below"
  ],
  DISSEMINATED_RESEARCH_OUTPUT: [
    "International",
    "National",
    "Regional",
    "Local"
  ]
};

export enum WorkloadType {
  TEACHING_WORKLOAD = "Teaching Work Load (TWL)",
  RESEARCH_WORKLOAD = "Research Work Load (RWL)"
}
