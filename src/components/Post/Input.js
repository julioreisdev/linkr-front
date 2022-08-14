import {
    useState, useEffect, useContext, useRef
} from "react";
import axios from "axios";
import UserContext from "../../contexts/UserContext";
import styled from "styled-components";
import { Loaderspinner } from "../Loaderspinner";

export default function Input({ content, setIsEdit}) {
    const [value, setValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [tags,setTags] = useState([]);
    const { userdata, setPostLoader, postData } = useContext(UserContext);
    const inputRef = useRef();

    useEffect(() => {
        setValue(content);
        inputRef.current.focus();
    }, []);

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
        setTags(tags)
        setValue(contentPhrase)
      }

    function sendEdit(e) {
        e.preventDefault();
        setLoading(true);

        const body = {
            postId: postData,
            content: value,
            tags
        }
        const config = {
            headers: {
              Authorization: `Bearer ${userdata.token}`,
            },
        }
        const promise = axios.put(
            `${process.env.REACT_APP_URL_API}/posts`,
            body,
            config
        )

        promise.then(() => {
            setPostLoader(true);
            setIsEdit(false);
        }).catch(() => {
            alert("could not edit post");
            setIsEdit(false);
        });
    }

    function showKey(e) {
        if(e.key === 'Escape'){
            setIsEdit(false);
        }
    }

    return(
        <FormStyle onSubmit={sendEdit}>
            {loading ?
                <Loaderspinner />
                :
                <InputStyle
                    ref={inputRef}
                    type="text"
                    value={value}
                    onChange={(e) => setHashtagsAndContent(e)}
                    onKeyDown={(e) => showKey(e)}
                />
            }
        </FormStyle>
    );
}

const FormStyle = styled.form`
    width: 100%;
    height: 44px;
    margin: 10px 0px 10px 0px;
    @media (max-width: 620px) {
        width: 86%;
        height: 40px;
        margin: 10px -30px 10px 8px;
    }
`

const InputStyle = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 7px;
  background-color: #FFFF;
  font-family: 'Lato', sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #4C4C4C;
`