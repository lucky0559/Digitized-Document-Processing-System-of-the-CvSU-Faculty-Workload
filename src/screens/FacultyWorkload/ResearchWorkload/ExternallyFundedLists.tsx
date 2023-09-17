import ResearchWorkload2 from "./ResearchWorkload2";
import { ExternallyFunded } from "../../../types/Fund";

type ExternallyFundedListsProps = {
  fundGeneratedHandler1: (val?: string) => void;
  rwlFile1Handler1: (val?: File) => void;
  fundGeneratedDisplay1?: string;
  rwlFileName11?: string;
  studyPoints1: number;
  onRemoveRwl1File1: () => void;
  titleOfStudy1: string;
  titleOfStudyHandler1: (val: string) => void;
  fundGeneratedHandler2: (val?: string) => void;
  rwlFile1Handler2: (val?: File) => void;
  fundGeneratedDisplay2?: string;
  rwlFileName12?: string;
  studyPoints2: number;
  onRemoveRwl1File2: () => void;
  titleOfStudy2: string;
  titleOfStudyHandler2: (val: string) => void;
  fundGeneratedHandler3: (val?: string) => void;
  rwlFile1Handler3: (val?: File) => void;
  fundGeneratedDisplay3?: string;
  rwlFileName13?: string;
  studyPoints3: number;
  onRemoveRwl1File3: () => void;
  titleOfStudy3: string;
  titleOfStudyHandler3: (val: string) => void;
  fundGeneratedHandler4: (val?: string) => void;
  rwlFile1Handler4: (val?: File) => void;
  fundGeneratedDisplay4?: string;
  rwlFileName14?: string;
  studyPoints4: number;
  onRemoveRwl1File4: () => void;
  titleOfStudy4: string;
  titleOfStudyHandler4: (val: string) => void;
  fundGeneratedHandler5: (val?: string) => void;
  rwlFile1Handler5: (val?: File) => void;
  fundGeneratedDisplay5?: string;
  rwlFileName15?: string;
  studyPoints5: number;
  onRemoveRwl1File5: () => void;
  titleOfStudy5: string;
  titleOfStudyHandler5: (val: string) => void;
  externalFunded1?: ExternallyFunded;
  externalFunded2?: ExternallyFunded;
  externalFunded3?: ExternallyFunded;
  externalFunded4?: ExternallyFunded;
  externalFunded5?: ExternallyFunded;
};

const ExternallyFundedLists = ({
  fundGeneratedHandler1,
  rwlFile1Handler1,
  fundGeneratedDisplay1,
  rwlFileName11,
  studyPoints1,
  onRemoveRwl1File1,
  titleOfStudy1,
  titleOfStudyHandler1,
  fundGeneratedHandler2,
  rwlFile1Handler2,
  fundGeneratedDisplay2,
  rwlFileName12,
  studyPoints2,
  onRemoveRwl1File2,
  titleOfStudy2,
  titleOfStudyHandler2,
  fundGeneratedHandler3,
  rwlFile1Handler3,
  fundGeneratedDisplay3,
  rwlFileName13,
  studyPoints3,
  onRemoveRwl1File3,
  titleOfStudy3,
  titleOfStudyHandler3,
  fundGeneratedHandler4,
  rwlFile1Handler4,
  fundGeneratedDisplay4,
  rwlFileName14,
  studyPoints4,
  onRemoveRwl1File4,
  titleOfStudy4,
  titleOfStudyHandler4,
  fundGeneratedHandler5,
  rwlFile1Handler5,
  fundGeneratedDisplay5,
  rwlFileName15,
  studyPoints5,
  onRemoveRwl1File5,
  titleOfStudy5,
  titleOfStudyHandler5,
  externalFunded1,
  externalFunded2,
  externalFunded3,
  externalFunded4,
  externalFunded5
}: ExternallyFundedListsProps) => {
  return (
    <>
      {externalFunded1 && (
        <ResearchWorkload2
          fundGeneratedHandler={fundGeneratedHandler1}
          rwlFile1Handler={rwlFile1Handler1}
          fundGeneratedDisplay={fundGeneratedDisplay1}
          rwlFileName1={rwlFileName11}
          studyPoints={studyPoints1}
          onRemoveRwl1File={onRemoveRwl1File1}
          titleOfStudy={titleOfStudy1}
          titleOfStudyHandler={titleOfStudyHandler1}
          addStudyHandler={() => {}}
          isSaved
        />
      )}
      {externalFunded2 && (
        <ResearchWorkload2
          fundGeneratedHandler={fundGeneratedHandler2}
          rwlFile1Handler={rwlFile1Handler2}
          fundGeneratedDisplay={fundGeneratedDisplay2}
          rwlFileName1={rwlFileName12}
          studyPoints={studyPoints2}
          onRemoveRwl1File={onRemoveRwl1File2}
          titleOfStudy={titleOfStudy2}
          titleOfStudyHandler={titleOfStudyHandler2}
          addStudyHandler={() => {}}
          isSaved
        />
      )}
      {externalFunded3 && (
        <ResearchWorkload2
          fundGeneratedHandler={fundGeneratedHandler3}
          rwlFile1Handler={rwlFile1Handler3}
          fundGeneratedDisplay={fundGeneratedDisplay3}
          rwlFileName1={rwlFileName13}
          studyPoints={studyPoints3}
          onRemoveRwl1File={onRemoveRwl1File3}
          titleOfStudy={titleOfStudy3}
          titleOfStudyHandler={titleOfStudyHandler3}
          addStudyHandler={() => {}}
          isSaved
        />
      )}
      {externalFunded4 && (
        <ResearchWorkload2
          fundGeneratedHandler={fundGeneratedHandler4}
          rwlFile1Handler={rwlFile1Handler4}
          fundGeneratedDisplay={fundGeneratedDisplay4}
          rwlFileName1={rwlFileName14}
          studyPoints={studyPoints4}
          onRemoveRwl1File={onRemoveRwl1File4}
          titleOfStudy={titleOfStudy4}
          titleOfStudyHandler={titleOfStudyHandler4}
          addStudyHandler={() => {}}
          isSaved
        />
      )}
      {externalFunded5 && (
        <ResearchWorkload2
          fundGeneratedHandler={fundGeneratedHandler5}
          rwlFile1Handler={rwlFile1Handler5}
          fundGeneratedDisplay={fundGeneratedDisplay5}
          rwlFileName1={rwlFileName15}
          studyPoints={studyPoints5}
          onRemoveRwl1File={onRemoveRwl1File5}
          titleOfStudy={titleOfStudy5}
          titleOfStudyHandler={titleOfStudyHandler5}
          addStudyHandler={() => {}}
          isSaved
        />
      )}
    </>
  );
};

export default ExternallyFundedLists;
