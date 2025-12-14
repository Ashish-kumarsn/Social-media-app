import React, { useState, useRef } from 'react';
import './PostShare.css';
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage, uploadPost } from '../../actions/UploadAction';

const PostShare = () => {
  const dispatch = useDispatch();

  // post state
  const loading = useSelector((state) => state.postReducer.uploading);

  // 🔒 SAFE auth selector (NO destructuring)
  const authData = useSelector((state) => state.authReducer.authData);
  const user = authData?.user ?? null;

  const [image, setImage] = useState(null);
  const imageRef = useRef(null);
  const desc = useRef(null);

  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  // 🛑 HARD GUARD – first render protection
  if (!user) {
    return null;
  }

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const reset = () => {
    setImage(null);
    if (desc.current) {
      desc.current.value = '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) return;

    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    if (image) {
      const data = new FormData();
      const filename = Date.now() + image.name;

      data.append('name', filename);
      data.append('file', image);

      newPost.image = filename;

      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.error(error);
      }
    }

    dispatch(uploadPost(newPost));
    reset();
  };

  return (
    <div className="PostShare">
      <img
        src={
          user.profilePicture
            ? serverPublic + user.profilePicture
            : serverPublic + 'defaultProfile.png'
        }
        alt="profile"
      />

      <div>
        <input
          type="text"
          placeholder="Write a caption..."
          required
          ref={desc}
        />

        <div className="postOptions">
          <div
            className="option"
            style={{ color: 'var(--photo)' }}
            onClick={() => imageRef.current.click()}
          >
            <PhotoOutlinedIcon />
            Photo
          </div>

          <div className="option" style={{ color: 'var(--video)' }}>
            <PlayCircleOutlineIcon />
            Video
          </div>

          <div className="option" style={{ color: 'var(--location)' }}>
            <LocationOnOutlinedIcon />
            Location
          </div>

          <div className="option" style={{ color: 'var(--shedule)' }}>
            <CalendarMonthOutlinedIcon />
            Schedule
          </div>

          <button
            className="button ps-button"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'uploading...' : 'Share'}
          </button>

          <div style={{ display: 'none' }}>
            <input
              type="file"
              name="myImage"
              ref={imageRef}
              onChange={onImageChange}
            />
          </div>
        </div>

        {image && (
          <div className="previewImage">
            <CloseOutlinedIcon onClick={() => setImage(null)} />
            <img src={URL.createObjectURL(image)} alt="preview" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostShare;
