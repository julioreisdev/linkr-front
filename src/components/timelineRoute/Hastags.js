import axios from "axios";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { LoaderspinnerTail } from "../Loaderspinner";
import {HastagsLink,TagsBoxSection,BorderHorizon,TitleArticle,AsideStyled} from "../../assets/css/style/hashtagAsideStyle.js";
import UserContext from "../../contexts/UserContext.js";
function TagsBox ({hastagsData,loading}){
    const isLoad= loading ? (<LoaderspinnerTail/>):
    (hastagsData.map((hashtag,index)=>(<HastagsLink key={index} to={`/hashtag/${hashtag.name}`}>#{hashtag.name}</HastagsLink>)));
    return( 
    <TagsBoxSection isLoading={loading}>
        {isLoad}
    </TagsBoxSection>)
}

export default function Hastags(){
    const{postLoader}=useContext(UserContext);
    const [HastagsData,SetHastagsData] = useState([]);
    const [loading, setLoading] = useState(true);
    

    useEffect(()=>{
        const api = `${process.env.REACT_APP_URL_API}/tagsTrending`;
        const promise = axios.get(api);

        promise
            .then((re)=>{
                SetHastagsData([...re.data]);
                setLoading(false);
            }
            )
            .catch((error)=>{
                console.log(error);
               
            });
    },[postLoader]);
    
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



