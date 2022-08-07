import React, { useState } from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { ErrorMessage, Form, Formik } from "formik";

import Colors from "../../constants/Colors";
import CvsuDroneShot from "../../assets/cvsu_logo/cvsu_droneShot.jpg";
import CvsuLogo from "../../assets/cvsu_logo/cvsu_logo.png";
import Button from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import { ErrorMessages } from "../../constants/Strings";
import { Default } from "../../constants/Defaults";

const CAMPUS = ["Indang", "Trece", "Bacoor", "Silang"];
const DEPARTMENT = ["DIT", "CAS", "CED"];
const NATURE_OF_APPOINTMENT = ["Online", "Face to face"];
const ACADEMIC_RANK = [
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
];

type RegisterScreenProps = {
  onLoginButtonClick?: () => void;
};

type RegisterFormValueType = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  surname: string;
  firstName: string;
  middleInitial: string;
  campus: string;
  department: string;
  natureOfAppointment: string;
  academicRank: string;
};

const initialFormValues: RegisterFormValueType = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  surname: "",
  firstName: "",
  middleInitial: "",
  campus: "",
  department: "",
  natureOfAppointment: "",
  academicRank: ""
};

const RegisterFormSchema = Yup.object().shape({
  username: Yup.string().trim().required(ErrorMessages.REQUIRED),
  email: Yup.string()
    .trim()
    // .email(ErrorMessages.INVALID_EMAIL)
    .required(ErrorMessages.REQUIRED),
  password: Yup.string()
    .trim()
    .required(ErrorMessages.REQUIRED)
    .min(Default.MINIMUM_PASSWORD_LENGTH),
  confirmPassword: Yup.string()
    .trim()
    .required(ErrorMessages.REQUIRED)
    .oneOf([Yup.ref("password"), null], ErrorMessages.PASSWORD_NOT_MATCH),
  surname: Yup.string().trim().required(ErrorMessages.REQUIRED),
  firstName: Yup.string().trim().required(ErrorMessages.REQUIRED),
  middleInitial: Yup.string().trim().required(ErrorMessages.REQUIRED),
  campus: Yup.string().trim(),
  department: Yup.string().trim(),
  natureOfAppointment: Yup.string().trim(),
  academicRank: Yup.string().trim()
});

