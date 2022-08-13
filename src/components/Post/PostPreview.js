import styled from "styled-components";
import { ReactTagify } from "react-tagify";
import { Link,useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function PostPreview({
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
      <LinkContainer>
        <h2>{userName}</h2>
        <ReactTagify 
          mentionStyle={{fontWeight:500}}
          tagStyle={{color: 'white',fontWeight:700}}
          tagClicked={(tag)=> redirectToHashtagPage(tag) }>
        <p>
        {postContent !== null ? postContent:""}
        {/* {postContent !== null ? postContent.split(" ")
          .map((word)=>{
          if(word.startsWith("#")){
            return <Link to={`/hashtag/${word.replaceAll("#","")}`}> {word}</Link>
          }
          return word + " "}) : ""} */}
        </p>
        </ReactTagify>
        {/* <TagContainer>
          {tagsPost.map((t) => (
            <TagsLayout t={t} />
          ))}
        </TagContainer> */}
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

const TagContainer = styled.div`
  font-weight: bold;
  padding: 0.3rem 0.7rem;
  width: 100%;
  display: flex;

  @media (min-width: 0) and (max-width: 620px) {
    width: 300px;
  }

  span{
    color: #fdfdfd;
    text-decoration: none;
    margin-right: 0.3rem;
  }
`;

const PostBox = styled.div`
  width: 608px;
  height: 276px;
  margin-bottom: 16px;
  padding: 20px;
  box-sizing: border-box;
  border: none;
  border-radius: 16px;
  background-color: #171717;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-evenly;
  font-family: "Lato", sans-serif;
  @media (max-width: 620px) {
    width: 100%;
    border-radius: 0px;
    padding-left: 0px;
    padding-right: 0px;
  }
`;

const LikeContainer = styled.div`
  width: auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  img {
    object-fit: cover;
    width: 50px;
    height: 50px;
    border-radius: 26.5px;
    margin-bottom: 17px;
  }
  @media (max-width: 620px) {
    max-width: 50px;
    padding-left: 10px;
    margin-right: -5px;
  }
`;

const LinkContainer = styled.div`
  width: auto;
  height: 100%;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  h2 {
    width: 500px;
    height: 23px;
    padding: 7px;
    font-weight: 400;
    font-size: 19px;
    text-align: left;
    color: #ffffff;
  }
  p {
    width: 500px;
    max-height: 52px;
    padding: 7px;
    font-weight: 400;
    font-size: 17px;
    text-align: justify;
    color: #b7b7b7;
  }

  .linkpreview {
    width: 503px;
    height: 155px;
    border: 1px solid #4d4d4d;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .linkdescription {
    width: 100%;
    height: 100%;
    padding: 22px 25px 22px 18px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }

  .linkdescription > h3 {
    width: 249px;
    height: 38px;
    text-align: justify;
    font-weight: 400;
    font-size: 16px;
    color: #cecece;
    margin-bottom: 10px;
  }

  .linkdescription > p {
    width: 300px;
    height: 39px;
    padding: 0px;
    text-align: left;
    margin: 10px 0px 13px 0px;
    font-weight: 400;
    font-size: 11px;
    color: #9b9595;
  }

  .linkdescription > .url {
    margin-top: 0px;
    margin-bottom: 0px;
    color: #cecece;
  }

  .linkpreview > img {
    width: 153px;
    height: 100%;
    border-radius: 0px 5px 5px 0px;
    object-fit: cover;
  }

  @media (max-width: 620px) {
    width: 100%;
    min-height: 155px;
    margin-left: -20px;
    .linkpreview {
      max-width: 288px;
      padding-right: 5px;
      box-sizing: border-box;
    }
    h2,
    p {
      width: 288px;
      text-align: left;
    }
    .linkdescription > h3 {
      width: 138px;
      height: 26px;
      font-size: 11px;
      padding-bottom: 5px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .linkdescription > p {
      width: 175px;
      height: 44px;
      font-size: 9px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .linkpreview > img {
      width: 100px;
    }
  }
`;
