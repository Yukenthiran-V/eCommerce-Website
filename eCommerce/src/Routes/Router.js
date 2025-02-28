import{ createBrowserRouter} from 'react-router-dom';
import Home from '../Pages/Home';
import Signup from '../Pages/Signup';
import Login from '../Pages/Login';
import ErrorPage from '../Pages/ErrorPage';
import Categories from '../Pages/categories/Categories';
import OtpVerify from '../Pages/OtpVerificationPage';
import Logout from '../Pages/Logout';
import ShowCategories from '../Pages/categories/ShowCategories';

const router=createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path:"/signup",
        element:<Signup />
    },
    {
        path: "/login",
        element:<Login />
    },
    // {
    //     path:"/categories",
    //     element:<Categories />
    // },
    {
        path:"/signup/otpverify",
        element:<OtpVerify />
    },
    {
        path:"/logout",
        element:<Logout />
    },
    {
        path:"/categories",
        element:<ShowCategories />                                      
    },
    //undefined web page set err msg
    {
        path:"*",
        element:<ErrorPage /> ,
    }
]);

export default router;
