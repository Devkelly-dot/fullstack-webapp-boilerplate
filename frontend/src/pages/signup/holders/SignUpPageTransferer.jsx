import { useState } from "react";
import SignUpPageContent from "./SignUpPageContent";
import config from "../../../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import dispatchLogin from "../../../ufils/auth/dispatchLogin";

function SignUpPageTransferer() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState(null)

    function validateForm() {
        let validate_email = form.email.trim(); 
        let validate_username = form.username.trim(); 
        let validate_password = form.password; 
        let validate_confirmPassword = form.confirmPassword; 

        if(validate_password.length < 8) {
            return {error: 'Password must be at least 8 characters', severity: 'error'};
        }
        if(validate_password.includes(' ')) {
            return {error: 'Please do not put spaces in your password', severity: 'error'};
        }
        if(validate_email === '') {
            return {error: "Missing Email", severity: "error"}
        }
        if(validate_username === '') {
            return {error: "Missing Username", severity: "error"}
        }
        if(validate_password === '') {
            return {error: "Missing Password", severity: "error"}
        }
        if(validate_confirmPassword === '') {
            return {error: "Missing Confirm Password", severity: "error"}
        }

        if(form.confirmPassword !== form.password) {
            return {error: "Passwords do not match", severity: "error"}
        }

        return true;
    }

    async function onRegisterClick() {
        let validate = validateForm();
        if(validate.error) {
            setError({message: validate.error});
            return;
        }    

        let url = config.backendUrl+'auth/register';
        try {
            let register_response = await axios.post(url, form, {});
            const data = register_response?.data;
            if(data.user && data.token) {
                dispatchLogin(dispatch, {
                    token: data.token,
                    username: data.user.username,
                    id: data.user.id,
                    email: data.user.email
                })
                navigate('/')
            }
        } catch (error) {
            let error_message = error?.response?.data?.Error;
            if(error_message) {
                setError({message: error_message, severity: "error"});
            } else {
                setError({message: "Something went wrong, try again later", severity: "error"});
            }
        }
    }

    return (
        <SignUpPageContent
            form = {form}
            updateForm={(form)=>{setForm(form); setError(null);}}
            onRegisterClick={onRegisterClick}
            error = {error}
        />
    )
}

export default SignUpPageTransferer;