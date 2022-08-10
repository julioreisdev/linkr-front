
import { useContext } from "react";
import styled from "styled-components";
import elementStatusContext from "../../context/ElementsStatus.js";
import GlobalStyle from "../../cssReset/globalStyled.js";
import NavBarr from "../navBarr/navBarr.js";

function closeDropDown(Status,Setstatus,e){
    e.preventDefault()
    e.stopPropagation()
    console.log(e);

    if(Status.dropDown ==="able"){
        Setstatus({...Status,dropDown:"disable"})
    }
}

export default function TimelinePage(){
    const {Status,Setstatus} = useContext(elementStatusContext)
    return(
        <>
            <GlobalStyle/>
            <TotalContainer >
                <NavBarr  closeDropDown={closeDropDown}/>
                <div onClick={(e)=>{closeDropDown(Status,Setstatus,e)}} >Hello, World</div>
            </TotalContainer>
        </>
    )
}

const TotalContainer = styled.section`
    width: 100vw;
    height: 100vh;
    background-color: #333333;
    
div{
    padding-top:75px;
    width:100%;
    height:100%;
}
`
