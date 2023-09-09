import styled from "styled-components";
import { ExternallyFunded } from "../../../types/Fund";

type ExternallyFundedProps = {
  externallyFunded: ExternallyFunded;
};

const FundedExternally = ({ externallyFunded }: ExternallyFundedProps) => {
  return (
    <>
      <Container>
        <SubContainer>
          <WorkloadTextContainer>
            <WorkloadText>CvSU Funded Research</WorkloadText>
          </WorkloadTextContainer>
          <InputsContainer>
            <TextInputContainer>
              <Label>Title of the Study</Label>
              <Label>{externallyFunded.title}</Label>
            </TextInputContainer>
            <TextInputContainer>
              <Label>Fund Generated per Semester (in peso)</Label>
              <Label>{externallyFunded.fundGenerated}</Label>
            </TextInputContainer>
            <TextInputContainer>
              <UploadContainer>
                <UploadTextDescription>
                  Upload Proposal (for Approved Externally Funded Proposal) or
                  Progress Report (for On-going Externally Funded Study) here:
                </UploadTextDescription>
                <UploadFileContainer>
                  <Label>
                    {externallyFunded.file?.name.substring(0, 7) + "..."}
                  </Label>
                </UploadFileContainer>
              </UploadContainer>
            </TextInputContainer>
          </InputsContainer>
          <TotalPointsContainer>
            <Label style={{ fontWeight: "bold" }}>
              Study Points = {externallyFunded.points}
            </Label>
          </TotalPointsContainer>
        </SubContainer>
      </Container>
    </>
  );
};

const Container = styled.div`
  padding: 30px;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const SubContainer = styled.div`
  border: 2px solid black;
  width: 90%;
  height: auto;
  border-radius: 15px;
  padding: 15px;
`;

const WorkloadTextContainer = styled.div`
  display: flex;
  align-self: flex-start;
`;

const WorkloadText = styled.span`
  font-size: 19px;
  font-weight: 600;
  line-height: 20px;
  font-family: HurmeGeometricSans3;
`;

const InputsContainer = styled.div`
  margin: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: auto;
`;

const TextInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  width: 100%;
`;

const Label = styled.label`
  font-weight: 400;
  font-size: 17px;
  line-height: 18px;
  font-family: HurmeGeometricSans3;
`;

const TotalPointsContainer = styled.div`
  margin-top: 50px;
  width: 100%;
  padding-left: 40px;
`;

const UploadContainer = styled.div`
  width: 80%;
  max-width: 500px;
  flex-direction: row;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
  margin-bottom: 20px;
`;

const UploadTextDescription = styled.label`
  font-weight: 600;
  font-size: 17px;
  line-height: 18px;
  font-family: HurmeGeometricSans3;
`;

const UploadFileContainer = styled.div`
  max-width: 100px;
`;

export default FundedExternally;
