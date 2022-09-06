import React, { useState } from 'react';
import Modal from '../../components/Modal';
import styles from './About.module.css';
import Button from '../../components/Button';
import Toast from '../../components/Toast';
function About() {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenToast, setIsOpenToast] = useState(false);

    return (
        <div style={{ height: '100vh' }}>
            <Button primary onClick={() => setIsOpenToast(!isOpenToast)}>
                Open
            </Button>
            {isOpen && (
                <Modal
                    setIsOpen={setIsOpen}
                    title="Title"
                    dialogText="Are you sure you want to delete the item?"
                    rightBtn={<Button secondary>Allow</Button>}
                    leftBtn={
                        <Button
                            primary
                            style={{
                                backgroundColor: 'red',
                            }}
                        >
                            Cancel
                        </Button>
                    }
                />
            )}

            {isOpenToast && (
                <Toast
                    description="Hello anh em , you are"
                    type="warning"
                    position="top-right"
                    setIsOpenToast={setIsOpenToast}
                />
            )}
        </div>
    );
}

export default About;
