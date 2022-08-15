import { useContext } from "react";
import UserContext from "../../contexts/UserContext";

export function ChooseConfig(){
  const {userdata} = useContext(UserContext)
  if(userdata.token) {
    const config = {
      headers: {
        Authorization: `Bearer ${userdata.token}`,
      },
    }
    return config
  } else {
    const token = localStorage.getItem("@tokenJWT").replaceAll('"', "")
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return config
  }
}