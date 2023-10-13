import PropTypes from 'prop-types';
import { Grid,  Dialog, DialogContent, Typography, Button, Box } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import config from '../../../../config';
import { useNavigate } from 'react-router-dom';

function LoginModal({isOpen}) {
    const navigate = useNavigate();
    return (
        <Dialog
            open={isOpen}
        >
            <DialogContent>
                <Grid container>
                    <Box sx={{width:"100%", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", marginBottom:"3rem"}}>
                        <LockOutlinedIcon sx={{color: config.brand_color_main}}/>
                        <Typography variant="h6" sx={{color:config.brand_text_color_main}}>Login Required</Typography>
                        <Typography variant="subtitle1">You must be logged in to view your account</Typography>
                    </Box>
                    <Grid item xs={12}>
                        <Button 
                            variant = "contained" 
                            sx={{width: "100%", color:config.brand_text_color_secondary, backgroundColor:config.brand_color_main}}
                            onClick={()=>navigate('/auth/signin')}
                        >
                                Login
                        </Button>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    )
}

LoginModal.propTypes = {
    isOpen: PropTypes.bool
};

export default LoginModal;