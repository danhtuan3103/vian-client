import { useEffect, useState } from 'react';

const useAutoCloseToast = ({ notifications, setNotifications, autoClose, autoCloseTime }) => {
    const [removing, setRemoving] = useState('');

    useEffect(() => {
        if (removing) {
            setNotifications((t) => t.filter((_t) => _t.id !== removing));
        }
    }, [removing, setNotifications]);

    useEffect(() => {
        if (autoClose && notifications.length) {
            const id = notifications[notifications.length - 1].id;
            setTimeout(() => setRemoving(id), autoCloseTime);
        }
    }, [notifications, autoClose, autoCloseTime]);
};

export default useAutoCloseToast;
