import styled from "styled-components";

export default function UserPreview({userName, userImage}) {
    return(
        <UserLayout>
            <img alt={userName} src={userImage} />
            <p>{userName}</p>
        </UserLayout>
    );
}

const UserLayout = styled.div`
    width: 100%;
    height: 40px;
    margin-top: 14px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    > img {
        width: 39px;
        height: 39px;
        border-radius: 80px;
        object-fit: cover;
    }
    > p {
        width: auto;
        height: 100%;
        margin-left: 12px;
        margin-top: 16px;
        text-align: left;
        font-family: 'Lato', sans-serif;
        font-weight: 400;
        font-size: 19px;
        color: #515151;
    }
`