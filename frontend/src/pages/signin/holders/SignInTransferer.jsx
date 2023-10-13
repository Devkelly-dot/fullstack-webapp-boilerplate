import { useState } from 'react'
import SignInContent from './SignInContent'
import config from '../../../config'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import dispatchLogin from "../../../ufils/auth/dispatchLogin";
import { useNavigate } from 'react-router-dom';

function SignInTransferer() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [form, setForm] = useState(
        {
            email: "",
            password: ""
        }
    )

    const [error, setError] = useState(null);

    async function onGoogleOAuthClick() {

    }

    async function onLoginClick() {
        const url = config.backendUrl+'auth/login';
        try {
            let login_response = await axios.post(url,form,{});
            if(login_response) {
                const data = login_response?.data;
                dispatchLogin(dispatch, {
                    token: data.token,
                    ...data.user
                });
                navigate('/')
            }
        } catch (e) {
            if(e.response?.data?.Error) {
                setError({
                    message: e.response?.data?.Error,
                    severity: "error"
                })
            } else {
                setError({
                    message: "Something went wrong, try again later",
                    severity: "error"
                })
            }
        }
    }


    return (
        <SignInContent
            onGoogleOAuthClick = {onGoogleOAuthClick}
            onLoginClick = {onLoginClick}
            form = {form}
            updateForm = {(form)=>setForm(form)}
            error={error}
        />
    )
}

export default SignInTransferer