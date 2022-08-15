import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../../contexts/UserContext";
import { Container, Sidebar, Form, LinkStyled } from "./StyleAuth";
import { Loaderspinner } from "../Loaderspinner";
import GlobalStyle from "../../assets/css/cssReset/globalStyled";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const { setUserdata } = useContext(UserContext);
  const navigate = useNavigate();


  const userlogin = localStorage.getItem("data");
  if (userlogin) {
    setUserdata(JSON.parse(userlogin));
    navigate("/timeline");
  }

  function login(e) {
    e.preventDefault();
    setLoginLoading(true);

    const body = { email, password };
    const promise = axios.post(`${process.env.REACT_APP_URL_API}/signin`, body);

    promise
      .then((re) => {  
        const data = { ...re.data };
        
        setUserdata(data);
        const dataString = JSON.stringify(data);
        localStorage.setItem("@tokenJWT", JSON.stringify(data));
        localStorage.setItem("data", dataString);
        navigate("/timeline");
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert("Usuário inválido");
        } else {
          alert("Não foi possível efetuar o login");
        }
        setLoginLoading(false);
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
          <form onSubmit={login}>
            <input
              className={loginLoading ? "pale" : ""}
              type="email"
              id={loginLoading ? null : "email"}
              placeholder="e-mail"
              value={email}
              onChange={loginLoading ? null : (e) => setEmail(e.target.value)}
              required
            />
            <input
              className={loginLoading ? "pale" : ""}
              type="password"
              id={loginLoading ? null : "password"}
              placeholder="Senha"
              value={password}
              onChange={loginLoading ? null : (e) => setPassword(e.target.value)}
              required
            />
            {loginLoading ? 
              <Loaderspinner />
             : 
              <button type="submit">Log In</button>
            }
          </form>
          <LinkStyled to={"/sign-up"}>
            <p>first time? Create an account!</p>
          </LinkStyled>
        </Form>
      </Container>
    </>
  );
}
