import style from './ItemInBag.module.css';
import FormControl from '@mui/material/FormControl';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import Modal from '../../../components/Modal';
import Button from '../../../components/Button';
import axios from 'axios';

import { useContext, useState } from 'react';
import { contextUser } from '../../../App';

function ItemInBag({ data }) {
    const context = useContext(contextUser);
    const { bag, setBag, user } = context;
    const [isOpen, setIsOpen] = useState(false);

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

    let link = `/item/${data._id}?color=${data.selected_color}&&size=${data.selected_size}&&count=${data.selected_count}`;

    return (
        <div className={style.tableBlock}>
            <a href={link}>
                <img src={data.image} alt={data.title} />
            </a>
            <FormControl sx={{ m: 1, minWidth: 40 }}>
                <p className={style.key}>color</p>
                <p className={style.value}>{data.selected_color}</p>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 40 }}>
                <p className={style.key}>size</p>
                <p className={style.value}>{data.selected_size}</p>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 40 }}>
                <p className={style.key}>Quantity</p>
                <p className={style.value}>{data.selected_count}</p>
            </FormControl>

            <div className={style.toolPockets} onClick={() => setIsOpen(true)}>
                <DeleteForeverIcon className={style.deleteIcon} />
            </div>

            {isOpen && (
                <Modal
                    setIsOpen={setIsOpen}
                    title="Notification"
                    dialogText="Are you sure you want to delete the item?"
                    rightBtn={
                        <Button onClick={() => setIsOpen(false)} secondary>
                            Cancel
                        </Button>
                    }
                    leftBtn={
                        <Button
                            onClick={() => handleDeleteItem()}
                            primary
                            style={{
                                backgroundColor: 'red',
                            }}
                        >
                            {' '}
                            Delete
                        </Button>
                    }
                />
            )}
        </div>
    );
}

export default ItemInBag;