export default function RegisterScreen({
  onLoginButtonClick
}: RegisterScreenProps) {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const [campus, setCampus] = useState("");
  const [department, setDepartment] = useState("");
  const [natureOfAppointment, setNatureOfAppointment] = useState("");
  const [academicRank, setAcademicRank] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const campusHandler = (campusValue: string) => {
    setCampus(campusValue);
  };

  const departmentHandler = (departmentValue: string) => {
    setDepartment(departmentValue);
  };

  const natureOfAppointmentHandler = (natureOfAppointmentValue: string) => {
    setNatureOfAppointment(natureOfAppointmentValue);
  };

  const academicRankHandler = (academicRankValue: string) => {
    setAcademicRank(academicRankValue);
  };

  // useEffect(() => {
  //   console.log(campus);
  // }, [campus]);

  const onSubmit = async (values: RegisterFormValueType) => {
    setIsSubmitting(true);
    const finalValues = RegisterFormSchema.cast(
      values
    ) as Required<RegisterFormValueType>;
    finalValues.campus = campus || "Indang";
    finalValues.department = department || "DIT";
    finalValues.natureOfAppointment = natureOfAppointment || "Online";
    finalValues.academicRank = academicRank || "Instructor I";
    // const {
    //   username,
    //   email,
    //   password,
    //   surname,
    //   firstName,
    //   middleInitial,
    //   campus,
    //   department,
    //   natureOfAppointment,
    //   academicRank
    // } = finalValues;
    console.log(finalValues);
    setIsSubmitting(false);
  };

  return (
    <Container width={width} height={height}>
      <Header>
        <CvsuDroneShotImg src={CvsuDroneShot} />
        <CvsuLogoImg src={CvsuLogo} />
      </Header>
      <FormContainer>
        <Formik
          initialValues={initialFormValues}
          validationSchema={RegisterFormSchema}
          onSubmit={onSubmit}
          validateOnBlur
          validateOnChange
          enableReinitialize
        >
          {({
            isSubmitting,
            handleSubmit,
            values,
            touched,
            errors,
            handleChange
          }) => (
            <FormStyled>
              <FieldGroup>
                <Label>Username</Label>
                <TextInput
                  value={values.username}
                  type="text"
                  onChange={handleChange}
                  className={
                    touched.username && errors.username ? "is-invalid" : ""
                  }
                  name="username"
                />
                <ErrorMessageStyle
                  component="div"
                  name="username"
                  className="invalid-feedback"
                />
              </FieldGroup>
              <FieldGroup>
                <Label>CvSU Email</Label>
                <TextInput
                  value={values.email}
                  type="email"
                  onChange={handleChange}
                  className={touched.email && errors.email ? "is-invalid" : ""}
                  name="email"
                />
                <ErrorMessageStyle
                  component="div"
                  name="email"
                  className="invalid-feedback"
                />
              </FieldGroup>
              <FieldGroup>
                <Label>Password</Label>
                <TextInput
                  value={values.password}
                  type="password"
                  onChange={handleChange}
                  className={
                    touched.password && errors.password ? "is-invalid" : ""
                  }
                  name="password"
                />
                <ErrorMessageStyle
                  component="div"
                  name="password"
                  className="invalid-feedback"
                />
              </FieldGroup>
              <FieldGroup>
                <Label>Confirm Password</Label>
                <TextInput
                  value={values.confirmPassword}
                  type="password"
                  onChange={handleChange}
                  className={
                    touched.confirmPassword && errors.confirmPassword
                      ? "is-invalid"
                      : ""
                  }
                  name="confirmPassword"
                />
                <ErrorMessageStyle
                  component="div"
                  name="confirmPassword"
                  className="invalid-feedback"
                />
              </FieldGroup>
              <FieldGroup>
                <Label>Surname</Label>
                <TextInput
                  value={values.surname}
                  type="text"
                  onChange={handleChange}
                  className={
                    touched.surname && errors.surname ? "is-invalid" : ""
                  }
                  name="surname"
                />
                <ErrorMessageStyle
                  component="div"
                  name="surname"
                  className="invalid-feedback"
                />
              </FieldGroup>
              <FieldGroup>
                <Label>First Name</Label>
                <TextInput
                  value={values.firstName}
                  type="text"
                  onChange={handleChange}
                  className={
                    touched.firstName && errors.firstName ? "is-invalid" : ""
                  }
                  name="firstName"
                />
                <ErrorMessageStyle
                  component="div"
                  name="firstName"
                  className="invalid-feedback"
                />
              </FieldGroup>
              <FieldGroup>
                <Label>Middle Initial</Label>
                <TextInput
                  value={values.middleInitial}
                  type="text"
                  onChange={handleChange}
                  className={
                    touched.middleInitial && errors.middleInitial
                      ? "is-invalid"
                      : ""
                  }
                  name="middleInitial"
                />
                <ErrorMessageStyle
                  component="div"
                  name="middleInitial"
                  className="invalid-feedback"
                />
              </FieldGroup>
              <Dropdown
                option={CAMPUS}
                label="Campus"
                onSelect={campusHandler}
              />
              <Dropdown
                option={DEPARTMENT}
                label="Department"
                onSelect={departmentHandler}
              />
              <Dropdown
                option={NATURE_OF_APPOINTMENT}
                label="Nature of Appointment"
                onSelect={natureOfAppointmentHandler}
              />
              <Dropdown
                option={ACADEMIC_RANK}
                label="Academic Rank"
                onSelect={academicRankHandler}
              />
              <ButtonsContainer>
                <Button
                  type="submit"
                  text="Register"
                  color={Colors.buttonPrimary}
                  onClick={() => handleSubmit}
                />
                <Button
                  type="button"
                  text="Login"
                  color={Colors.buttonSecondary}
                  onClick={onLoginButtonClick}
                />
              </ButtonsContainer>
            </FormStyled>
          )}
        </Formik>
      </FormContainer>
    </Container>
  );
}

const Container = styled.div<{ width: number; height: number }>`
  border: 1px solid ${Colors.black};
  margin: 100px 0px 100px 0px;
  width: ${p => p.width / 3}px;
  height: auto;
  align-self: center;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  flex-direction: column;
  display: flex;
`;

const CvsuDroneShotImg = styled.img`
  width: 100%;
  border-radius: 14px 14px 0px 0px;
  height: 130px;
`;

const CvsuLogoImg = styled.img`
  width: 100px;
  height: 85px;
  position: absolute;
  align-self: center;
  margin-top: 75px;
`;

const FormContainer = styled.div`
  margin-top: 60px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 30px 0px 20px 0px;
`;

const FormStyled = styled(Form)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 12px;
  font-family: HurmeGeometricSans3;
  align-self: flex-start;
  font-weight: 400;
`;

const ErrorMessageStyle = styled(ErrorMessage)`
  font-size: 12px;
  width: 180px;
  text-transform: uppercase;
`;

const TextInput = styled.input`
  width: 180px;
  background-color: ${Colors.textFieldBackground};
  border-width: 1px;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
`;
