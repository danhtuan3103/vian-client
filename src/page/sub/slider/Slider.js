import styles from './Slider.module.scss';
import clsx from 'clsx';
import { useState, useEffect } from 'react';
import axios from 'axios';
import CardBlock from '../card/Card';

function Slider() {
    const [items, setItems] = useState([]);

    const grid = 'col l-2 m-2 c-3';
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
        <logo-slider>
            <div className={clsx(styles.slider)}>
                {items.map((item) => {
                    return <CardBlock key={item._id} item={item} grid={grid} />;
                })}
            </div>
        </logo-slider>
    );
}
export default Slider;
