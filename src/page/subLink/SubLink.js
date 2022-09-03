import style from './SubLink.module.css';
import clsx from 'clsx';
import { Link, Outlet } from 'react-router-dom';

function SubLink() {
    return (
        <ul className={clsx(style.list, 'row')}>
            <li className={clsx('col l-2 m-3 c-6')}>
                <Link to="type/tshirst">T-shirst</Link>
            </li>
            <li className={clsx('col l-2 m-3 c-6')}>
                <Link to="type/trousers">trousers</Link>
            </li>
            <li className={clsx('col l-2 m-3 c-6')}>
                <Link to="type/short">short</Link>
            </li>
            <li className={clsx('col l-2 m-3 c-6')}>
                <Link to="type/shoes">shoes</Link>
            </li>
            <li className={clsx('col l-2 m-3 c-6')}>
                <Link to="type/outer">outer</Link>
            </li>
            <li className={clsx('col l-2 m-3 c-6')}>
                <Link to="type/hat">Hat</Link>
            </li>
        </ul>
    );
}

export default SubLink;
