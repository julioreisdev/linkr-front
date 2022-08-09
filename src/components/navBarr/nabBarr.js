import styled from "styled-components"
import logo from "../../assets/images/linkr_Logo.png"
import { IoIosArrowDown } from "react-icons/io"
export default function NavBarr(){
    return(
        <NavBarrStyled>
            <img src={logo} alt="Logo Linkr"/>
            <h3>imput</h3>
            <UserSection>
                <IoIosArrowDown className="dropArrow"/>
                <img src="https://rollingstone.uol.com.br/media/uploads/deadpool.jpg" alt="imagem do usuário"/>
            </UserSection>
        </NavBarrStyled>
    )
}

const UserSection = styled.section`
width: max-content;
display: flex;
justify-content: space-between;
align-items:center;
border: 1px solid yellow;

.dropArrow{
    color: white;
    font-weight:bold;
    width:25px;
    height:25px;
}

img{
    width:53px;
    height:53px;
    object-fit:cover;
    border-radius:100%;
    margin-left:15px;
}
`

const NavBarrStyled = styled.nav`
width: 100%;
height:72px;
background-color: #151515;
display:flex;
justify-content:space-between;
align-items:center;
padding:10px 17px;

h3{
    color: white;
}
`