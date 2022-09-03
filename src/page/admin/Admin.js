import clsx from 'clsx';
import style from './Admin.module.css';
import { Link, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import Switch from '@mui/material/Switch';

import PostItem from './post/PostItem';
import DeleteItem from './delete/Delete';
import OrderOfCustomer from './orderOfCustomer/OrderOfCustomer';

function Admin() {
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    const [checked, setChecked] = useState(true);
    return (
        <div className={clsx('grid wide', style.wrapper)}>
            <div className={style.tongle}>
                <p>Visible Menu</p>
                <Switch {...label} checked={checked} onChange={() => setChecked(!checked)} />
            </div>
            <div className={clsx('row', style.block)}>
                <div className={clsx('col l-3 m-0 c-0', style.navBlock, checked || style.active)}>
                    <div className={style.navbar}>
                        <h2>Admin</h2>
                        <ul>
                            <li>
                                <Link to="">
                                    <FontAwesomeIcon icon={faPlus} style={{ margin: '0 8px' }} />
                                    Post Item
                                </Link>
                            </li>
                            <li>
                                <Link to="delete-item">
                                    <FontAwesomeIcon icon={faMinus} style={{ margin: '0 8px' }} />
                                    Delete Item
                                </Link>
                            </li>
                            <li>
                                <Link to="order-of-customer">
                                    <FontAwesomeIcon icon={faMinus} style={{ margin: '0 8px' }} />
                                    All Order of Customers
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={clsx(`col l-9 m-12 c-12`, style.content)}>
                    <Routes>
                        <Route index element={<PostItem />} />
                        <Route path="/delete-item" element={<DeleteItem />} />
                        <Route path="/order-of-customer" element={<OrderOfCustomer />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default Admin;
