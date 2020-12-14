import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './PostList.module.css';
import axios from "axios";
import { selectPosts, setPosts, addPosts } from './postsSlice';
import { getToken } from '../login/TokenStorage';
import useInfiniteScroll from "./useInfiniteScroll";


export const PostsList: React.FC = () => {

  const token = getToken();

  const dispatch = useDispatch();

  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);
  let [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);

  const sendRequest = (page: number, first: boolean) => {
    axios.get(process.env.REACT_APP_BACKEND_HOST + "/?page=" + page,
      {
        headers: {
          'Authorization': `Token ${token}`
        }
      })
    .then((res) => {
      let data = res.data;
      if (first) {
        dispatch(setPosts(data['results']));
      }
      else {
        dispatch(addPosts(data['results']));
      }

      if (data['next'] == null)
        setHasNextPage(false)
      else
        setHasNextPage(true)

    })
    .catch((err) => {
      console.log(err)
    })
  }

  const renderedPosts = () => {
    return (posts.map(post => (
      <article className={styles.post_excerpt} key={post.id}>
        <div className={styles.post_username}>{post.owner}</div>
        <div className={styles.post_content}>{post.message}</div>
      </article>
    )))
  }

  useEffect(() => {
    sendRequest(page, true)
    setPage(p => p + 1)

  }, [])

  function fetchMoreListItems() {
    setTimeout(() => {
      if (hasNextPage) {
        sendRequest(page, false)
        setPage(p => p + 1)
      }
      setIsFetching(false);
    }, 2000);
  }

  const posts = useSelector(selectPosts);

  return (
    <section className="posts-list">
      { renderedPosts()}
      {isFetching && 'Fetching more items...'}
    </section>
  )
}