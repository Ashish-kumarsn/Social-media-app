import React from 'react';
import './ProfileCard.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ProfileCard = ({ location }) => {
  // safe selectors (state might be initializing)
  const authState = useSelector((state) => state.authReducer.authData);
  const user = authState?.user ?? authState ?? null; // some stores return { user } other return user directly
  const posts = useSelector((state) => state.postReducer.posts) ?? [];

  // fallback serverPublic (avoid 'undefined' in path)
  const serverPublic = (process.env.REACT_APP_PUBLIC_FOLDER || '').trim();

  // safe helper to build image src
  const buildImageSrc = (pic, fallbackFile) => {
    if (!pic) {
      // if serverPublic is empty use root-relative fallback (ensure files exist)
      return serverPublic ? `${serverPublic}${fallbackFile}` : `/images/${fallbackFile}`;
    }
    // if pic is full URL, use as-is
    if (pic.startsWith('http://') || pic.startsWith('https://')) return pic;
    // otherwise assume filename served under serverPublic or /images/
    return serverPublic ? `${serverPublic}${pic}` : `/images/${pic}`;
  };

  // safe data
  const firstname = user?.firstname ?? user?.name ?? '';
  const lastname = user?.lastname ?? '';
  const fullName = [firstname, lastname].filter(Boolean).join(' ').trim() || 'Unknown User';
  const worksAt = user?.worksAt ?? 'write about yourself...';

  const followersCount = Array.isArray(user?.followers) ? user.followers.length : 0;
  const followingCount = Array.isArray(user?.following) ? user.following.length : 0;
  const postsCount = posts.filter((p) => p?.userId === user?._id).length;

  const coverSrc = buildImageSrc(user?.coverPicture, 'defaultCover.jpg');
  const profileSrc = buildImageSrc(user?.profilePicture, 'defaultProfile.png');

  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img
          src={coverSrc}
          alt="cover"
          onError={(e) => { e.currentTarget.src = serverPublic ? `${serverPublic}defaultCover.jpg` : '/images/defaultCover.jpg'; }}
        />
        <img
          src={profileSrc}
          alt="profile"
          onError={(e) => { e.currentTarget.src = serverPublic ? `${serverPublic}defaultProfile.png` : '/images/defaultProfile.png'; }}
        />
      </div>

      <div className="ProfileName">
        <span>{fullName}</span>
        <span>{worksAt}</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{followersCount}</span>
            <span>Followers</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{followingCount}</span>
            <span>Following</span>
          </div>

          {location === 'profilePage' && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>{postsCount}</span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>

      {location === 'profilePage' ? (
        ''
      ) : (
        <span>
          <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/profile/${user?._id ?? ''}`}>
            My Profile
          </Link>
        </span>
      )}
    </div>
  );
};

export default ProfileCard;
