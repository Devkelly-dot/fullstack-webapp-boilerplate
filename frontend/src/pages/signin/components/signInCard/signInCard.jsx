import PropTypes from 'prop-types';

import {Box, Card, CardContent, Grid, Typography} from '@mui/material'
import config from '../../../../config';
import EmailSigninSection from './components/emailSigninSection';

function SignInCard({onLoginClick, form, updateForm}) {
    return (
        <Grid container sx={{display:"flex", justifyContent:"center"}}>
            <Grid item xs={12} md={6}>
                <Card>
                    <CardContent>
                        <Grid container sx={{display:"flex", flexDirection:"column"}}>
                            <Grid item xs={12}>
                                <Box sx={{textAlign:"center"}}>
                                    <Typography variant="h5" sx={{color:config.brand_text_color_main}}>Welcome to {config.brand_name}</Typography>
                                    <Typography variant="h6">Sign in with</Typography>
                                </Box>
                            </Grid>
                            
                            <Grid item xs={12}>
                                <EmailSigninSection
                                    form = {form}
                                    updateEmail = {
                                        (email)=>{
                                            updateForm && form && updateForm({...form, email: email})
                                        }
                                    }
                                    updatePassword = {
                                        (pass)=>{
                                            updateForm && form && updateForm({...form, password: pass})
                                        }
                                    }

                                    onLoginClick={onLoginClick}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

SignInCard.propTypes = {
    onGoogleOAuthClick: PropTypes.func,
    onLoginClick: PropTypes.func,
    form: PropTypes.object,
    updateForm: PropTypes.func
};

export default SignInCard;