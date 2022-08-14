
import styled from "styled-components";
import { ReactTagify } from "react-tagify";
import { Link,useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { PostBox, TagContainer, LikeContainer, LinkContainer } from "./PostStyle";

export default function PostPreview({
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
  const navigate = useNavigate()
  const [tagsPost, setTagsPosts] = useState([]);
  useEffect(() => {
    setTagsPosts(tags);
  }, []);

  function redirectToHashtagPage(tag){
    if(tag.startsWith("#")){
      navigate(`/hashtag/${tag.replaceAll("#","")}`)
    }
  }

  return (
    <PostBox>
      <LikeContainer>
        <img alt={userName} src={userImage} />
      </LikeContainer>
      <LinkContainer>

        <h2>{userName}</h2>
        <ReactTagify 
          mentionStyle={{fontWeight:500}}
          tagStyle={{color: 'white',fontWeight:700}}
          tagClicked={(tag)=> redirectToHashtagPage(tag) }>
        <p>
        {postContent !== null ? postContent:""}
        </p>
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
