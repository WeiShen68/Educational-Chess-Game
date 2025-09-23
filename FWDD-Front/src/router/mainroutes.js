const Login = () => import('@/views/Login');
const Register = () => import('@/views/Register');
const Layout = () => import('@/layouts/default.vue');

export const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
    },
    {
        path: '',
        component: Layout,
        redirect: { name: 'Dashboard' },
        children: [
            {
                path: 'dashboard',
                name: 'Dashboard',
                component: () => import('../views/Dashboard/index.vue'),
            },
            {
                path: 'page',
                name: 'Page',
                component: () => import('../views/Page.vue'),
            },
            {
                path: 'startgame',
                name: 'StartGame',
                component: () => import('../views/Chessboard/startgame.vue'),
            },
            {
                path: 'gameboard/:game_code',
                name: 'GameBoard',
                component: () => import('../views/Chessboard/gameboard.vue'),
            },
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('../views/PageNotFound/index.vue')
    },
]
