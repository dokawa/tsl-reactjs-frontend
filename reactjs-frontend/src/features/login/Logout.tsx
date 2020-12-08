import React from 'react';
import { useHistory } from 'react-router-dom';
import { destroyToken } from './TokenStorage';
import './Logout.css';


export function Logout() {

    const history = useHistory()

    const gotoLoginPage = () => {
        destroyToken()
        history.push('/login');
    }

    return (
        <div className="button-container">
            <div className="logout-button" onClick={gotoLoginPage}>Logout</div>
        </div>
    );
}
