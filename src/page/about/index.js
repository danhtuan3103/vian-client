import React, { useState } from 'react';
import uniqid from 'uniqid';
import Modal from '../../components/Modal';
import styles from './About.module.css';
import Button from '../../components/Button';
import classNames from 'classnames/bind';
import { useContext } from 'react';
import { contextUser } from '../../App';
const cx = classNames.bind(styles);
function About() {
    console.log('re-render');
    const { notifications, setNotifications } = useContext(contextUser);
    console.log(notifications);

    const handleClick = (toastList) => {
        const newLists = [...notifications, toastList];
        setNotifications(newLists);
    };
    return (
        <div style={{}}>
            <Button
                primary
                onClick={() =>
                    handleClick({
                        id: uniqid(),
                        description: 'Hello anh em , you are',
                        type: 'info',
                        position: 'top-right',
                    })
                }
            >
                Open Info
            </Button>
            <Button
                primary
                onClick={() =>
                    handleClick({
                        id: uniqid(),
                        description: 'Hello anh em , you are',
                        type: 'warning',
                        position: 'top-right',
                    })
                }
            >
                Open Info
            </Button>
            <Button
                primary
                onClick={() =>
                    handleClick({
                        id: uniqid(),
                        description: 'Hello anh em , you are',
                        type: 'danger',
                        position: 'top-right',
                    })
                }
            >
                Open Info
            </Button>

            <Button
                primary
                onClick={() =>
                    handleClick({
                        id: uniqid(),
                        description: 'Hello anh em , you are',
                        type: 'success',
                        position: 'top-right',
                    })
                }
            >
                Open Info
            </Button>
        </div>
    );
}

export default About;
