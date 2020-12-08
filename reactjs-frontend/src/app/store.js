import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../features/login/loginSlice';
import postsReducer from '../features/posts/postsSlice';

export default configureStore({
  reducer: {
    login: loginReducer,
    posts: postsReducer
  },
});
