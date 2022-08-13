import { useContext, useEffect,useState   } from "react"
import { useParams } from "react-router-dom"
import NavBarr from "../navBarr/navBarr.js"
import TimelineTitle from "../timelineRoute/timelineTitle.js"
import elementStatusContext from "../../context/ElementsStatus.js"
import GlobalStyle from "../../assets/css/cssReset/globalStyled.js"
import closeDropDown from "../../assets/functions/closeDropdown.js"
import {ContentMain,TotalContainer} from "../timelineRoute/timelineStyle.js"
import { Loaderspinner } from "../Loaderspinner.js"
import PostPreview from "../Post/PostPreview.js"
import styled from "styled-components"
import axios from "axios"
import Hastags from "../timelineRoute/Hastags.js";


export default function HashtagPage(){
    const {Status,Setstatus} = useContext(elementStatusContext);
    const [postList, setPostList] = useState([]);
    const [loading, setLoading] = useState(true);
    const {hashtag}=useParams();
    const isLoad = loading? <Loaderspinner/>:
                    postList.map((post,index)=>{ 
                      console.log(post)
                      return(
                    <PostPreview key={index}
                      userName={post.userName}
                      userImage={post.userImage}
                      postContent={post.postContent}
                      url={post.url}
                      urlTitle={post.urlTitle}
                      urlDescription={post.urlDescription}
                      urlImage={post.urlImage}
                    />)});
    useEffect(()=>{
      const promise = axios.get(`${process.env.REACT_APP_URL_API}/hashtag/${hashtag}`)
      promise.then((re)=>{
        console.log([...re.data])
        setPostList([...re.data])
        setLoading(false)
      }).catch(()=>
        alert("não foi possível carregar os posts dessa hashtag"))
    },[hashtag])

    return(
        <>
            <GlobalStyle/>
            <TotalContainer >
                <NavBarr  closeDropDown={closeDropDown}/>
                <div onClick={(e)=>{closeDropDown(Status,Setstatus,e)}} >
                  <TimelineTitle>
                    {`# ${hashtag}`}
                  </TimelineTitle>
                  <ContentMain>
                  <PostContainer>
                    {isLoad}
                  </PostContainer>
                  <Hastags/>
                  </ContentMain>
                </div>
            </TotalContainer>
        </>
    )
}
const PostContainer = styled.div`
  width: 63%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  h1 {
    font-size: 20px;
  }
  @media (max-width: 620px) {
    width: 100% !important;
  }
`;