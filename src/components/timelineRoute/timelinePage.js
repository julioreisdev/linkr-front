import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
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
} from "../../assets/css/style/timelineStyle.js";
import axios from "axios";

function closeDropDown(Status, Setstatus, e) {
  e.preventDefault();
  e.stopPropagation();
  if (Status.dropDown === "able") {
    Setstatus({ ...Status, dropDown: "disable" });
  }
}

export default function TimelinePage() {
  const [postList, setPostList] = useState([]);
  const [postLoading, setPostLoading] = useState(false);
  const { Status, Setstatus } = useContext(elementStatusContext);
  const { userdata } = useContext(UserContext);
  const navigate = useNavigate();
  const { searchPeople, setSearchPeople } = useContext(UserContext);

  useEffect(() => {
    if (userdata !== "") {
      const config = {
        headers: {
          Authorization: `Bearer ${userdata}`,
        },
      };

      const promise = axios.get(
        `${process.env.REACT_APP_URL_API}/posts/0`,
        config
      );

      promise.then((re) => {
        setPostList(re.data);
      });
    } else {
      alert("Error, could not login");
      localStorage.removeItem("data");
      navigate("/");
    }
  }, [userdata]);

  return (
    <>
      <GlobalStyle />
      <TotalContainer>
        <Search
          type="text"
          placeholder="Search for people..."
          value={searchPeople}
          onChange={(e) => setSearchPeople(e.target.value)}
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
  @media (max-width: 620px) {
    width: 100% !important;
  }
`;

const Search = styled.input`
  width: 70%;
  padding: 0.5rem;
  border: 1px solid #c6c6c6;
  border-radius: 8px;
  margin-top: 1rem;

  ::placeholder {
    color: #c6c6c6;
  }

  @media (min-width: 621px) {
    display: none;
  }
`;
