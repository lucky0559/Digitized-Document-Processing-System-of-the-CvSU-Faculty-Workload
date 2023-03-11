import React, { useState } from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { ErrorMessage, Form, Formik } from "formik";

import Colors from "../../constants/Colors";
import CvsuDroneShot from "../../assets/cvsu_logo/cvsu_droneShot.jpg";
import CvsuLogo from "../../assets/cvsu_logo/cvsu_logo.png";
import Button from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import { DROPDOWN_LISTS, ErrorMessages } from "../../constants/Strings";
import { Default } from "../../constants/Defaults";
import { Register } from "../../lib/user.hooks";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

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
  academicRank: Yup.string().trim()
});

export default function RegisterScreen({
  onLoginButtonClick
}: RegisterScreenProps) {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const [campus, setCampus] = useState("");
  const [department, setDepartment] = useState("");
  const [academicRank, setAcademicRank] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);
  const isDesktopTablet = window.innerWidth > 801;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const campusHandler = (campusValue: string) => {
    setCampus(campusValue);
  };

  const departmentHandler = (departmentValue: string) => {
    setDepartment(departmentValue);
  };

  const academicRankHandler = (academicRankValue: string) => {
    setAcademicRank(academicRankValue);
  };

  const onSubmit = async (
    values: RegisterFormValueType,
    { resetForm }: any
  ) => {
    setIsSubmitting(true);
    setIsRegisterSuccess(false);
    const finalValues = RegisterFormSchema.cast(
      values
    ) as Required<RegisterFormValueType>;
    finalValues.campus = campus || DROPDOWN_LISTS.CAMPUS[0];
    finalValues.department = department;
    finalValues.academicRank = academicRank || DROPDOWN_LISTS.ACADEMIC_RANK[0];
    await Register(finalValues)
      .then(() => {
        setIsSubmitting(false);
        setIsRegisterSuccess(true);
        setErrorMessage("");
        resetForm();
      })
      .catch(error => {
        setIsRegisterSuccess(false);
        setErrorMessage(error.response.data.message);
        setIsSubmitting(false);
      });
  };

  return (
    <Container width={width} height={height} isDesktopTablet={isDesktopTablet}>
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
          {({ handleSubmit, values, touched, errors, handleChange }) => (
            <FormStyled>
              <FieldGroup>
                <Label>Username</Label>
                <FieldIconContainer>
                  <TextInput
                    value={values.username}
                    type="text"
                    onChange={handleChange}
                    className={
                      touched.username && errors.username ? "is-invalid" : ""
                    }
                    name="username"
                  />
                </FieldIconContainer>
                <ErrorMessageStyle
                  component="div"
                  name="username"
                  className="invalid-feedback"
                />
                {errorMessage === ErrorMessages.INVALID_USERNAME && (
                  <ErrorMessageContainer>
                    <ErrorMessageText>{errorMessage}</ErrorMessageText>
                  </ErrorMessageContainer>
                )}
              </FieldGroup>
              <FieldGroup>
                <Label>CvSU Email</Label>
                <FieldIconContainer>
                  <TextInput
                    value={values.email}
                    type="email"
                    onChange={handleChange}
                    className={
                      touched.email && errors.email ? "is-invalid" : ""
                    }
                    name="email"
                  />
                </FieldIconContainer>
                <ErrorMessageStyle
                  component="div"
                  name="email"
                  className="invalid-feedback"
                />
                {errorMessage === ErrorMessages.INVALID_EMAIL && (
                  <ErrorMessageContainer>
                    <ErrorMessageText>{errorMessage}</ErrorMessageText>
                  </ErrorMessageContainer>
                )}
              </FieldGroup>
              <FieldGroup>
                <Label>Password</Label>
                <FieldIconContainer>
                  <TextInput
                    value={values.password}
                    type={showPassword ? "text" : "password"}
                    onChange={handleChange}
                    className={
                      touched.password && errors.password ? "is-invalid" : ""
                    }
                    name="password"
                  />
                  {showPassword ? (
                    <AiFillEye
                      size={20}
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  ) : (
                    <AiFillEyeInvisible
                      size={20}
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  )}
                </FieldIconContainer>
                <ErrorMessageStyle
                  component="div"
                  name="password"
                  className="invalid-feedback"
                />
              </FieldGroup>
              <FieldGroup>
                <Label>Confirm Password</Label>
                <FieldIconContainer>
                  <TextInput
                    value={values.confirmPassword}
                    type={showConfirmPassword ? "text" : "password"}
                    onChange={handleChange}
                    className={
                      touched.confirmPassword && errors.confirmPassword
                        ? "is-invalid"
                        : ""
                    }
                    name="confirmPassword"
                  />
                  {showConfirmPassword ? (
                    <AiFillEye
                      size={20}
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    />
                  ) : (
                    <AiFillEyeInvisible
                      size={20}
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    />
                  )}
                </FieldIconContainer>
                <ErrorMessageStyle
                  component="div"
                  name="confirmPassword"
                  className="invalid-feedback"
                />
              </FieldGroup>
              <FieldGroup>
                <Label>Surname</Label>
                <FieldIconContainer>
                  <TextInput
                    value={values.surname}
                    type="text"
                    onChange={handleChange}
                    className={
                      touched.surname && errors.surname ? "is-invalid" : ""
                    }
                    name="surname"
                  />
                </FieldIconContainer>
                <ErrorMessageStyle
                  component="div"
                  name="surname"
                  className="invalid-feedback"
                />
              </FieldGroup>
              <FieldGroup>
                <Label>First Name</Label>
                <FieldIconContainer>
                  <TextInput
                    value={values.firstName}
                    type="text"
                    onChange={handleChange}
                    className={
                      touched.firstName && errors.firstName ? "is-invalid" : ""
                    }
                    name="firstName"
                  />
                </FieldIconContainer>
                <ErrorMessageStyle
                  component="div"
                  name="firstName"
                  className="invalid-feedback"
                />
              </FieldGroup>
              <FieldGroup>
                <Label>Middle Initial</Label>
                <FieldIconContainer>
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
                    maxLength={1}
                  />
                </FieldIconContainer>
                <ErrorMessageStyle
                  component="div"
                  name="middleInitial"
                  className="invalid-feedback"
                />
              </FieldGroup>
              <FieldGroup>
                <Dropdown
                  option={DROPDOWN_LISTS.CAMPUS}
                  label="College/Campus"
                  onSelect={campusHandler}
                />
                <Dropdown
                  option={
                    campus === "Bacoor Campus"
                      ? DROPDOWN_LISTS.BACOOR_DEPARTMENT
                      : campus === "Carmona Campus"
                      ? DROPDOWN_LISTS.CARMONA_DEPARTMENT
                      : campus === "Cavite City Campus"
                      ? DROPDOWN_LISTS.CAVITE_CITY_DEPARTMENT
                      : campus === "Gen. Trias Campus"
                      ? DROPDOWN_LISTS.GEN_TRIAS_DEPARTMENT
                      : campus === "Imus Campus"
                      ? DROPDOWN_LISTS.IMUS_DEPARTMENT
                      : campus === "Silang Campus"
                      ? DROPDOWN_LISTS.SILANG_DEPARTMENT
                      : campus === "Tanza Campus"
                      ? DROPDOWN_LISTS.TANZA_DEPARTMENT
                      : campus === "Trece Campus"
                      ? DROPDOWN_LISTS.TRECE_DEPARTMENT
                      : campus === "CAFENR"
                      ? DROPDOWN_LISTS.CAFENR_COLLEGE
                      : campus === "CAS"
                      ? DROPDOWN_LISTS.CAS_COLLEGE
                      : campus === "CCJ"
                      ? DROPDOWN_LISTS.CCJ_COLLEGE
                      : campus === "CED"
                      ? DROPDOWN_LISTS.CED_COLLEGE
                      : campus === "CEIT"
                      ? DROPDOWN_LISTS.CEIT_COLLEGE
                      : campus === "CEMDS"
                      ? DROPDOWN_LISTS.CEMDS_COLLEGE
                      : campus === "CON"
                      ? DROPDOWN_LISTS.CON_COLLEGE
                      : campus === "CSPEAR"
                      ? DROPDOWN_LISTS.CSPEAR_COLLEGE
                      : DROPDOWN_LISTS.CVMBS_COLLEGE
                  }
                  label="Department"
                  onSelect={departmentHandler}
                  isDisable={!campus || campus === "-----"}
                />
                <Dropdown
                  option={DROPDOWN_LISTS.ACADEMIC_RANK}
                  label="Academic Rank"
                  onSelect={academicRankHandler}
                />
              </FieldGroup>
              {isRegisterSuccess && (
                <ErrorMessageContainer>
                  <SuccessMessageText>
                    Registration Successfully, Please Verify your email first
                  </SuccessMessageText>
                </ErrorMessageContainer>
              )}
              {errorMessage === "Response error" && (
                <ErrorMessageContainer>
                  <ErrorMessageText>{errorMessage}</ErrorMessageText>
                </ErrorMessageContainer>
              )}
              <ButtonsContainer>
                <Button
                  type="submit"
                  text="Register"
                  color={Colors.buttonPrimary}
                  onClick={handleSubmit}
                  isSubmitting={isSubmitting}
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

const Container = styled.div<{
  width: number;
  height: number;
  isDesktopTablet: boolean;
}>`
  border: 1px solid ${Colors.black};
  margin: 100px 0px 100px 0px;
  width: ${p => (p.isDesktopTablet ? p.width / 3 + "px" : 80 + "%")};
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
  margin: 30px 0px 30px 0px;
`;

const FormStyled = styled(Form)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 15px;
  font-family: HurmeGeometricSans3;
  align-self: flex-start;
  font-weight: 400;
`;

const ErrorMessageStyle = styled(ErrorMessage)`
  font-size: 15px;
  width: 180px;
  text-transform: uppercase;
  font-family: HurmeGeometricSans3SemiBold;
  color: red;
`;

const TextInput = styled.input`
  width: 100%;
  background-color: ${Colors.textFieldBackground};
  font-family: HurmeGeometricSans3;
  ::-ms-reveal {
    display: none;
  }
  border: none;
  outline: none;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  width: 180px;
`;

const ErrorMessageContainer = styled.div``;

const ErrorMessageText = styled.text`
  font-size: 15px;
  font-family: HurmeGeometricSans3SemiBold;
  align-self: flex-start;
  font-weight: 400;
  color: red;
`;

const SuccessMessageText = styled.text`
  font-size: 15px;
  font-family: HurmeGeometricSans3SemiBold;
  align-self: flex-start;
  font-weight: 400;
  color: green;
`;

const FieldIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ececec;
  padding: 0 5px 0 0;
`;
