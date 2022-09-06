import { style } from '@mui/system';
import styles from './Modal.module.css';
import Button from '../Button';
import { RiCloseLine } from 'react-icons/ri';
function Modal({ setIsOpen, title = '', dialogText = '', rightBtn, leftBtn }) {
    return (
        <>
            <div className={styles.darkBG}>
                <div className={styles.container}>
                    <div className={styles.modal}>
                        <div className={styles.modalHeader}>
                            <h5 className={styles.heading}>{title}</h5>
                        </div>
                        <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
                            <RiCloseLine style={{ marginBottom: '-3px' }} />
                        </button>
                        <div className={styles.modalContent}>{dialogText}</div>
                        <div className={styles.modalActions}>
                            <div className={styles.actionsContainer}>
                                {leftBtn}
                                {rightBtn}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Modal;
