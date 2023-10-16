import styled from "styled-components";
import { Confirm } from "semantic-ui-react";
import { DROPDOWN_LISTS } from "../../../constants/Strings";
import FormButton from "../../../components/FormButton";
import DropdownWithUpload from "../../../components/DropdownWithUpload";

type ResearchWorkload3Props = {
  researchWorkLoadHandler: () => void;
  isSubmitting: boolean;
  onSelectStudy1: (value: string) => void;
  study1?: string;
  onStudy1FileSelect: (value?: File) => void;
  study1FileName?: string;
  onSelectStudy2: (value: string) => void;
  study2?: string;
  onStudy2FileSelect: (value?: File) => void;
  study2FileName?: string;
  onSelectStudy3: (value: string) => void;
  study3?: string;
  onStudy3FileSelect: (value?: File) => void;
  study3FileName?: string;
  onSelectStudy4: (value: string) => void;
  study4?: string;
  onStudy4FileSelect: (value?: File) => void;
  study4FileName?: string;
  points: number;
  study1Points: number;
  study2Points: number;
  study3Points: number;
  study4Points: number;
  fundGeneratedPoints?: number;
  isDisseminatedOnly?: boolean;
  studyPoints?: number;
  onRemoveStudy1File: () => void;
  onRemoveStudy2File: () => void;
  onRemoveStudy3File: () => void;
  onRemoveStudy4File: () => void;
  canSubmit: boolean;
  isConfirming: boolean;
  setIsConfirming: (val: boolean) => void;
};

const ResearchWorkload3 = ({
  isSubmitting,
  onSelectStudy1,
  study1,
  onStudy1FileSelect,
  study1FileName,
  onSelectStudy2,
  study2,
  onStudy2FileSelect,
  study2FileName,
  onSelectStudy3,
  study3,
  onStudy3FileSelect,
  study3FileName,
  onSelectStudy4,
  study4,
  onStudy4FileSelect,
  study4FileName,
  points,
  study1Points,
  study2Points,
  study3Points,
  study4Points,
  fundGeneratedPoints,
  isDisseminatedOnly,
  studyPoints,
  onRemoveStudy1File,
  onRemoveStudy2File,
  onRemoveStudy3File,
  onRemoveStudy4File,
  researchWorkLoadHandler,
  canSubmit,
  isConfirming,
  setIsConfirming
}: ResearchWorkload3Props) => {
  const onStudy1FileSelectHandler = (value?: File) => {
    onStudy1FileSelect(value);
  };

  const onStudy2FileSelectHandler = (value?: File) => {
    onStudy2FileSelect(value);
  };

  const onStudy3FileSelectHandler = (value?: File) => {
    onStudy3FileSelect(value);
  };

  const onStudy4FileSelectHandler = (value?: File) => {
    onStudy4FileSelect(value);
  };

  return (
    <Container>
      <Confirm
        open={isConfirming}
        onCancel={() => setIsConfirming(false)}
        onConfirm={() => {
          researchWorkLoadHandler();
          setIsConfirming(false);

          // researchWorkLoadHandler3(false);
        }}
        content="Confirm saving of workload?"
        size="large"
      />
      <SubContainer>
        <span style={{ fontSize: 19 }}>
          Disseminated research output in College or University In-House
          Review/Conferences
        </span>
        <div>
          <DropdownWithUpload
            inputLabel="Study 1"
            uploadLabel="Upload Certificate of Presentation here:"
            options={DROPDOWN_LISTS.DISSEMINATED_RESEARCH_OUTPUT}
            onSelect={onSelectStudy1}
            val={study1}
            onFileSelect={onStudy1FileSelectHandler}
            fileName={study1FileName}
            onRemoveStudyFile={onRemoveStudy1File}
          />
          <DropdownWithUpload
            inputLabel="Study 2"
            options={DROPDOWN_LISTS.DISSEMINATED_RESEARCH_OUTPUT}
            onSelect={onSelectStudy2}
            val={study2}
            onFileSelect={onStudy2FileSelectHandler}
            fileName={study2FileName}
            onRemoveStudyFile={onRemoveStudy2File}
          />
          <DropdownWithUpload
            inputLabel="Study 3"
            options={DROPDOWN_LISTS.DISSEMINATED_RESEARCH_OUTPUT}
            onSelect={onSelectStudy3}
            val={study3}
            onFileSelect={onStudy3FileSelectHandler}
            fileName={study3FileName}
            onRemoveStudyFile={onRemoveStudy3File}
          />
          <DropdownWithUpload
            inputLabel="Study 4"
            options={DROPDOWN_LISTS.DISSEMINATED_RESEARCH_OUTPUT}
            onSelect={onSelectStudy4}
            val={study4}
            onFileSelect={onStudy4FileSelectHandler}
            fileName={study4FileName}
            onRemoveStudyFile={onRemoveStudy4File}
          />
        </div>
      </SubContainer>

      {!isSubmitting && (
        <TotalPointsContainer>
          <Label style={{ fontWeight: "bold" }}>
            Total Research Workload ={" "}
            {(
              (studyPoints || 0) +
              study1Points +
              study2Points +
              study3Points +
              study4Points
            ).toString()}
          </Label>
        </TotalPointsContainer>
      )}

      <Buttons>
        <ButtonContainer
          style={{ justifyContent: "flex-end", alignItems: "flex-end" }}
        >
          <FormButton
            text="Save"
            onClicked={() => setIsConfirming(true)}
            isSubmitting={isSubmitting}
            disabled={
              isDisseminatedOnly
                ? study1Points + study2Points + study3Points + study4Points ===
                  0
                : !canSubmit || isSubmitting
            }
          ></FormButton>
        </ButtonContainer>
      </Buttons>
    </Container>
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px;
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

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 30px;
`;

export default ResearchWorkload3;
