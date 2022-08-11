import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import elementStatusContext from "../../context/ElementsStatus.js";
import UserContext from "../../contexts/UserContext";
import GlobalStyle from "../../assets/css/cssReset/globalStyled.js";
import NavBarr from "../navBarr/navBarr.js";
import Post from "../Post/Post.js";
import PostPreview from "../Post/PostPreview.js";
import Hastags from "../Hastags.js";
import TimelineTitle from "./timelineTitle.js";
import axios from "axios";

function closeDropDown(Status, Setstatus, e) {
  e.preventDefault();
  e.stopPropagation();
  if (Status.dropDown === "able") {
    Setstatus({ ...Status, dropDown: "disable" });
  }
}

export default function TimelinePage(){
    const [postList, setPostList] = useState([]);
    const [postLoading, setPostLoading] = useState(false);
    const {Status,Setstatus} = useContext(elementStatusContext)
    const { userdata } = useContext(UserContext);
    const navigate = useNavigate();
    console.log(postList);
    useEffect(() => {
      if(userdata !== "") {
        const config = {
          headers: {
              Authorization: `Bearer ${userdata}`
          }
        };
        console.log(userdata);
        const promise = axios.get(
            `${process.env.REACT_APP_URL_API}/posts/0`,
            config
        );

        promise.then((re) => {
          setPostList(re.data);
          console.log(re);
        });
      } else {
        alert("Error, could not login");
        localStorage.removeItem('data');
        navigate("/");
      }
    }, [userdata]);

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
                    <PostContainer>
                      <Post />
                      {postList.map((post, index) => (
                        <PostPreview
                          key={index}
                          userName={post.userName}
                          userImage={post.userImage}
                          postContent={post.postContent}
                          url={post.url}
                          urlTitle={post.urlTitle}
                          urlDescription={post.urlDescription}
                          urlImage={post.urlImage}
                        />
                      ))}
                    </PostContainer>
                    <Hastags/>
                  </ContentMain>
                </div>
            </TotalContainer>
        </>
    )
}
const ContentMain= styled.main`
  width:100%;
  max-width:936px;
  display: flex;
  justify-content:space-between;
  align-items:flex-start;

`

const TotalContainer = styled.section`
    width: 100vw;
    height: 100%;
    padding: 72px 1rem 1rem 1rem;
    background-color: #333333;
    display: flex;
    flex-direction: column;
    align-items: center;
    
&&>div{
    padding-top:90px;
    width:100%;
    height:100%;
    display:flex;
    flex-direction:column;
    justify-content:flex-start;
    align-items:center;
}
 @media (min-width: 0) and (max-width: 700px) {
    padding: 72px 0 0 0;
  }
`;

const PostContainer = styled.div`
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

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

