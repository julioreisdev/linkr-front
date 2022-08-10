import { useContext } from "react"
import elementStatusContext from "../../context/ElementsStatus.js"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import { IoIosArrowDown } from "react-icons/io"
import logo from "../../assets/images/linkr_Logo.png"

function toggleDropDown(Status,Setstatus){

    if(Status.dropDown==="able"){
        Setstatus({...Status,dropDown:"disable"})
        return
    }
    Setstatus({...Status,dropDown:"able"})
}

function logout(navigate){
    localStorage.removeItem('data');
    navigate("/");
}

export default function NavBarr({closeDropDown}){
    const {Status,Setstatus} = useContext(elementStatusContext)
    const navigate = useNavigate()

    return(
        <NavBarrStyled 
            onClick={(e)=>{closeDropDown(Status,Setstatus,e)}}>

            <img src={logo} alt="Logo Linkr"/>
            <h3>imput</h3>

            <Menu>
                <DropDown className={Status.dropDown} >
                    <DropDownButton onClick={()=>{toggleDropDown(Status,Setstatus)}}>
                        <IoIosArrowDown className="dropArrow"/>
                    </DropDownButton>
                    <ul>
                        <DropDownItens>
                            <LogoutButton onClick={()=>logout(navigate)}><p>Logout</p></LogoutButton>
                        </DropDownItens>
                    </ul>

                </DropDown>

                <UserSection onClick={(e)=>toggleDropDown(Status,Setstatus,e)}>
                    <img src="https://rollingstone.uol.com.br/media/uploads/deadpool.jpg" alt="imagem do usuário"/>
                </UserSection>
                
            </Menu>
        </NavBarrStyled>
    )
}

const LogoutButton = styled.button`
    width: 100%;
    height:100%;
    border: none;
    background-color: #151515;
` 

const UserSection = styled.section`

`

const DropDownItens = styled.li`
    width:120px;
    height: 43px;
    display: flex;
    justify-content:center;
    align-items:center;

h3  {
    font-size:20px;
    font-weight:bold;
}
`

const DropDownButton =styled.button`
    border:none;
    background-color:#151515;
    cursor: pointer;
    padding:1px 6px;
    text-align:center;

.dropArrow {
    color: white;
    font-weight:bold;
    width:25px;
    height:25px;
    }
`

const DropDown = styled.section`
    position: relative;
    list-style: none;
    width: 100%;
    height:100%;
ul{
    display: none;
    background-color: #151515;
    margin:auto;
    top:50px;
    left:-10px;
    position: absolute;
    padding:0 5px 5px 5px;
    border-radius:0 0 0 15px;
}

&&.able ul{
    display:block
}
`

const Menu = styled.section`
max-width: fit-content;
display: flex;
justify-content: space-between;
align-items:center;
border: 1px solid yellow;


img{
    width:53px;
    height:53px;
    object-fit:cover;
    border-radius:100%;
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
position:fixed;
top:0;
left:0;

h3{
    color: white;
}
`