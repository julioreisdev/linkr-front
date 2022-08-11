import styled from "styled-components";

export const LogoutButton = styled.button`
    width: 100%;
    height:100%;
    border: none;
    cursor: pointer;
    background-color: #151515;
p{
    font-size: 18px;
    font-weight: 700;
    color: white;
}
` 

export const UserSection = styled.section`

`

export const DropDownItens = styled.li`
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

export const DropDownButton =styled.button`
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
    transition-duration: 0.8s;
    transition-property: transform;
    }
`

export const DropDown = styled.section`
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

&&.able .dropArrow{
    transform: rotate(180deg);
    
}

&&.disable .dropArrow{
    transform: rotate(-360deg);
    
}
`

export const Menu = styled.section`
max-width: fit-content;
display: flex;
justify-content: space-between;
align-items:center;



img{
    width:53px;
    height:53px;
    object-fit:cover;
    border-radius:100%;
}
`

export const NavBarrStyled = styled.nav`
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