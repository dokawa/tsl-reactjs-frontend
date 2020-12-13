import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { destroyToken } from './TokenStorage';
import { clearPosts } from '../posts/postsSlice';
import { getToken } from './TokenStorage';
import styles from './Logout.module.css';


export const Logout: React.FC = () => {
    let isLogged = !(getToken() === '' || getToken() === null) 

    const dispatch = useDispatch();
    const history = useHistory()

    const gotoLoginPage = () => {
        destroyToken();
        dispatch(clearPosts());
        history.push('/login');
    }

    if (isLogged) {
        return (
            <div className={styles.button_container}>
                <div className={styles.logout_button} onClick={gotoLoginPage}>Logout</div>
            </div>
        );
    }
    else {
        return(<></>);
    }
}
