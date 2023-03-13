import React from "react";
import axios from '../../services/axios';

import { useNavigate } from 'react-router-dom';
import './login.css';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const validationPost = yup.object().shape({
    username: yup.string().required("O campo 'username' é obrigatório!").max(50, "O campo 'username' pode ter no máximo 50 caracteres.")
})

function Login() {

    let navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationPost)
    });

    function login(data) {
        const config = {  
            headers: { 'Content-Type': 'application/json' }
        }

        const dataJSON = JSON.stringify(data);

        // console.log(dataJSON);

        axios.post("/users/login", dataJSON, config)
        .then(function (response) {
            // console.log(response.data);

            const objectToString = JSON.stringify(response.data);
            const object = JSON.parse(objectToString);

            if(object.hasOwnProperty("data")) {
                if(object["data"].username == data.username) {
                    localStorage.setItem("username", data.username);
                    navigate('/messages');
                }
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

    function registerUser(data) {
        const config = {  
            headers: { 'Content-Type': 'application/json' }
        }

        const dataJSON = JSON.stringify(data);

        // console.log(dataJSON);

        axios.post("/users/register", dataJSON, config)
        .then(function (response) {
            // console.log(response.data);

            const objectToString = JSON.stringify(response.data);
            const object = JSON.parse(objectToString);
            
            if(object.hasOwnProperty("data")) {
                localStorage.setItem("username", data.username);
                alert(response.data['data']);
                navigate('/messages');
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

            <div className="main-login">
                
                <div className="card-login">
                    <h1>Faça login ou crie uma conta:</h1>
                    <div className="line-login"></div>

                    <div className="card-body-login">
                        <form>
                            <div className="fields-login">
                                <label>Usuário:</label>
                                <input type="text" name="username" {...register("username")}/>
                                <p className="error-message">{errors.username?.message}</p>
                            </div>

                            <div className="btn-login">
                                <button onClick={handleSubmit(login)}>Login</button>
                            </div>

                            <div className="btn-register">
                                <button onClick={handleSubmit(registerUser)}>Cadastrar</button>
                            </div>
                        </form>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default Login;