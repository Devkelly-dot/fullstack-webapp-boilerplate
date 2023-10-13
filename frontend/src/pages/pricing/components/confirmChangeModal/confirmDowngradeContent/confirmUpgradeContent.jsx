import { Grid, Typography } from '@mui/material';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

import PropTypes from 'prop-types';

function ConfirmUpgradeContent ({calculateData}) {

    return (
        <Grid container sx={{textAlign:"center"}}>
            <Grid item xs={12}>
                <Typography variant="h4" fontWeight="bold">Upgrade to {calculateData?.subscriptionPlan?.displayName}?</Typography>
            </Grid>
            <Grid item xs={12}>
                <ArrowCircleUpIcon sx={{fontSize:"7rem", color:"#4caf50"}}/>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h5" fontWeight={"bold"} sx={{fontSize:"1.2rem"}}>
                    Upgrade Cost: ${calculateData?.estimate_data?.costDifference}
                </Typography>
                <Typography variant="subtitle2" sx={{color:""}}>
                    Your upgrade cost is prorated based on time remaining in the current billing period. ${calculateData?.estimate_data?.costDifference} is the maximum upgrade cost.
                </Typography>
                <Typography variant="subtitle2" fontWeight={"bold"} sx={{color:"", marginTop:"0.5rem"}}>
                    You will be charged for the full price of this plan starting next billing period.
                </Typography>
            </Grid>
        </Grid>
    )
}
ConfirmUpgradeContent.propTypes = {
    calculateData: PropTypes.object
}
export default ConfirmUpgradeContent;