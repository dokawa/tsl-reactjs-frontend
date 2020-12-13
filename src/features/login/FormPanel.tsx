import { render } from '@testing-library/react';
// import { Login } from './Login';
import { SidePanel } from './SidePanel';
import styles from './LoginPanel.module.css';

export const FormPanel: React.FC = (props) => {
    return(
        <div className={styles.login_panel_container}>
            <SidePanel/>
            { props.children}
        </div>
    )
}