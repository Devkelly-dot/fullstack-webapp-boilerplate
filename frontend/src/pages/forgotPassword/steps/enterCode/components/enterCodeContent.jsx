import { Alert, Button, Grid, TextField } from '@mui/material';
import PropTypes from 'prop-types';

function EnterCodeContent({form, updateForm, handleSubmit, error}) {
    function handleCodeChange(e) {
        updateForm({
            ...form,
            code: e.target.value
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
                    label="Recovery Code"
                    value={form?.code}
                    onChange={handleCodeChange}
                    type="text"
                />
            </Grid>
            <Grid item xs={12}>
                <Button onClick={submitForm}>Enter</Button>
            </Grid>
        </Grid>
    )
}


EnterCodeContent.propTypes = {
    form: PropTypes.object,
    updateForm: PropTypes.func,
    handleSubmit: PropTypes.func,
    error: PropTypes.object,
};

export default EnterCodeContent;