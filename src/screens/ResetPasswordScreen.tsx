import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Colors from "../constants/Colors";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import Button from "../components/Button";
import { User } from "../types/User";
import { FindUserByPasswordCode, ResetChangePassword } from "../lib/user.hooks";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingSpinner } from "../components/LoadingSpinner";

const ResetPasswordScreen = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [user, setUser] = useState<User>();

  const { resetPasswordCode } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  const [isResetPasswordSuccess, setIsResetPasswordSuccess] = useState(false);

  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    (async () => {
      if (resetPasswordCode) {
        const { user } = await FindUserByPasswordCode(resetPasswordCode);
        setUser(user);
      }
      setIsLoading(false);
    })();
  }, []);

  const onSubmit = async () => {
    setIsSubmitting(true);
    setHasError(false);
    if (user) {
      try {
        await ResetChangePassword(user.username, newPassword);
        setIsResetPasswordSuccess(true);
      } catch (e) {
        console.log(e);
        setHasError(true);
      }
    }
    setIsSubmitting(false);
  };

  return (
    <Container>
      <TopNav />
      <BodyContainer>
        {isLoading && !user ? (
          <>
            <LoadingSpinner color={Colors.primary} />
          </>
        ) : isResetPasswordSuccess ? (
          <>
            <VerifiedText>Reset Password Success!</VerifiedText>
            <LoginLinkText onClick={() => navigate("/")}>Login</LoginLinkText>
          </>
        ) : (
          <>
            <FieldGroup>
              <Label>New Password</Label>
              <FieldIconContainer>
                <TextInput
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                />
                {showNewPassword ? (
                  <AiFillEye
                    size={20}
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  />
                ) : (
                  <AiFillEyeInvisible
                    size={20}
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  />
                )}
              </FieldIconContainer>
            </FieldGroup>
            <FieldGroup style={{ marginBottom: 30 }}>
              <Label>Confirm New Password</Label>
              <FieldIconContainer>
                <TextInput
                  type={showConfirmNewPassword ? "text" : "password"}
                  value={confirmNewPassword}
                  onChange={e => setConfirmNewPassword(e.target.value)}
                />
                {showConfirmNewPassword ? (
                  <AiFillEye
                    size={20}
                    onClick={() =>
                      setShowConfirmNewPassword(!showConfirmNewPassword)
                    }
                  />
                ) : (
                  <AiFillEyeInvisible
                    size={20}
                    onClick={() =>
                      setShowConfirmNewPassword(!showConfirmNewPassword)
                    }
                  />
                )}
              </FieldIconContainer>
              {newPassword && confirmNewPassword ? (
                newPassword !== confirmNewPassword ? (
                  <ErrorMessageContainer
                    style={{
                      marginLeft: 0
                    }}
                  >
                    <ErrorMessageText>Password not match.</ErrorMessageText>
                  </ErrorMessageContainer>
                ) : null
              ) : null}
              {hasError && (
                <ErrorMessageContainer
                  style={{
                    marginLeft: 0
                  }}
                >
                  <ErrorMessageText>Something went wrong.</ErrorMessageText>
                </ErrorMessageContainer>
              )}
            </FieldGroup>
            <Button
              type="button"
              text="Reset Password"
              color={Colors.buttonPrimary}
              onClick={onSubmit}
              isSubmitting={isSubmitting}
              disable={
                (!newPassword && !confirmNewPassword) ||
                newPassword !== confirmNewPassword
              }
              hoverOpacity={
                (!newPassword && !confirmNewPassword) ||
                newPassword !== confirmNewPassword
                  ? ".5"
                  : undefined
              }
            />
          </>
        )}
      </BodyContainer>
      <FooterContainer>
        <Footer />
      </FooterContainer>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const FooterContainer = styled.div`
  margin-top: auto;
`;

const BodyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 10%;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
`;

const Label = styled.label`
  font-size: 15px;
  font-family: HurmeGeometricSans3;
  align-self: flex-start;
  font-weight: 400;
`;

const FieldIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ececec;
  padding: 0 5px 0 5px;
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
  font-family: HurmeGeometricSans3;
`;

const ErrorMessageContainer = styled.div`
  display: flex;
  align-self: flex-start;
  margin: 10px 0px 0px 17px;
`;

const ErrorMessageText = styled.text`
  font-size: 12px;
  font-family: HurmeGeometricSans3SemiBold;
  align-self: flex-start;
  font-weight: 400;
  color: red;
`;

const VerifiedText = styled.text`
  text-transform: uppercase;
  font-family: HurmeGeometricSans3SemiBold;
  font-size: 18px;
  color: green;
`;

const LoginLinkText = styled.text`
  text-transform: uppercase;
  font-family: HurmeGeometricSans3;
  font-size: 18px;
  text-decoration: underline;
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;
  &:hover {
    opacity: 0.4;
  }
`;

export default ResetPasswordScreen;
