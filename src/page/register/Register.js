import style from './Register.module.css';
import clsx from 'clsx';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { styled } from '@mui/material/styles';

import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
const uniqid = require('uniqid');

const CustomizedTextField = styled(TextField)`
    margin: 8px;
    border-color: var(--green);
    color: var(--green);
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
function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [message, setMessage] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [error, setError] = useState(false);
    const handleRegister = (e) => {
        e.preventDefault();
        const data = {
            user_id: uniqid(),
            name,
            email,
            password,
        };
        if (password === passwordConfirm) {
            axios
                .post(`${process.env.REACT_APP_API_KEY}/user/register`, data)
                .then(function (response) {
                    alert(response.data.message);
                    console.log(response.data);
                    console.log(response.data);
                    navigate('/login');
                })
                .catch(function (error) {
                    setMessage(error.response.data.message);
                    console.log(error);
                });
        } else {
            setError(true);
            // setAccount('');
            // setPassword('');
            // setPasswordConfirm('');
        }
    };
    return (
        <div className={clsx(style.wrapper)}>
            <div className={style.loginBlock}>
                <h3>Register</h3>
                <div className={style.socialLogin}></div>
                <p>or use your email for registration</p>

                <div className={style.form}>
                    <CustomizedTextField
                        className={style.field}
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                        size="small"
                        label="Full Name"
                        variant="outlined"
                    />
                    <CustomizedTextField
                        className={style.field}
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        size="small"
                        label="Email"
                        variant="outlined"
                    />
                    <FormControl sx={{ m: 1, width: '320px' }} variant="outlined" size="small">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowPassword(!showPassword)}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '320px' }} variant="outlined" size="small">
                        <InputLabel htmlFor="outlined-adornment-password-confirm">Password Confirm</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password-confirm"
                            type={showPasswordConfirm ? 'text' : 'password'}
                            value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password Confirm"
                        />
                    </FormControl>

                    <CustomizedButton className={style.LoginBtn} onClick={(e) => handleRegister(e)} variant="outlined">
                        Register
                    </CustomizedButton>
                    <Link to="/login">Go to login, now !</Link>
                </div>

                <p style={{ color: 'red' }}>{message}</p>
            </div>
        </div>
    );
}

export default Register;
