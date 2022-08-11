import styled from "styled-components";
import { Link } from "react-router-dom";

export const HastagsLink = styled(Link)`
    max-width: 24ch;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-bottom:12px;
    font-weight:bold;
    font-size:19px;
    text-decoration: none;
    color: #fff;
    font-family: 'Lato', sans-serif !important;

`

export const TagsBoxSection = styled.section`
    width:100%;
    height:84%;
    padding: 15px 15px;
    background-color:#171717;
    border-radius:0 0 10px 10px ;
    display:flex;
    flex-direction:column;
    justify-content: ${props => props.loading? "center":"flex-start" } ;
    align-items:${props=> props.loading?"center":"flex-start"};

div{
    align-items:flex-start;
}
`

export const BorderHorizon = styled.div`
    width:100%;
    height:1px;
    background-color:#484848;
`

export const TitleArticle = styled.article`
    width:100%;
    height:15%;
    padding: 6px 15px;
    background-color:#171717;
    border-radius:10px 10px 0 0;
    display: flex;
    justify-content: flex-start;
    align-items:center;

&&>h3{
    font-family:'Oswald', sans-serif !important;
    font-weight:bold;
    font-size:27px;
}
`

export const AsideStyled = styled.aside`
    width:33%;
    min-width:200px;
    height: 406px;
    @media (max-width:700px) {
        display:none
    }
`