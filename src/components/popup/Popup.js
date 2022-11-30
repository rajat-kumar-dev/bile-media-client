import styles from './style.module.css';

const Popup = ({ children }) => {
  return (
    <>
      <div className={styles.modalContainer}>
        <div className={styles.modal}>{children}</div>
      </div>
    </>
  );
};
export default Popup;
