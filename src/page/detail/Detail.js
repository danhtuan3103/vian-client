import { useParams } from 'react-router-dom';
import style from './Detail.module.css';
import clsx from 'clsx';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Button from '../../components/Button';

//checkbox
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

//table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import uniqid from 'uniqid';

import { useContext } from 'react';
import { contextUser } from '../../App';

function Detail() {
    // Context
    const context = useContext(contextUser);
    const { setOrder, setBag, user } = context;
    const { id } = useParams();

    let [searchParams] = useSearchParams();
    // Axios Data variable
    const [item, setItem] = useState({});
    const [image, setImage] = useState([]);
    const [colors, setColors] = useState([]);
    const [descriptionImage, setDescriptionImage] = useState('');
    const [sizes, setSizes] = useState([]);
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_KEY}/item/id/${id}`)
            .then((res) => {
                setItem(res.data);
                setImage(res.data.image);
                setColors(res.data.colors);
                setSizes(res.data.sizes);
                setDescriptionImage(res.data.img_des);
            })
            .catch((err) => console.error(err));
    }, []);

    // Handle input
    const [color, setColor] = useState(searchParams.get('color') || '');
    const [size, setSize] = useState(searchParams.get('size') || '');
    const [count, setCount] = useState(searchParams.get('count') || 1);

    const handleChangeColor = (event) => {
        setColor(event.target.value);
    };

    const handleChangeSize = (event) => {
        setSize(event.target.value);
    };

    const handleChangeCount = (event) => {
        setCount(event.target.value);
    };

    let navigate = useNavigate();

    const handleBuyButton = () => {
        if (color && size && count) {
            const selected = {
                image: image,
                title: item.title,
                price: item.price,
                color,
                size,
                count,
            };
            setOrder(selected);
            navigate(`/${id}/order`);
        } else {
            alert('You must confirm input of color, size and count');
        }
    };

    const handlePocket = () => {
        let selected_id = uniqid();
        if (user) {
            if (color && size && count) {
                setBag((pre) => [
                    ...pre,
                    {
                        _id: id,
                        image,
                        title: item.title,
                        price: item.price,
                        sex: item.sex,
                        selected_color: color,
                        selected_size: size,
                        selected_count: count,
                        selected_id,
                    },
                ]);

                axios
                    .post('http://localhost:4000/bag/add', {
                        user_id: typeof user === 'string' ? user : user.user_id,
                        bag: {
                            ...item,
                            selected_color: color,
                            selected_size: size,
                            selected_count: count,
                            selected_id,
                        },
                    })
                    .then((response) => {
                        console.log(response);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                alert('Please Choose Color, Size, Quanity ');
            }
        } else {
            alert('You must login');
            navigate('/login');
        }
    };

    return (
        <div className={clsx(style.wrapper, 'row')}>
            <div className={clsx(style.imgBlock, 'col l-6 m-12 c-12')}>
                <div className={style.img}>
                    <img src={image} alt={item.title} />
                </div>
            </div>
            <div className={clsx(style.infoBlock, 'col l-6 m-12 c-12')}>
                <div className={style.info}>
                    <h3 className={style.title}>{item.title}</h3>
                    <p className={style.price}>price : {item.price}</p>
                    <div className={clsx(style.line)}></div>

                    <div className={clsx(style.inputBLock)}>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-helper-label">Color</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={color}
                                label="Color"
                                onChange={handleChangeColor}
                            >
                                {colors.map((color) => {
                                    return (
                                        <MenuItem key={color} value={color}>
                                            {color}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>

                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-helper-label">Size</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={size}
                                label="Color"
                                onChange={handleChangeSize}
                            >
                                {sizes.map((size) => {
                                    return (
                                        <MenuItem key={size} value={size}>
                                            {size}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                        <div>
                            <TextField
                                sx={{ m: 1, maxWidth: 120 }}
                                id="outlined-number"
                                label="Quantily"
                                type="number"
                                value={count}
                                onChange={handleChangeCount}
                            />
                        </div>
                    </div>
                    <div className={clsx(style.line)}></div>

                    <div className={style.tableBlock}>
                        <TableContainer component={Paper}>
                            <Table sx={{ maxWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Name</TableCell>
                                        <TableCell align="center">Color</TableCell>
                                        <TableCell align="center">Size</TableCell>
                                        <TableCell align="center">Quantity</TableCell>
                                        <TableCell align="center">Price</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component="th" scope="row" align="center">
                                            {item.title}
                                        </TableCell>
                                        <TableCell align="center">{color}</TableCell>
                                        <TableCell align="center">{size}</TableCell>
                                        <TableCell align="center">{count} </TableCell>
                                        <TableCell align="center">{(item.price * count).toString()}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    <div className={clsx(style.line)}></div>

                    <div>
                        <p>Total : {item.price} Won</p>
                    </div>

                    <div className={style.btnBlock}>
                        <Button onClick={() => handleBuyButton()} outline style={{ minWidth: 150 }}>
                            Buy Now
                        </Button>
                        <Button onClick={() => handlePocket()} outline style={{ minWidth: 150 }}>
                            Add to card
                        </Button>
                    </div>
                </div>
            </div>

            <div className={style.descriptionImage}>
                <img src={descriptionImage} alt="description" />
            </div>
        </div>
    );
}

export default Detail;
