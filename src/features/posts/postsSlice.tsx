import { createSlice } from '@reduxjs/toolkit';

type Post = {
  id: 0,
  message: '',
  owner: ''
}

type State = {
  posts: {
    posts: Post[]
  }
}

export const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: []
  },
  reducers: {
    setPosts: (state, action) => {
      // var joined = state.posts.concat(action.payload);
      // state.posts = joined;
      state.posts = action.payload
    },
    clearPosts: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.posts = [];
    },
    addPost: (state, action) => {
      // var joined = state.posts.concat(action.payload);
      // state.posts = joined;
      state.posts = [].concat(action.payload).concat(state.posts);
    },
    addPosts: (state, action) => {
      state.posts = state.posts.concat(action.payload)
    }
  },
});

export const { setPosts, clearPosts, addPost, addPosts } = postsSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectPosts = (state: State) => state.posts.posts

export default postsSlice.reducer;
