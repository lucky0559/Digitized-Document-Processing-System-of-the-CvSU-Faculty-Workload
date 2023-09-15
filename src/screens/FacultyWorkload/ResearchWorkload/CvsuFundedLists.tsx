import React from "react";
import { CvsuFunded } from "../../../types/Fund";
import ResearchWorkload1 from "./ResearchWorkload1";

type CvsuFundedListsProps = {
  cvsuFunded1?: CvsuFunded;
  cvsuFunded2?: CvsuFunded;
  cvsuFunded3?: CvsuFunded;
  cvsuFunded4?: CvsuFunded;
  cvsuFunded5?: CvsuFunded;
  typeOfStudyHandler1: (val: string) => void;
  designationStudyHandler1: (val: string) => void;
  rwlFileHandler1: (val: File) => void;
  designationStudy1?: string;
  typeOfStudy1?: string;
  rwlFileName1?: string;
  points1: number;
  studyPoints1: number;
  onRemoveRwlFile1: () => void;
  titleOfStudy1: string;
  titleOfStudyHandler1: (val: string) => void;
  addStudyHandler1: () => void;
  typeOfStudyHandler2: (val: string) => void;
  designationStudyHandler2: (val: string) => void;
  rwlFileHandler2: (val: File) => void;
  designationStudy2?: string;
  typeOfStudy2?: string;
  rwlFileName2?: string;
  points2: number;
  studyPoints2: number;
  onRemoveRwlFile2: () => void;
  titleOfStudy2: string;
  titleOfStudyHandler2: (val: string) => void;
  addStudyHandler2: () => void;
  typeOfStudyHandler3: (val: string) => void;
  designationStudyHandler3: (val: string) => void;
  rwlFileHandler3: (val: File) => void;
  designationStudy3?: string;
  typeOfStudy3?: string;
  rwlFileName3?: string;
  points3: number;
  studyPoints3: number;
  onRemoveRwlFile3: () => void;
  titleOfStudy3: string;
  titleOfStudyHandler3: (val: string) => void;
  addStudyHandler3: () => void;
  typeOfStudyHandler4: (val: string) => void;
  designationStudyHandler4: (val: string) => void;
  rwlFileHandler4: (val: File) => void;
  designationStudy4?: string;
  typeOfStudy4?: string;
  rwlFileName4?: string;
  points4: number;
  studyPoints4: number;
  onRemoveRwlFile4: () => void;
  titleOfStudy4: string;
  titleOfStudyHandler4: (val: string) => void;
  addStudyHandler4: () => void;
  typeOfStudyHandler5: (val: string) => void;
  designationStudyHandler5: (val: string) => void;
  rwlFileHandler5: (val: File) => void;
  designationStudy5?: string;
  typeOfStudy5?: string;
  rwlFileName5?: string;
  points5: number;
  studyPoints5: number;
  onRemoveRwlFile5: () => void;
  titleOfStudy5: string;
  titleOfStudyHandler5: (val: string) => void;
  addStudyHandler5: () => void;
};

