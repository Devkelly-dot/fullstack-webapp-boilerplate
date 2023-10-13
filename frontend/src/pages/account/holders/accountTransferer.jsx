import PropTypes from 'prop-types';
import AccountContent from './accountContent';
import { useEffect, useState } from 'react';
import config from '../../../config';
import { useSelector } from 'react-redux';
import axios from 'axios';

function AccountTransferer({accountData, error, subscriptionData, pricingData}) {
    const token = useSelector((state)=>state.auth.token);
    const [updatedData, setUpdatedData] = useState(subscriptionData);

    useEffect(()=>{
        setUpdatedData(subscriptionData);
    }, [subscriptionData])

    async function handleRenewChange() {
        let url = config.backendUrl+'subscription/renewal/modify';
        let body = {};
        if(updatedData?.renewal_data?.isSetToRenew) {
            body.do_renew = false;
        } else {
            body.do_renew = true;
        }

        const request_config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        try {
            let return_data = await axios.patch(url, body, request_config);
            if(return_data.status === 200) {
                setUpdatedData({
                    ...updatedData,
                    renewal_data: {
                        ...updatedData.renewal_data,
                        isSetToRenew: !updatedData?.renewal_data?.isSetToRenew
                    }
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <AccountContent
            accountData = {accountData}
            error = {error}
            subscriptionData={updatedData}
            pricingData={pricingData}
            handleRenewChange={handleRenewChange}
        />
    )
}

AccountTransferer.propTypes = {
    accountData: PropTypes.object,
    error: PropTypes.object,
    subscriptionData: PropTypes.object,
    pricingData: PropTypes.object,
    handleRenewChange: PropTypes.func,
};

export default AccountTransferer;