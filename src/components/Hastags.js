
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Loaderspinner } from "./Loaderspinner";


function TagsBox ({hastagsData,loading}){
    const isLoad= loading ? (<Loaderspinner/>):
    (hastagsData.map((hashtag)=>(<HastagsLink to={`/hastag/${hashtag.name}`}>#{hashtag.name}</HastagsLink>)));
    return( 
    <TagsBoxSection>
        {isLoad}
    </TagsBoxSection>)
}

export default function Hastags(){
    const [HastagsData,SetHastagsData] = useState([]);
    const [loading, setLoading] = useState(true);
    

    useEffect(()=>{
        const promise = axios.get(`http://localhost:5000/tagsTrending`);
        promise
            .then((re)=>{
                SetHastagsData([...re.data])
                setLoading(false)
            }
            )
            .catch((error)=>{
                console.log(error)
            });
    },[]);

    return(
    <AsideStyled>
        <TitleArticle>
            <h3>trending</h3>
        </TitleArticle>
        <BorderHorizon/>
        <TagsBox hastagsData={HastagsData} loading={loading} />
        
    </AsideStyled>
    )
}

const HastagsLink = styled(Link)`
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

const TagsBoxSection = styled.section`
    width:100%;
    height:84%;
    padding: 15px 15px;
    background-color:#171717;
    border-radius:0 0 10px 10px ;
    display:flex;
    flex-direction:column;
    justify-content: flex-start;
    align-items:flex-start;
`

const BorderHorizon = styled.div`
    width:100%;
    height:1px;
    background-color:#484848;
`

const TitleArticle = styled.article`
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

const AsideStyled = styled.aside`
    width:33%;
    min-width:200px;
    height: 406px;
    
    @media (max-width:700px) {
        display:none
    }
`