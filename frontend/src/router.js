import { useRoutes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import OrderTable from './pages/PrePress/Table/OrderTable'
import Details from './pages/PrePress/Details'
import Login from './pages/Auth/login'


export default function Router() {
    return useRoutes([
        {
            path: '/pre-press',
            element: < MainLayout />,
            children: [
                { path: 'order', element: <OrderTable /> },
                { path: 'details', element: <Details /> },
            ]

        },
        {
            path: "/login",
            element: <Login />
        }
    ])
}