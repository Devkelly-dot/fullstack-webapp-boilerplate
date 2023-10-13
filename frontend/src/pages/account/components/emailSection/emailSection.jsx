import PropTypes from 'prop-types';
import { Box, Grid, Typography } from "@mui/material";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import config from '../../../../config';

function EmailSection({accountData}) {
    return (
        <Grid container>
            <Grid item xs={12} sx={{marginBottom:"1rem", display: {xs: "flex", md:""}, justifyContent:{xs:"center", md:"flex-start"}}}>
                <Typography sx={{color:config.brand_text_color_main}} fontWeight='bold' variant="h5">Your Email</Typography>
            </Grid>
            <Grid item xs={12}>
                <Box sx={{display:"flex", alignItems:"center", gap: "0.5rem", justifyContent:{xs:"center", md:"flex-start"}}}>
                    <EmailOutlinedIcon sx={{color:config.brand_color_main}} fontSize="large"/>
                    <Typography variant="h6" fontWeight="bold">{accountData?.user?.email}</Typography>
                </Box>
            </Grid>
        </Grid>
    )
}

EmailSection.propTypes = {
    accountData: PropTypes.object
}

export default EmailSection;