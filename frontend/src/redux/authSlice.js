import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    email: null,
    id: null,
    username: null,
    profile_image_url: null,
    show_nsfw: null,
    subscription: null
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    setUsername(state, action) {
      state.username = action.payload;
    },
    setId(state, action) {
        state.id = action.payload;
    },
    setEmail(state,action) {
        state.email = action.payload;
    },
    setProfileImage(state, action) {
      state.profile_image_url = action.payload;
    },
    setBio(state, action) {
      state.bio = action.payload;
    },
    setShowNsfw(state, action) {
      state.show_nsfw = action.payload;
    },
    setShowSubscription(state, action) {
      state.subscription = action.payload;
    }
  },
});

export const { setToken, setUsername, setId, setEmail, setProfileImage, setBio, setShowNsfw, setShowSubscription } = authSlice.actions;

export default authSlice.reducer;