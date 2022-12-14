import style from './Shop.module.css';
import clsx from 'clsx';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SubLink from '../subLink/SubLink';
import Slider from '../sub/slider/Slider';
import CardBlock from '../sub/card/Card';

function Shop() {
    const [items, setItems] = useState([]);
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_KEY}/item`)
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
            {/* <Ads value={[ads3, text]}></Ads>
             */}
            <Slider />

            <div className={clsx(style.itemsBlock, 'row')}>
                {items.map((item) => {
                    return <CardBlock key={item._id} item={item} />;
                })}
            </div>
        </div>
    );
}

export default Shop;
