import { useContext } from "react";
import Post from "../Post/Post.js";
import Hastags from "./Hastags.js";
import NavBarr from "../navBarr/navBarr.js";
import TimelineTitle from "./timelineTitle.js";
import elementStatusContext from "../../context/ElementsStatus.js";
import GlobalStyle from "../../assets/css/cssReset/globalStyled.js";
import {ContentMain,TotalContainer} from "../../assets/css/style/timelineStyle.js"

function closeDropDown(Status, Setstatus, e) {
  e.preventDefault();
  e.stopPropagation();
  if (Status.dropDown === "able") {
    Setstatus({ ...Status, dropDown: "disable" });
  }
}


export default function TimelinePage(){
    const {Status,Setstatus} = useContext(elementStatusContext)
    return(
        <>
            <GlobalStyle/>
            <TotalContainer >
                <NavBarr  closeDropDown={closeDropDown}/>
                <div onClick={(e)=>{closeDropDown(Status,Setstatus,e)}} >
                  <TimelineTitle>
                    timeline
                  </TimelineTitle>
                  <ContentMain>
                    <Post />
                    <Hastags/>
                  </ContentMain>
                </div>
            </TotalContainer>
        </>
    )
}



