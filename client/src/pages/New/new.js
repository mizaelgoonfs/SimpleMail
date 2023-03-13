import React from "react";
import axios from '../../services/axios';

import { useNavigate } from 'react-router-dom';
import './new.css';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const validationPost = yup.object().shape({
    sender: yup.string(),
    receiver: yup.string().required("O campo 'destinatário' é obrigatório!"),
    subject: yup.string().required("O campo 'assunto' é obrigatório!").max(50, "O campo 'assunto' pode ter no máximo 50 caracteres."),
    body: yup.string().required("O corpo da mensagem não pode ser vazio!").max(500, "O corpo da mensagem pode ter no máximo 500 caracteres.")
})

function New() {

    let navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationPost)
    });

    function newMessage(data) {
        const config = {  
            headers: { 'Content-Type': 'application/json' }
        }

        // console.log(data);

        let obj = {
            sender: data.sender,
            receiver: data.receiver,
            subject: data.subject,
            body: data.body 
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
            
            <main className="new">

                <div className="card-new">
                    <h1>Nova mensagem:</h1>
                    <div className="line-new"></div>

                    <div className="card-body-new">
                        <form onSubmit={handleSubmit(newMessage)}>
                            <div className="fields-new">
                                <label>De:</label>
                                <input type="text" name="sender-text" value={localStorage.getItem("username")} disabled />
                                <input type="hidden" name="sender" value={localStorage.getItem("username")} {...register("sender")}/>
                            </div>

                            <div className="fields-new">
                                <label>Para:</label>
                                <input type="text" name="receiver" {...register("receiver")}/>
                                <p className="error-message">{errors.receiver?.message}</p>
                            </div>

                            <div className="fields-new">
                                <label>Assunto:</label>
                                <input type="text" name="subject" {...register("subject")}/>
                                <p className="error-message">{errors.subject?.message}</p>
                            </div>

                            <div className="fields-new">
                                <label>Corpo:</label>
                                <textarea type="text" name="body" {...register("body")}></textarea>
                                <p className="error-message">{errors.body?.message}</p>
                            </div>
                            
                            <div className="btns-new">
                                <div className="btn-discard">
                                    <button onClick={() => navigate(-1)}>Descartar</button>
                                </div>

                                <div className="btn-new">
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

export default New;