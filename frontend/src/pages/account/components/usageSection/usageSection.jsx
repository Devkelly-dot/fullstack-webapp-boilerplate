import { Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import config from '../../../../config';
function UsageSection({subscriptionData}) {

    function formatDate(unformatted_date) {
        if(unformatted_date) {
            let date = new Date(unformatted_date);
            const formattedDate = date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });     

            return formattedDate;
        }
    }

    function getNextResetDate(unformatted_date) {
        let newDate = new Date(unformatted_date);

        newDate.setMonth(newDate.getMonth() + 1);

        return formatDate(newDate);
    }
    return (
        <Grid container>
            <Grid item xs={12} sx={{marginBottom:"1rem", display: {xs: "flex", md:""}, justifyContent:{xs:"center", md:"flex-start"}}}>
                <Typography sx={{color:config.brand_text_color_main}} fontWeight='bold' variant="h5">Usage</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography fontWeight={"bold"}>
                    Messages Available:&nbsp;&nbsp;  
                    <span style={{color:config.brand_text_color_main}}>
                        {
                            subscriptionData?.subscription?.messages_left?
                            `${subscriptionData?.subscription?.messages_left} / ${subscriptionData?.subscriptionPlan.includes?.messages}`:
                            "Unlimited Messages"
                        }
                    </span>
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>
                    Your messages will reset on  
                <span>
                    {` ${getNextResetDate(subscriptionData?.subscription?.last_reset)}`}
                </span>
                </Typography>
            </Grid>
        </Grid>
    )
}
UsageSection.propTypes = {
    subscriptionData: PropTypes.object,
    pricingData: PropTypes.object
}
export default UsageSection;