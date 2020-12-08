import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './PostList.css';
import axios from "axios";
import { setPosts, selectPosts } from '../posts/postsSlice';
import { getToken } from '../login/TokenStorage';


export const PostsList = () => {

  type Post = {
    id: 0,
    message: '',
    owner: ''
  }

  const token = getToken();

  const dispatch = useDispatch();

  const sendRequest = () => { axios.get("http://localhost:8000/", 
    {
      headers: {
      'Authorization': `Token ${token}` 
      }
    }) 
    .then((res) => { 
        let data = res.data;
        dispatch(setPosts(data['results']));
        console.log(data);
    }) 
    .catch((err) => {}) }


  useEffect(() => { sendRequest() }, [])
  const posts = useSelector(selectPosts);


  const renderedPosts = () => {
    return(posts.map(post => (
      <article className="post-excerpt" key={post.id}>
        <h3>{post.owner}</h3>
        <p className="post-content">{post.message}</p>
      </article>
    )))
  }

  // const listInnerRef = useRef();

  // const onScroll = () => {
  //   if (listInnerRef.current) {
  //     const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
  //     if (scrollTop + clientHeight === scrollHeight) {
  //       // TO SOMETHING HERE
  //       console.log('Reached bottom')
  //     }
  //   }
  // };



  return (
    <section className="posts-list">
      <h2>Posts</h2>
      { renderedPosts() }
    </section>
  )
}