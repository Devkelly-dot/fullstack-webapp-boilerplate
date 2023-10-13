import { setEmail, setId, setProfileImage, setShowNsfw, setToken, setUsername } from "../../redux/authSlice";

function dispatchLogin(dispatch, user) {
    localStorage.setItem('token', user.token);
    dispatch(setToken(user.token));
    dispatch(setUsername(user.username));
    dispatch(setEmail(user.email));
    dispatch(setId(user._id));    
    dispatch(setProfileImage(user.profile_image_url));    
    dispatch(setShowNsfw(user.show_nsfw));    
}

export default dispatchLogin;