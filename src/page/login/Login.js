import style from './Login.module.css';
import clsx from 'clsx';

import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useState, useContext } from 'react';
import { styled } from '@mui/material/styles';
import { contextUser } from '../../App.js';

import Cookies from 'universal-cookie';

const cookies = new Cookies();

const CustomizedTextField = styled(TextField)`
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
function Login({ prePath }) {
    const context = useContext(contextUser);
    const navigate = useNavigate();

    const { setUser } = context;

    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleLogin = (e) => {
        e.preventDefault();
        const data = {
            email,
            password,
        };
        axios
            .post(`${process.env.REACT_APP_API_KEY}/user/login`, data)
            .then((response) => {
                console.log(response.data);
                alert(response.data.message);
                setUser(response.data);

                cookies.set('TOKEN', response.data.token);
                cookies.set('USER_INFO', {
                    user_id: response.data.user_id,
                    name: response.data.name,
                    email: response.data.email,
                });
                prePath ? navigate(`${prePath}`) : (window.location.href = '/shop');
            })
            .catch(function (error) {
                setMessage(error.response.data.message);
                console.log(error);
            });
    };

    return (
        <div className={clsx(style.wrapper)}>
            <div className={style.loginBlock}>
                <h3>Login</h3>
                <div className={style.socialLogin}></div>
                <p>or use your account</p>

                <div className={style.form}>
                    <CustomizedTextField
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id="outlined-basic"
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
                                        onClick={handleClickShowPassword}
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

                    <CustomizedButton onClick={(e) => handleLogin(e)} className={style.LoginBtn} variant="outlined">
                        Login
                    </CustomizedButton>
                    <Link to="forget">Forget your password ?</Link>
                    <Link to="/register">Don't you have account ?</Link>
                </div>

                <p style={{ color: 'red' }}>{message}</p>
            </div>
        </div>
    );
}

export default Login;
