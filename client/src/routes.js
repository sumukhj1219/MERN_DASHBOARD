import Login from './pages/Login.js';
import Home from './pages/Home.js';
import Register from './pages/Register';
import App from './App';
import { Navigate } from 'react-router-dom';
import {
	createBrowserRouter,
  } from "react-router-dom";
import Cookies from 'js-cookie';
const token = Cookies.get('token')
export default createBrowserRouter([
	{
	  
	  element: <App/>,
	  children: [
		{
		  path: "/",
		  element: token?<Home /> : <Navigate to="/login" replace={true} />,
		},
		{
			path: "/login",
			element: <Login/>,
		  },
		  {
			path: "/register",
			element: <Register/>,
		  },
	  ],
	},
  ]);
