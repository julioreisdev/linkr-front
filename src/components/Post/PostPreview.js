import { useContext } from "react";
import { ReactTagify } from "react-tagify";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  PostBox, PostOptions,TagContainer, LikeContainer, LinkContainer
} from "./PostStyle";
import { FaPen, FaTrash } from "react-icons/fa";
import UserContext from "../../contexts/UserContext";

export default function PostPreview({
  userId,
  postId,
  userName,
  userImage,
  postContent,
  tags,
  url,
  urlTitle,
  urlDescription,
  urlImage,
}) {
  function openUrl() {
    window.open(url, "_blank");
  }
  const navigate = useNavigate();
  const [likePost, setLikePost] = useState(false);
  const [tagsPost, setTagsPosts] = useState([]);
  const { userdata, setPostData, setModalIsOpen } = useContext(UserContext);

  useEffect(() => {
    setTagsPosts(tags);
  }, []);

  useEffect(() => {
    const api = `${process.env.REACT_APP_URL_API}/likes`;
    const body = {
      postLikeId: "oias",
    };
    const promise = axios.get(api, {postLikeId: 32});
    promise
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);

  function redirectToHashtagPage(tag) {
    if (tag.startsWith("#")) {
      navigate(`/hashtag/${tag.replaceAll("#", "")}`);
    }
  }

  function TagsLayout(props) {
    return (
      <div>
        <Link className="link" to={`/hashtag/${props.t}`}>
          <span>#{props.t}</span>
        </Link>
      </div>
    );
  }

  function like() {
    if (!likePost) {
      setLikePost(true);
      return;
    }
    if (likePost) {
      setLikePost(false);
      return;
    }
  }

  function deletePost(postId) {
    setPostData(postId);
    setModalIsOpen(true);
  }

  return (
    <PostBox>
      <LikeContainer fontColor={likePost ? "#AC0000" : "white"}>
        <img alt={userName} src={userImage} />
        <div onClick={like}>
          {likePost ? (
            <ion-icon name="heart"></ion-icon>
          ) : (
            <ion-icon name="heart-empty"></ion-icon>
          )}
        </div>
        <p>0 likes</p>
      </LikeContainer>
      {userId === userdata.id ?
        <PostOptions>
          <FaPen style={{ color: '#FFFFFF', fontSize: '16px' }} />
          <FaTrash
            onClick={() => deletePost(postId)}
            style={{ color: '#FFFFFF', fontSize: '14px' }}
          />
        </PostOptions>  
      :
        <></>
      }
      <LinkContainer>
        <Link className="link" to={`/user/${userId}`} >
          <h2>{userName}</h2>
        </Link>
        <ReactTagify
          mentionStyle={{ fontWeight: 500 }}
          tagStyle={{ color: "white", fontWeight: 700 }}
          tagClicked={(tag) => redirectToHashtagPage(tag)}
        >
          <p>{postContent !== null ? postContent : ""}</p>
        </ReactTagify>

        <div className="linkpreview" onClick={openUrl}>
          <div className="linkdescription">
            <h3>{urlTitle}</h3>
            <p>{urlDescription}</p>
            <p className="url">{url}</p>
          </div>
          <img alt={urlTitle} src={urlImage} />
        </div>
      </LinkContainer>
    </PostBox>
  );
}
