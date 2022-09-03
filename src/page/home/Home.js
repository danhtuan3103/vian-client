import mainImage from './../../images/main-image.png';
import style from './Home.module.css';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

import { useContext } from 'react';
import { contextUser } from '../../App';

import Cookies from 'universal-cookie';

const cookies = new Cookies();
function Home() {
    const context = useContext(contextUser);

    const user = context.user;
    const { setUser } = context;
    const CustomizedButton = styled(Button)`
        margin: 8px;
        color: var(--green);
        border-color: var(--green);
        width: 180px;
        cursor: pointer;
        height: 45px;

        :hover {
            color: var(--color-accent);
            border-color: var(--color-accent);
            background-color: rgb(237, 227, 227, 0);
        }
    `;

    const handleLogout = async () => {
        // destroy the cookie
        await cookies.remove('TOKEN');

        await cookies.remove('USER_INFO');
        // redirect user to the landing page
        window.location.href = '/login';
        setUser('');
        // setCards([]);
    };

    return (
        <div className={clsx(style.wrapper, 'row')}>
            <div className={clsx('col l-6 m-12 c-12', style.Ads)}>
                <div className={clsx(style.infoBlock)}>
                    <div className={clsx(style.textBlock)}>
                        <h2>Hello !! Wellcome to VianShop</h2>
                        <p>
                            VianShop is a place to sell clothes in Korea . Let's choose for yourself a few favorite
                            items.
                        </p>
                    </div>

                    <div className={clsx(style.btnBlock)}>
                        <CustomizedButton id="outlined-basic" size="small" label="Account" variant="outlined">
                            <Link to="/shop">Shoping</Link>
                        </CustomizedButton>
                        {user ? (
                            <CustomizedButton
                                onClick={handleLogout}
                                id="outlined-basic"
                                size="small"
                                label="Account"
                                variant="outlined"
                            >
                                <Link to="/login">Logout</Link>
                            </CustomizedButton>
                        ) : (
                            <CustomizedButton id="outlined-basic" size="small" label="Account" variant="outlined">
                                <Link to="/login">Login</Link>
                            </CustomizedButton>
                        )}
                    </div>
                </div>
            </div>
            <div className={clsx('l-6 m-12 c-12', style.imgContainer)}>
                <div className={style.mainImage}>
                    <div className={clsx(style.imgBlock)}>
                        <img className={clsx(style.img)} src={mainImage} alt="fashion image"></img>
                        <div className={clsx(style.border)}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
