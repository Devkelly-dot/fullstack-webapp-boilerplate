import { Alert, Box, Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import PricingCards from '../components/pricingCards/pricingCards';
import config from '../../../config';
import ConfirmUpgradeModal from '../components/confirmChangeModal/confirmUpgradeModal';

function PricingPageContent({pricingData, pricingPeriod, periodTabChanged, handleSubscribeClick, subscribedClicked, subscriptionData, error, 
    calculateData, handleConfirmPayClick, handleConfirmModalClose}) {
    
        console.log(subscribedClicked)
    return (
        <>
        {
            calculateData && 
            <ConfirmUpgradeModal
                calculateData = {calculateData}
                handleConfirmPayClick = {handleConfirmPayClick}
                handleConfirmModalClose = {handleConfirmModalClose}
                subscribedClicked={subscribedClicked}
                subscriptionData={subscriptionData}
            />
        }
        <Grid container sx={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
            <Grid item xs={12}>
                <Typography variant="h6" fontWeight="bold" sx={{color:config.brand_text_color_main, marginBottom:"1.5rem"}}>Unlock Your Chat&#39;s Potential!</Typography>
            </Grid>
            <Grid item xs={12} sx={{marginBottom:"1.5rem", paddingLeft: {xs:"0", md:"1rem"}}}>
                <Box sx={{border:'1px solid black', width:"10rem", borderRadius:"25px", padding:"0.25rem", display:"flex", justifyContent:"space-between"}}>
                    <Box 
                        sx={{
                            borderRadius: '25px',
                            padding: "0.25rem",
                            backgroundColor: pricingPeriod==='monthly_price'?config.brand_color_main:config.brand_color_secondary, 
                            color:pricingPeriod==='monthly_price'?config.brand_text_color_secondary:config.brand_text_color_main,
                            cursor:"pointer"
                        }}
                        onClick={()=>{periodTabChanged&&periodTabChanged('monthly_price')}}
                    >
                        Monthly
                    </Box>
                    <Box 
                        sx={{
                            borderRadius: '25px',
                            padding: "0.25rem",
                            backgroundColor: pricingPeriod==='yearly_price'?config.brand_color_main:config.brand_color_secondary, 
                            color:pricingPeriod==='yearly_price'?config.brand_text_color_secondary:config.brand_text_color_main,
                            cursor:"pointer"
                        }}
                        onClick={()=>{periodTabChanged&&periodTabChanged('yearly_price')}}
                    >
                        Anually
                    </Box>
                </Box>
                
            </Grid>
            {
                error && error.message && 
                <Grid item xs={12}>
                    <Alert severity = {error.severity?error.severity:"error"}>
                        {error.message}
                    </Alert>
                </Grid>
            }
            <Grid item xs={12} md={8}>
                <PricingCards
                    pricingData={pricingData}
                    pricingPeriod={pricingPeriod}
                    handleSubscribeClick={handleSubscribeClick}
                    subscribedClicked = {subscribedClicked}
                    subscriptionData={subscriptionData}
                    error = {error}
                />
            </Grid>
        </Grid>
        </>
        
    )
}

PricingPageContent.propTypes = {
    pricingData: PropTypes.object,
    pricingPeriod: PropTypes.oneOf(['monthly_price', 'yearly_price']),
    periodTabChanged: PropTypes.func,
    handleSubscribeClick: PropTypes.func,
    subscribedClicked: PropTypes.object,
    subscriptionData: PropTypes.object,
    error: PropTypes.object,
    calculateData: PropTypes.object,
    handleConfirmPayClick: PropTypes.func,
    handleConfirmModalClose: PropTypes.func,
}

export default PricingPageContent;