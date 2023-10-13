import PropTypes from 'prop-types';

import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import config from "../../../../../config";
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function EmailSigninSection({updateEmail, updatePassword, form, onLoginClick}) {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    
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

    const buttonStyle = {
        padding:"8px 12px",
        borderRadius:"8px",
        width:"100%"
    }

    return (
        <Grid container sx={{display:"flex", flexDirection:"column", gap:"1rem"}}>
            <Grid item xs={12}>
                <Typography variant="h6">Email</Typography>
            </Grid>
            <Grid item xs={12}>
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
                <Button 
                    variant="text"
                    onClick={()=>navigate('/forgot-password')}
                >
                    Forgot Password
                </Button>
            </Grid>
            <Grid item xs={12} sx={{marginTop:"1rem"}}>
                <Button 
                    onClick={onLoginClick&&onLoginClick}
                    variant="contained" 
                    sx={{...buttonStyle, backgroundColor:config.brand_color_main, color:config.brand_text_color_secondary}}
                >
                    Sign In
                </Button>
                <Button 
                    variant="text"
                    onClick={()=>navigate('/auth/register')}
                >
                    Don&rsquo;t have an Account? Sign up here
                </Button>
            </Grid>
        </Grid>
    )
}

EmailSigninSection.propTypes = {
    updateEmail: PropTypes.func,
    updatePassword: PropTypes.func,
    onLoginClick: PropTypes.func,
    form: PropTypes.object,
};

export default EmailSigninSection;