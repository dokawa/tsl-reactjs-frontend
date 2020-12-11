import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from "axios";
import { addPost } from './postsSlice';
import { getToken } from '../login/TokenStorage';
import add_post_form_styles from './AddPostForm.module.css'
import styles from '../login/Login.module.css'

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
    }) 
    .catch((err) => {
        console.log(err)
    }) 
  }

  return (
    <div className={add_post_form_styles.post_form}>
        <textarea
          className={add_post_form_styles.post_content}
          name="post_content"
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <button className={styles.button} id={add_post_form_styles.post_button} onClick= { postMessage }>Post</button>
    </div>
  )
}