const CvsuFundedLists = ({
  cvsuFunded1,
  cvsuFunded2,
  cvsuFunded3,
  cvsuFunded4,
  cvsuFunded5,
  typeOfStudyHandler1,
  designationStudyHandler1,
  rwlFileHandler1,
  designationStudy1,
  typeOfStudy1,
  rwlFileName1,
  points1,
  studyPoints1,
  onRemoveRwlFile1,
  titleOfStudy1,
  titleOfStudyHandler1,
  addStudyHandler1,
  typeOfStudyHandler2,
  designationStudyHandler2,
  rwlFileHandler2,
  designationStudy2,
  typeOfStudy2,
  rwlFileName2,
  points2,
  studyPoints2,
  onRemoveRwlFile2,
  titleOfStudy2,
  titleOfStudyHandler2,
  addStudyHandler2,
  typeOfStudyHandler3,
  designationStudyHandler3,
  rwlFileHandler3,
  designationStudy3,
  typeOfStudy3,
  rwlFileName3,
  points3,
  studyPoints3,
  onRemoveRwlFile3,
  titleOfStudy3,
  titleOfStudyHandler3,
  addStudyHandler3,
  typeOfStudyHandler4,
  designationStudyHandler4,
  rwlFileHandler4,
  designationStudy4,
  typeOfStudy4,
  rwlFileName4,
  points4,
  studyPoints4,
  onRemoveRwlFile4,
  titleOfStudy4,
  titleOfStudyHandler4,
  addStudyHandler4,
  typeOfStudyHandler5,
  designationStudyHandler5,
  rwlFileHandler5,
  designationStudy5,
  typeOfStudy5,
  rwlFileName5,
  points5,
  studyPoints5,
  onRemoveRwlFile5,
  titleOfStudy5,
  titleOfStudyHandler5,
  addStudyHandler5
}: CvsuFundedListsProps) => {
  return (
    <>
      {cvsuFunded1 && (
        <ResearchWorkload1
          typeOfStudyHandler={e => {
            if (e) {
              typeOfStudyHandler1(e);
            }
          }}
          designationStudyHandler={e => {
            if (e) {
              designationStudyHandler1(e);
            }
          }}
          rwlFileHandler={e => {
            if (e) {
              rwlFileHandler1(e);
            }
          }}
          designationStudy={designationStudy1}
          typeOfStudy={typeOfStudy1}
          rwlFileName={rwlFileName1}
          points={points1}
          studyPoints={studyPoints1}
          onRemoveRwlFile={onRemoveRwlFile1}
          titleOfStudy={titleOfStudy1}
          titleOfStudyHandler={e => titleOfStudyHandler1(e)}
          addStudyHandler={addStudyHandler1}
        />
      )}
      {cvsuFunded2 && (
        <ResearchWorkload1
          typeOfStudyHandler={e => {
            if (e) {
              typeOfStudyHandler2(e);
            }
          }}
          designationStudyHandler={e => {
            if (e) {
              designationStudyHandler2(e);
            }
          }}
          rwlFileHandler={e => {
            if (e) {
              rwlFileHandler2(e);
            }
          }}
          designationStudy={designationStudy2}
          typeOfStudy={typeOfStudy2}
          rwlFileName={rwlFileName2}
          points={points2}
          studyPoints={studyPoints2}
          onRemoveRwlFile={onRemoveRwlFile2}
          titleOfStudy={titleOfStudy2}
          titleOfStudyHandler={e => titleOfStudyHandler2(e)}
          addStudyHandler={addStudyHandler2}
        />
      )}
      {cvsuFunded3 && (
        <ResearchWorkload1
          typeOfStudyHandler={e => {
            if (e) {
              typeOfStudyHandler3(e);
            }
          }}
          designationStudyHandler={e => {
            if (e) {
              designationStudyHandler3(e);
            }
          }}
          rwlFileHandler={e => {
            if (e) {
              rwlFileHandler3(e);
            }
          }}
          designationStudy={designationStudy3}
          typeOfStudy={typeOfStudy3}
          rwlFileName={rwlFileName3}
          points={points3}
          studyPoints={studyPoints3}
          onRemoveRwlFile={onRemoveRwlFile3}
          titleOfStudy={titleOfStudy3}
          titleOfStudyHandler={e => titleOfStudyHandler3(e)}
          addStudyHandler={addStudyHandler3}
        />
      )}
      {cvsuFunded4 && (
        <ResearchWorkload1
          typeOfStudyHandler={e => {
            if (e) {
              typeOfStudyHandler4(e);
            }
          }}
          designationStudyHandler={e => {
            if (e) {
              designationStudyHandler4(e);
            }
          }}
          rwlFileHandler={e => {
            if (e) {
              rwlFileHandler4(e);
            }
          }}
          designationStudy={designationStudy4}
          typeOfStudy={typeOfStudy4}
          rwlFileName={rwlFileName4}
          points={points4}
          studyPoints={studyPoints4}
          onRemoveRwlFile={onRemoveRwlFile4}
          titleOfStudy={titleOfStudy4}
          titleOfStudyHandler={e => titleOfStudyHandler4(e)}
          addStudyHandler={addStudyHandler4}
        />
      )}
      {cvsuFunded5 && (
        <ResearchWorkload1
          typeOfStudyHandler={e => {
            if (e) {
              typeOfStudyHandler5(e);
            }
          }}
          designationStudyHandler={e => {
            if (e) {
              designationStudyHandler5(e);
            }
          }}
          rwlFileHandler={e => {
            if (e) {
              rwlFileHandler5(e);
            }
          }}
          designationStudy={designationStudy5}
          typeOfStudy={typeOfStudy5}
          rwlFileName={rwlFileName5}
          points={points5}
          studyPoints={studyPoints5}
          onRemoveRwlFile={onRemoveRwlFile5}
          titleOfStudy={titleOfStudy5}
          titleOfStudyHandler={e => titleOfStudyHandler5(e)}
          addStudyHandler={addStudyHandler5}
        />
      )}
    </>
  );
};

export default CvsuFundedLists;
