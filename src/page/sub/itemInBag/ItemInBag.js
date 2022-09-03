import style from './ItemInBag.module.css';
import FormControl from '@mui/material/FormControl';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import axios from 'axios';

import { useContext } from 'react';
import { contextUser } from '../../../App';

function ItemInBag({ data }) {
    const context = useContext(contextUser);
    const { bag, setBag, user } = context;

    const handleDeleteItem = () => {
        setBag(bag.filter((item) => item.selected_id !== data.selected_id));
        axios
            .post(`${process.env.REACT_APP_API_KEY}/bag/delete`, {
                user_id: user,
                selected_id: data.selected_id,
            })
            .then((res) => {})
            .catch((err) => console.log(err));
    };

    return (
        <div className={style.tableBlock}>
            <a
                href={`/item/${data._id}?color=${data.selected_color}&&size=${data.selected_size}&&count=${data.selected_count}`}
            >
                <img src={data.image} alt={data.title} />
            </a>
            <FormControl sx={{ m: 1, minWidth: 100 }}>
                <p className={style.key}>color</p>
                <p className={style.value}>{data.selected_color}</p>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 100 }}>
                <p className={style.key}>size</p>
                <p className={style.value}>{data.selected_size}</p>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 100 }}>
                <p className={style.key}>Quantity</p>
                <p className={style.value}>{data.selected_count}</p>
            </FormControl>

            <div className={style.toolPockets} onClick={handleDeleteItem}>
                <DeleteForeverIcon className={style.deleteIcon} />
            </div>
        </div>
    );
}

export default ItemInBag;
