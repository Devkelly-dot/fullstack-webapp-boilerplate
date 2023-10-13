import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import config from '../../../../../config';
import Features from './widgets/features';
import { useEffect, useState } from 'react';

function PricingCard({pricingData, pricingPeriod, features, customCardStyle, customPriceStyle, customTitleStyle, handleSubscribeClick, subscribedClicked, subscriptionData}) {
    const [buttonText, setButtonText] = useState("Subscribe");
    const [disabled, setDisabled] = useState(false);

    function renderButtonText() {
        if(subscribedClicked && subscribedClicked._id === pricingData._id) {
            return "Thank you!";
        }
        
        if(subscriptionData && (subscriptionData?.subscriptionPlan?._id?.toString() === pricingData?._id?.toString())
        && (subscriptionData?.onRenewal?._id?.toString() === pricingData?._id?.toString())) {
            return "Subscribed"
        }

        if(subscriptionData && (subscriptionData?.subscriptionPlan?._id?.toString() === pricingData?._id?.toString()) 
        && (subscriptionData?.onRenewal?._id?.toString() !== pricingData?._id?.toString())) {
            return "Un-Cancel";
        }

        if(subscriptionData && (subscriptionData?.onRenewal?._id?.toString() === pricingData?._id?.toString())) {
            return "On Renewal"
        }

        return "Subscribe"
    }

    function isDisabled() {
        if(subscribedClicked) {
            return true;
        }
        if(subscriptionData && (subscriptionData?.subscriptionPlan?._id?.toString() === pricingData?._id?.toString()) 
        && (subscriptionData?.onRenewal?._id?.toString() === pricingData?._id?.toString())) {
            return true;
        }
        if(subscriptionData && (subscriptionData?.onRenewal?._id?.toString() === pricingData?._id?.toString())) {
            return true;
        }

        return false;
    }

    useEffect(()=>{
        let new_buttonText = renderButtonText();
        let new_disabled = isDisabled();
        setButtonText(new_buttonText);
        setDisabled(new_disabled);
    }, [pricingData, subscriptionData])
    return (
        <Card sx={{ minHeight: '32rem', padding:"1rem", ...(customCardStyle || {}) }}>
            <CardContent>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="h6" fontWeight="bold" sx={customTitleStyle&&customTitleStyle}>{pricingData?.displayName}</Typography>
                    </Grid>
                    <Grid item xs={12} sx={{display:"flex", gap:"0.1rem", alignItems:"flex-end"}}>
                        <Typography variant="h4"  fontWeight="bold" sx={customPriceStyle&&customPriceStyle}>
                            $
                            {
                                pricingPeriod === 'yearly_price'?
                                (pricingData?.[pricingPeriod] / 100 / 12).toFixed(2):
                                pricingData?.[pricingPeriod] / 100
                            }
                        </Typography>
                        <Typography variant="body1" fontWeight="bold" sx={customPriceStyle&&customPriceStyle} >/mo</Typography>
                    </Grid>
                    {
                        pricingPeriod === 'yearly_price'&&
                        <Grid item xs={12} sx={{display:"flex", alignItems:"flex-end", gap:"1rem"}}>
                            <Box sx={{display:"flex", gap:"0.4rem", alignItems:"flex-end"}}>
                                <Typography variant="h6"  fontWeight="bold"  sx={{color: config.brand_text_color_main, ...(customPriceStyle || {})}}>
                                        ${pricingData?.[pricingPeriod] / 100}
                                    </Typography>
                                <Typography variant="h6" fontWeight="bold" sx={{color: config.brand_text_color_main, ...(customPriceStyle || {})}} >/ year</Typography>
                            </Box>
                            <Box>
                                <Typography variant="h6"  fontWeight="bold"  
                                    sx={{textDecoration: 'line-through', color: "gray", ...(customPriceStyle || {})}}
                                >
                                    ${(pricingData?.['monthly_price'] *12) / 100} / year
                                </Typography>
                            </Box>
                        </Grid>
                    }
                    <Grid item xs={12} sx={{margin: "1rem 0"}}>
                        <Button 
                            sx={{
                                width:"100%",backgroundColor:config.brand_color_main, color: config.brand_text_color_secondary,
                                ':disabled': {
                                    backgroundColor: 'gray', // Change the background color for disabled state
                                    color: 'lightgray',      // Change the text color for disabled state
                                },
                                ':hover': {
                                    backgroundColor: config.brand_text_color_secondary , 
                                    color: config.brand_color_main,
                                    border: `1px solid ${config.brand_color_main}`
                                }
                            }}
                            onClick={()=>handleSubscribeClick&&handleSubscribeClick(pricingData)}
                            disabled = {disabled}
                        >
                            {
                                buttonText
                            }
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Features
                            features={features}
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

PricingCard.propTypes = {
    pricingData: PropTypes.object,
    pricingPeriod: PropTypes.oneOf(['monthly_price', 'yearly_price']),
    features: PropTypes.array,
    topTag: PropTypes.object,
    customCardStyle: PropTypes.object,
    customPriceStyle: PropTypes.object,
    customTitleStyle: PropTypes.object,
    handleSubscribeClick: PropTypes.func,
    subscribedClicked: PropTypes.func,
    subscriptionData: PropTypes.object,
};

export default PricingCard;