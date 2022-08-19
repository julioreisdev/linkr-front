import axios from "axios";
import { useParams } from "react-router-dom";
import NavBarr from "../navBarr/navBarr.js";
import PostPreview from "../Post/PostPreview.js";
import Hastags from "../timelineRoute/Hastags.js";
import { Loaderspinner } from "../Loaderspinner.js";
import { useContext,useState,useEffect } from "react";
import UserContext from "../../contexts/UserContext.js";
import TimelineTitle from "../timelineRoute/timelineTitle.js";
import elementStatusContext from "../../context/ElementsStatus.js";
import GlobalStyle from "../../assets/css/cssReset/globalStyled.js";
import closeDropDown from "../../assets/functions/closeDropdown.js";
import { ContentMain, TotalContainer, PostContainer} from "../timelineRoute/timelineStyle.js";
import styled from "styled-components";

let counter = 0;
let hasMore = true;

export default function UserPage() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [followLoading, setFollowLoading] = useState(false);
    const [userName, setUserName] = useState("")
    const [postList, setPostList] = useState([]);
    const [loadingNewPosts, setLoadingNewPosts] = useState(false);
    const [ follow, setFollow ] = useState("user");
    const {Status,Setstatus} = useContext(elementStatusContext);
    const {userdata, followers, setFollowers} = useContext(UserContext);
    
    const config = {
        headers: {
          Authorization: `Bearer ${userdata.token}`,
        },
    }
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
            
            const promise = axios.get(
              `${process.env.REACT_APP_URL_API}/user/posts/${id}/${counter}`,
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

  useEffect(()=>{
    if( Number(id) !== followers[0].followerId ) setFollow("follow");
    if( followers.some(follow =>
      follow.followingId === Number(id)
    )) setFollow("unfollow");

    window.addEventListener("scroll", (e) => handleScroll(e));

    const promise = axios.get(`${process.env.REACT_APP_URL_API}/user/posts/${id}/0`,config);

    promise.then((re)=>{
      setPostList([...re.data]);
      setLoading(false);
      counter = 0;
      hasMore = true;
    }).catch(()=>
      alert("não foi possível carregar os posts dessa hashtag"));
  },[id, followers]);

  useEffect(()=>{ 
    const promise = axios.get(`${process.env.REACT_APP_URL_API}/user/${id}`,config)
    promise.then((re)=> {
      const userData = re.data
      const nome = userData.userName[0].toUpperCase() + userData.userName.substring(1);
      setUserName(nome  )
    }).catch(()=>
    alert("não foi possível carregar o nome desse usuário"));
  },[id]);
  
  function toFollow() {
    setFollowLoading(true);
    const followingId = Number(id);
    const promise = axios.post(
      `${process.env.REACT_APP_URL_API}/followers`,
      { followingId },
      config
    );

    promise.then(() => {
      setFollowLoading(false);
      setFollow("unfollow");
    }).catch(() =>
      alert("Unable to follow this user")
    );
  }

  function toUnfollow() {
    setFollowLoading(true);
    const promise = axios.delete(
      `${process.env.REACT_APP_URL_API}/followers/${id}`,
      config
    );

    promise.then(() => {
      setFollow("follow");
      setFollowLoading(false);
    }).catch(() =>
      alert("Unable to unfollow this user")
    );
  }
    return(
      <>
        <GlobalStyle/>
        <TotalContainer >
            <NavBarr  closeDropDown={closeDropDown}/>
            <div onClick={(e)=>{closeDropDown(Status,Setstatus,e)}} >
              <TimelineTitle>
                {`${userName}'s Posts`}
                {follow !== "user" ?
                  follow === "follow" ?
                    followLoading ?
                      <FollowBox>
                        <Loaderspinner />
                      </FollowBox>
                    :
                      <FollowBox
                        onClick={toFollow}
                        colors="#FFFFFF"
                        backColor="#1877F2"
                      >
                        Follow
                      </FollowBox>
                  :
                    followLoading ?
                      <FollowBox>
                        <Loaderspinner />
                      </FollowBox>
                    :
                      <FollowBox
                        onClick={toUnfollow}
                        colors="#1877F2"
                        backColor="#FFFFFF"
                      >
                        Unfollow
                      </FollowBox>
                :
                  <></>
                }
              </TimelineTitle>
              <ContentMain>
              <PostContainer>
                {isLoad}
                {loadingNewPosts ? <Loaderspinner /> : <></>}
              </PostContainer>
              <Hastags/>
              </ContentMain>
            </div>
        </TotalContainer>
      </>
    );
}

const FollowBox = styled.button`
  width: 112px;
  height: 31px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 5px;
  background-color: ${props => props.backColor};
  color: ${props => props.colors};
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  font-size: 14px;
  position: absolute;
  top: 0px;
  right: 0px;
  @media(max-width: 620px) {
    top: 60px;
    right: 10px;
  }
`;