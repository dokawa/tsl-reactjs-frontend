import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { destroyToken } from './TokenStorage';
import { clearPosts } from '../posts/postsSlice';
import './Logout.css';


export function Logout() {

    const dispatch = useDispatch();
    const history = useHistory()

    const gotoLoginPage = () => {
        destroyToken();
        dispatch(clearPosts());
        history.push('/login');
    }

    return (
        <div className="button-container">
            <div className="logout-button" onClick={gotoLoginPage}>Logout</div>
        </div>
    );
}
