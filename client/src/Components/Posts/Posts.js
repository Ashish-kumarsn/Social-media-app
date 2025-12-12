import React, { useEffect } from 'react'
import './Posts.css';
import Post from '../Post/Post';
import { useDispatch, useSelector } from 'react-redux';
import { getTimelinePosts } from '../../actions/PostAction';
import { useParams } from 'react-router-dom';

const Posts = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  let { posts, loading } = useSelector((state) => state.postReducer);

  useEffect(() => {
    if (user?._id) {
      dispatch(getTimelinePosts(user._id));
    }
  }, [dispatch, user?._id]); // added dispatch and user._id deps

  if (params.id) {
    posts = posts.filter((post) => post.userId === params.id)
  }

  return (
    <div className='Posts'>
      {loading ? "Fetching Posts..." :
        posts.map((post, id) => {
          return <Post data={post} id={id} key={post._id ?? id} />
        })}
    </div>
  )
}

export default Posts
