import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from "axios";
import { addPost } from './postsSlice';
import { getToken } from '../login/TokenStorage';
import styles from './AddPostForm.module.css'
import form_styles from '../login/Form.module.css'

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
    <div className={styles.post_form}>
        <textarea
          className={styles.post_content}
          name="post_content"
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <button className={form_styles.button} id={styles.post_button} onClick= { postMessage }>Post</button>
    </div>
  )
}




