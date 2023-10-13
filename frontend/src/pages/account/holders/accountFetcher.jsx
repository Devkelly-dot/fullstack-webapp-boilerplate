import { useState } from "react";
import { useEffect } from "react";
import config from '../../../config';
import { useSelector } from "react-redux";
import axios from "axios";
import AccountTransferer from "./accountTransferer";

function AccountFetcher() {
    const token = useSelector((state)=>state.auth.token);

    const [accountData, setAccountData] = useState(null);
    const [subscriptionData, setSubscriptionData] = useState(null);
    const [pricingData, setPricingData] = useState(null);

    const [error, setError] = useState(null);

    useEffect(()=>{
        async function fetchAccountData() {
            if(!token) {
                return;
            }

            const url = config.backendUrl+'account/';
            const request_config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const account_data = await axios.get(url, request_config);
                const data = account_data?.data;
                setAccountData(data);
            } catch (error) {
                console.log(error);
                setError({message: "Could not fetch account data", severity: "error"});
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
            } catch (error) {
                console.log(error);
            }
        }
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

        fetchAccountData();
        fetchAndSetSubscriptionData();
        fetchAndSetPricingData();
    },[token]);

    return (
        <AccountTransferer
            accountData = {accountData}
            subscriptionData={subscriptionData}
            pricingData={pricingData}
            error = {error}
        />
    )
}

export default AccountFetcher;