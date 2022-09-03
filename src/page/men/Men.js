import { Link, Outlet } from 'react-router-dom';
import style from './Men.module.css';
import clsx from 'clsx';
import model1 from '../../images/model1.jpeg';
import Ads from '../sub/ads/Ads';
import CardBlock from '../sub/card/Card';
import axios from 'axios';
import { useEffect, useState } from 'react';
import SubLink from '../subLink/SubLink';

function Men() {
    const text = 'Hello Men Page';

    const [items, setItems] = useState([]);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_KEY}/item/men`)
            .then((response) => {
                setItems(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className={clsx(style.wrapper, 'grid wide wrapper')}>
            <div className={clsx(style.listBlock)}>
                <SubLink />
                <div className={style.line}></div>
            </div>

            <Ads value={[model1, text]}></Ads>

            <div className={clsx(style.itemsBlock, 'row')}>
                {items.map((item) => {
                    return <CardBlock key={item._id} item={item} />;
                })}
            </div>
        </div>
    );
}

export default Men;
