import PropTypes from 'prop-types';

import { Alert, Grid } from "@mui/material";
import SignUpCard from "../components/signUpCard/signUpCard";

function SignUpPageContent({onRegisterClick, form, updateForm, error}) {

    return (
        <Grid container >
            {
                error?.message &&
                <Grid item xs={12} severity="error">
                    <Alert severity={error.severity?error.severity:'error'}>{error.message}</Alert>
                </Grid>
            }
            <Grid item xs={12} sx={{height:"80vh", display:"flex", flexDirection:"column", justifyContent:"center"}}>
                <Grid container>
                    <Grid item xs={12}>
                        <SignUpCard
                            form = {form}
                            updateForm = {updateForm}
                            onRegisterClick={onRegisterClick}
                            error={error}
                        />
                    </Grid>
                </Grid>
            </Grid>
            
        </Grid>
    )
}

SignUpPageContent.propTypes = {
    form: PropTypes.object,
    updateForm: PropTypes.func,
    onRegisterClick: PropTypes.func,
    error: PropTypes.object
};

export default SignUpPageContent;