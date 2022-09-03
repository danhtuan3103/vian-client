import { useContext, useState, useMemo } from 'react';
import { contextUser } from '../../App';
import usePrompt from '../hook/usePrompt';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

import style from './BagPayment.module.css';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';

import Paper from '@mui/material/Paper';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { styled } from '@mui/material/styles';
import axios from 'axios';

const CustomizedTextField = styled(TextField)`
    margin: 8px;
    width: 320px;
`;

const CustomizedTextareaAutosize = styled(TextareaAutosize)`
    margin: 8px;
    width: 320px;
`;

const CustomizedButton = styled(Button)`
    margin: 8px;
    color: var(--green);
    border-color: var(--green);
    width: 170px;
    cursor: pointer;

    :hover {
        color: var(--color-accent);
        border-color: var(--color-accent);
        background-color: rgb(237, 227, 227, 0);
    }
`;
function BagPayment() {
    const context = useContext(contextUser);
    const { bag, setBag, user, setOrder } = context;
    const cookies = new Cookies();
    const formIsDirty = true;
    const navigate = useNavigate();

    const [name, setName] = useState(cookies.get('USER_INFO')?.name);
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState(cookies.get('USER_INFO')?.email);
    const [adress, setAdress] = useState('');
    const [receiver, setReceiver] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [message, setMessage] = useState('');

    const total = bag.reduce((preItem, currentItem) => {
        return (preItem += currentItem.price * currentItem.selected_count);
    }, 2800);

    const handleDeleteItem = (e, itemInBag) => {
        console.log(itemInBag);

        setBag(bag.filter((item) => item.selected_id !== itemInBag.selected_id));
        axios
            .post(`${process.env.REACT_APP_API_KEY}/bag/delete`, {
                user_id: user,
                selected_id: itemInBag.selected_id,
            })
            .then((res) => {})
            .catch((err) => console.log(err));
    };

    const handleClickConfirm = (event) => {
        event.preventDefault();
        if (bag.length > 0) {
            if (name && phone && email && adress && receiver && zipCode && message) {
                console.log('Ok');
                const data = {
                    orded: {
                        bag,
                    },
                    info: {
                        name,
                        phone,
                        email,
                        adress,
                        receiver,
                        zipCode,
                        message,
                    },
                };
                setOrder(data);
                navigate(`/bag/order/payment`);
            } else {
                alert('You must enter all input field');
            }
        } else {
            alert('Please back to the previous page and choose color, size, quality again');
        }
    };
    usePrompt('Are you sure you want to redirect to another page ?', formIsDirty);
    return (
        <div>
            <h2>Payment All Item In Bag</h2>

            <TableContainer component={Paper} key="1">
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell> NO </TableCell>
                            <TableCell align="center">Title</TableCell>
                            <TableCell align="center">Image</TableCell>
                            <TableCell align="center">Sex</TableCell>
                            <TableCell align="center">Color</TableCell>
                            <TableCell align="center">Size</TableCell>
                            <TableCell align="center">Quality</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bag.map((item) => (
                            <TableRow key={item.selected_id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    {bag.indexOf(item) + 1}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {item.title}
                                </TableCell>
                                <TableCell align="center">
                                    <img
                                        src={item.image}
                                        style={{
                                            width: '50px',
                                        }}
                                    />
                                </TableCell>
                                <TableCell align="center">{item.sex}</TableCell>
                                <TableCell align="center">{item.selected_color}</TableCell>
                                <TableCell align="center">{item.selected_size}</TableCell>
                                <TableCell align="center">{item.selected_count}</TableCell>
                                <TableCell align="center">{item.price}</TableCell>
                                <TableCell align="right">
                                    <DeleteForeverIcon
                                        className={style.deleteIcon}
                                        onClick={(e) => handleDeleteItem(e, item)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TableContainer component={Paper} key="2">
                <Table sx={{ width: 650, height: '150px', float: 'right' }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Count(number)</TableCell>
                            <TableCell align="center">Shipping(W)</TableCell>
                            <TableCell align="center">Total(W)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell align="center">{bag.length}</TableCell>
                            <TableCell align="center">2800 (W)</TableCell>
                            <TableCell align="center">{total} (W)</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            <div>
                <h2>User Information</h2>
                <Accordion>
                    <AccordionSummary id="panel1bh-header">
                        <Typography sx={{ width: '33%', flexShrink: 0 }} component={'span'}>
                            Name*
                        </Typography>
                        <Typography sx={{ color: '#ffff' }} component={'span'}>
                            <TextField
                                size="small"
                                required
                                id="standard-required"
                                variant="standard"
                                value={name}
                                onChange={(event) => {
                                    setName(event.target.value);
                                }}
                            />
                        </Typography>
                    </AccordionSummary>
                </Accordion>

                <Accordion>
                    <AccordionSummary id="panel1bh-header">
                        <Typography component={'span'} sx={{ width: '33%', flexShrink: 0 }}>
                            Phone Number*
                        </Typography>
                        <Typography component={'span'} sx={{ color: 'text.secondary' }}>
                            <TextField
                                size="small"
                                required
                                id="standard-required"
                                variant="standard"
                                value={phone}
                                onChange={(event) => {
                                    setPhone(event.target.value);
                                }}
                            />
                        </Typography>
                    </AccordionSummary>
                </Accordion>

                <Accordion>
                    <AccordionSummary id="panel1bh-header">
                        <Typography component={'span'} sx={{ width: '33%', flexShrink: 0 }}>
                            Email*
                        </Typography>
                        <Typography component={'span'} sx={{ color: 'text.secondary' }}>
                            <TextField
                                size="small"
                                required
                                id="standard-required"
                                variant="standard"
                                value={email}
                                onChange={(event) => {
                                    setEmail(event.target.value);
                                }}
                            />
                        </Typography>
                    </AccordionSummary>
                    <div className={style.text}>
                        <p>- 이메일 주소란에는 반드시 수신가능한 이메일주소를 입력해 주세요</p>
                        <p>- 이메일을 통해 주문처리과정을 보내드립니다.</p>
                    </div>
                </Accordion>
                <Accordion>
                    <AccordionSummary id="panel1bh-header">
                        <Typography component={'span'} sx={{ width: '33%', flexShrink: 0 }}>
                            Adress*
                        </Typography>
                        <Typography component={'span'} sx={{ color: 'text.secondary' }} className={style.adressBlock}>
                            <CustomizedTextField
                                id="outlined-basic"
                                label="주소"
                                variant="outlined"
                                size="small"
                                sx={{ minWidth: 300 }}
                                value={adress}
                                onChange={(event) => {
                                    setAdress(event.target.value);
                                }}
                            />
                            <CustomizedTextField
                                id="outlined-basic"
                                label="받으시는 분"
                                variant="outlined"
                                size="small"
                                sx={{ minWidth: 300 }}
                                value={receiver}
                                onChange={(event) => {
                                    setReceiver(event.target.value);
                                }}
                            />
                            <CustomizedTextField
                                id="outlined-basic"
                                label="우편번호"
                                variant="outlined"
                                size="small"
                                sx={{ minWidth: 150 }}
                                value={zipCode}
                                onChange={(event) => {
                                    setZipCode(event.target.value);
                                }}
                            />
                            <CustomizedTextareaAutosize
                                aria-label="empty textarea"
                                placeholder="배송메시지"
                                style={{ width: 300 }}
                                minRows={3}
                                value={message}
                                onChange={(event) => {
                                    setMessage(event.target.value);
                                }}
                            />
                        </Typography>
                    </AccordionSummary>
                </Accordion>
            </div>
            <CustomizedButton variant="outlined" onClick={handleClickConfirm}>
                Confirm
            </CustomizedButton>
        </div>
    );
}

export default BagPayment;
