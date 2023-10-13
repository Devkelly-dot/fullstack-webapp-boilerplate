import { useSelector } from "react-redux";
import EditProfileTransferer from "./editProfileTransferer";
import { useEffect, useState } from "react";
import config from "../../../config";
import axios from "axios";

function EditProfileFetcher() {
    const token = useSelector((state)=>state.auth.token);
    const [accountData, setAccountData] = useState(null);
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
                const data = account_data?.data?.user;
                setAccountData(data);
            } catch (error) {
                console.log(error);
                setError({message: "Could not fetch account data", severity: "error"});
            }
        }

        fetchAccountData()
    },[token]);

    return (
        <EditProfileTransferer
            user = {accountData}
            error={error}
        />
    )
}

export default EditProfileFetcher;