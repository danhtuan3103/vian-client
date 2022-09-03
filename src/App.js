import './App.css';
import { Routes, Route } from 'react-router-dom';
import React, { lazy, useEffect, Suspense, createContext, useState } from 'react';
import { Header } from './page/index';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { ProtectedRoutes } from '~/auth/ProtectedRoutes';
import Loading from './page/sub/loading/Loading';
import { publicRoutes, privateRoutes } from './routes';
import SubLink from './page/subLink/SubLink';
export const contextUser = createContext();

const cookies = new Cookies();
function App() {
    const [user, setUser] = useState(cookies.get('USER_INFO')?.user_id);
    const [order, setOrder] = useState({});
    const [bag, setBag] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const apiCalling = async () => {
        await axios
            .post(`${process.env.REACT_APP_API_KEY}/bag` || 'http://localhost:4000/bag', {
                user_id: typeof user === 'string' ? user : user.user_id,
            })
            .then((response) => setBag(response.data))
            .catch((err) => console.error(err));

        await axios
            .post(`${process.env.REACT_APP_API_KEY}/favorite` || 'http://localhost:4000/favorite', {
                user_id: typeof user === 'string' ? user : user.user_id,
            })
            .then((response) => setFavorites(response.data))
            .catch((err) => console.error(err));
    };
    useEffect(() => {
        if (user) {
            apiCalling();
        }
    }, [user]);

    const value = {
        user,
        setUser,
        order,
        setOrder,
        bag,
        setBag,
        favorites,
        setFavorites,
    };

    return (
        <contextUser.Provider value={value}>
            <div className="container grid wide">
                <Suspense fallback={<Loading />}>
                    <Header />

                    <Routes>
                        {publicRoutes.map((route, index) => {
                            const Page = route.component;
                            return <Route key={index} path={route.path} element={<Page />} />;
                        })}

                        {privateRoutes.map((route, index) => {
                            const Page = route.component;
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <ProtectedRoutes>
                                            <Page />
                                        </ProtectedRoutes>
                                    }
                                />
                            );
                        })}
                    </Routes>
                </Suspense>
            </div>
        </contextUser.Provider>
    );
}

export default App;
