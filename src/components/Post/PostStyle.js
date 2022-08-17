import styled from "styled-components";

export const TagContainer = styled.div`
  font-weight: bold;
  padding: 0.3rem 0.7rem;
  width: 100%;
  display: flex;

  @media (min-width: 0) and (max-width: 620px) {
    width: 300px;
  }

  span {
    color: #fdfdfd;
    text-decoration: none;
    margin-right: 0.3rem;
  }
`;

export const PostBox = styled.div`
  width: 100%;
  min-height: 276px;
  margin: 2rem 0 0 0;
  padding: 20px;
  box-sizing: border-box;
  border: none;
  border-radius: 16px 16px 0 0;
  background-color: #171717;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-evenly;
  font-family: "Lato", sans-serif;
  position: relative;
  @media (max-width: 620px) {
    width: 100%;
    border-radius: 0px;
    padding-left: 0px;
    padding-right: 0px;
  }
`;

export const LikeContainer = styled.div`
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

  div {
    color: ${(props) => props.fontColor};
  }

  ion-icon {
    font-size: 1.3rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
`;

export const LinkContainer = styled.div`
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

export const PostOptions = styled.div`
  width: 40px;
  height: 25px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 19px;
  right: 23px;
`;

export const CommentIcon = styled.div`
  margin-top: 0.8rem;
  color: #ffffff !important;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    text-align: center;
    font-size: 0.7rem;
  }
`;

export const Comments = styled.div`
  /* position: absolute; */
  left: 0;
  bottom: -4rem;
  width: 100%;
  padding: 1rem;
  background-color: #1e1e1e;
  margin-bottom: 1rem;
  border-radius: 0 0 16px 16px;

  @media (min-width: 0) and (max-width: 620px) {
    width: 100%;
    border-radius: 0;
  }
`;

export const SendComment = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.8rem;
  border-top: 1px solid #333;

  form {
    position: relative;
    width: 90%;
    input {
      padding: 0.7rem 50px 0.7rem 0.5rem;
      width: 100%;
      border-radius: 8px;
      background-color: #252525;
      border: 1px solid #252525;
      color: #ffffff;
    }
    button {
      position: absolute;
      right: 2px;
      bottom: 2px;
      padding: 0.5rem 0.7rem;
      border-radius: 12px;
      background-color: #252525;
      border: 1px solid #252525;
    }
    ion-icon {
      color: #fff;
    }
  }
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  @media (min-width: 0) and (max-width: 620px) {
    img {
      width: 30px;
      height: 30px;
    }
  }
`;
