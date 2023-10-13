import PropTypes from 'prop-types';
import EditProfileContent from './editProfileContent';
import { useEffect, useState } from 'react';
import config from '../../../config';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setBio, setEmail, setProfileImage, setUsername } from '../../../redux/authSlice';

function EditProfileTransferer({user, error}) {
    const token = useSelector((state)=>state.auth.token);
    const dispatch = useDispatch();

    const [profileImage, setImage] = useState(user?.profile_image_url?user.profile_image_url:config.default_profile_pic);
    const [form, setForm] = useState({
        username: user?.username?user.username:'',
        bio: user?.bio?user.bio:'',
    });
    const [postError, setPostError] = useState(null);

    useEffect(()=>{
        setImage(user?.profile_image_url?user.profile_image_url:config.default_profile_pic);
        setForm({
            username: user?.username?user.username:'',
            bio: user?.bio?user.bio:'',
        });
    }, [user]);

    async function attemptImageUpload(file) {
        const url = config.backendUrl+'account/edit/image';
        const request_config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        };

        let formData = new FormData();
        formData.append('file', file);
        const response = await axios.post(url, formData, request_config);
        const new_url = response?.data?.user?.profile_image_url;
        if(new_url) {
            dispatch(setProfileImage(new_url))
            setPostError({severity: 'success', message: 'Your profile has been updated'})
        }
    }
    
    async function handleFileChange(e) {
        setImage(e.target.files[0]);
        await attemptImageUpload(e.target.files[0]);
    }

    async function attemptSave() {
        if(!form.username || form.username?.replace(' ', '') === null) {
            setPostError({severity: 'error', message: 'Username cannot be empty'});
            return;
        }

        if(form.username?.includes(' ')) {
            setPostError({severity: 'error', message: 'Username cannot have a space'})
            return;
        }
        setPostError(null);
        const url = config.backendUrl+'account'
        const request_config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        try {
            let edit_data = await axios.patch(url, form, request_config);
            let user = edit_data?.data?.user;
            dispatch(setUsername(user.username));
            dispatch(setEmail(user.email));
            dispatch(setBio(user.bio));
            dispatch(setProfileImage(user.profile_image_url));

            console.log(edit_data)
            setPostError({severity: 'success', message: 'Your profile has been updated'})
        } catch (error) {
            if(error?.response?.data?.Error) {
                setPostError({severity: 'error', message: error?.response?.data?.Error})
            } else {
                setPostError({severity: 'error', message: error.message})
            }
        }
    }

    return (
        <EditProfileContent
            user={user}
            image={profileImage}
            handleFileChange = {handleFileChange}
            attemptSave = {attemptSave}
            form = {form}
            updateForm = {(new_form)=>{setForm(new_form); setPostError(null)}}
            error={error}
            postError={postError}
        />
    )
}

EditProfileTransferer.propTypes = {
    user: PropTypes.object,
    error: PropTypes.object, 
}

export default EditProfileTransferer;