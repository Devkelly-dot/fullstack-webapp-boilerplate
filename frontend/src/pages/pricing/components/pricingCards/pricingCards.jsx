import PropTypes from 'prop-types';
import PricingCard from './pricingCard/pricingCard';
import { Grid } from '@mui/material';
import config from '../../../../config';

function PricingCards({pricingData, pricingPeriod, handleSubscribeClick, subscribedClicked, subscriptionData}) {

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
    return (
        <>
        {
            pricingData && 
            <>
                <Grid container>
                {
                    ['tier0', 'tier1', 'tier2', 'tier3'].map((tier)=>{
                        return (
                            <Grid 
                                item xs={12} md={6} key={tier}
                                sx={{
                                    padding:{
                                        xs:"0",
                                        md:"0rem 1rem"
                                    },
                                    marginBottom: "2rem"
                                }}
                            >
                                <PricingCard
                                    pricingData = {pricingData[tier]}
                                    pricingPeriod = {pricingPeriod}
                                    features = {features[tier]}
                                    handleSubscribeClick={handleSubscribeClick}
                                    subscribedClicked={subscribedClicked}
                                    subscriptionData={subscriptionData}
                                />
                            </Grid>
                        )
                    })
                }
                </Grid>
            </>
        }
        </>
    )
}

PricingCards.propTypes = {
    pricingData: PropTypes.object,
    pricingPeriod: PropTypes.oneOf(['monthly_price', 'yearly_price']),
    handleSubscribeClick: PropTypes.func,
    subscribedClicked: PropTypes.func,
    subscriptionData: PropTypes.object,
};

export default PricingCards;