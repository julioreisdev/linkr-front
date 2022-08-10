import React from "react";
import  { ThreeDots } from "react-loader-spinner";

import styled from "styled-components";

export const Loaderspinner = () => (
    <Div className="loader">
      <ThreeDots color="#FFFFFF"/>
    </Div>
  );

const Div = styled.div`
    width: auto;
    height: auto;
    display: flex;
    justify-content: center;
`