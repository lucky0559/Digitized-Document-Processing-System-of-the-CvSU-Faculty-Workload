import React from "react";
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
  addStudyHandler1: () => void;
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
  addStudyHandler1,
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
          addStudyHandler={addStudyHandler1}
        />
      )}
    </>
  );
};

export default ExternallyFundedLists;
