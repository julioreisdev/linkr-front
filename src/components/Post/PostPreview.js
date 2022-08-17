import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ReactTagify } from "react-tagify";
import UserContext from "../../contexts/UserContext";
import Input from "./Input";
import {
  CommentIcon,
  Comments,
  LikeContainer,
  LinkContainer,
  PostBox,
  PostOptions,
  SendComment
} from "./PostStyle";

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
  const navigate = useNavigate();
  const [likePost, setLikePost] = useState(false);
  const [totalLikes, setTotalLikes] = useState([]);
  const [tagsPost, setTagsPosts] = useState([]);
  const [viewComment, setViewComment] = useState(false);
  const [comment, setComment] = useState("");

  const token = localStorage.getItem("@tokenJWT").replaceAll('"', "");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const [isEdit, setIsEdit] = useState(false);
  const { userdata, userImg, setPostData, setModalIsOpen } =
    useContext(UserContext);

  useEffect(() => {
    setTagsPosts(tags);
    const api = `${process.env.REACT_APP_URL_API}/like/${postId}`;
    const promise = axios.get(api);
    promise
      .then((re) => {
        const likes = re.data;
        setTotalLikes(re.data);
        likes.map((like) => {
          const isCurrentPost = like.postId === postId;
          const userLiked = like.userId === userdata.userId;
          if (isCurrentPost && userLiked) {
            setLikePost(true);
          }
        });
      })
      .catch((error) => {
        alert(
          "Não foi possível ver as curtidas desse post.\nVerifique a conexão!"
        );
      });
  }, [likePost]);

  function openUrl() {
    window.open(url, "_blank");
  }

  function redirectToHashtagPage(tag) {
    if (tag.startsWith("#")) {
      navigate(`/hashtag/${tag.replaceAll("#", "")}`);
    }
  }

  function like() {
    if (!likePost) {
      const api = `${process.env.REACT_APP_URL_API}/like/${postId}`;
      const body = { userId: userdata.userId };
      const promise = axios.post(api, body, config);

      promise
        .then((re) => {
          setLikePost(true);
        })
        .catch((error) => {
          alert("Não foi possível curtir esse post.\nVerifique a conexão!");
          setLikePost(false);
        });
    } else {
      setLikePost(false);
      const api = `${process.env.REACT_APP_URL_API}/like/${postId}/${userdata.userId}`;
      const promise = axios.delete(api);
      promise.catch((error) => {
        alert("Não foi possível descurtir esse post.\nVerifique a conexão!");
        setLikePost(true);
      });
    }
  }

  function editPost(postId) {
    setPostData(postId);
    setIsEdit(!isEdit);
  }

  function deletePost(postId) {
    setPostData(postId);
    setModalIsOpen(true);
  }

  function submitComment() {
    if (comment) {
      const api = `${process.env.REACT_APP_URL_API}/comment`;
      const token = JSON.parse(localStorage.getItem("@tokenJWT"));
      const config = {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      };
      const body = {
        content: comment,
        postId: postId,
      };
      const promise = axios.post(api, body, config);
      promise
        .then((res) => {
          setComment("");
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  }

  return (
    <>
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
          <p>{totalLikes.length ? `${totalLikes.length} likes` : ""}</p>
          <CommentIcon onClick={() => setViewComment(!viewComment)}>
            <ion-icon name="text"></ion-icon>
          </CommentIcon>
        </LikeContainer>
        {userId === userdata.userId ? (
          <PostOptions>
            <FaPen
              onClick={() => editPost(postId)}
              style={{ color: "#FFFFFF", fontSize: "16px" }}
            />
            <FaTrash
              onClick={() => deletePost(postId)}
              style={{ color: "#FFFFFF", fontSize: "14px" }}
            />
          </PostOptions>
        ) : (
          <></>
        )}
        <LinkContainer>
          <Link className="link" to={`/user/${userId}`}>
            <h2>{userName}</h2>
          </Link>
          {isEdit ? (
            <Input content={postContent} setIsEdit={setIsEdit} />
          ) : (
            <ReactTagify
              mentionStyle={{ fontWeight: 500 }}
              tagStyle={{ color: "white", fontWeight: 700 }}
              tagClicked={(tag) => redirectToHashtagPage(tag)}
            >
              <p>{postContent !== null ? postContent : ""}</p>
            </ReactTagify>
          )}

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
      {viewComment ? (
        <Comments>
          <SendComment>
            <img src={userImg} alt="User Img" />
            <form>
              <input
                type="text"
                id="comment"
                required
                placeholder="write a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button onClick={() => submitComment()}>
                <ion-icon name="send"></ion-icon>
              </button>
            </form>
          </SendComment>
        </Comments>
      ) : null}
    </>
  );
}
