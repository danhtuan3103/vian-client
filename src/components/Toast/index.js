import React from 'react';
import styles from './Toast.module.scss';
import classNames from 'classnames/bind';
import { RiCloseLine } from 'react-icons/ri';

import { BsFillCheckCircleFill, BsInfoCircleFill } from 'react-icons/bs';
import { TiWarning } from 'react-icons/ti';
import { MdDangerous } from 'react-icons/md';

import { useState } from 'react';

const cx = classNames.bind(styles);

const Toast = ({ position, type = 'info', setIsOpenToast, description = '', onClose }) => {
    const chooseIcon = (type) => {
        switch (type) {
            case 'success':
                return BsFillCheckCircleFill;
            case 'warning':
                return TiWarning;
            case 'danger':
                return MdDangerous;

            default:
                return BsInfoCircleFill;
        }
    };

    const Icon = chooseIcon(type);
    return (
        <div className={cx(['notification-container', position])}>
            <div className={cx(['notification'])}>
                <div className={cx('icon-block')}>
                    <Icon className={cx(type)} />
                </div>
                <div className={cx('text-block')}>
                    <p className={cx(['title'])}>{type[0].toUpperCase() + type.substring(1)}</p>
                    <p className={cx('text')}>{description}</p>
                </div>
                <button className={cx('close-btn')} onClick={() => setIsOpenToast(false)}>
                    <RiCloseLine style={{ marginBottom: '-3px' }} />
                </button>
            </div>
        </div>
    );
};
export default Toast;
