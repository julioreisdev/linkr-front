import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Loaderspinner } from "../Loaderspinner.js";
import useInterval from  "use-interval";
import axios from "axios";
import styled from "styled-components";
import elementStatusContext from "../../context/ElementsStatus.js";
import UserContext from "../../contexts/UserContext";
import GlobalStyle from "../../assets/css/cssReset/globalStyled.js";
import NavBarr from "../navBarr/navBarr.js";
import Post from "../Post/Post.js";
import PostPreview from "../Post/PostPreview.js";
import Hastags from "./Hastags.js";
import TimelineTitle from "./timelineTitle.js";
import PostModal from "../Post/PostModal.js";
import {
  ContentMain,
  TotalContainer,
} from "./timelineStyle.js";
import InputUsers from "../navBarr/InputUsers.js";
import { AiOutlineSync } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";

let counter = 0;
let hasMore = true;

function closeDropDown(Status, Setstatus, e) {
  e.preventDefault();
  e.stopPropagation();
  if (Status.dropDown === "able") {
    Setstatus({ ...Status, dropDown: "disable" });
  }
}

export default function TimelinePage() {
  const [postList, setPostList] = useState([]);
  const [ newPosts, setNewPosts ] = useState(0);
  const [interval, setIinterval] = useState(15000);
  const [loading, setLoading] = useState(false);
  const [loadingNewPosts, setLoadingNewPosts] = useState(false);
  const { Status, Setstatus } = useContext(elementStatusContext);
  const {
    userdata, postLoader, setPostLoader
  } = useContext(UserContext);
  const navigate = useNavigate();

  function getPosts() {
    const config = {
      headers: {
        Authorization: `Bearer ${userdata.token}`,
      },
    };
    const promise = axios.get(
      `${process.env.REACT_APP_URL_API}/posts`,
      config
    );

    return promise;
  }

  function handleScroll(e) {
    const scrollTop = e.target.documentElement.scrollTop;
    const scrollHeight = e.target.documentElement.scrollHeight;
    const innerHeight = window.innerHeight;

    if(scrollTop + innerHeight === scrollHeight) {
      counter += 5;
      if(counter%10 === 0 && hasMore) {
        setLoadingNewPosts(true);
        
        const config = {
          headers: {
            Authorization: `Bearer ${userdata.token}`,
          },
        };
        const promise = axios.get(
          `${process.env.REACT_APP_URL_API}/posts/${counter}`,
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
      const promise = getPosts();

      promise.then((re) => {
        setPostList(re.data);
        setPostLoader(false);
        setLoading(false);
        setNewPosts(0);
      });
    } else {
      alert(
        "An error occured while trying to fetch the posts, please refresh the page"
      );
      setPostLoader(false);
      localStorage.removeItem("data");
      navigate("/");
    }
  }, [userdata, postLoader]);
  
  useInterval(() => {
    const promise = getPosts();
    
    promise.then(re => {
      const posts = re.data;
      let count = 0;
      if(posts[0].postId !== postList[0].postId) {
        posts.forEach((post) => {
          if(!postList.some(old => post.postId === old.postId)){
            count++;
          }
        });
        setNewPosts(count);
      }
    }).catch(() => {
      alert(
        "An error occured while trying to fetch the posts, please refresh the page"
      );
      setIinterval(null);  
    });
  }, interval);

  return (
    <>
      <GlobalStyle />
      <TotalContainer>
      <InputUsers 
        mobile={true}
      />
        <NavBarr closeDropDown={closeDropDown} />
        <div
          onClick={(e) => {
            closeDropDown(Status, Setstatus, e);
          }}
        >
          <TimelineTitle>timeline</TimelineTitle>
          <ContentMain>
            <PostContainer>
              <Post />
              {newPosts > 0 ?
                <NewPostsBox onClick={() => setPostLoader(true)}>
                  <p>
                    {newPosts} new posts, load more!
                  </p>
                  <AiOutlineSync
                    style={{ color: "#FFFFFF", fontSize: "16px" }}
                  />
                </NewPostsBox>
                :
                <></>
              }
              {loading ? (
                <Loaderspinner />
              ) : postList.length === 0 ? (
                <h1> There are no posts yet </h1>
              ) : (
                postList.map((post, index) =>(
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
                ))
              )}
              {loadingNewPosts ? <Loaderspinner /> : <></>}
            </PostContainer>
            <Hastags />
          </ContentMain>
        </div>
        <PostModal />
      </TotalContainer>
    </>
  );
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

const NewPostsBox = styled.div`
  width: 100%;
  height: 61px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #1877F2;
  border: none;
  border-radius: 16px;
  box-shadow: 0px 4px 4px rgba(
    0, 0, 0, 0.25
  );
  margin-top: 30px;
  margin-bottom: -10px;
  > p {
    font-family: 'Leto', sans-serif;
    font-weight: 400;
    font-size: 16px;
    color: #FFFFFF;
    padding-right: 8px;
  }
`;
