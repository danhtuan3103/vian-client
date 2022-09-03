import style from './Women.module.css';
import clsx from 'clsx';
import ads from '../../images/ads.jpeg';
import Ads from '../sub/ads/Ads';
import CardBlock from '../sub/card/Card';
import axios from 'axios';
import { useEffect, useState } from 'react';
import SubLink from '../subLink/SubLink';

function Women() {
    const text = 'Hello Women Page';

    const [items, setItems] = useState([]);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_KEY}/item/women`)
            .then((response) => {
                setItems(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className={clsx(style.wrapper, 'grid wide')}>
            <div className={clsx(style.listBlock)}>
                <SubLink />
                <div className={style.line}></div>
            </div>

            <Ads value={[ads, text]}></Ads>

            <div className={clsx(style.itemsBlock, 'row')}>
                {items.map((item) => {
                    return <CardBlock key={item._id} item={item} />;
                })}
            </div>
        </div>
    );
}

export default Women;
