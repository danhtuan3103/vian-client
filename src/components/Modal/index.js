import styles from './Modal.module.css';
import { useRef, useEffect } from 'react';
import { RiCloseLine } from 'react-icons/ri';
function Modal({ setIsOpen, title = '', dialogText = '', rightBtn, leftBtn }) {
    const modalRef = useRef();
    if (modalRef.current) {
        modalRef.current.eventListener('keypress', (e) => {
            console.log(e);
        });
    }
    const myFunction = () => {
        // your logic here
        console.log(leftBtn.props.onClick());
    };

    useEffect(() => {
        const keyDownHandler = (event) => {
            console.log('User pressed: ', event.key);

            if (event.key === 'Enter') {
                // 👇️ your logic here
                myFunction();
            }
        };

        document.addEventListener('keydown', keyDownHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, []);

    return (
        <>
            <div className={styles.darkBG}>
                <div className={styles.container}>
                    <div className={styles.modal}>
                        <div className={styles.modalHeader}>
                            <h5 className={styles.heading}>{title}</h5>
                        </div>
                        <button className={styles.closeBtn}>
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
