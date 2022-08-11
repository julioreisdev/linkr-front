import styled from "styled-components";

export default function PostPreview({
    userName,
    userImage,
    postContent,
    url,
    urlTitle,
    urlDescription,
    urlImage
}) {
    return(
        <PostBox>
            <LikeContainer>
                <img alt={userName} src={userImage}/>
            </LikeContainer>
            <LinkContainer>
                <h2>{userName}</h2>
                <p>
                    {postContent !== null ? postContent : ""}
                </p>
                <div className="linkpreview" >
                    <div className="linkdescription">
                        <h3>{urlTitle}</h3>
                        <p>{urlDescription}</p>
                        <p className="url">{url}</p>
                    </div>
                    <img
                        alt={urlTitle}
                        src={urlImage}
                    />
                </div>
            </LinkContainer>
        </PostBox>
    );
}

const PostBox = styled.div`
    width: 611px;
    height: 276px;
    margin-bottom: 16px;
    padding: 20px;
    box-sizing: border-box;
    border: none;
    border-radius: 16px;
    background-color: #171717;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-evenly;
    font-family: 'Lato', sans-serif;
    @media(max-width: 620px) {
        width: 100%;
        border-radius: 0px;
        padding-left: 0px;
        padding-right: 0px;
    }
`

const LikeContainer = styled.div`
    width: auto;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    img {
        width: 50px;
        height: 50px;
        border-radius: 26.5px;
        margin-bottom: 17px;
    }
`

const LinkContainer = styled.div`
    width: auto;
    height: 100%;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    h2 {
        width: 500px;
        height: 23px;
        padding: 7px;
        font-weight: 400;
        font-size: 19px;
        text-align: left;
        color: #FFFFFF;
    }
    p {
        width: 500px;
        max-height: 52px;
        padding: 7px;
        font-weight: 400;
        font-size: 17px;
        text-align: justify;
        color: #B7B7B7;
    }

    .linkpreview {
        width: 503px;
        height: 155px;
        border: 1px solid #4d4d4d;
        border-radius: 5px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

    .linkdescription {
        width: 100%;
        height: 100%;
        padding: 22px 25px 22px 18px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
    }

    .linkdescription > h3 {
        width: 249px;
        height: 38px;
        text-align: justify;
        font-weight: 400;
        font-size: 16px;
        color: #CECECE;
        margin-bottom: 10px;
    }

    .linkdescription > p {
        width: 300px;
        height: 39px;
        padding: 0px;
        text-align: left;
        margin: 10px 0px 13px 0px;
        font-weight: 400;
        font-size: 11px;
        color: #9b9595;
    }

    .linkdescription > .url {
        margin-top: 0px;
        margin-bottom: 0px;
        color: #CECECE;
    }

    .linkpreview > img {
        width: 153px;
        height: 100%;
        border-radius: 0px 5px 5px 0px;
        object-fit: cover;
    }

    @media(max-width: 620px) {
        width: 100%;
        .linkpreview {
            padding-right: 5px;
            box-sizing: border-box;
        }
        .linkdescription > h3{
            width: 100%; 
        }
        .linkdescription > p{
            width: 100%;
        }
    }
`