import * as React from 'react';
import { useState, useEffect } from 'react';
import style from '../Admin.module.css';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function DeleteItem() {
    const [items, setItems] = useState([]);
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_KEY}`)
            .then((response) => setItems(response.data))
            .catch((error) => console.log(error.message));
    }, []);

    const handleDeleteItem = (item) => {
        console.log(item);
        const newItems = items.filter((i) => i.item_code !== item.item_code);
        setItems(newItems);
        axios
            .post('http://localhost:4000/item/delete', { _id: item._id })
            .then((response) => console.log(response.data))
            .catch((err) => console.log(err));
    };
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell> NO </TableCell>
                        <TableCell align="right">Title</TableCell>
                        <TableCell align="right">Item_code</TableCell>
                        <TableCell align="right">Image</TableCell>
                        <TableCell align="right">Sex</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((item) => (
                        <TableRow key={item._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">
                                {items.indexOf(item) + 1}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {item.title}
                            </TableCell>
                            <TableCell align="right">{item.item_code}</TableCell>
                            <TableCell align="right">
                                <img
                                    src={item.image}
                                    style={{
                                        width: '50px',
                                    }}
                                />
                            </TableCell>
                            <TableCell align="right">{item.sex}</TableCell>
                            <TableCell align="right">{item.price}</TableCell>
                            <TableCell align="right">
                                <DeleteForeverIcon
                                    className={style.deleteIcon}
                                    onClick={() => handleDeleteItem(item)}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default DeleteItem;
