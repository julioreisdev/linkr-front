import styled from "styled-components"

export default function Hastags(){
    return(
    <AsideStyled>
        <TitleArticle>
            <h3>trending</h3>
        </TitleArticle>
        <BorderHorizon/>
        <TagsBox>
            <p>#JS</p>
            <p>#React</p>
            <p>#mobile</p>
            <p>#html</p>
            <p>#java</p>
            <p>#msql</p>
            <p>#postgres</p>
            <p>#angular</p>
            <p>#laraven</p>
        </TagsBox>
    </AsideStyled>
    )
}
const TagsBox = styled.section`
    width:301px;
    height:344px;
    padding: 30px 15px;
    background-color:#171717;
    border-radius:0 0 10px 10px ;
    display:flex;
    flex-direction:column;
    justify-content: space-between;
    align-items:flex-start;
p{
    font-family:'Lato', sans-serif;
    font-weight:bold;
    font-size:19px;
}
`

const BorderHorizon = styled.div`
    width:301px;
    height:1px;
    background-color:#484848;
`

const TitleArticle = styled.article`
    width:301px;
    height:61px;
    padding: 6px;
    background-color:#171717;
    border-radius:10px 10px 0 0;
    display: flex;
    justify-content: flex-start;
    align-items:center;

h3{
    font-family:'Oswald', sans-serif;
    font-weight:bold;
    font-size:27px;
}
`

const AsideStyled = styled.aside`
    width:301px;
    height: 406px;
    
`