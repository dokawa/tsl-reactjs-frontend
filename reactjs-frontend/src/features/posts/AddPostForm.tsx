import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './PostList.css';
import axios from "axios";
import {
  addPost,
} from './postsSlice';
import { getToken } from '../login/TokenStorage';

// type Params = {
//   token: String; 
//   message: String;
// }

export const AddPostForm:React.FC = () => {
  const token = getToken()
  const dispatch = useDispatch();

  const [content, setContent] = useState('')

  const postMessage = () => { axios.post("http://localhost:8000/", {   
    message: content 
    },
    {
      headers: {
      'Authorization': `Token ${token}` 
      }
    }
  ).then((res) => { 
        let data = res.data;
        dispatch(addPost(data))
        console.log('token' + token)
        console.log(data);

    }) 
    .catch((err) => {
        console.log(err)
    }) 
  }

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <button type="button" onClick= { postMessage }>Save Post</button>
      </form>
    </section>
  )
}




