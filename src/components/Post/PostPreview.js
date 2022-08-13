import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { PostBox, TagContainer, LikeContainer, LinkContainer } from "./PostStyle";

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

  const [tagsPost, setTagsPosts] = useState([]);
  useEffect(() => {
    setTagsPosts(tags);
  }, []);

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
      <LinkContainer>
        <Link className="link" to={`/user/${userId}`}>
          <h2>{userName}</h2>
        </Link>
        <p>{postContent !== null ? postContent : ""}</p>
        <TagContainer>
          {tagsPost.map((t) => (
            <TagsLayout t={t} />
          ))}
        </TagContainer>
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
