import PropTypes from 'prop-types';
import PricingPageContent from './pricingPageContent';
import { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../../config';
import { useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';

function PricingPageTransferer({pricingData, subscriptionData, handleSubscriptionDataChanged}) {
    const token = useSelector((state)=>state.auth.token);
    const [pricingPeriod, setPricingPeriod] = useState('monthly_price');
    const [subscribedClicked, setSubscribedClicked] = useState(null);
    const [error, setError] = useState(null);
    const [calculateData, setCalculateData] = useState(null);

    const stripePromise = loadStripe(config.stripe_pk);

    function periodTabChanged(new_value) {
        if(new_value) {
            if(new_value.toLowerCase() === 'monthly_price' || new_value.toLowerCase() === 'yearly_price') {
                setPricingPeriod(new_value.toLowerCase())
            }
        }
    }

    async function handleSubscribeClick(pricingData) {
        if(!pricingData || !pricingData._id) {
            return;
        }
        setSubscribedClicked(pricingData);
    }

    async function handleConfirmPayClick(subscriptionPlan) {
        await doStripeCheckout(subscriptionPlan, true);
    }

    function handleConfirmModalClose() {
        setCalculateData(null);
        setSubscribedClicked(null);
        setError(null);
    }

    useEffect(()=>{
        if(subscribedClicked && stripePromise) {
            doStripeCheckout(subscribedClicked, false);
        }
    }, [subscribedClicked, stripePromise]);

    async function doStripeCheckout(subscriptionPlan, purchasing) {
        try {
            let yearly = false;
            if(pricingPeriod === 'yearly_price') {
                yearly = true;
            }

            const body = {
                yearly: yearly,
                subscription_id: subscriptionPlan?._id,
                purchasing: purchasing
            }
            const request_config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            const response = await axios.post(config.backendUrl+'checkout', body, request_config);
            let data = response?.data;

            if(data?.id) {
                const session_id = data?.id;
                const stripe = await stripePromise;
                const {error} = await stripe.redirectToCheckout({
                    sessionId: session_id,
                });
                if(error) {
                    console.error(error);
                    setSubscribedClicked(null);
                }
            } else if(data.estimate_data) {
                data.subscriptionPlan = subscribedClicked;
                setSubscribedClicked(null);
                console.log(data)
                setCalculateData(data);
            } else {
                let new_data = {};
                new_data.onRenewal = data?.onRenewal || data?.subscriptionPlan;
                new_data.subscriptionPlan = data?.subscriptionPlan;
                new_data.subscription = data?.subscription;
                
                handleSubscriptionDataChanged(new_data);
                setSubscribedClicked(null);
            }
            
        } catch (error) {
            if(error?.response?.data?.Error && typeof error?.response?.data?.Error === 'string') {
                setError({
                    severity: 'error',
                    message: error?.response?.data?.Error
                })
            } else {
                setError({
                    severity: 'error',
                    message: "Cannot select this plan. You can cancel your Subscription in your Account settings"
                })
            }
            console.log("ERROR HERE: ",error);
            setSubscribedClicked(null);
        }
    }
    return (
        <PricingPageContent
            pricingData = {pricingData}
            pricingPeriod = {pricingPeriod}
            periodTabChanged = {periodTabChanged}
            handleSubscribeClick = {handleSubscribeClick}
            subscribedClicked = {subscribedClicked}
            subscriptionData={subscriptionData}
            error = {error}
            calculateData={calculateData}
            handleConfirmPayClick={handleConfirmPayClick}
            handleConfirmModalClose={handleConfirmModalClose}
        />
    )
}

PricingPageTransferer.propTypes={
    pricingData: PropTypes.object,
    pricingPeriod: PropTypes.oneOf(['monthly_price', 'yearly_price']),
    subscriptionData: PropTypes.object,
    handleSubscriptionDataChanged: PropTypes.func
}
export default PricingPageTransferer;