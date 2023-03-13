import React, { useEffect, useState } from 'react'
import axios from '../../services/axios';

import { useParams, Link, useNavigate } from 'react-router-dom';
import './message.css';

function Message() {

    let navigate = useNavigate()

    const [ message, setMessage ] = useState({})

    const { id } = useParams();

    useEffect(() => {
        axios.get(`/messages/list/${id}`)
        .then((response) => {
            // console.log(response.data);

            const objectToString = JSON.stringify(response.data);
            const object = JSON.parse(objectToString);
            
            if(object.hasOwnProperty("data")) {
                setMessage(response.data["data"]);
            } else {
                alert(response.data['error']);
                console.log(response.data['error']);
                navigate(-1);
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
                navigate(-1);
            } else {
                alert(response.data['error']);
                //console.log(response.data['error']);
                navigate(0);
            }
        })
        .catch(error => console.log(error));
    }

    // Chamada ao clickar no botão de visualizar a mensagem que foi respondida
    function viewMessage(messageID) {
        navigate(`/message/${messageID}`);
        navigate(0);
    }
    
    return(
        
        <div>
            
            <main className="message">

                <div className="cards-message-unique">
                    <h1>Detalhes da mensagem:</h1>
                    <div className="line-message-unique"></div>

                    <div className="card-message-unique" >

                        <header>
                            <h2>{message.subject}</h2>

                            <div className="btns-message-unique">
                                <div className="btn-reply-message">
                                    <Link to={{ pathname: `/reply-message/${message.id}`}}>
                                        <button>Responder</button>
                                    </Link>
                                </div>

                                <div className="btn-forward-message">
                                    <Link to={{ pathname: `/forward-message/${message.id}`}}>
                                        <button>Encaminhar</button>
                                    </Link>
                                </div>

                                <div className="btn-delete">
                                    <button onClick={() => deleteMessage(message.id)}>Excluir</button>
                                </div>
                            </div>
                        </header>

                        <div className="line-message-unique"></div>

                        <h4>From: {message.sender}</h4>
                        <h4>to: {message.receiver}</h4>

                        <div className="line-message-unique"></div>

                        {message.reply != null &&
                            <div className="message-reply"> 
                                <p onClick={() => viewMessage(message.reply)}>[ Resposta da mesagem de ID: {message.reply} (Click para visualizá-la) ]</p>
                            </div>
                        }

                        <p>{message.body}</p>

                    </div>
                </div>

            </main>

        </div>
    )
}

export default Message