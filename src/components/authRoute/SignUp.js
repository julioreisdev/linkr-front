import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import GlobalStyle from "../../assets/css/cssReset/globalStyled";
import { Container, Sidebar, Form, LinkStyled } from "./StyleAuth";
import { useState } from "react";
import axios from "axios";
import { Loaderspinner } from "./../Loaderspinner";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [promiseLoading, setPromiseLoading] = useState(false);

  const navigate = useNavigate();

  function submit(e) {
    e.preventDefault();
    const body = {
      email,
      userName,
      password,
      pictureUrl,
    };

    const api = `${process.env.REACT_APP_URL_API}/signup`;

    setPromiseLoading(true);
    const promise = axios.post(api, body);
    promise
      .then((res) => {
        setPromiseLoading(false);
        navigate("/");
      })
      .catch((err) => {
        setPromiseLoading(false);
        const status = err.response.status;
        if (status === 409) {
          alert("E-mail já cadastrado!");
        }
        if (status === 422) {
          alert("A senha deve conter no mínimo 6 dígitos!");
        }
      });
  }

  return (
    <>
      <GlobalStyle/>
      <Container>
        <Sidebar>
          <h1>linkr</h1>
          <p>save, share and discover the best links on the web</p>
        </Sidebar>
        <Form>
          <form onSubmit={(e) => submit(e)}>
            <input
              type="email"
              id="email"
              required
              placeholder="e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              id="password"
              required
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="text"
              id="userName"
              required
              placeholder="username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              type="url"
              id="pictureUrl"
              required
              placeholder="picture url"
              value={pictureUrl}
              onChange={(e) => setPictureUrl(e.target.value)}
            />
            {promiseLoading ? <Loaderspinner /> : <button>Sign Up</button>}
          </form>
          <LinkStyled to="/">
            Switch back to log in
          </LinkStyled>
        </Form>
      </Container>
    </>
  );
}
