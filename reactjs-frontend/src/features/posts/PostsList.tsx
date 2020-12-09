import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './PostList.css';
import axios from "axios";
import { selectPosts, addPosts } from './postsSlice';
import { getToken } from '../login/TokenStorage';
import useInfiniteScroll from "./useInfiniteScroll";


export const PostsList = () => {

  type Post = {
    id: 0,
    message: '',
    owner: ''
  }

  const token = getToken();

  const dispatch = useDispatch();

  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);
  let [page, setPage] = useState(1)



  const sendRequest = (page: number) => { axios.get("http://localhost:8000/?page=" + page, 
    {
      headers: {
      'Authorization': `Token ${token}` 
      }
    }) 
    .then((res) => { 
        let data = res.data;
        dispatch(addPosts(data['results']));
        console.log(data);
    }) 
    .catch((err) => {}) }




  const renderedPosts = () => {
    return(posts.map(post => (
      <article className="post-excerpt" key={post.id}>
        <div className="post-username">{post.owner}</div>
        <div className="post-content">{post.message}</div>
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


  function fetchMoreListItems() {
    setTimeout(() => {
      setPage(page + 1)
      sendRequest(page)
      setIsFetching(false);
    }, 2000);
  }


    
  useEffect(() => { 
    sendRequest(page) 
    setPage(page + 1)
  }, [])

  const posts = useSelector(selectPosts);


  return (
    <section className="posts-list">
      { renderedPosts() }
      {isFetching && 'Fetching more items...'}
    </section>
  )
}