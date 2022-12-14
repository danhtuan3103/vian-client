import { useState, useContext } from 'react';
import style from './Login.module.css';
import clsx from 'clsx';
import axios from 'axios';
import Cookies from 'universal-cookie';

// MUI
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

// Own file
import { contextUser } from '../../App.js';
import Button from '../../components/Button';

const cookies = new Cookies();

const CustomizedTextField = styled(TextField)`
    margin: 8px;
    width: 320px;
`;
function Login({ prePath }) {
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const context = useContext(contextUser);
    const { setUser } = context;

    const navigate = useNavigate();

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

                    <Button outline onClick={(e) => handleLogin(e)} style={{ minWidth: '160px' }}>
                        Login
                    </Button>
                    <Link to="forget">Forget your password ?</Link>
                    <Link to="/register">Don't you have account ?</Link>
                </div>
                <p style={{ color: 'red' }}>{message}</p>
            </div>
        </div>
    );
}

export default Login;
