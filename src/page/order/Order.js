import style from './Order.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useContext } from 'react';
import { contextUser } from '../../App';
import Cookies from 'universal-cookie';
import usePrompt from '../hook/usePrompt';

// UI Material
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

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

function Order() {
    const cookies = new Cookies();
    const shipping = 2800;
    const { id } = useParams();
    //context
    const context = useContext(contextUser);
    const { order, setOrder } = context;

    // input variable
    const [name, setName] = useState(cookies.get('USER_INFO')?.name);
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState(cookies.get('USER_INFO')?.email);
    const [adress, setAdress] = useState('');
    const [receiver, setReceiver] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [message, setMessage] = useState('');

    const formIsDirty = true;

    const navigate = useNavigate();

    const handleClickConfirm = (event) => {
        event.preventDefault();
        if (order.color) {
            if (name && phone && email && adress && receiver && zipCode && message) {
                console.log('Ok');
                const data = {
                    orded: order,
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
                navigate(`/${id}/order/payment`);
            } else {
                alert('You must enter all input field');
            }
        } else {
            alert('Please back to the previous page and choose color, size, quality again');
        }
    };
    usePrompt('Are you sure you want to redirect to another page ?', formIsDirty);

    return (
        <div className={style.wrapper}>
            <h4>Information of Order</h4>
            <div className={style.tableBlock}>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Image</TableCell>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Color</TableCell>
                                <TableCell align="center">Size</TableCell>
                                <TableCell align="center">Quantity</TableCell>
                                <TableCell align="center">Price</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <div className={style.imgBlock}>
                                        <img
                                            className={style.img}
                                            src={order.image}
                                            alt={order.title || 'Image of item'}
                                        />
                                    </div>
                                </TableCell>
                                <TableCell align="center">
                                    <p style={{ fontSize: 16 }}>{order.title}</p>
                                </TableCell>
                                <TableCell align="center">
                                    <p style={{ fontSize: 16 }}>{order.color || 'N'}</p>
                                </TableCell>
                                <TableCell align="center">
                                    <p style={{ fontSize: 16 }}>{order.size || 'N'}</p>
                                </TableCell>
                                <TableCell align="center">
                                    <p style={{ fontSize: 16 }}>{order.count || 'N'}</p>
                                </TableCell>
                                <TableCell align="center">
                                    <p style={{ fontSize: 16 }}>{order.count * order.price || 0}</p>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            <div className={style.priceBlock}>
                <p>
                    Shipping price : <span>{shipping}</span>
                </p>
                <p style={{ color: 'red' }}>
                    Total : <span>{order.price * order.count + shipping || 0}</span>
                </p>
            </div>
            <div className={style.line}></div>

            <div className={style.infoBlock}>
                <div>
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
                        <p>Adress*</p>
                        <AccordionSummary id="panel1bh-header">
                            <Typography
                                component={'span'}
                                sx={{ color: 'text.secondary' }}
                                className={style.adressBlock}
                            >
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
            </div>

            <CustomizedButton
                onClick={(event) => {
                    handleClickConfirm(event);
                }}
                className={style.field}
                id="outlined-basic"
                size="small"
                label="Account"
                variant="outlined"
            >
                Confirm
            </CustomizedButton>
        </div>
    );
}

export default Order;
