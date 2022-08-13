import { ReactTagify } from "react-tagify";
import { Link,useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  PostBox, PostOptions,TagContainer, LikeContainer, LinkContainer
} from "./PostStyle";
import { FaPen, FaTrash } from "react-icons/fa";

export default function PostPreview({
  userId,
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

  function TagsLayout(props) {
    return (
      <div>
        <Link className="link" to={`/hashtag/${props.t}`}>
          <span>#{props.t}</span>
        </Link>
      </div>
    );
  }

  return (
    <PostBox>
      <LikeContainer>
        <img alt={userName} src={userImage} />
      </LikeContainer>
      <PostOptions>
        <FaPen style={{ color: '#FFFFFF', fontSize: '16px' }} />
        <FaTrash style={{ color: '#FFFFFF', fontSize: '14px' }} />
      </PostOptions>
      <LinkContainer>
        <Link className="link" to={`/user/${userId}`} >
          <h2>{userName}</h2>
        </Link>
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
