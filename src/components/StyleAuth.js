import styled from "styled-components";
import { Link } from "react-router-dom";
export const Container = styled.div`
  display: flex;
  @media (min-width: 0) and (max-width: 768px) {
    flex-direction: column;
  }
`;

export const LinkStyled = styled(Link)`

  text-decoration: none;
  color: #fff;
  font-family: 'Lato', sans-serif !important;

`

export const Sidebar = styled.div`
  background-color: #151515;
  width: 60%;
  min-height: 100vh;
  color: #fff;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 10%;
  padding-bottom: 1rem;

  @media (min-width: 0) and (max-width: 768px) {
    width: 100%;
    padding: 0 !important;
    align-items: center;
    min-height: 24vh;

    p {
      text-align: center;
      padding: 0 0 1rem 0 !important;
      width: 90% !important;
    }
  }

  h1 {
    font-size: 3.5rem;
    font-family: "Passion One", cursive !important;
  }
  p {
    font-size: 1.5rem;
    width: 40%;
    padding-bottom: 15%;
    font-family: "Oswald", sans-serif !important;
  }
`;

export const Form = styled.div`
  background-color: #333;
  width: 40%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 1rem;
  .pale {
    filter: contrast(80%);
  }
  @media (min-width: 0) and (max-width: 768px) {
    width: 100%;
    height: 76vh !important;
    min-height: 0 !important;
    justify-content: flex-start;

    form {
      padding-top: 1rem;
    }
  }

  form {
    min-height: 50vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    input,
    button {
      border-radius: 3px;
      padding: 0.8rem;
      font-size: 1.2rem;
      margin: 0.5rem 0;
      width: 75%;
      font-family: "Oswald", sans-serif !important;
      border: none;
      font-weight: bold;
    }

    input {
      color: gray;
      ::placeholder {
        color: #9F9F9F;
        font-weight: bold;
      }
    }

    button {
      margin-bottom: 2rem;
      background-color: #1877f2;
      color: #fff;
    }
  }
`;
