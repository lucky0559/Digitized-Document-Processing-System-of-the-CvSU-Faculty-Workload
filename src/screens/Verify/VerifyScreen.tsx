import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Footer from "../../components/Footer";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import TopNav from "../../components/TopNav";
import Colors from "../../constants/Colors";
import { VerifyEmail } from "../../lib/user.hooks";

const VerifyScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      await VerifyEmail(token);
    };
    verifyEmail()
      .then(() => {
        setIsLoading(false);
      })
      .catch(() => {
        // do nothing
      });
  }, [token]);

  return (
    <Container>
      <TopNav />
      <BodyContainer>
        {isLoading || !token ? (
          <>
            <LoadingSpinner color={Colors.primary} />
          </>
        ) : (
          <>
            <VerifiedText>Verification Successfull!</VerifiedText>
            <LoginLinkText onClick={() => navigate("/")}>Login</LoginLinkText>
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

const VerifiedText = styled.text`
  text-transform: uppercase;
  font-family: HurmeGeometricSans3SemiBold;
  font-size: 15px;
  color: green;
`;

const LoginLinkText = styled.text`
  text-transform: uppercase;
  font-family: HurmeGeometricSans3;
  font-size: 15px;
  text-decoration: underline;
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;
  &:hover {
    opacity: 0.4;
  }
`;

export default VerifyScreen;
