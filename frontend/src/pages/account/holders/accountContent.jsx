import PropTypes from 'prop-types';
import { Alert, Box, Divider, Grid, Typography } from "@mui/material";
import NsfwSwitch from '../../../components/nsfwSwitch/nsfwSwitch';
import EmailSection from '../components/emailSection/emailSection';
import HeaderSection from '../components/headerSection/headerSection';
import BonusSection from '../components/bonusSection/bonusSection';
import SubscriptionSection from '../components/subscriptionSection/subscriptionSection';
import UsageSection from '../components/usageSection/usageSection';

function AccountContent({accountData, error, subscriptionData, pricingData, handleRenewChange}) {

    return (
        <Grid container>
            {
                error?.message && 
                <Grid item xs={12}>
                    <Alert severity = {error.severity?error.severity:'error'}>{error.message}</Alert>
                </Grid>
            }
            {
                accountData?.user?
                <Grid item xs={12}>
                    <Box sx={{margin: "1rem 0", display:"flex"}}>
                        <HeaderSection
                            accountData={accountData}
                        />
                    </Box>
                    <Box sx={{margin: "1rem 0", display:"flex", justifyContent:{xs:"center", md:"flex-start"}}}>
                        <NsfwSwitch/>
                    </Box>
                    <Divider/>
                    <Box sx={{margin: "1rem 0"}}>
                        <SubscriptionSection
                            subscriptionData={subscriptionData}
                            pricingData={pricingData}
                            handleRenewChange={handleRenewChange}
                        />
                    </Box>
                    <Divider/>
                    <Box sx={{margin: "1rem 0"}}>
                        <UsageSection
                            subscriptionData={subscriptionData}
                        />
                    </Box>
                    <Divider/>
                    <Box sx={{margin: "1rem 0"}}>
                        <EmailSection
                            accountData={accountData}
                        />
                    </Box>
                    <Divider/>
                    <Box sx={{margin: "1rem 0"}}>
                        <BonusSection
                            accountData={accountData}
                        />
                    </Box>
                    <Divider/>
                </Grid>:
                <Grid item xs={12}>
                    <Typography>Loading...</Typography>
                </Grid>
            }
            
        </Grid>
    )
}

AccountContent.propTypes = {
    accountData: PropTypes.object,
    error: PropTypes.object,
    subscriptionData: PropTypes.object,
    pricingData: PropTypes.object,
    handleRenewChange: PropTypes.func,
}

export default AccountContent;