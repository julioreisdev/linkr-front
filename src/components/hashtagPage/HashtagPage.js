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

let counter = 0;
let hasMore = true;

export default function HashtagPage(){
  const {Status,Setstatus} = useContext(elementStatusContext);
  const {userdata, postLoader,setPostLoader}=useContext(UserContext)
  const [postList, setPostList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingNewPosts, setLoadingNewPosts] = useState(false);
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

    function handleScroll(e) {
      const scrollTop = e.target.documentElement.scrollTop;
      const scrollHeight = e.target.documentElement.scrollHeight;
      const innerHeight = window.innerHeight;
  
      if(scrollTop + innerHeight + 1 >= scrollHeight) {
        counter += 5;
        if(counter%10 === 0 && hasMore) {
          setLoadingNewPosts(true);
          
          const config = {
            headers: {
              Authorization: `Bearer ${userdata.token}`,
            },
          };
          const promise = axios.get(
            `${process.env.REACT_APP_URL_API}/hashtag/${hashtag}/${counter}`,
            config
          );
  
          promise.then((re) => {
            setLoadingNewPosts(false);
            if(re.data.length <= 0) return hasMore = false;
            setPostList( oldList => [...oldList, ...re.data]);
          })
        }
      }
    }

    useEffect(() => {
      setLoading(true);

      window.addEventListener("scroll", (e) => handleScroll(e));

      if(userdata.token) {
        const config = {
          headers: {
            Authorization: `Bearer ${userdata.token}`,
          },
        };
              
        const promise = axios.get(`${process.env.REACT_APP_URL_API}/hashtag/${hashtag}/0`,config)
        
        promise.then((re)=>{
          setPostList([...re.data]);
          setLoading(false);
          counter = 0;
          hasMore = true;
        }).catch(()=>
          alert("não foi possível carregar os posts dessa hashtag"));
        } else {
          const token = localStorage.getItem("@tokenJWT").replaceAll('"', "")
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
        
        const promise = axios.get(`${process.env.REACT_APP_URL_API}/hashtag/${hashtag}/0`,config)
          promise.then((re)=>{
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
