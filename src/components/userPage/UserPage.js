import axios from "axios";
import { useParams } from "react-router-dom";
import NavBarr from "../navBarr/navBarr.js";
import PostPreview from "../Post/PostPreview.js";
import Hastags from "../timelineRoute/Hastags.js";
import { Loaderspinner } from "../Loaderspinner.js";
import { useContext,useState,useEffect } from "react";
import UserContext from "../../contexts/UserContext.js";
import TimelineTitle from "../timelineRoute/timelineTitle.js";
import elementStatusContext from "../../context/ElementsStatus.js";
import GlobalStyle from "../../assets/css/cssReset/globalStyled.js";
import closeDropDown from "../../assets/functions/closeDropdown.js";
import { ContentMain, TotalContainer, PostContainer} from "../timelineRoute/timelineStyle.js";
export default function UserPage() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [userName, setUserName] = useState("")
    const [postList, setPostList] = useState([]);
    const {Status,Setstatus} = useContext(elementStatusContext);
    const {userdata} = useContext(UserContext);
    const config = {
        headers: {
          Authorization: `Bearer ${userdata.token}`,
        },
      }
    const isLoad = loading? <Loaderspinner/>:
    postList.map((post,index)=>(
        <PostPreview
          key={index}
          postId={post.postId}
          userId={post.userId}
          userName={post.userName}
          userImage={post.userImage}
          postContent={post.postContent}
          tags={post.tags}
          url={post.url}
          urlTitle={post.urlTitle}
          urlDescription={post.urlDescription}
          urlImage={post.urlImage}
          />
          ));

  useEffect(()=>{
    const promise = axios.get(`${process.env.REACT_APP_URL_API}/user/Posts/${id}`,config)
    promise.then((re)=>{
      console.log([...re.data]);
      setPostList([...re.data]);
      setLoading(false);
    }).catch(()=>
      alert("não foi possível carregar os posts dessa hashtag"));
  },[id]);

  useEffect(()=>{
      
      const promise = axios.get(`${process.env.REACT_APP_URL_API}/user/${id}`,config)
    promise.then((re)=>{
      const userData = re.data
      console.log(userData)
      const nome = userData.userName[0].toUpperCase() + userData.userName.substring(1);
      setUserName(nome  )
    }).catch(()=>
    alert("não foi possível carregar o nome desse usuário"));
  },[id]);
  
    return(
        <>
        <GlobalStyle/>
        <TotalContainer >
            <NavBarr  closeDropDown={closeDropDown}/>
            <div onClick={(e)=>{closeDropDown(Status,Setstatus,e)}} >
              <TimelineTitle>
                {`${userName}'s Posts`}
              </TimelineTitle>
              <ContentMain>
              <PostContainer>
                {isLoad}
              </PostContainer>
              <Hastags/>
              </ContentMain>
            </div>
        </TotalContainer>
    </>
    );
}