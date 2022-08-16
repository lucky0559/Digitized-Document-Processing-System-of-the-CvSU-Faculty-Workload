import React from "react";
import { DotLoader } from "react-spinners";

export const LoadingSpinner = () => {
  return (
    <div>
      <DotLoader size={15} color="white" loading={true} />
    </div>
  );
};
