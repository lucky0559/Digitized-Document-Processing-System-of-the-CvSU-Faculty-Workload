export enum ErrorMessages {
  INVALID_EMAIL = "Email already used",
  REQUIRED = "Required",
  PASSWORD_NOT_MATCH = "Password not match",
  INVALID_SESSION = "Invalid session",
  INVALID_USERNAME = "Username already taken"
}

export const DROPDOWN_LISTS = {
  CAMPUS: [
    "-----",
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
    "-----",
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
    "-----",
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
  FUNDING_OF_STUDY: ["-----", "CvSU Research Grant", "Externally Funded"],
  DESIGNATION_IN_THE_STUDY: [
    "-----",
    "Program Leader/Co-Program Leader",
    "Project Leader/Co-Project Leader",
    "Study Leader/Co-Study Leader"
  ],
  FUND_GENERATED_PER_SEMESTER: [
    "-----",
    "Above 1,000,000.00",
    "500,001.00 - 1,000,000.00",
    "500,000.00 and below"
  ],
  DISSEMINATED_RESEARCH_OUTPUT: [
    "-----",
    "International",
    "National",
    "Regional",
    "Local"
  ],
  DESIGNATION_EXTENSION_ACTIVITY: [
    "-----",
    "Project Leader",
    "Project Coordinator",
    "Project Facilitator",
    "Project Assistants"
  ],
  RESOURCE_PERSON: ["-----", "International", "National", "Regional", "Local"],
  DESIGNATION_SPORTS_SOCIO_TRAINOR_ACADEMIC: [
    "-----",
    "University Level",
    "College/Campus Level"
  ],
  DESIGNATION_UNIVERSITY_LEVEL: [
    "-----",
    "Dean/Director",
    "University Pollution Control Officer",
    "University Textbook Board Chairman/Member",
    "University Project Head/Assistant Project Head",
    "University Inspector/Engineer/Architect/Estimator",
    "Head, Physical Planning/Project Implementation Unit",
    "Curricular Program Head",
    "Internal Assessment Body Member",
    "Chair/Member of Review Boards",
    "RECETS Council Members",
    "Head of Research Monitoring & Evaluation"
  ],
  DESIGNATION_COLLEGE_CAMPUS_LEVEL: [
    "-----",
    "Department Chair/Principal/Administrator",
    "College/Campus Secretary",
    "College/Campus Registrar",
    "College/Campus Coordinator",
    "Graduate Program/Learning Center Coordinator",
    "College/Campus Liaison Officer/MISO/PIO/Enterprise Laboratory/Resource Generation Officer",
    "College/Campus Budget Officer/Property Custodian",
    "College IMDU Chair/Member",
    "Accreditation Task Force Chairman/Member",
    "In-Charge of College Reading Room",
    "College/Campus Student Misdemeanor Member"
  ],
  DESIGNATION_DEPARTMENT_LEVEL: [
    "-----",
    "Department Coordinator",
    "Department MISO",
    "IMDU Chair/Member"
  ]
};

export enum WorkloadType {
  TEACHING_WORKLOAD = "Teaching Work Load (TWL)",
  RESEARCH_WORKLOAD = "Research Work Load (RWL)",
  EXTENSION_WORKLOAD = "Extension Work Load (EWL)",
  STRATEGIC_FUNCTION = "Strategic Function (SF)"
}
