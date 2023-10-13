import { Box, Button, Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import config from '../../../../config';
import Features from '../../../pricing/components/pricingCards/pricingCard/widgets/features';
function SubscriptionSection({subscriptionData, pricingData, handleRenewChange}) {
    const features = {
        tier0: [
            {
                includes: true,
                title: `${pricingData?.tier0?.includes?.messages?pricingData?.tier0?.includes?.messages:'Unlimited'} messages/month`
            },
            {
                includes: false,
                title: `Memory deleted after 7 days of inactivity`
            },
            {
                includes: false,
                title: `Low priority chat (May be unavailable during peak times)`
            },
            {
                includes: true,
                title: `Create your own characters`
            },
            {
                includes: true,
                title: `Access characters created by the community`
            }
        ],
        tier1: [
            {
                includes: true,
                title: `${pricingData?.tier1?.includes?.messages?pricingData?.tier1?.includes?.messages:'Unlimited'} messages/month`
            },
            {
                includes: false,
                title: `Limited Memory`
            },
            {
                includes: true,
                title: `Dedicated chat with basic priority`
            },
            {
                includes: true,
                title: `Create your own characters`
            },
            {
                includes: true,
                title: `Access characters created by the community`
            }
        ],
        tier2: [
            {
                includes: true,
                title: `${pricingData?.tier2?.includes?.messages?pricingData?.tier2?.includes?.messages:'Unlimited'} messages/month`
            },
            {
                includes: true,
                title: `Good Memory`
            },
            {
                includes: true,
                title: `Dedicated chat with medium priority`
            },
            {
                includes: true,
                title: `Create your own characters`
            },
            {
                includes: true,
                title: `Access characters created by the community`
            }
        ],
        tier3: [
            {
                includes: true,
                title: `${pricingData?.tier3?.includes?.messages?pricingData?.tier3?.includes?.messages:'Unlimited'} messages/month`
            },
            {
                includes: true,
                title: `Maximum Memory`
            },
            {
                includes: true,
                title: `Dedicated chat with high priority`
            },
            {
                includes: true,
                title: `Create your own characters`
            },
            {
                includes: true,
                title: `Access characters created by the community`
            },
            {
                includes: true,
                title: `Access characters created by the community`,
                color: config.brand_text_color_main
            },
            {
                includes: true,
                title: `Access characters created by the community`,
                color: config.brand_text_color_main
            }
        ]
    }

    function renderFeatures() {
        const targetId = subscriptionData?.subscriptionPlan?._id;
        let target_key = null;
        for (const key in pricingData) {
            if (pricingData[key]?._id?.toString() === targetId?.toString()) {
                target_key = key;
            }
        }
        
        let feature_list = features[target_key];
        return (
            <Features
                features = {feature_list}
            />
        )
    }

    function formatDate(unformatted_date) {
        if(subscriptionData?.renewal_data?.renewalDate) {
            let date = new Date(unformatted_date);
            const formattedDate = date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });     

            return formattedDate;
        }
    }

    return (
        <Grid container>
            <Grid item xs={12} sx={{marginBottom:"1rem", display: {xs: "flex", md:""}, justifyContent:{xs:"center", md:"flex-start"}}}>
                <Typography sx={{color:config.brand_text_color_main}} fontWeight='bold' variant="h5">Your Plan</Typography>
            </Grid>
            <Grid item xs={12} sx={{marginBottom:"1rem", display: {xs: "flex", md:""}, justifyContent:{xs:"center", md:"flex-start"}}}>
                <Box sx={{display:""}}>
                    <Typography fontWeight='bold' variant="body1" fontSize="1.1rem">
                        You are on the <span style={{color:config.brand_text_color_main}}>{subscriptionData?.subscriptionPlan?.displayName} Plan</span>
                    </Typography>
                </Box>
            </Grid>
            {
                pricingData && 
                <Grid item xs={12} sx={{marginBottom:"1rem"}}>
                    {
                        renderFeatures()
                    }
                </Grid>
            }
            {
                subscriptionData?.renewal_data?.renewalDate &&
                <Grid item xs={12}>
                    <Typography>
                        Your subscription 
                        <span>
                            {subscriptionData?.renewal_data?.isSetToRenew?" renews":" ends"} on {formatDate(subscriptionData?.renewal_data?.renewalDate)}
                        </span>
                    </Typography>
                </Grid>
            }
            {
                subscriptionData?.renewal_data?.renewalDate &&
                <Grid item xs={12}>
                    {
                        subscriptionData?.renewal_data?.isSetToRenew?
                        <Button onClick={handleRenewChange}>Cancel Subscription</Button>:
                        <Button onClick={handleRenewChange}>Turn on Auto Renew</Button>
                    }
                </Grid>
            }
        </Grid>
    )
}
SubscriptionSection.propTypes = {
    subscriptionData: PropTypes.object,
    pricingData: PropTypes.object,
    handleRenewChange: PropTypes.func,
}
export default SubscriptionSection;