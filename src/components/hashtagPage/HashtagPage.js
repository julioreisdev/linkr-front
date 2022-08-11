import { useContext } from "react"
import { useParams } from "react-router-dom"
import NavBarr from "../navBarr/navBarr.js"
import TimelineTitle from "../timelineRoute/timelineTitle.js"
import elementStatusContext from "../../context/ElementsStatus.js"
import GlobalStyle from "../../assets/css/cssReset/globalStyled.js"
import closeDropDown from "../../assets/functions/closeDropdown.js"
import {ContentMain,TotalContainer} from "../../assets/css/style/timelineStyle.js"



export default function HashtagPage(){
    const {Status,Setstatus} = useContext(elementStatusContext);
    const {hashtag}=useParams();
    return(
        <>
            <GlobalStyle/>
            <TotalContainer >
                <NavBarr  closeDropDown={closeDropDown}/>
                <div onClick={(e)=>{closeDropDown(Status,Setstatus,e)}} >
                  <TimelineTitle>
                    {hashtag}
                  </TimelineTitle>
                  <ContentMain>
                  
                  </ContentMain>
                </div>
            </TotalContainer>
        </>
    )
}