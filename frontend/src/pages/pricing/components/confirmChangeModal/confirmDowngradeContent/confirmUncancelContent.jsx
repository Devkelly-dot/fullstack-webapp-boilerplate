import { Grid, Typography } from '@mui/material';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

import PropTypes from 'prop-types';

function ConfirmUncancelContent ({calculateData}) {

    return (
        <Grid container sx={{textAlign:"center"}}>
            <Grid item xs={12}>
                <Typography variant="h4" fontWeight="bold">Return to {calculateData?.subscriptionPlan?.displayName}?</Typography>
            </Grid>
            <Grid item xs={12}>
                <ArrowCircleUpIcon sx={{fontSize:"7rem", color:"#4caf50"}}/>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body" sx={{fontSize:"1.2rem"}}>
                    Upgrade back to your Deluxe plan
                </Typography>
                <Typography variant="subtitle2" sx={{color:""}}>
                    You will not be charged for this upgrade until the billing period renews, then you will be charged as normal
                </Typography>
            </Grid>
        </Grid>
    )
}
ConfirmUncancelContent.propTypes = {
    calculateData: PropTypes.object
}
export default ConfirmUncancelContent;