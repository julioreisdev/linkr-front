import { useState } from "react";
import styled from "styled-components";
import GlobalStyle from "../../cssReset/globalStyled.js";
import NavBarr from "../navBarr/nabBarr.js";
export default function TimelinePage(){
    console.log("entrei")
    return(
        <>
            <GlobalStyle/>
            <TotalContainer>
                <NavBarr/>
                <h1>hello, world</h1>
            </TotalContainer>
        </>
    )
}

const TotalContainer = styled.section`
    width: 100vw;
    height: 100vh;
    background-color: #333333;

`
