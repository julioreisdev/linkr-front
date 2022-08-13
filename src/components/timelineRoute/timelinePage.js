import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Loaderspinner } from "../Loaderspinner.js";
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
import {
  ContentMain,
  TotalContainer,
} from "./timelineStyle.js";
import InputUsers from "../navBarr/InputUsers.js";


function closeDropDown(Status, Setstatus, e) {
  e.preventDefault();
  e.stopPropagation();
  if (Status.dropDown === "able") {
    Setstatus({ ...Status, dropDown: "disable" });
  }
}

export default function TimelinePage() {
  const [postList, setPostList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { Status, Setstatus } = useContext(elementStatusContext);
  const {
    userdata, postLoader, setPostLoader
  } = useContext(UserContext);
  const navigate = useNavigate();


  useEffect(() => {
    setLoading(true);
    console.log(userdata.token);
    if(userdata.token) {
      const config = {
        headers: {
          Authorization: `Bearer ${userdata.token}`,
        },
      };
      const promise = axios.get(
        `${process.env.REACT_APP_URL_API}/posts`,
        config
      );

      promise.then((re) => {
        setPostList(re.data);
        setPostLoader(false);
        setLoading(false);
      });
    } else {
      alert(
        "An error occured while trying to fetch the posts, please refresh the page"
      );
      localStorage.removeItem("data");
      navigate("/");
    }
  }, [userdata, postLoader]);

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
              {loading ? (
                <Loaderspinner />
              ) : postList.length === 0 ? (
                <h1> There are no posts yet </h1>
              ) : (
                postList.map((post, index) => (
                  <PostPreview
                    key={index}
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
            </PostContainer>
            <Hastags />
          </ContentMain>
        </div>
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
