import React from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { ErrorMessage, Form, Formik } from "formik";

import Colors from "../../constants/Colors";
import CvsuDroneShot from "../../assets/cvsu_logo/cvsu_droneShot.jpg";
import CvsuLogo from "../../assets/cvsu_logo/cvsu_logo.png";
import Button from "../../components/Button";
import { ErrorMessages } from "../../constants/Strings";

type LoginScreenProps = {
  onLoginButtonClick?: () => void;
  onRegisterButtonClick?: () => void;
};

type LoginFormValueType = {
  username: string;
  password: string;
};

const initialFormValues: LoginFormValueType = {
  username: "",
  password: ""
};

const LoginFormSchema = Yup.object().shape({
  username: Yup.string().trim().required(ErrorMessages.REQUIRED),
  password: Yup.string().trim().required(ErrorMessages.REQUIRED)
});

export default function LoginScreen({
  onLoginButtonClick,
  onRegisterButtonClick
}: LoginScreenProps) {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const isDesktopTablet = window.innerWidth > 1201;

  const onSubmit = () => {};

  return (
    <Container width={width} height={height} isDesktopTablet={isDesktopTablet}>
      <Header>
        <CvsuDroneShotImg src={CvsuDroneShot} />
        <CvsuLogoImg src={CvsuLogo} />
      </Header>
      <FormContainer>
        <Formik
          initialValues={initialFormValues}
          validationSchema={LoginFormSchema}
          onSubmit={onSubmit}
        >
          {({ values, errors, handleSubmit, touched, handleChange }) => (
            <FormStyled>
              <FieldGroup>
                <Label>Username</Label>
                <TextInput
                  type="text"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  className={
                    touched.username && errors.username ? "is-invalid" : ""
                  }
                />
                <ErrorMessageStyle
                  component="div"
                  name="username"
                  className="invalid-feedback"
                />
              </FieldGroup>
              <FieldGroup>
                <Label>Password</Label>
                <TextInput
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  className={
                    touched.password && errors.password ? "is-invalid" : ""
                  }
                />
                <ErrorMessageStyle
                  component="div"
                  name="password"
                  className="invalid-feedback"
                />
              </FieldGroup>
              <ForgotPasswordContainer>
                <ForgotPasswordText>Forgot Password</ForgotPasswordText>
              </ForgotPasswordContainer>
              <ButtonsContainer>
                <Button
                  type="submit"
                  text="Log In"
                  color={Colors.buttonPrimary}
                  onClick={() => handleSubmit}
                />
                <Button
                  type="button"
                  text="Register"
                  color={Colors.buttonSecondary}
                  onClick={onRegisterButtonClick}
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
  justify-content: center;
  align-items: center;
  display: flex;
`;

const ForgotPasswordContainer = styled.div`
  display: flex;
  align-self: flex-end;
  margin: 15px 0px 20px 0px;
`;

const ForgotPasswordText = styled.text`
  font-size: 11px;
  font-weight: 600;
  font-family: HurmeGeometricSans3SemiBold;
  text-decoration-line: underline;
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;
  &:hover {
    opacity: 0.6;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0px 0px 30px 0px;
`;

const FormStyled = styled(Form)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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

const Label = styled.label`
  font-size: 12px;
  font-family: HurmeGeometricSans3;
  align-self: flex-start;
  font-weight: 400;
`;
