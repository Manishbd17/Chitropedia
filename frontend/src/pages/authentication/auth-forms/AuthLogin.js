import React, {useState, useEffect} from 'react'; 
import {Button, TextField, Container} from '@mui/material';
import { fetchPostData } from 'client/client';
import { useNavigate } from 'react-router-dom'; 

const AuthLogin = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [loginError,setLoginError] = useState(''); 
  const navigate = useNavigate(); 

  useEffect(()=>{
    const isLoggedIn = localStorage.getItem('token'); 
    if(isLoggedIn) {
      navigate('/'); 
      window.location.reload(); 
    }
  },[]);


  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email); 
  }; 

  const validatePassword = () => {
    return password.length>=6 && password.length<=15; 
  }

  //network call is not finished if we not use async. 
  const handleLogin = async () => {
    setErrors({email: ' ', password: ' '}); 

    if(!validateEmail()) {
      setErrors((prevErrors) => ({...prevErrors, email: 'Invalid Email Format'})); 
      return; 
    }

    if(!validatePassword()) {
      setErrors((prevErrors) => ({...prevErrors, password: 'Password must be at least 6 characters long'})); 
      return; 
    } 

    fetchPostData('/auth/token', {email,password})
    .then((response) => {
      const { token } = response.data; 
      setLoginError(''); 
      localStorage.setItem('token',token); 
      navigate('/'); 
      window.location.reload(); 
    }).catch((error) => {
      console.error('Login error: ', error); 
      setLoginError('An error occured during login'); 
    });
  };

  return (
    <Container component="main" maxWidth='xs'>
      <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
        />
      <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!errors.password}
          helperText={errors.password}
       />
      <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
          Login
      </Button>
     {loginError && <p style={{color: 'red'}}>{loginError}</p>}
    </Container>
  ); 
  
};

export default AuthLogin;
