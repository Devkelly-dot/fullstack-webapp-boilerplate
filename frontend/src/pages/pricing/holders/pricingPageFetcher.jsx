import { useEffect, useState } from "react";
import PricingPageTransferer from "./pricingPageTransferer";
import { Typography } from "@mui/material";
import config from "../../../config";
import axios from "axios";
import { useSelector } from "react-redux";

function PricingPageFetcher() {
    const [pricingData, setPricingData] = useState(null);
    const [subscriptionData, setSubscriptionData] = useState(null);

    const token = useSelector((state)=>state.auth.token); 

    function handleSubscriptionDataChanged(data) {
        setSubscriptionData(data);
    }
    useEffect(()=>{
        async function fetchAndSetPricingData() {
            const url = config.backendUrl+'subscription-plans';
            try {
                const response = await axios.get(url);
                const data = response?.data; 
                setPricingData(data);
            } catch (error) {
                console.log(error);
            }   
        }

        async function fetchAndSetSubscriptionData() {
            const url = config.backendUrl+'account/subscription/info';

            try {
                const request_config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };

                const response = await axios.get(url, request_config);
                const data = response?.data;
                setSubscriptionData(data);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchAndSetPricingData();

        if(token) {
            fetchAndSetSubscriptionData();
        }
    },[token]);

    return (
        <>
        {
            pricingData?
            <PricingPageTransferer
                pricingData={pricingData}
                subscriptionData={subscriptionData}
                handleSubscriptionDataChanged = {handleSubscriptionDataChanged}
            />:
            <Typography>Loading Pricing Data...</Typography>
        }
        </>
    )
}

export default PricingPageFetcher;