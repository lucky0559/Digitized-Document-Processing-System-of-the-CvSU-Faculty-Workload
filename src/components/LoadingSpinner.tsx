import React from "react";
import { DotLoader } from "react-spinners";

type LoadingSpinnerProps = {
  color?: string;
};

export const LoadingSpinner = ({ color }: LoadingSpinnerProps) => {
  return (
    <div>
      <DotLoader size={15} color={color || "white"} loading={true} />
    </div>
  );
};
