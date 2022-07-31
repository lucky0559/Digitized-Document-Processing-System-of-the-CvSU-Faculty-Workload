import { css } from "styled-components";

import HurmeGeometricSans3Bold from "./fonts/HurmeGeometricSans3Bold.otf";
import HurmeGeometricSans3SemiBold from "./fonts/HurmeGeometricSans3SemiBold.otf";

const fonts = css`
  @font-face {
    font-family: "HurmeGeometricSans3Bold";
    font-style: normal;
    src: url(${HurmeGeometricSans3Bold}) format("truetype");
  }

  @font-face {
    font-family: "HurmeGeometricSans3SemiBold";
    font-style: normal;
    src: url(${HurmeGeometricSans3SemiBold}) format("truetype");
  }
`;

export default fonts;
