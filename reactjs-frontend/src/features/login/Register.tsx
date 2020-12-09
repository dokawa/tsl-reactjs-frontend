import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from "axios";
import './Register.css';
import styles from './Login.module.css';

export function Register() {

    const history = useHistory()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')


    const registerRequest = () => {
        axios.post("http://localhost:8000/register/", params)
        .then((res) => {
            let data = res.data;
            history.push('/login');
            console.log(data);
        })
        .catch((err) => { })
    }

    let params = {
        username: username,
        email: email,
        password: password,
        first_name: firstName,
        last_name: lastName
    }

    return (
        <div>
            <div className={styles.row}>

                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="username"
                    onChange={e => setUsername(e.target.value)}
                />

                <div className="names">
                    <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        placeholder="first name"
                        onChange={e => setFirstName(e.target.value)}
                    />


                    <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        placeholder="last name"
                        onChange={e => setLastName(e.target.value)}
                    />
                </div>

                <input
                    type="text"
                    id="e_mail"
                    name="e_mail"
                    placeholder="e-mail"
                    onChange={e => setEmail(e.target.value)}
                />

                <input
                    type="text"
                    id="password"
                    name="password"
                    placeholder="password"
                    onChange={e => setPassword(e.target.value)}
                />

                <button type="button" onClick={registerRequest}>Sign up</button>

            </div>

        </div>
    );
}
