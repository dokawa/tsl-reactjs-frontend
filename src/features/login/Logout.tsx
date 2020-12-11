import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { destroyToken } from './TokenStorage';
import { clearPosts } from '../posts/postsSlice';
import styles from './Logout.module.css';


export function Logout() {

    const dispatch = useDispatch();
    const history = useHistory()

    const gotoLoginPage = () => {
        destroyToken();
        dispatch(clearPosts());
        history.push('/login');
    }

    return (
        <div className={styles.button_container}>
            <div className={styles.logout_button} onClick={gotoLoginPage}>Logout</div>
        </div>
    );
}
