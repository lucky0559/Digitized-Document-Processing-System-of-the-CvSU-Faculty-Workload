import React, { useState } from "react";
import styled from "styled-components";
import Colors from "../../constants/Colors";
import CvsuDroneShot from "../../assets/cvsu_logo/cvsu_droneShot.jpg";
import CvsuLogo from "../../assets/cvsu_logo/cvsu_logo.png";
import { Form, Formik } from "formik";
import TextField from "../../components/TextField";
import Button from "../../components/Button";

export default function LoginScreen() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const [username, setUsername] = useState("");
  return (
    <Container width={width} height={height}>
      <Header>
        <CvsuDroneShotImg src={CvsuDroneShot} />
        <CvsuLogoImg src={CvsuLogo} />
      </Header>
      <FormContainer>
        <Formik
          initialValues={{ username: "", password: "" }}
          // validate={values => {
          //   const errors = { username: "" };
          //   if (!values.username) {
          //     errors.username = "Required";
          //   }
          //   return errors;
          // }}
          onSubmit={() => console.log("Submitted")}
        >
          {({ isSubmitting }) => (
            <FormStyled>
              <TextField type="text" name="username" label="Username" />
              <TextField type="password" name="password" label="Password" />
              <ForgotPasswordContainer>
                <ForgotPasswordText>Forgot Password</ForgotPasswordText>
              </ForgotPasswordContainer>
              <ButtonsContainer>
                <Button text="Log In" color={Colors.buttonPrimary} />
                <Button text="Register" color={Colors.buttonSecondary} />
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
  margin-top: 100px;
  width: ${p => p.width / 3}px;
  height: ${p => p.height / 2}px;
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
`;

const FormStyled = styled(Form)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
