import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './PostList.css';
import axios from "axios";
import {
  addPost,
} from './postsSlice';
import { getToken } from '../login/TokenStorage';
import './AddPostForm.css'

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
    <div className="post_form">
        <textarea
          className="post_content"
          name="post_content"
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <button className="post_button" onClick= { postMessage }>Post</button>
    </div>
  )
}




