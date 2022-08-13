import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import logo from "../../assets/images/linkr_Logo.png";
import elementStatusContext from "../../context/ElementsStatus.js";
import {
  LogoutButton,
  UserSection,
  DropDownItens,
  DropDownButton,
  DropDown,
  Menu,
  NavBarrStyled,
  LogoStyled,
} from "../../assets/css/style/navBarrStyle.js";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext";
import axios from "axios";

function toggleDropDown(Status, Setstatus) {
  if (Status.dropDown === "able") {
    Setstatus({ ...Status, dropDown: "disable" });
    return;
  }
  Setstatus({ ...Status, dropDown: "able" });
}
function logout(navigate) {
  localStorage.removeItem("data");
  navigate("/");
}

export default function NavBarr({ closeDropDown }) {
  const { Status, Setstatus } = useContext(elementStatusContext);
  const { searchPeople, setSearchPeople, userImg, setUserImg } =
    useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("@tokenJWT"));
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const api = `${process.env.REACT_APP_URL_API}/user`;
    const promise = axios.get(api, config);

    promise
      .then((res) => {
        setUserImg(res.data.image);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <NavBarrStyled
      onClick={(e) => {
        closeDropDown(Status, Setstatus, e);
      }}
    >
      <LogoStyled
        src={logo}
        alt="Logo Linkr"
        onClick={() => navigate("/timeline")}
      />

      <InputUsers
        mobile={false}
      />

      <Menu>
        <DropDown className={Status.dropDown}>
          <DropDownButton
            onClick={() => {
              toggleDropDown(Status, Setstatus);
            }}
          >
            <IoIosArrowDown className="dropArrow" />
          </DropDownButton>
          <ul>
            <DropDownItens>
              <LogoutButton onClick={() => logout(navigate)}>
                <p>Logout</p>
              </LogoutButton>
            </DropDownItens>
          </ul>
        </DropDown>

        <UserSection onClick={(e) => toggleDropDown(Status, Setstatus, e)}>
          <img src={userImg} alt="imagem do usuário" />
        </UserSection>
      </Menu>
    </NavBarrStyled>
  );
}