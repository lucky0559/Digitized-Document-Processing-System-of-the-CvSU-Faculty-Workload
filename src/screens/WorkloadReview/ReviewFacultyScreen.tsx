import React from "react";

type ReviewFacultyScreenProps = {
  userEmail?: string;
  onCloseReviewScreen: () => void;
};

const ReviewFacultyScreen = ({
  userEmail,
  onCloseReviewScreen
}: ReviewFacultyScreenProps) => {
  return (
    <div>
      <p onClick={onCloseReviewScreen}>{userEmail}</p>
    </div>
  );
};

export default ReviewFacultyScreen;
