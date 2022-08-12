import axios from "axios";
import { useContext, useState } from "react";
import {
  Container,
  PostContainer,
  Block,
} from "../../assets/css/style/postFormStyle.js";
import UserContext from "../../contexts/UserContext.js";
export default function Post() {
  const [link, setLink] = useState("");
  const [content, setContent] = useState("");
  const [promiseFinished, setPromiseFinished] = useState(false);
  const [tags,setTags] = useState([])

  function setHashtagsAndContent (e){
    const contentPhrase = e.target.value
    const hashtags = contentPhrase.replaceAll("\n"," ")
                                  .split(" ")
                                  .map((word) => {
                                    if (word.startsWith("#") && word.length>1) {
                                      return word.slice(1,word.length);
                                    }
                                  }).filter((tag)=> {if(tag && !tag.includes("#")){return tag}});
    // se tiver tempo transaforma essa logica em regex
    const tags = hashtags.filter((tag,i)=> {if(hashtags.indexOf(tag)===i){return tag}})
    console.log(contentPhrase)
    console.log(tags)
    setTags(tags)
    setContent(contentPhrase)
  }

  const { setPostLoader } = useContext(UserContext);


  function submit(e) {
    e.preventDefault();

    if (link.length === 0) {
      alert("O link é obrigatório!");
      return;
    }
    const body = {
      url: link,
      content,
      tags
    };
    
    const token = JSON.parse(localStorage.getItem("@tokenJWT"));
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    setPromiseFinished(true);
    const promise = axios.post("http://localhost:5000/posts", body, config);
    promise
      .then((res) => {
        setPromiseFinished(false);
        setPostLoader(true);
        setLink("");
        setContent("");
      })
      .catch((err) => {
        setPromiseFinished(false);
        alert(
          "Houve um erro ao publicar seu link! Talvez seu link seja inválido :("
        );
      });
  }

  return (
    <Container>
      <PostContainer>
        <div>
          <img
            src="https://images.unsplash.com/photo-1618614944895-fc409a83ad80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
            alt="Profile"
          />
          <p>{`What are you going to share today?`}</p>
        </div>
        <form onSubmit={(e) => submit(e)}>
          <input
            type="url"
            id="url"
            placeholder="https://"
            value={link}
            required
            onChange={(e) => setLink(e.target.value)}
          />
          <textarea
            type="text"
            id="content"
            placeholder="Awesome article about #javascript"
            value={content}
            onChange={(e) => setHashtagsAndContent (e)}
          />
          {promiseFinished ? (
            <button>Publishing</button>
          ) : (
            <button onClick={(e) => submit(e)}>Publish</button>
          )}
        </form>
      </PostContainer>
      {promiseFinished ? <Block /> : null}
    </Container>
  );
}
