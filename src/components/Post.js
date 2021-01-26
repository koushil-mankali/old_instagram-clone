import { useState, useEffect } from "react";
import { db } from "../firebase/firebase";

import "./Post.css";
import Anonymous from "../assets/Hanuman1.jpg";

import TelegramIcon from "@material-ui/icons/Telegram";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";

let Post = (props) => {
  // console.log(props)
  let [state, setState] = useState({
    like: false,
    name: "koushil",
  });

  let [comment, setComment] = useState("");
  let [comments, setComments] = useState([]);

  console.log(comment);

  useEffect(()=>{
    if(props.postId){
      db.collection('posts')
      .doc(props.postId)
      .collection('comments')
      .onSnapshot((snap)=>{
        setComments(snap.docs.map((doc)=> doc.data()));
      })
    }
  },[props.postId]);


  let likeButton = () => {
    setState({
      like: !state.like,
    });
  };

  let insertCmmt = (e) => {
    setComment(
      e.target.value
    );
  };


  let submitComment = (e) => {
    e.preventDefault();
    db.collection('posts').doc(props.postId).collection("comments").add({
        text: comment,
        username: props.userName
    });
  };
  

  return (
    <div className="Post">
      <div className="postHeader">
        <span>
          <img src={props.profilePic ? props.profilePic : Anonymous} alt="profile" className="profile" />
          <span className="user_nm">{props.userName ? props.userName : "Anonymous"}</span>
        </span>
        <span className="opts">...</span>
      </div>
      <div className="postBody">
        <img src={props.postImage} alt="post pic" id="postImage" className="postImage" />
      </div>
      <div className="postFooter">
        <div>
          {state.like ? (
            <span className="postBtns">
              <FavoriteIcon
                fontSize="large"
                htmlColor="red"
                onClick={likeButton}
              />
            </span>
          ) : (
            <span className="postBtns">
              <FavoriteBorderIcon fontSize="large" onClick={likeButton} />
            </span>
          )}
          <span className="postBtns">
            <ChatIcon fontSize="large" />
          </span>
          <span className="postBtns">
            <TelegramIcon fontSize="large" />
          </span>
        </div>
        <div className="desc">
          <span className="user_name">{props.userName}</span>
          <span>{props.postDesc}</span>
        </div>
        <div className="comments">
          <div style={{color:'#8e8e8e', padding:'5px 0 5px 10px'}}>Comments</div>
        {
          comments.map((comment)=>(
            <div>
              <span className="user_name">{comment.username}</span>
              <span> {comment.text}</span>
            </div>
          ))
        }
        </div>
        <div className="postTime">{props.time}</div>
        <div className="cmt_sys">
          <form action="#" onSubmit={submitComment}>
            <input
              type="text"
              placeholder="Add a comment..."
              className="inputComment"
              name="inputComment"
              value={comment}
              onChange={insertCmmt}
            />
            <button type="submit" className="postComment">
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Post;
