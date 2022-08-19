import { useState, useContext } from "react";
import axios from "axios";
import Modal from "react-modal";
import { Loaderspinner } from "../Loaderspinner";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext";

export default function PostModal() {
    const {
        userdata,
        postData,
        modalIsOpen,
        setModalIsOpen,
        setPostLoader
    } = useContext(UserContext);
    const [ loading, setLoading ] = useState(false);

    const customStyles = {
        content: {
            height: '222px',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            borderRadius: '50px',
            backgroundColor: '#333333',
            transform: 'translate(-50%, -50%)',
        },
    };
    
    Modal.setAppElement(document.getElementById('root'));

    function toAcceptModal() {
        setLoading(true);

        const config = {
            headers: {
              Authorization: `Bearer ${userdata.token}`,
            },
          };

        const promise = axios.delete(
            `${process.env.REACT_APP_URL_API}/posts/${postData}`,
            config
        );
        
        promise.then(() => {
            setLoading(false);
            setModalIsOpen(false);
            setPostLoader(true);
        }).catch(() => {
            setLoading(false);
            setModalIsOpen(false);
            alert("could not delete");
        });
    }

    return(
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <ModalContent>
                <p>
                    Are you sure you want to delete this post?
                </p>
                { loading ?
                    <Loaderspinner />
                :
                    <div className="buttons">
                        <button 
                            className="cancel"
                            onClick={() => setModalIsOpen(false)}
                        >
                            No, go back
                        </button>
                        <button 
                            className="accept"
                            onClick={toAcceptModal}
                        >
                            Yes, delete it
                        </button>
                    </div>
                }
            </ModalContent>
        </Modal>
    );
}

const ModalContent = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    > p {
        max-width: 340px;
        min-height: 84px;
        text-align: center;
        font-family: 'Lato', sans-serif;
        font-weight: 700;
        font-size: 34px;
        color: #FFFFFF;
        margin-bottom: 20px;
    }
    .buttons {
        width: 296px;
        height: 28px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .buttons > button {
        width: 134px;
        height: 37px;
        border: none;
        border-radius: 5px;
        font-family: 'lato', sans-serif;
        font-weight: 700;
        font-size: 18px;
    }
    .cancel {
        background-color: #FFFFFF;
        color: #1877F2;
    }
    .accept {
        background-color: #1877F2;
        color: #FFFFFF;
    }
`