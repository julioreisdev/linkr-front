import styled from "styled-components";
import { ReactTagify } from "react-tagify";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import {
  PostBox,
  TagContainer,
  LikeContainer,
  LinkContainer,
} from "./PostStyle";
import axios from "axios";
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
  const {userdata} = useContext(UserContext)
  const navigate = useNavigate();
  const [likePost, setLikePost] = useState(false);
  
  const [totalLikes,setTotalLikes] = useState([]);
  const [tagsPost, setTagsPosts] = useState([]);
  const config = {
    headers: {
      Authorization: `Bearer ${userdata.token}`,
    },
  };

  useEffect(() => {
    setTagsPosts(tags);
  }, []);
  useEffect(() => {
    const api = `${process.env.REACT_APP_URL_API}/like/${postId}`;
      const promise = axios.get(api)
      promise.then((re)=>{
        const likes = re.data
        setTotalLikes(re.data)
        likes.map((like)=>{
          const isCurrentPost = (like.postId=== postId)
          const userLiked =(like.userId === userdata.userId)
          if(isCurrentPost && userLiked){
            setLikePost(true)
          }
        })
        console.log(re.data)
      })
      .catch((error)=>{
        alert("Não foi possível ver as curtidas desse post.\nVerifique a conexão!")
      })
      ;
  }, [likePost]);
  // useEffect(() => {
  //   const api = `${process.env.REACT_APP_URL_API}/likes`;
  //   const body = {
  //     postLikeId: "oias",
  //   };
  //   const promise = axios.get(api, {postLikeId: 32});
  //   promise
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err.response.data);
  //     });
  // }, []);
  
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
      const body = {userId:userdata.userId}
      const promise = axios.post(api,body,config)
      promise.then((re)=>{
        setLikePost(true);
        console.log("liked "+ postId)
      })
      .catch((error)=>{
        alert("Não foi possível curtir esse post.\nVerifique a conexão!")
        setLikePost(false);
      })
      
      return;
    }
    if (likePost) {
      setLikePost(false);
      const api = `${process.env.REACT_APP_URL_API}/like/${postId}/${userdata.userId}`;
      const promise = axios.delete(api)
      promise.then((re)=>{
        console.log(api)
      })
      .catch((error)=>{
        alert("Não foi possível descurtir esse post.\nVerifique a conexão!")
        setLikePost(true);
      })
      return;
    }
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
        <p>{totalLikes.length ? `${totalLikes.length} likes` :"" }</p>
      </LikeContainer>
      <LinkContainer>
        <h2>{userName}</h2>
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
