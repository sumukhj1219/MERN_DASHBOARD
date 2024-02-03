import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
export default function Appbar() {
 const navigate = useNavigate()
 function logout()
 {
	Cookies.remove('token');
	navigate('/login')
 }
  return (
    <Box sx={{ flexGrow: 1, Color: 'black' }}>
      <AppBar position="static" sx={{  backgroundColor: '#3435CB' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" className='Expensor'>Expensor#</Link>
          </Typography>
		  <Button color='inherit' onClick={logout}>LogOut</Button>
		  <Link to="/login" className='Login'>
		  <Button color="inherit" >Login</Button>
		  </Link>
		  <Link to="/register" className='Register'>
		  <Button color="inherit" >Register</Button>
		  </Link>
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}

