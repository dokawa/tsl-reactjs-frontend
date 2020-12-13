import styles from './SidePanel.module.css';

export const SidePanel: React.FC = () => {

    return (
        <div className={styles.panel_container}>
           <div className={styles.panel}>
               <div className={styles.panel_app_name}>Wall App</div>
           </div>
        </div>
    );
}