import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './PostList.css';
import axios from "axios";
import { selectPosts, addPosts } from './postsSlice';
import { getToken } from '../login/TokenStorage';
import useInfiniteScroll from "./useInfiniteScroll";


export const PostsList = () => {

  const token = getToken();

  const dispatch = useDispatch();

  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);
  let [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);

  const sendRequest = (page: number) => { axios.get("http://localhost:8000/?page=" + page, 
    {
      headers: {
      'Authorization': `Token ${token}` 
      }
    }) 
    .then((res) => { 
        let data = res.data;
        dispatch(addPosts(data['results']));
        console.log(res.data)
        if (data['next'] == null) 
          setHasNextPage(false)
        else
          setHasNextPage(true)
      
    }) 
    .catch((err) => {
      console.log(err)
    }) }

  const renderedPosts = () => {
    return(posts.map(post => (
      <article className="post-excerpt" key={post.id}>
        <div className="post-username">{post.owner}</div>
        <div className="post-content">{post.message}</div>
      </article>
    )))
  }
  
  useEffect(() => { 
    sendRequest(page) 
    setPage(p => p + 1)
    
  }, [])

  function fetchMoreListItems() {
    setTimeout(() => {
      if (hasNextPage) {
        sendRequest(page)
        setPage(p => p + 1)
      }
      setIsFetching(false);
    }, 2000);
  }

  const posts = useSelector(selectPosts);

  return (
    <section className="posts-list">
      { renderedPosts() }
      {isFetching && 'Fetching more items...'}
    </section>
  )
}