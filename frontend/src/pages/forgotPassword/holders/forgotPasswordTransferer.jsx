import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import EnterEmailStep from '../steps/enterEmail/enterEmailStep';
import { Grid, Typography } from '@mui/material';
import config from '../../../config';
import axios from 'axios';
import EnterCodeStep from '../steps/enterCode/enterCodeStep';
import EnterNewPassStep from '../steps/enterNewPass/enterNewPassStep';
import { useDispatch, useSelector } from 'react-redux';
import dispatchLogin from '../../../ufils/auth/dispatchLogin';

const Steps = {
    ENTEREMAIL: 'Enter your email address',
    ENTERCODE: 'Enter your code',
    SETNEW: 'Set new password',
    THANKYOU: 'Thank you'
}

function ForgotPasswordTransferer({param_code}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const token = useSelector((state)=>state.auth.token);

    const [step, setStep] = useState(Steps.ENTEREMAIL);
    const [error, setError] = useState(null);
    const [newToken, setNewToken] = useState(token);

    useEffect(()=>{
        if(param_code) {
            setStep(Steps.ENTERCODE);
            attemptSubmitCode(param_code);
        }
    }, [param_code]);

    useEffect(()=>{
        setNewToken(token);
    }, [token]);

    async function attemptSubmitCode(code) {
        const url = config.backendUrl+'auth/recover';
        const body = {
            code: code
        }
        try {
            const response = await axios.post(url, body, {});
            const data = response?.data;
            let user = data?.user;
            user.token = data?.token;
            dispatchLogin(dispatch, user);
            setStep(Steps.SETNEW);
        } catch (error) {
            setError({severity: 'error', message: "This code did not work."})
            setStep(Steps.ENTERCODE);
        }
    }

    async function handleEnterEmail(form) {
        setError(null);
        const url = config.backendUrl+'account/support/forgot-password';
        const body = form;

        if(!form?.email || form.email.replace(' ', '')==='') {
            setError({severity: 'error', message: 'Please enter your email address'});
            return;
        }

        try {
            await axios.post(url, body, {});
            setError({
                severity: 'success',
                message: 'If a user with this email exists, you will receive an email shortly. Please check your Spam folder.'
            })
            setStep(Steps.ENTERCODE);
        } catch (error) {
            setError({severity: 'error', message: 'Something went wrong, try again later'});
        }
    }

    async function handleEnterCode(form) {
        setError(null);
        if(form?.code && form?.code?.replace(' ', '')!=='') {
            attemptSubmitCode(form.code);
        } else {
            setError({severity: "error", message: "Please enter your recovery code."});
        }
    }

    async function handleEnterNewPassword(form) {
        setError(null);
        if(form?.password !== form?.confirmPassword) {
            setError({
                severity: 'error',
                message: 'Passwords do not match'
            });
            return;
        }

        if(!form || !form.password || !form.confirmPassword) {
            setError({
                severity: 'error',
                message: 'Please enter a password'
            });
            return;
        }

        if(form?.password.includes(' ')) {
            setError({
                severity: 'error',
                message: 'Password cannot have spaces'
            });
            return;
        }

        if(form?.password.replace(' ', '') === '') {
            setError({
                severity: 'error',
                message: 'Please enter a password'
            });
            return;
        }

        const url = config.backendUrl + 'auth/change-password';
        const body = {
            new_password: form?.password 
        }
        const request_config = {
            headers: {
                Authorization: `Bearer ${newToken}`
            }
        }

        try {
            await axios.post(url, body, request_config);
            navigate('/')
        } catch (error) {
            console.log(error);
            if(error?.response?.data?.message) {
                setError({severity: 'error',message: error?.response?.data?.message});
            } else {
                setError({severity: 'error',message: 'Could not change password'});
            }
        }
    }

    return (
        step === Steps.ENTEREMAIL? 
        <EnterEmailStep
            handleEnterEmail={handleEnterEmail}
            error = {error}
        />:
        step === Steps.ENTERCODE?
        <EnterCodeStep
            handleEnterCode={handleEnterCode}
            error = {error}
        />:
        step === Steps.SETNEW?
        <EnterNewPassStep
            handleEnterNewPassword={handleEnterNewPassword}
            error = {error}
        />:
        <Grid container>
            <Grid item xs={12}>
                <Typography>Loading...</Typography>
            </Grid>
        </Grid>
    )
}

ForgotPasswordTransferer.propTypes = {
    param_code: PropTypes.string,
};

export default ForgotPasswordTransferer;