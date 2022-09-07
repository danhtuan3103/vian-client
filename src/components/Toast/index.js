import React from 'react';
import styles from './Toast.module.scss';
import classNames from 'classnames/bind';
import { RiCloseLine } from 'react-icons/ri';
import { BsFillCheckCircleFill, BsInfoCircleFill } from 'react-icons/bs';
import { TiWarning } from 'react-icons/ti';
import { MdDangerous } from 'react-icons/md';

import { useRef } from 'react';

const cx = classNames.bind(styles);

const Toast = ({ type = 'info', description = '', handleDelete, id, autoClose, title }) => {
    const icons = {
        success: BsFillCheckCircleFill,
        warning: TiWarning,
        danger: MdDangerous,
        info: BsInfoCircleFill,
    };

    const Icon = icons[type];

    return (
        <div className={cx('notification-container')}>
            <div className={cx(['notification', 'toast', autoClose && 'autoClose'])}>
                <div className={cx('icon-block')}>
                    <Icon className={cx(type)} />
                </div>
                <div className={cx('text-block')}>
                    <p className={cx(['title'])}>{title || type[0].toUpperCase() + type.substring(1)} </p>
                    <p className={cx('text')}>{description}</p>
                </div>
                <button className={cx('close-btn')} onClick={() => handleDelete(id)}>
                    <RiCloseLine style={{ marginBottom: '-3px' }} />
                </button>
            </div>
        </div>
    );
};
export default Toast;
