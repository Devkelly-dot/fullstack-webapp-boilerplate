import { Alert, Button, Grid, TextField } from '@mui/material';
import PropTypes from 'prop-types';

function EnterNewPassContent({form, updateForm, handleSubmit, error}) {
    function handlePassChange(e) {
        updateForm({
            ...form,
            password: e.target.value
        });
    }

    function handleConfirmPassChange(e){
        updateForm({
            ...form,
            confirmPassword: e.target.value
        });
    }

    function submitForm() {
        if(handleSubmit) {
            handleSubmit();
        }
    }

    return (
        <Grid container>
            {
                error?.message && 
                <Grid item xs={12} sx={{marginBottom:"1rem"}}>
                    <Alert severity={error.severity?error.severity: 'error'}>{error.message}</Alert>
                </Grid>
            }
            
            <Grid item xs={12} sx={{marginBottom:"0.5rem"}}>
                <TextField
                    id="outlined-basic"
                    sx={{width:"100%"}}
                    variant="outlined"
                    label="Password"
                    value={form?.password}
                    onChange={handlePassChange}
                    type="password"
                />
            </Grid>

            <Grid item xs={12}>
                <TextField
                    id="outlined-basic"
                    sx={{width:"100%"}}
                    variant="outlined"
                    label="Confirm Password"
                    value={form?.confirmPassword}
                    onChange={handleConfirmPassChange}
                    type="password"
                />
            </Grid>

            <Grid item xs={12}>
                <Button onClick={submitForm}>Change Password</Button>
            </Grid>
        </Grid>
    )
}


EnterNewPassContent.propTypes = {
    form: PropTypes.object,
    updateForm: PropTypes.func,
    handleSubmit: PropTypes.func,
    error: PropTypes.object,
};

export default EnterNewPassContent;