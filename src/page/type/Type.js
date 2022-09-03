import { useParams } from 'react-router-dom';
import style from './Type.module.css';
import clsx from 'clsx';
import CardBlock from '../sub/card/Card';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Type() {
    const [items, setItems] = useState([]);
    const { type } = useParams();

    console.log('Hello');
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_KEY}/item/type/${type}`)
            .then((response) => {
                setItems(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [type]);
    console.log(items);
    return (
        <div className={clsx('row', style.wrapper)}>
            <h2 className={clsx(style.title)}>{type}</h2>
            <div className={clsx(style.itemsBlock, 'row')}>
                {items.map((item) => {
                    return <CardBlock key={item._id} item={item} />;
                })}
            </div>
        </div>
    );
}

export default Type;
