import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  padding: 0rem;

  margin-bottom: 1rem;

  color: #fff;
  color: #fff;
  text-align: left;
  position: relative;

  h2 {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 2rem;
    font-family: "Oswald", sans-serif !important;
  }
  @media (min-width: 0) and (max-width: 700px) {
    max-width: 100%;
    padding: 1rem 0 0 0;

    h2 {
      margin-left: 1rem;
    }
  }
`;

export const PostContainer = styled.div`
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
      object-fit:cover;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 0.5rem;
    }

    p {
      color: #555;
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

      :hover {
        cursor: pointer;
      }
    }
  }

  @media (min-width: 0) and (max-width: 700px) {
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

export const Block = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 252px;
  background-color: "#fff";
  opacity: 0.3;
  border-radius: 10px;
`;
