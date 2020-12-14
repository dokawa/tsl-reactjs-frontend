import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from "axios";
import styles from './Register.module.css';
import form_styles from './Form.module.css';
import { parseErrorMessage, renderErrorMessage } from './parseErrorMessage'

export const Register: React.FC = () => {

    const history = useHistory()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [errorMessage, setErrorMessage] = useState([''])


    const registerRequest = () => {
        axios.post(process.env.REACT_APP_BACKEND_HOST + "/register/", params)
            .then((res) => {
                history.push('/login');
            })
            .catch((error) => {
                if (error.response === undefined) {
                    setErrorMessage(['Request failed: check your internet connection and try again'])
                }
                else if (error.response.status === 420) {
                    setErrorMessage(['Could not send welcome mail but you can login. Redirecting to login page...'])
                    setTimeout(() => {  history.push('/login');; }, 4000);
                }
                else if (error.response.status === 500) {
                    setErrorMessage(['Internal server error'])
                }
                else if (error.response.status !== 500) {
                    setErrorMessage(parseErrorMessage(error.response.data))
                }
            })
    }

    let params = {
        username: username,
        email: email,
        password: password,
        first_name: firstName,
        last_name: lastName
    }

    return (
        <div className={styles.register_container}>
            <div className={styles.row}>

                <input
                    className={styles.username_input}
                    type="text"
                    id="username"
                    name="username"
                    placeholder="username"
                    onChange={e => setUsername(e.target.value)}
                />

                <div className={styles.names}>
                    <input
                        className={styles.first_name}
                        type="text"
                        name="first_name"
                        placeholder="first name"
                        onChange={e => setFirstName(e.target.value)}
                    />


                    <input
                        className={styles.second_name}
                        type="text"
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

                <button className={form_styles.button} onClick={registerRequest}>Sign up</button>
                <div className={form_styles.error_text}>{renderErrorMessage(errorMessage)}</div>

            </div>

        </div>
    );
}
