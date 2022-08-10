import { useContext } from "react";
import styled from "styled-components";
import elementStatusContext from "../../context/ElementsStatus.js";
import GlobalStyle from "../../cssReset/globalStyled.js";
import NavBarr from "../navBarr/navBarr.js";
import Post from "../Post/Post.js";

function closeDropDown(Status, Setstatus, e) {
  e.preventDefault();
  e.stopPropagation();

  if (Status.dropDown === "able") {
    Setstatus({ ...Status, dropDown: "disable" });
  }
}

export default function TimelinePage() {
  const { Status, Setstatus } = useContext(elementStatusContext);
  return (
    <>
      <GlobalStyle />
      <TotalContainer>
        <NavBarr closeDropDown={closeDropDown} />
        <Post />
      </TotalContainer>
    </>
  );
}

const TotalContainer = styled.section`
  width: 100vw;
  height: 100vh;
  padding: 72px 1rem 1rem 1rem;
  background-color: #333333;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 0) and (max-width: 820px) {
    padding: 72px 0 0 0;
  }
`;
