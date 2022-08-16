import React from "react";

type ScreenTitleProps = {
  title: string;
};

const ScreenTitle = ({ title }: ScreenTitleProps) => {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
};

export default ScreenTitle;
