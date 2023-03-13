import React, { useEffect, useState } from "react";
import axios from '../../services/axios';

import { useNavigate, useParams, Link } from 'react-router-dom';
import './reply.css';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const validationPost = yup.object().shape({
    subject: yup.string().required("O campo 'assunto' é obrigatório!").max(50, "O campo 'assunto' pode ter no máximo 50 caracteres."),
    body: yup.string().required("O corpo da mensagem não pode ser vazio!").max(500, "O corpo da mensagem pode ter no máximo 500 caracteres.")
})

function Reply() {

    const [senderValue, setSenderValue] = useState('');

    const handleChangeSenderValue = (event) => {
        setSenderValue(event.target.value);
    };

    const [receiverValue, setReceiverValue] = useState('');

    const handleChangeReceiverValue = (event) => {
        setReceiverValue(event.target.value);
    };


    const [ message, setMessage ] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        axios.get(`/messages/list/${id}`)
        .then((response) => {
            // console.log(response.data);

            const objectToString = JSON.stringify(response.data);
            const object = JSON.parse(objectToString);
            
            if(object.hasOwnProperty("data")) {
                setMessage(object["data"]);

                if(localStorage.getItem("username") == object["data"].sender){ // Mensagem enviada pelo usuário logado (Sent)
                    setSenderValue(object["data"].sender);
                    setReceiverValue(object["data"].receiver);
                } else { // Mensagem recebida pelo usuário logado (Caixa de entrada)
                    setSenderValue(object["data"].receiver);
                    setReceiverValue(object["data"].sender);
                }
            } else {
                console.log(response.data['error']);
            }
        })
        .catch(error => console.log(error));

    }, [])
    

    //-----------------------------//----------------------------

    let navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationPost)
    });

    // Chamada no submit do formulário "Responder mensagem"
    function replyMessage(data) {
        const config = {  
            headers: { 'Content-Type': 'application/json' }
        }

        // console.log(data);

        let obj = {}

        if(localStorage.getItem("username") == message.sender){ // Mensagem vinda da página 'sent' (Enviadas)
            obj = {
                sender: message.sender, //Valor invertido (O 'receiver' virou 'sender')
                receiver: message.receiver, //Valor invertido (O 'sender' virou 'receiver')
                subject: '[RESPOSTA] ' + data.subject,
                body: data.body,
                reply: message.id
            }
        } else { // Mensagem vinda da página 'messages' (Caixa de entrada)
            obj = {
                sender: senderValue, //Valor invertido (O 'receiver' virou 'sender')
                receiver: receiverValue, //Valor invertido (O 'sender' virou 'receiver')
                subject: '[RESPOSTA] ' + data.subject,
                body: data.body,
                reply: message.id
            }
        }

        const dataJSON = JSON.stringify(obj);

        // console.log(dataJSON);

        axios.post("/messages/send", dataJSON, config)
        .then(function (response) {
            // console.log(response.data);

            const objectToString = JSON.stringify(response.data);
            const object = JSON.parse(objectToString);
            
            if(object.hasOwnProperty("data")) {
                alert(response.data['data']);
                navigate('/sent');
            } else {
                alert(response.data['error']);
                // console.log(response.data['error']);
                navigate(0);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    return (
        <div>
            
            <main className="reply">

                <div className="card-reply">
                    <h1>Responder mensagem:</h1>
                    <div className="line-reply"></div>

                    <div className="card-body-reply">
                        <form onSubmit={handleSubmit(replyMessage)}>
                            <div className="fields-reply">
                                <label>De:</label>
                                <input type="text" name="sender-text" value={senderValue} onChange={handleChangeSenderValue} disabled/>
                            </div>

                            <div className="fields-reply">
                                <label>Para:</label>
                                <input type="text" name="receiver-text" value={receiverValue} onChange={handleChangeReceiverValue} disabled/>
                            </div>

                            <div className="fields-reply">
                                <label>Assunto:</label>
                                <input type="text" name="subject" placeholder="[RESPOSTA]" {...register("subject")}/>
                                <p className="error-message">{errors.subject?.message}</p>
                            </div>

                            <div className="fields-reply">
                                <label>Corpo:</label>
                                <textarea type="text" name="body" {...register("body")}></textarea>
                                <p className="error-message">{errors.body?.message}</p>
                            </div>
                            
                            <div className="btns-reply">
                                <div className="btn-discard">
                                    <button onClick={() => navigate(-1)}>Descartar</button>
                                </div>

                                <div className="btn-reply">
                                    <button type="submit">Enviar</button>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>

            </main>

        </div>
    )
}

export default Reply;