import { useParams } from 'react-router-dom';
import clsx from 'clsx';
import style from './SexAndType.module.css';
import CardBlock from '../sub/card/Card';
import axios from 'axios';
import { useEffect, useState } from 'react';

function SexAndType() {
    const [items, setItems] = useState([]);
    const { type } = useParams();
    const { sex } = useParams();

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_KEY}/item/sex/${sex}/${type}`)
            .then((response) => {
                setItems(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    return (
        <div className={clsx('row', style.wrapper)}>
            <h2 className={style.title}>{type + ' of ' + sex}</h2>
            <div className={clsx('row')}>
                {items.map((item) => {
                    return <CardBlock key={item._id} item={item} />;
                })}
            </div>
        </div>
    );
}

export default SexAndType;
