import mainImage from './../../images/main-image.png';
import style from './Home.module.css';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';

import { useContext } from 'react';
import { contextUser } from '../../App';

import Cookies from 'universal-cookie';

const cookies = new Cookies();
function Home() {
    const context = useContext(contextUser);

    const user = context.user;
    const { setUser } = context;

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
        <div className={clsx(style.wrapper)}>
            <div className={clsx(style.Ads)}>
                <div className={clsx(style.infoBlock)}>
                    <div className={clsx(style.textBlock)}>
                        <h2>Hello !! Wellcome to VianShop</h2>
                        <p>
                            VianShop is a place to sell clothes in Korea . Let's choose for yourself a few favorite
                            items.
                        </p>
                    </div>

                    <div className={clsx(style.btnBlock)}>
                        <Button className={clsx(style.btn)} to="/shop" primary style={{ minWidth: 160 }}>
                            Shopping
                        </Button>
                        {user ? (
                            <Button
                                className={clsx(style.btn)}
                                outline
                                onClick={handleLogout}
                                style={{ minWidth: 160, padding: '11.5px' }}
                            >
                                Logout
                            </Button>
                        ) : (
                            <Button className={clsx(style.btn)} to="/login" outline style={{ minWidth: 160 }}>
                                Login
                            </Button>
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
