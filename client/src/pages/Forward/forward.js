import React, { useEffect, useState } from "react";
import axios from '../../services/axios';

import { useNavigate, useParams, Link } from 'react-router-dom';
import './forward.css';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const validationPost = yup.object().shape({
    receiver: yup.string().required("O campo 'destinatário' é obrigatório!")
})

function Forward() {

    const [senderValue, setSenderValue] = useState('');

    const handleChangeSenderValue = (event) => {
        setSenderValue(event.target.value);
    };

    const [subjectValue, setSubjectValue] = useState('');

    const handleChangeSubjectValue = (event) => {
        setSubjectValue(event.target.value);
    };

    const [bodyValue, setBodyValue] = useState('');

    const handleChangeBodyValue = (event) => {
        setBodyValue(event.target.value);
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
                setSenderValue(object["data"].receiver);
                setSubjectValue(object["data"].subject);
                setBodyValue(object["data"].body);
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

    // Chamada no submit do formulário "Encaminhar mensagem"
    function forwardMessage(data) {
        const config = {  
            headers: { 'Content-Type': 'application/json' }
        }

        // console.log(data);

        let obj = {}

        if(localStorage.getItem("username") == message.sender){ // Mensagem vinda da página 'sent' (Enviadas)
            obj = {
                sender: message.sender,
                receiver: data.receiver,
                subject: '[ENCAMINHADA] ' + subjectValue,
                body: bodyValue
            }
        } else { // Mensagem vinda da página 'messages' (Caixa de entrada)
            obj = {
                sender: senderValue, //Valor invertido (O 'receiver' virou 'sender')
                receiver: data.receiver,
                subject: '[ENCAMINHADA] ' + subjectValue,
                body: '[MENSAGEM ORIGINAL de : ' + message.sender + '] ' + bodyValue
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
            
            <main className="forward">

                <div className="card-forward">
                    <h1>Encaminhar mensagem:</h1>
                    <div className="line-forward"></div>

                    <div className="card-body-forward">
                        <form onSubmit={handleSubmit(forwardMessage)}>
                            <div className="fields-forward">
                                <label>De:</label>
                                <input type="text" name="sender-text" value={senderValue} onChange={handleChangeSenderValue} disabled/>
                            </div>

                            <div className="fields-forward">
                                <label>Para:</label>
                                <input type="text" name="receiver" {...register("receiver")}/>
                                <p className="error-message">{errors.receiver?.message}</p>
                            </div>

                            <div className="fields-forward">
                                <label>Assunto:</label>
                                <input type="text" name="subject-text" value={subjectValue} onChange={handleChangeSubjectValue} disabled/>
                            </div>

                            <div className="fields-forward">
                                <label>Corpo:</label>
                                <textarea type="text" name="body-text" value={bodyValue} onChange={handleChangeBodyValue} disabled></textarea>
                            </div>
                            
                            <div className="btns-forward">
                                <div className="btn-discard">
                                    <button onClick={() => navigate(-1)}>Descartar</button>
                                </div>

                                <div className="btn-forward">
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

export default Forward;