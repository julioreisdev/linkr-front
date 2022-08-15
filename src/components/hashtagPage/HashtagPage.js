import axios from "axios";
import styled from "styled-components";
import NavBarr from "../navBarr/navBarr.js";
import { useParams } from "react-router-dom";
import PostPreview from "../Post/PostPreview.js";
import Hastags from "../timelineRoute/Hastags.js";
import { Loaderspinner } from "../Loaderspinner.js";
import { useContext, useEffect,useState   } from "react";
import TimelineTitle from "../timelineRoute/timelineTitle.js";
import elementStatusContext from "../../context/ElementsStatus.js";
import GlobalStyle from "../../assets/css/cssReset/globalStyled.js";
import closeDropDown from "../../assets/functions/closeDropdown.js";
import {
  ContentMain,
  TotalContainer,
  PostContainer
} from "../timelineRoute/timelineStyle.js";
import UserContext from "../../contexts/UserContext.js";

export default function HashtagPage(){
    const {Status,Setstatus} = useContext(elementStatusContext);
    const {userdata, postLoader,setPostLoader}=useContext(UserContext)
    const [postList, setPostList] = useState([]);
    const [loading, setLoading] = useState(true);
    const {hashtag}=useParams();
    const isLoad = loading? <Loaderspinner/>:
                    postList.map((post,index)=>(
                        <PostPreview
                          key={index}
                          postId={post.postId}
                          userId={post.userId}
                          userName={post.userName}
                          userImage={post.userImage}
                          postContent={post.postContent}
                          tags={post.tags}
                          url={post.url}
                          urlTitle={post.urlTitle}
                          urlDescription={post.urlDescription}
                          urlImage={post.urlImage}
                        />
                  ));
useEffect(() => {
            console.log("entrei")
            setLoading(true);
            if(userdata.token) {
              const config = {
                headers: {
                  Authorization: `Bearer ${userdata.token}`,
                },
              };
              console.log(config)
              
              const promise = axios.get(`${process.env.REACT_APP_URL_API}/hashtag/${hashtag}`,config)
              promise.then((re)=>{
                console.log([...re.data]);
                setPostList([...re.data]);
                setLoading(false);
              }).catch(()=>
                alert("não foi possível carregar os posts dessa hashtag"));
            } else {
              const token = localStorage.getItem("@tokenJWT").replaceAll('"', "")
              const config = {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              };
        
              const promise = axios.get(`${process.env.REACT_APP_URL_API}/hashtag/${hashtag}`,config)
              promise.then((re)=>{
                console.log([...re.data]);
                setPostList([...re.data]);
                setLoading(false);
              }).catch(()=>
                alert("não foi possível carregar os posts dessa hashtag"));
              }
          }, [hashtag,postLoader]);
                  


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
