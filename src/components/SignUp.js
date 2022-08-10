import styled from "styled-components";
import { Link } from "react-router-dom";

import { Container, Sidebar, Form } from "./StyleAuth";

export default function SignUp() {
  return (
    <Container>
      <Sidebar>
        <h1>linkr</h1>
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