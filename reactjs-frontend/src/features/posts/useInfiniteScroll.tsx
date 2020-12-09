import { useState, useEffect } from 'react';

const useInfiniteScroll = (callback:any) => {
  const [isFetching, setIsFetching]:[boolean, any]  = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isFetching) return;
      setIsFetching(true);
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isFetching]);

  useEffect(() => {
    if (!isFetching) return;
    callback();
  }, [isFetching]);

  return [isFetching, setIsFetching];
};

export default useInfiniteScroll;