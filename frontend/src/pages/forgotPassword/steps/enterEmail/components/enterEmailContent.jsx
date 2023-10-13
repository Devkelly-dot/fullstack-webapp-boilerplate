import { Alert, Button, Grid, TextField } from '@mui/material';
import PropTypes from 'prop-types';

function EnterEmailContent({form, updateForm, handleSubmit, error}) {
    function handleEmailChange(e) {
        updateForm({
            ...form,
            email: e.target.value
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
            <Grid item xs={12}>
                <Button onClick={submitForm}>Recover Password</Button>
            </Grid>
        </Grid>
    )
}


EnterEmailContent.propTypes = {
    form: PropTypes.object,
    updateForm: PropTypes.func,
    handleSubmit: PropTypes.func,
    error: PropTypes.object,
};

export default EnterEmailContent;