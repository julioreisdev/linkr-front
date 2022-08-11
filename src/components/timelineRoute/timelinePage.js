import { useContext } from "react";
import styled from "styled-components";
import elementStatusContext from "../../context/ElementsStatus.js";
import GlobalStyle from "../../assets/css/cssReset/globalStyled.js";
import NavBarr from "../navBarr/navBarr.js";
import Post from "../Post/Post.js";
import Hastags from "../Hastags.js";


function closeDropDown(Status, Setstatus, e) {
  e.preventDefault();
  e.stopPropagation();
  if (Status.dropDown === "able") {
    Setstatus({ ...Status, dropDown: "disable" });
  }
}

// <<<<<<< HEAD
export default function TimelinePage(){
    const {Status,Setstatus} = useContext(elementStatusContext)
    return(
        <>
            <GlobalStyle/>
            <TotalContainer >
                <NavBarr  closeDropDown={closeDropDown}/>
                <div onClick={(e)=>{closeDropDown(Status,Setstatus,e)}} >
                    <Hastags/>
                    <Post />
                </div>
            </TotalContainer>
        </>
    )
}

const TotalContainer = styled.section`
    width: 100vw;
    height: 100vh;
    padding: 72px 1rem 1rem 1rem;
    background-color: #333333;
    display: flex;
    flex-direction: column;
    align-items: center;
    
&&>div{
    padding-top:75px;
    width:100%;
    height:100%;
    display:flex;
    justify-content:center;
    align-items:center;
}
 @media (min-width: 0) and (max-width: 820px) {
    padding: 72px 0 0 0;
  }
`;

// =======
// export default function TimelinePage() {
//   const { Status, Setstatus } = useContext(elementStatusContext);
//   return (
//     <>
//       <GlobalStyle />
//       <TotalContainer>
//         <NavBarr closeDropDown={closeDropDown} />
//         <Post />
//       </TotalContainer>
//     </>
//   );
// }

// const TotalContainer = styled.section`
//   width: 100vw;
//   height: 100vh;
//   padding: 72px 1rem 1rem 1rem;
//   background-color: #333333;
//   display: flex;
//   flex-direction: column;
//   align-items: center;

//   @media (min-width: 0) and (max-width: 820px) {
//     padding: 72px 0 0 0;
//   }
// `;
// >>>>>>> 95f2b3bcc4e11a29afc4999c293e7b47ddcbaf15
