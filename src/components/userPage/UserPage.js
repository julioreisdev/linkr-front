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

let counter = 0;
let hasMore = true;

export default function UserPage() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [userName, setUserName] = useState("")
    const [postList, setPostList] = useState([]);
    const [loadingNewPosts, setLoadingNewPosts] = useState(false);
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
    
      function handleScroll(e) {
        const scrollTop = e.target.documentElement.scrollTop;
        const scrollHeight = e.target.documentElement.scrollHeight;
        const innerHeight = window.innerHeight;
    
        if(scrollTop + innerHeight + 1 >= scrollHeight) {
          counter += 5;
          if(counter%10 === 0 && hasMore) {
            setLoadingNewPosts(true);
            
            const promise = axios.get(
              `${process.env.REACT_APP_URL_API}/user/posts/${id}/${counter}`,
              config
            );
    
            promise.then((re) => {
              setLoadingNewPosts(false);
              if(re.data.length <= 0) return hasMore = false;
              setPostList( oldList => [...oldList, ...re.data]);
            })
          }
        }
      }

  useEffect(()=>{
    window.addEventListener("scroll", (e) => handleScroll(e));
    const promise = axios.get(`${process.env.REACT_APP_URL_API}/user/posts/${id}/0`,config)
    promise.then((re)=>{
      setPostList([...re.data]);
      setLoading(false);
    }).catch(()=>
      alert("não foi possível carregar os posts dessa hashtag"));
  },[id]);

  useEffect(()=>{ 
    const promise = axios.get(`${process.env.REACT_APP_URL_API}/user/${id}`,config)
    promise.then((re)=>{
      const userData = re.data
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
                {loadingNewPosts ? <Loaderspinner /> : <></>}
              </PostContainer>
              <Hastags/>
              </ContentMain>
            </div>
        </TotalContainer>
    </>
    );
}