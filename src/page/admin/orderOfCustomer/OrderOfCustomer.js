import * as React from 'react';
import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import style from '../Admin.module.css';

function OrderOfCustomer() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_KEY}/order`)
            .then((response) => setUsers(response.data))
            .catch((error) => console.log(error.message));
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell> NO </TableCell>
                        <TableCell align="right">User_id</TableCell>
                        <TableCell align="right">All order</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">
                                {users.indexOf(user) + 1}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {user.user_id}
                            </TableCell>
                            <TableCell align="right">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Title</TableCell>
                                        <TableCell align="center">Order_id</TableCell>
                                        <TableCell align="center">Image</TableCell>
                                        <TableCell align="center">Price</TableCell>
                                        <TableCell align="center">Order</TableCell>
                                    </TableRow>
                                </TableHead>

                                {user.orders.map((order) => {
                                    return (
                                        <TableRow key={order.order_id}>
                                            <TableCell align="center">
                                                {order?.bag ? 'Bag Payment' : order.title}
                                            </TableCell>
                                            <TableCell align="center">{order.order_id}</TableCell>
                                            <TableCell align="center">
                                                {order ? (
                                                    order.bag ? (
                                                        order.bag.map((itemInBag) => {
                                                            return (
                                                                <img
                                                                    key={itemInBag.selected_id}
                                                                    src={itemInBag.image}
                                                                    style={{
                                                                        width: '50px',
                                                                        height: '50px',
                                                                    }}
                                                                />
                                                            );
                                                        })
                                                    ) : (
                                                        <img
                                                            src={order.image}
                                                            style={{
                                                                width: '50px',
                                                                height: '50px',
                                                            }}
                                                        />
                                                    )
                                                ) : (
                                                    'NaN'
                                                )}
                                            </TableCell>
                                            <TableCell align="center">
                                                {order
                                                    ? order.bag
                                                        ? order.bag.reduce((pre, current) => {
                                                              return (pre += current.price);
                                                          }, 2800)
                                                        : order?.price * order?.count + 2800
                                                    : 0}
                                            </TableCell>
                                            <TableCell align="center" sx={{ minWidth: 300, maxWidth: 400 }}>
                                                {order ? (
                                                    order.bag ? (
                                                        order.bag.map((itemInBag) => {
                                                            return (
                                                                <p key={itemInBag.selected_id}>
                                                                    {' '}
                                                                    {itemInBag.title +
                                                                        '--' +
                                                                        itemInBag.selected_color +
                                                                        '--' +
                                                                        itemInBag.selected_size +
                                                                        '--' +
                                                                        itemInBag.selected_count}
                                                                </p>
                                                            );
                                                        })
                                                    ) : (
                                                        <p> {order.color + '--' + order.size + '--' + order.count}</p>
                                                    )
                                                ) : (
                                                    'NO'
                                                )}
                                                <p>{order.name + '--' + order.phone + '--' + order.email}</p>
                                                <p>
                                                    {order.adress +
                                                        '--' +
                                                        order.receiver +
                                                        '--' +
                                                        order.zipCode +
                                                        '--' +
                                                        order.message}{' '}
                                                </p>
                                                <p>Bank name: {order.bankName} </p>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default OrderOfCustomer;
