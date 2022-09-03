import style from './Shop.module.css';
import clsx from 'clsx';
import ads3 from '../../images/ads3.jpeg';
import Ads from '../sub/ads/Ads';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SubLink from '../subLink/SubLink';
import Loading from '../sub/loading/Loading';
import Slider from '../sub/slider/Slider';

import CardBlock from '../sub/card/Card';

function Shop() {
    const text =
        'I have always been a huge fan of the the American School painters of the 1920s and \
    30s and I was particularly inspired by Thomas Hart Benton and Grant Wood. I am also drawn to the ';
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
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

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    });

    return (
        <div className={clsx(style.wrapper, 'grid wide')}>
            {loading ? (
                <Loading />
            ) : (
                <>
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
                </>
            )}
        </div>
    );
}

export default Shop;
