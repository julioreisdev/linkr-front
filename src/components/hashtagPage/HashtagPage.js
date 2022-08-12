import { useContext, useEffect,useState   } from "react"
import { useParams } from "react-router-dom"
import NavBarr from "../navBarr/navBarr.js"
import TimelineTitle from "../timelineRoute/timelineTitle.js"
import elementStatusContext from "../../context/ElementsStatus.js"
import GlobalStyle from "../../assets/css/cssReset/globalStyled.js"
import closeDropDown from "../../assets/functions/closeDropdown.js"
import {ContentMain,TotalContainer} from "../../assets/css/style/timelineStyle.js"
import axios from "axios"



export default function HashtagPage(){
    const {Status,Setstatus} = useContext(elementStatusContext);
    const [postList, setPostList] = useState([]);
    const [loading, setLoading] = useState(false);
    const {hashtag}=useParams();
    useEffect(()=>{
      const promise = axios.get(`${process.env.REACT_APP_URL_API}/hashtag/${hashtag}`)
      promise.then((re)=>{
        setPostList([...re.data])
        setLoading(true)
      }).catch(()=>
        alert("não foi possível carregar os posts dessa hashtag"))
    },[])
    return(
        <>
            <GlobalStyle/>
            <TotalContainer >
                <NavBarr  closeDropDown={closeDropDown}/>
                <div onClick={(e)=>{closeDropDown(Status,Setstatus,e)}} >
                  <TimelineTitle>
                    {hashtag}
                  </TimelineTitle>
                  <ContentMain>
                  
                  </ContentMain>
                </div>
            </TotalContainer>
        </>
    )
}