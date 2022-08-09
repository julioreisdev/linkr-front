import styled from "styled-components";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <Container>
      <Sidebar>
        <h1>Linkr</h1>
        <p>save, share and discover the best links on the web</p>
      </Sidebar>
      <Form>
        <form>
          <input type="email" id="email" required placeholder="e-mail" />
          <input
            type="password"
            id="password"
            required
            placeholder="password"
          />
          <input type="text" id="userName" required placeholder="username" />
          <input
            type="url"
            id="pictureUrl"
            required
            placeholder="picture url"
          />
          <button>Sign Up</button>
        </form>
        <Link className="link" to="/">
          Switch back to log in
        </Link>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
`;

const Sidebar = styled.div`
  background-color: #151515;
  width: 60%;
  min-height: 100vh;
  color: #fff;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 10%;

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

const Form = styled.div`
  background-color: #333;
  width: 40%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

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
        color: gray;
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
