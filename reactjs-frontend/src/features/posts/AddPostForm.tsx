import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  selectToken,
} from '../login/loginSlice';
import './PostList.css';
import axios from "axios";

type Params = {
  token: String; 
  message: String;
}

export const AddPostForm:React.FC = () => {
  const token = useSelector(selectToken);

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const postMessage = () => { axios.post("http://localhost:8000/", {   
    message: content 
    },
    {
      headers: {
      'Authorization': `Token ${token}` 
      }
    }
  ) 

    .then((res) => { 
        let data = res.data;
        console.log('token' + token)
        console.log(data);
    }) 
    .catch((err) => {}) 
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




