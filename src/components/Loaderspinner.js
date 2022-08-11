import React from "react";
import styled from "styled-components";
import  { ThreeDots,TailSpin } from "react-loader-spinner";

export const Loaderspinner = () => (
    <Div className="loader">
      <ThreeDots color="#FFFFFF"/>
    </Div>
  );


  export const LoaderspinnerTail = () => (
    <Div className="loader">
      <TailSpin color="#FFFFFF"/>
    </Div>
  );
const Div = styled.div`
    width: auto;
    height: auto;
    display: flex;
    justify-content: center;
`