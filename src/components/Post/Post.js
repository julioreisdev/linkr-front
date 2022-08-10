import { useState } from "react";
import styled from "styled-components";

export default function Post() {
  const [link, setLink] = useState("");
  const [content, setContent] = useState("");

  return (
    <Container>
      <h2>timeline</h2>
      <PostContainer>
        <div>
          <img
            src="https://images.unsplash.com/photo-1618614944895-fc409a83ad80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
            alt="Profile"
          />
          <p>{`What are you going to share today?`}</p>
        </div>
        <form>
          <input
            type="url"
            id="url"
            placeholder="https://"
            value={link}
            required
            onChange={(e) => setLink(e.target.value)}
          />
          <textarea
            type="text"
            id="content"
            placeholder="Awesome article about #javascript"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button>Publish</button>
        </form>
      </PostContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 40%;
  padding: 1rem;
  margin-top: 3rem;
  color: #fff;
  color: #fff;
  text-align: left;

  h2 {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 2rem;
    font-family: "Oswald", sans-serif !important;
  }
  @media (min-width: 0) and (max-width: 820px) {
    width: 100%;
    padding: 1rem 0 0 0;

    h2 {
      margin-left: 1rem;
    }
  }
`;

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background-color: #fff;
  border-radius: 10px;

  div {
    display: flex;
    align-items: center;
    color: #707070;
    font-size: 1.1rem;

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 0.5rem;
    }
  }

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    input,
    textarea {
      color: #555;
      font-weight: bold;
      width: 90% !important;
      margin: 0.5rem;
      padding: 0.5rem;
      background-color: #efefef;
      border: 1px solid #efefef;
      border-radius: 3px;
    }

    textarea {
      min-height: 80px;
      max-height: 80px;
    }

    button {
      margin-right: 0.5rem;
      background-color: #1877f2;
      border: 1px solid #1877f2;
      color: #fff;
      padding: 0.2rem 1.5rem;
      border-radius: 3px;
    }
  }

  @media (min-width: 0) and (max-width: 820px) {
    border-radius: 0;

    div {
      justify-content: center;
      img {
        display: none;
      }
      p {
        margin-bottom: 1rem;
      }
    }
  }
`;
