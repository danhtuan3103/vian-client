import style from './Payment.module.css';
import clsx from 'clsx';
import { useState, useContext, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
// UI material
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import { contextUser } from '../../App';
import usePrompt from '../../hook/usePrompt';
import axios from 'axios';
import uniqid from 'uniqid';

const CustomizedButton = styled(Button)`
    margin: 8px;
    color: var(--green);
    border-color: var(--green);
    width: 80%;
    cursor: pointer;

    :hover {
        color: var(--color-accent);
        border-color: var(--color-accent);
        background-color: rgb(237, 227, 227, 0);
    }
`;

function Payment() {
    const [bankName, setBankName] = useState('');
    const [check, setCheck] = useState(false);

    const navigate = useNavigate();
    const formIsDirty = true;
    usePrompt('If you leave you will lose all entered information!!', formIsDirty);

    //context
    const context = useContext(contextUser);
    const { orded, info } = context.order;
    const { user } = context;

    const [infomation, setInfomation] = useState(false);

    useEffect(() => {
        if (orded && info) {
            setInfomation(true);
        }
    }, []);

    const total = useMemo(() => {
        const result = orded
            ? orded.bag
                ? orded.bag.reduce((pre, current) => {
                      return (pre += current.price);
                  }, 2800)
                : orded?.price * orded?.count + 2800
            : 0;
        return result;
    }, []);

    console.log(total);

    const handlePayment = () => {
        if (infomation) {
            if (bankName) {
                if (check) {
                    const order = {
                        order_id: uniqid(),
                        ...orded,
                        ...info,
                        bankName,
                    };
                    axios
                        .post(`${process.env.REACT_APP_API_KEY}/order/add`, {
                            user_id: typeof user === 'string' ? user : user.user_id,
                            order,
                        })
                        .then((res) => {
                            alert(res.data.message);
                            window.location.href = '/shop';
                        })
                        .catch((error) => alert(error.message));
                } else {
                    alert('You must check in the checkbox');
                }
            } else {
                alert('You must enter a bank name');
            }
        } else {
            alert('No Information');
        }
    };

    return (
        <div className={clsx(style.wrapper, 'row')}>
            <div className={clsx(style.bank, 'col l-6 m-12 c-12')}>
                <Accordion>
                    <AccordionSummary id="panel1bh-header">
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>입금자명</Typography>
                        <Typography sx={{ color: 'text.secondary' }}>
                            <TextField
                                size="small"
                                required
                                id="standard-required"
                                variant="standard"
                                value={bankName}
                                onChange={(e) => setBankName(e.target.value)}
                            />
                        </Typography>
                    </AccordionSummary>
                </Accordion>
                <p className={style.p}>★★★필독!!!! 입금자명=실제입금자명(상이하면누락될수있습니다)★★★</p>
                <Accordion>
                    <AccordionSummary id="panel1bh-header">
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>입금은행</Typography>
                        <Typography sx={{ color: 'text.secondary' }}>
                            <div>
                                <p
                                    className={style.bankAccount}
                                    style={{
                                        margin: 0,
                                    }}
                                >
                                    Woori
                                </p>
                                <p className={style.bankAccount}>1002461507728</p>
                                <p className={style.bankAccount}>NGUYEN DANH TUAN</p>
                            </div>
                        </Typography>
                    </AccordionSummary>
                </Accordion>
                <a className={style.woori} href="https://www.wooribank.com" target="_blank">
                    <CustomizedButton
                        id="outlined-basic"
                        sx={{ width: 260, margin: '16px 0 0 0' }}
                        size="small"
                        label="Account"
                        variant="outlined"
                    >
                        Go to bank
                    </CustomizedButton>
                </a>
            </div>

            {/* Bill */}
            <div
                className={clsx(style.billBlock, 'col l-6 m-12 c-12')}
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <div className={clsx(style.bill)}>
                    <div>
                        <p className={style.p}>무통장 입금 최종결제 금액</p>
                        <div className={style.total}>
                            <h2>{total}</h2>
                            <p className={style.p}>won</p>
                        </div>
                        <div className={style.text}>
                            <Checkbox
                                checked={check}
                                onChange={(e) => setCheck(e.target.checked)}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                            <p className={style.p}>결제정보를 확인하였으며, 구매진행에 동의합니다.</p>
                        </div>

                        <CustomizedButton
                            id="outlined-basic"
                            size="small"
                            label="Account"
                            variant="outlined"
                            onClick={() => {
                                handlePayment();
                            }}
                        >
                            Payment
                        </CustomizedButton>
                        <div className={style.line}></div>
                        <div className={style.text}>
                            <p className={style.p}>총 적립예정금액</p>
                            <p className={style.p}>0 won</p>
                        </div>
                        <div className={style.line}></div>

                        <p className={style.ItemInfo}>
                            {
                                orded
                                    ? orded.bag
                                        ? 'Payment Items In bag'
                                        : orded?.title + '-' + orded?.color + '-' + orded?.count + '개'
                                    : 'Nothing'
                                // orded?.bag
                                //   ? "Payment Items In bag"
                                //   : orded?.title + "-" + orded?.color + "-" + orded?.count + "개" ||
                                //     "Nothing"}
                            }
                        </p>
                        <div className={style.line2}></div>
                        <div className={style.text2}>
                            <p className={style.p}>주소</p>
                            <p className={style.p}>{info?.adress}</p>
                        </div>
                        <div className={style.line2}></div>

                        <div className={style.text2}>
                            <p className={style.p}>받으시는 분</p>
                            <p className={style.p}>{info?.receiver}</p>
                        </div>
                        <div className={style.line2}></div>

                        <div className={style.text2}>
                            <p className={style.p}>email</p>
                            <p className={style.p}>{info?.email}</p>
                        </div>
                        <div className={style.line2}></div>

                        <div className={style.text2}>
                            <p className={style.p}>배송메시지</p>
                            <p className={style.p}>{info?.message}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Payment;
