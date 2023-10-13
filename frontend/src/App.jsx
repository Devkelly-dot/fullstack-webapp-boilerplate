import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import {Typography } from '@mui/material'

import MainLayout from './layouts/main/mainLayout'
import SignInPage from './pages/signin/signInPage';
import SignUpPage from './pages/signup/signUpPage';
import AccountPage from './pages/account/accountPage';
import { useDispatch, useSelector } from 'react-redux';
import config from './config';
import axios from 'axios';
import dispatchLogout from './ufils/auth/dispatchLogout';
import dispatchLogin from './ufils/auth/dispatchLogin';
import ForgotPasswordPage from './pages/forgotPassword/forgotPasswordPage';
import PricingPage from './pages/pricing/pricingPage';


function App() {
  const token = useSelector((state)=>state.auth.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const no_login_allowed = [
    '/auth/signin',
    '/auth/register',
    '/forgot-password'
  ]

  useEffect(()=>{
    async function attemptLogin() {
      const stored_token = localStorage.getItem('token');

      if(!stored_token) {
        const currentUrl = window.location.pathname;
        if (!no_login_allowed.includes(currentUrl)) {
          navigate('/auth/signin');
        }
      }

      const url = config.backendUrl+'account';
      const request_config = {
        headers: {
          'Authorization': 'Bearer ' +stored_token
        }
      };

      try {
        let response = await axios.get(url, request_config);
        let user = {...response?.data?.user};
        user.token = stored_token;
        dispatchLogin(dispatch, user)
      } catch (error) {
        dispatchLogout(dispatch);
      }
    }

    if(!token) {
      attemptLogin();
    }
  }, []);

  return (
        <MainLayout>
          <Routes>
            <Route path="/" element={
                <Typography>Home Content</Typography>
              } 
            />
            <Route path="/auth/signin" element={
                <SignInPage/>
              } 
            />
            <Route path="/auth/register" element={
                <SignUpPage/>
              } 
            />
            <Route path="/account" element={
              <AccountPage/>
            }
            />
            <Route path="/forgot-password" element={
              <ForgotPasswordPage/>
            }
            />
            <Route path="/pricing" element={
              <PricingPage/>
            }
            />
          </Routes>
        </MainLayout>
  )
}

export default App
