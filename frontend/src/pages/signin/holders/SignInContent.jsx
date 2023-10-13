import PropTypes from 'prop-types';

import { Alert, Grid } from '@mui/material'
import SignInCard from '../components/signInCard/signInCard';

function SignInContent({onGoogleOAuthClick, onLoginClick, form, updateForm, error}) {

    return (
        <Grid container>
            {
                error?.message &&
                <Grid item xs={12}>
                    <Alert severity = {error.severity?error.severity:'error'}>{error.message}</Alert>
                </Grid>
            }
            <Grid item xs={12} sx={{height:"80vh", display:"flex", flexDirection:"column", justifyContent:"center"}}>
                <SignInCard
                    onGoogleOAuthClick = {onGoogleOAuthClick}
                    onLoginClick = {onLoginClick}
                    form = {form}
                    updateForm = {updateForm}
                />
            </Grid>
        </Grid>
    )
}

SignInContent.propTypes = {
    onGoogleOAuthClick: PropTypes.func,
    onLoginClick: PropTypes.func,
    form: PropTypes.object,
    updateForm: PropTypes.func,
    error: PropTypes.string
};

export default SignInContent;