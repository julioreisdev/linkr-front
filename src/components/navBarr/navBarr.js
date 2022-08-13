import { useContext } from "react";
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
import InputUsers from "./InputUsers";

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
  const navigate = useNavigate();

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
          <img
            src="https://rollingstone.uol.com.br/media/uploads/deadpool.jpg"
            alt="imagem do usuário"
          />
        </UserSection>
      </Menu>
    </NavBarrStyled>
  );
}