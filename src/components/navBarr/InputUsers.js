import { useState, useEffect, useContext, useMemo } from "react";
import { DebounceInput } from "react-debounce-input";
import UserPreview from "./UserPreview";
import axios from "axios";
import UserContext from "../../contexts/UserContext";
import styled from "styled-components";

export default function InputUsers({ mobile }) {
    const [usersList, setUsersList] = useState([]);
    const [ showList, setShowList ] = useState(false);
    const { searchPeople, setSearchPeople } = useContext(UserContext);

    useEffect(() => {
      const promise = axios.get(
        `${process.env.REACT_APP_URL_API}/users`
      );

      promise.then((re) => {
        setUsersList(re.data);
      }).catch((e) =>
        console.log(e)
      );
    }, []);

    const userListFiltered = useMemo(() => {
      const lowerSearch = searchPeople.toLowerCase();

      return usersList.filter((people) =>
        people.userName.toLowerCase().includes(lowerSearch)
      );
    }, [usersList, searchPeople]);
    
    if(mobile){
        return(
            <UsersBox onClick={() => setShowList(!showList)}>
              <DebounceInput element={ SearchMobile }
                type="text"
                placeholder="Search for people..."
                minLength={3}
                debounceTimeout={300}
                value={searchPeople}
                onChange={(e) => setSearchPeople(e.target.value)}
              />
              {showList ?
                <UserListMobile>
                  {userListFiltered.map((user, index) => (
                    <UserPreview
                      key={index}
                      userId={user.id}
                      userName={user.userName}
                      userImage={user.image}
                    />
                  ))}
                </UserListMobile>
              :
                <></>
              }
            </UsersBox>
        );
    } else {
        return(
            <UsersBox onClick={() => setShowList(!showList)}>
              <DebounceInput element={ Search }
                type="text"
                placeholder="Search for people..."
                minLength={3}
                debounceTimeout={300}
                value={searchPeople}
                onChange={(e) => setSearchPeople(e.target.value)}
              />
              {showList ?
                <UserList>
                  {userListFiltered.map((user, index) => (
                    <UserPreview
                      key={index}
                      userId={user.id}
                      userName={user.userName}
                      userImage={user.image}
                    />
                  ))}
                </UserList>
              :
                <></>
              }
            </UsersBox>
        );
    }
}

const UsersBox = styled.div`
  width: 50%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  z-index: 1;
  @media (max-width: 621px) {
    width: 74%;
    
  }
`

const UserListMobile = styled.div`
  width: 100%;
  height: auto;
  padding: 14px 16px;
  margin-top: -8px;
  border: none;
  border-radius: 0px 0px 8px 8px;
  background-color: #E7E7E7;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  top: 62px;
  left: 0px;
  > ul {
    width: 100%;
    height: 40px;
  }
  @media (min-width: 621px) {
    display: none;
  }
`

const SearchMobile = styled.input`
  width: 100%;
  height: 45px;
  padding: 0.5rem;
  border: 1px solid #c6c6c6;
  border-radius: 8px;
  margin-top: 1rem;
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 1;
  ::placeholder {
    color: #c6c6c6;
  }

  @media (min-width: 621px) {
    display: none;
  }
`;

const UserList = styled.div`
  width: 100%;
  height: auto;
  padding: 14px 16px;
  margin-top: -8px;
  border: none;
  border-radius: 0px 0px 8px 8px;
  background-color: #E7E7E7;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  top: 45px;
  left: 0px;
  > ul {
    width: 100%;
    height: 40px;
  }
  @media (min-width: 0) and (max-width: 620px) {
    display: none;
  }
`

const Search = styled.input`
  width: 100%;
  height: 45px;
  padding: 0.5rem;
  border: 1px solid #c6c6c6;
  border-radius: 8px;
  position: relative !important;
  z-index: 1;
  ::placeholder {
    color: #c6c6c6;
  }

  @media (min-width: 0) and (max-width: 620px) {
    display: none;
  }
`;