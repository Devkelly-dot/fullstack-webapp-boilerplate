import PropTypes from 'prop-types';

import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import config from "../../../../../config";
import { useEffect, useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function EmailSignUpSection({updateEmail, updateUsername, updatePassword, updateConfirmPassword, form, onRegisterClick, error}) {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [clicked, setClicked] = useState(false);

    function handleEmailChange(event) {
        const new_email = event.target.value;
        if(updateEmail) {
            updateEmail(new_email);
        }
    }

    function handlePasswordChange(event) {
        const new_pass = event.target.value;
        if(updatePassword) {
            updatePassword(new_pass);
        }
    }

    function handleUsernameChange(event) {
        const new_pass = event.target.value;
        if(updateUsername) {
            updateUsername(new_pass);
        }
    }

    function handleConfirmPasswordChange(event) {
        const new_pass = event.target.value;
        if(updateConfirmPassword) {
            updateConfirmPassword(new_pass);
        }
    }
    const buttonStyle = {
        padding:"8px 12px",
        borderRadius:"8px",
        width:"100%"
    }

    useEffect(()=>{
        setClicked(false);
    }, [error]);

    return (
        <Grid container sx={{display:"flex", flexDirection:"column", gap:"1rem"}}>
            <Grid item xs={12}>
                <Typography variant="h6">Email</Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={12} md={6} sx={{paddingRight:{xs:"0", md:"0.5rem"}, marginBottom:{xs:"1rem", md:"0"}}}>
                        <TextField
                            id="outlined-basic"
                            sx={{width:"100%"}}
                            variant="outlined"
                            label="Email"
                            value={form?.email}
                            onChange={handleEmailChange}
                            type="email"
                        />
                    </Grid>
                    <Grid item xs={12} md={6} sx={{paddingLeft:{xs:"0", md:"0.5rem"}}}>
                        <TextField
                            id="outlined-basic"
                            sx={{width:"100%"}}
                            variant="outlined"
                            label="Username"
                            value={form?.username}
                            onChange={handleUsernameChange}
                            type="text"
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} sx={{display:"flex"}}>
                <TextField
                    id="outlined-basic"
                    sx={{width:"100%"}}
                    variant="outlined"
                    label="Password"
                    value={form?.password}
                    onChange={handlePasswordChange}
                    type={showPassword ? 'text' : 'password'}
                />
                <IconButton onClick={()=>setShowPassword(!showPassword)}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    id="outlined-basic"
                    sx={{width:"100%"}}
                    variant="outlined"
                    label="Confirm Password"
                    value={form?.confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    type={showPassword ? 'text' : 'password'}
                />
            </Grid>
            <Grid item xs={12} sx={{marginTop:"1rem"}}>
                <Button 
                    onClick={()=>{onRegisterClick&&onRegisterClick(); setClicked(true);}}
                    variant="contained" 
                    sx={{...buttonStyle, backgroundColor:config.brand_color_main, color:config.brand_text_color_secondary}}
                >
                    {
                        !clicked?"Sign Up":"Please wait!"
                    }
                </Button>
                <Button 
                    variant="text"
                    onClick={()=>navigate('/auth/signin')}
                >
                    Already have an Account? Sign in here
                </Button>
            </Grid>
        </Grid>
    )
}

EmailSignUpSection.propTypes = {
    updateEmail: PropTypes.func,
    updatePassword: PropTypes.func,
    updateConfirmPassword: PropTypes.func,
    updateUsername: PropTypes.func,
    onRegisterClick: PropTypes.func,
    form: PropTypes.object,
    error: PropTypes.object
};

export default EmailSignUpSection;