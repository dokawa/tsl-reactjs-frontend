import { SidePanel } from './SidePanel';
import styles from './FormPanel.module.css';

export const FormPanel: React.FC = (props) => {
    return (
        <div className={styles.form_panel_container}>
            <div className={styles.form_panel}>
                <SidePanel/>
                { props.children}
            </div>
        </div>
    )
}