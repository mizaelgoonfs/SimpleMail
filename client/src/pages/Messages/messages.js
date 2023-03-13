import React, { useState, useEffect } from "react";
import axios from '../../services/axios';

import { Link, useNavigate } from "react-router-dom";
import './messages.css';

function Messages() {

    let navigate = useNavigate()

    const [ errorMessage, setErrorMessage ] = useState('');

    const [ messages, setMessages ] = useState([]);

    const usernameParam = localStorage.getItem("username")
    
    // executada após a renderização do componente
    useEffect(() => {
        axios.get(`/received-messages/list/${usernameParam}`)
        .then((response) => {
            // console.log(response.data);

            const objectToString = JSON.stringify(response.data);
            const object = JSON.parse(objectToString);
            
            if(object.hasOwnProperty("data")) {
                setMessages(response.data["data"].reverse());
            } else {
                setErrorMessage(response.data['error']);
                // console.log(response.data['error']);
            }
        })
        .catch(error => console.log(error));
    }, [])

    // Chamada ao clickar no botão de excluir mensagem
    function deleteMessage(messageID) {
        axios.delete(`/messages/delete/${messageID}`)
        .then((response) => {
            // console.log(response.data);

            const objectToString = JSON.stringify(response.data);
            const object = JSON.parse(objectToString);
            
            if(object.hasOwnProperty("data")) {
                alert(response.data['data']);
                navigate(0);
            } else {
                alert(response.data['error']);
                //console.log(response.data['error']);
                navigate(0);
            }
        })
        .catch(error => console.log(error));
    }

    return (
        <div>

            <main className="messages">

                <div className="cards-message-list">
                    <h1>Mensagens recebidas:</h1>
                    <div className="line-message-list"></div>

                    {errorMessage != '' &&
                        <div className="error-message">
                            <h2>{errorMessage}</h2>
                        </div>
                    }

                    {messages.map((message, key) => {
                         
                        return (
                            <div className="card-message-list" key={key}>
                                <header>
                                    <Link to={{ pathname: `/message/${message.id}`}}>
                                        <h2>{message.subject}</h2>
                                    </Link>

                                    <div className="btns-message-list">
                                        <div className="btn-forward-message">
                                            <Link to={{ pathname: `/forward-message/${message.id}`}}>
                                                <button>Encaminhar</button>
                                            </Link>
                                        </div>

                                        <div className="btn-readmore">
                                            <Link to={{ pathname: `/message/${message.id}`}}>
                                                <button>Ler mais</button>
                                            </Link>
                                        </div>

                                        <div className="btn-delete">
                                            <button onClick={() => deleteMessage(message.id)}>Excluir</button>
                                        </div>
                                    </div>
                                </header>

                                <div className="line-message-list"></div>

                                <h4>From: {message.sender}</h4>

                                <div className="line-message-list"></div>

                                <p>{message.body.substring(0, 20)+"..."}</p>

                            </div>
                        ) //Fim do return
                         
                    })}

                </div>

            </main>

        </div>
    )
}

export default Messages;