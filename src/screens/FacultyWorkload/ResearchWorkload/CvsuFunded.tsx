import styled from "styled-components";
import { CvsuFunded } from "../../../types/Fund";

type CvsuFundedProps = {
  cvsuFunded: CvsuFunded;
};

const FundedCvsu = ({ cvsuFunded }: CvsuFundedProps) => {
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
              <Label>{cvsuFunded.title}</Label>
            </TextInputContainer>
            <TextInputContainer>
              <Label>Status of the Study</Label>
              <Label>{cvsuFunded.typeOfStudy}</Label>
            </TextInputContainer>
            <TextInputContainer>
              <Label>Designation in the Study</Label>
              <Label>{cvsuFunded.designationStudy}</Label>
            </TextInputContainer>
          </InputsContainer>
          <UploadContainer>
            <UploadTextDescription>
              Upload Proposal (for Approved Proposal) or Progress Report (for
              On-going Study) here:
            </UploadTextDescription>
            <UploadFileContainer>
              <Label>{cvsuFunded.file?.name}</Label>
            </UploadFileContainer>
          </UploadContainer>

          <TotalPointsContainer>
            <Label style={{ fontWeight: "bold" }}>
              Study Points = {cvsuFunded.points}
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

const UploadContainer = styled.div`
  width: 80%;
  max-width: 500px;
  flex-direction: row;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const UploadTextDescription = styled.label`
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

const UploadFileContainer = styled.div`
  max-width: 100px;
`;

export default FundedCvsu;
