import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectToken } from '../login/loginSlice';
import './PostList.css';
import axios from "axios";

export const PostsList = () => {
  // const posts:any[] = [];

  type Post = {
      id: 0,
      message: '',
      owner: ''
  }

  const [posts, setPosts]:[Post[], any] = useState([])
  const token = useSelector(selectToken);


  const sendRequest = () => { axios.get("http://localhost:8000/", 
    {
      headers: {
      'Authorization': `Token ${token}` 
      }
    }) 
    .then((res) => { 
        let data = res.data;
        setPosts(data['results']);
        console.log(data);
    }) 
    .catch((err) => {}) }

    useEffect(() => { sendRequest() }, [])


  const renderedPosts = () => {
    return(posts.map(post => (
      <article className="post-excerpt" key={post.id}>
        <h3>{post.owner}</h3>
        <p className="post-content">{post.message.substring(0, 100)}</p>
      </article>
    )))
  }



  return (
    <section className="posts-list">
      <h2>Posts</h2>
      { renderedPosts() }
    </section>
  )
}