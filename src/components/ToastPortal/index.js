import classNames from 'classnames/bind';
import styles from './ToastPortal.module.scss';
import { useContext } from 'react';
import { contextUser } from '../../App';
import useAutoCloseToast from '../../hook/useAutoCloseToast';
import Toast from '../Toast';

const cx = classNames.bind(styles);
function ToastPortal({ position, autoClose = false }) {
    const { notifications, setNotifications } = useContext(contextUser);
    const autoCloseTime = 3000;
    useAutoCloseToast({
        notifications,
        setNotifications,
        autoClose,
        autoCloseTime,
    });

    const handleDelete = (id) => {
        const newLists = notifications.filter((notification) => {
            return notification.id !== id;
        });
        setNotifications(newLists);
    };
    return (
        <div className={cx([styles.toastPortal, position])}>
            {notifications.map((notifications, index) => {
                return (
                    <Toast
                        key={index}
                        id={notifications.id}
                        type={notifications?.type}
                        title={notifications?.title}
                        description={notifications?.description}
                        handleDelete={handleDelete}
                        autoClose={autoClose}
                    />
                );
            })}
        </div>
    );
}

export default ToastPortal;
