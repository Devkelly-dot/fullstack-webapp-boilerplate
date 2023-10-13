import { setEmail, setId, setProfileImage, setToken, setUsername } from "../../redux/authSlice";

function dispatchLogout(dispatch) {
    localStorage.removeItem('token');
    dispatch(setToken(null));
    dispatch(setUsername(null));
    dispatch(setEmail(null));
    dispatch(setId(null));    
    dispatch(setProfileImage(null));    
}

export default dispatchLogout;