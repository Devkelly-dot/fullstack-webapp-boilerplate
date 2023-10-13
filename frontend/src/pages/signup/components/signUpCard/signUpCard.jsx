import PropTypes from 'prop-types';

import {Box, Card, CardContent, Grid, Typography} from '@mui/material'
import config from '../../../../config';
import EmailSignUpSection from './components/emailSignUpSection';

function SignUpCard({onRegisterClick, form, updateForm, error}) {
    return (
        <Grid container sx={{display:"flex", justifyContent:"center"}}>
            <Grid item xs={12} md={6}>
                <Card>
                    <CardContent>
                        <Grid container sx={{display:"flex", flexDirection:"column"}}>
                            <Grid item xs={12}>
                                <Box sx={{textAlign:"center"}}>
                                    <Typography variant="h5" sx={{color:config.brand_text_color_main}}>Welcome to {config.brand_name}</Typography>
                                    <Typography variant="h6">Sign up with</Typography>
                                </Box>
                            </Grid>
                            
                            <Grid item xs={12}>
                                <EmailSignUpSection
                                    form = {form}
                                    updateEmail = {
                                        (email)=>{
                                            updateForm && form && updateForm({...form, email: email})
                                        }
                                    }
                                    updateUsername = {
                                        (user)=>{
                                            updateForm && form && updateForm({...form, username: user})
                                        }
                                    }
                                    updatePassword = {
                                        (pass)=>{
                                            updateForm && form && updateForm({...form, password: pass})
                                        }
                                    }
                                    updateConfirmPassword = {
                                        (pass)=>{
                                            updateForm && form && updateForm({...form, confirmPassword: pass})
                                        }
                                    }
                                    onRegisterClick={onRegisterClick}
                                    error={error}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

SignUpCard.propTypes = {
    onGoogleOAuthClick: PropTypes.func,
    onRegisterClick: PropTypes.func,
    form: PropTypes.object,
    updateForm: PropTypes.func,
    error: PropTypes.object
};

export default SignUpCard;