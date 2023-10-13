import { useDispatch, useSelector } from "react-redux";
import NsfwSwitchContent from "./nsfwSwitchContent";
import PropTypes from 'prop-types';
import {setShowNsfw} from '../../../redux/authSlice';
import config from "../../../config";
import axios from "axios";

function NsfwSwitchTransferer({show_nsfw}) {
    const token = useSelector((state)=>state.auth.token);
    const dispatch = useDispatch();

    async function requestNSFWToggle(new_show_nsfw) {
        const url = config.backendUrl+'account';
        const request_config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        const body = {
            show_nsfw: new_show_nsfw
        }
        let data = await axios.patch(url, body, request_config);
        return data;
    }

    async function handleToggle() {
        try {
            const new_show_nsfw = !show_nsfw;
            let response = await requestNSFWToggle(new_show_nsfw);
            const data = response?.data;
            if(data.user) {
                dispatch(setShowNsfw(data.user.show_nsfw));    
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <NsfwSwitchContent
            show_nsfw = {show_nsfw}
            handleToggle = {handleToggle}
        />
    )
}

NsfwSwitchTransferer.propTypes = {
    show_nsfw: PropTypes.bool
}

export default NsfwSwitchTransferer;