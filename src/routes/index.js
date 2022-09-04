import { lazy } from 'react';
const Shop = lazy(() => import('../page/shop/Shop'));
const Women = lazy(() => import('../page/women/Women'));
const Men = lazy(() => import('../page/men/Men'));
const Home = lazy(() => import('../page/home/Home'));
const Register = lazy(() => import('../page/register/Register'));
const Login = lazy(() => import('../page/login/Login'));
const SexAndType = lazy(() => import('../page/sexAndType/SexAndType'));
const Type = lazy(() => import('../page/type/Type'));
const Order = lazy(() => import('../page/order/Order'));
const Payment = lazy(() => import('../page/payment/Payment'));
const Admin = lazy(() => import('../page/admin/Admin'));
const Detail = lazy(() => import('../page/detail/Detail'));
const Favorite = lazy(() => import('../page/sub/favorite/Favorite'));
const NoMatch = lazy(() => import('../page/sub/noMatch/NoMatch'));
const BagPayment = lazy(() => import('../page/bagPayment/BagPayment'));

const publicRoutes = [
    { path: '/', component: Home },
    { path: 'shop', component: Shop },
    { path: 'shop/:id', component: Detail },
    { path: 'shop/type/:type', component: Type },
    { path: ':sex/type/:type', component: SexAndType },
    { path: 'women', component: Women },
    { path: 'women/:id', component: Detail },
    { path: 'men', component: Men },
    { path: 'men/:id', component: Detail },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: '*', component: NoMatch },
];
const privateRoutes = [
    { path: ':id/order', component: Order },
    { path: ':item/:id', component: Detail },
    { path: ':id/order/payment', component: Payment },
    { path: 'my-favorite', component: Favorite },
    { path: 'admin/*', component: Admin },
    { path: 'bag/payment', component: BagPayment },
];

export { publicRoutes, privateRoutes };
