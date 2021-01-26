import { useState, useEffect } from "react";
import StatusCmp from "./StatusCmp";
import Post from "./Post";
import Suggestions from "./Suggestions";
import Loader from "./Loader";
import firebase from 'firebase';
import { db,auth, storage } from "../firebase/firebase";


import "./Home.css";
import insta from "../assets/instagram.png";
import profile from "../assets/Hanuman1.jpg";
import { Link, NavLink } from "react-router-dom";

import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import TelegramIcon from "@material-ui/icons/Telegram";
import ExploreIcon from "@material-ui/icons/Explore";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import RateReviewIcon from "@material-ui/icons/RateReview";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

let Home = (props) => {
  let [state, setState] = useState({
    search: "",
    postDis: false,
    loading: true,
    postDiscContent: "",
    postImage : null,
  });
  
  useEffect(()=>{
    localStorage.setItem('userName',props.userName);
  },[]);
 

  let [posts, setPosts] = useState({});

  useEffect(() => {
       db.collection("posts").onSnapshot((snap) => {
        setPosts(snap.docs.map((doc) => ({
          id: doc.id,
          post: doc.data()
        })));
        setState({loading: false});
      });
    }, []);
    
  let search = (e) => {
    setState({
      ...state,
      search: e.target.value,
    });
  };

  let postDesci = () => {
    setState({
      ...state,
      postDis: !state.postDis,
    });
  };

  let postDiscCnt = (e) =>{
    setState({
      ...state,
      postDiscContent : e.target.value
    });
  }

  let fileUpload = (e) =>{
    if(e.target.files[0]){
      setState({...state,postImage:e.target.files[0]});
    }
  }

  let postDisc = (e) => {
    e.preventDefault();
    let imgURL =  storage.ref(`images/${state.postImage.name}`).put(state.postImage)
    imgURL.on(
      "state_changed",
      () => { 
          storage
              .ref("images")
              .child(state.postImage.name)
              .getDownloadURL()
              .then(url =>{
                db.collection('posts').add({
                  postDesc: state.postDiscContent,
                  postImage:url,
                  profilePic:url,
                  time: firebase.firestore.FieldValue.serverTimestamp(),
                  userName: localStorage.getItem('userName')
                })
                .catch(err => alert(err.message))

                setState({
                  ...state,
                  postDiscContent: "",
                  postImage : null
                });
            })
      }
    )
  };

  let postDescc;

  if (state.postDis) {
    postDescc = (
      <div className="section1">
        <div className="sec1">
          <form action="" onSubmit={postDisc}>
            <input
              type="text"
              placeholder="Add a post ..."
              className="inputComment"
              value={state.postDiscContent}
              onChange={postDiscCnt}
            />
            <span className="upload">
              <input type="file" name="addPic" id="addPic" className="addPic" onChange={fileUpload} />
              <label htmlFor="addPic" className="uploadBtn">
                Upload
              </label>
            </span>
            <button type="submit" className="postComment pstBtn">
              Post
            </button>
          </form>
        </div>
      </div>
    );
  }

  let logout = () =>{
    auth.signOut();
    props.logOut();
    localStorage.removeItem('userName');
  }

  return (
    <>
      <div className="homeP">
        <div className="header">
          <img src={insta} alt="instagram logo" className="insta_logo" />
          <div className="searchBar">
            <span>
              <SearchIcon fontSize="inherit" color="disabled" />
            </span>
            <input
              type="text"
              id="search"
              name="search"
              placeholder="Search"
              autoComplete="off"
              onChange={search}
              value={state.search}
            />
          </div>
          <div className="menu">
            <span className="menu_icons">
              <HomeIcon fontSize="large" />
            </span>
            <span className="menu_icons">
              <TelegramIcon fontSize="large" />
            </span>
            <span className="menu_icons">
              <ExploreIcon fontSize="large" />
            </span>
            <span className="menu_icons">
              <FavoriteBorderIcon fontSize="large" />
            </span>
            <span className="menu_icons profile">
              <img src={profile} alt="profile pic" className="profilePic" />
              <ul className="menuOptions" id="menuOptions">
                <li className="menuOptsLi">
                  <Link to="/profile" className="menuOptsLiIn">
                    <span>
                      <AccountCircleIcon />
                    </span>
                    <span className="menuOpt">Profile</span>
                  </Link>
                </li>
                <li className="menuOptsLi">
                  <NavLink to="/settings" className="menuOptsLiIn">
                    <span>
                      <SettingsIcon />
                    </span>
                    <span className="menuOpt">Settings</span>
                  </NavLink>
                </li>
                <li className="menuOptsLi arrowUp">
                  <NavLink to="/" className="menuOptsLiIn">
                    <span>
                      <ExitToAppIcon />
                    </span>
                    <span className="menuOpt" onClick={logout}>Logout</span>
                  </NavLink>
                </li>
              </ul>
            </span>
          </div>
        </div>

        <div className="box1">
          <div className="section2">
            {postDescc}
            <StatusCmp />
            {
              state.loading ? 
              <div className='loaderCSS'>
                <Loader />
              </div>
              :                     
              posts.map(({id,post}) => (
                <Post
                key={id}
                postId = {id}
                userName={post.userName}
                postDesc={post.postDesc}
                postImage={post.postImage}
                profilePic={post.profilePic}
                time={posts.time}
                />
                ))                
            }
          </div>


          <div className="section3">
            <Suggestions />
          </div>
        </div>
      </div>

      <div className="postDesc">
        <RateReviewIcon fontSize="large" onClick={postDesci} />
      </div>
    </>
  );
};

export default Home;
