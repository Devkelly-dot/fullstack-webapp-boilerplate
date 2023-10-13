import { Grid, Typography } from '@mui/material';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';

import PropTypes from 'prop-types';

function ConfirmDowngradeContent ({calculateData}) {

    return (
        <Grid container sx={{textAlign:"center"}}>
            <Grid item xs={12}>
                <Typography variant="h4" fontWeight="bold">Downgrade to {calculateData?.subscriptionPlan?.displayName}?</Typography>
            </Grid>
            <Grid item xs={12}>
                <ArrowCircleDownIcon sx={{fontSize:"7rem", color:"#f44336"}}/>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body" sx={{fontSize:"1.2rem"}}>
                    You will retain your current plan{"'"}s benefits until the end of the Billing period. 
                </Typography>
            </Grid>
        </Grid>
    )
}
ConfirmDowngradeContent.propTypes = {
    calculateData: PropTypes.object
}
export default ConfirmDowngradeContent;