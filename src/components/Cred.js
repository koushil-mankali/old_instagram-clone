import { useState, useEffect } from "react";
import {auth} from '../firebase/firebase';
import {Redirect} from 'react-router-dom';

import "./Cred.css";
import insta from "../assets/instagram.png";
import appStore from "../assets/Images/appStore.png";
import playStore from "../assets/Images/playStore.png";
import FacebookIcon from "@material-ui/icons/Facebook";


let Cred = (props) => {
  let [state, setState] = useState({
    isLogin: !props.isLogin || true,
    isSignup: props.isSignup || false,
    uname: "",
    password: "",
    email: "",
  });

  let [user,setUser] = useState(null);
  
  // useEffect(() => {
  //   if (state.email.length > 3 && state.password.length > 3) {
  //     document.getElementById("submit").className = "submitButtonAct";
  //     document.getElementById("submit").removeAttribute("disabled");
  //   }else{
  //       document.getElementById("submit").className = "submitButton";
  //       document.getElementById("submit").setAttribute("disabled","disabled");
  //   }
  // }, [state.email, state.password]);

  useEffect(()=>{
    // const unsubscribe
     auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        setUser(authUser);
      }else{
          setUser(null);
      }
    })
    // return () =>{
    //   unsubscribe();
    // }
  },[user]);

  let fillData = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  let Signup = (e) => {
    e.preventDefault();
    //Database Check for credentials
    // setState({isLogin:true});
    // props.click(state.isLogin);
    auth.createUserWithEmailAndPassword(state.email,state.password)
    .then(authUser => {
        authUser.user.updateProfile({
        displayName : state.uname,
        })
        setState({isLogin:true});
        props.click(state.isLogin,state.uname);
        <Redirect to='/' />;
    })
    .catch(err => alert(err.message))
  };

  let Login = (e) =>{
    e.preventDefault();
    auth.signInWithEmailAndPassword(state.email, state.password)
    .then(authUser => {
        authUser.user.updateProfile({
        displayName : state.uname,
        })
      setState({isLogin:true});
      props.click(state.isLogin,state.uname);
      <Redirect to='/' />;
      props.logIn();
    })
    .catch(err => alert(err.message))
   
  }

  let changeState = () => {
    setState({
      ...state,
      isLogin: !state.isLogin,
      isSignup: !state.isSignup,
    });
  };

  let txt;
  let txt1;
  let lg_ipt;
  let ppy;

  if (state.isLogin) {
    txt = "Don't have an account?";
    txt1 = (
      <span className="su_lg" onClick={changeState}>
        Sign up
      </span>
    );
    lg_ipt = (
      <>
        <input
          type="text"
          value={state.uname}
          id="uname"
          className="inputF"
          placeholder="Username"
          autoComplete="off"
          name="uname"
          onChange={fillData}
        />
        <input
          type="email"
          value={state.email}
          id="email"
          className="inputF"
          placeholder="Email"
          autoComplete="off"
          name="email"
          onChange={fillData}
        />
        <input
          type="password"
          value={state.password}
          id="password"
          className="inputF"
          placeholder="Password"
          name="password"
          onChange={fillData}
        />
      </>
    );
  } else {
    txt = "Have an account?";
    txt1 = (
      <span className="su_lg" onClick={changeState}>
        Log in
      </span>
    );
    lg_ipt = (
      <>
        <input
          type="text"
          value={state.uname}
          id="uname"
          className="inputF"
          placeholder="Username"
          autoComplete="off"
          name="uname"
          onChange={fillData}
        />
        <input
          type="text"
          value={state.email}
          id="email"
          className="inputF"
          placeholder="Email"
          autoComplete="off"
          name="email"
          onChange={fillData}
        />
        <input
          type="password"
          value={state.password}
          id="uname"
          className="inputF"
          placeholder="Password"
          name="password"
          onChange={fillData}
        />
      </>
    );
    ppy = (
      <div className="ppy">
        By signing up, you agree to our Terms , Data Policy and Cookies Policy .
      </div>
    );
  }

  return (
    <>
      <div className="Login">
        <div className="login_mod">
          <div className="logo_img">
            <img src={insta} alt="instagram" className="logo" />
          </div>
          <div className="loginMod_in">
            <form className="l_form" id="l_form" onSubmit={e=> e.preventDefault()}>
              <div className="inputFs">{lg_ipt}</div>
              <button
                type="submit"
                id="submit"
                className="submitButtonAct"
                // disabled
              >
                {state.isLogin ? <span onClick={Login}>Login</span> : <span onClick={Signup}>Sign up</span> }
              </button>
            </form>
            <div className="sep">OR</div>
            <div className="fg_ps">
              <div className="fg_ps1">
                <FacebookIcon /> Log in with Facebook
              </div>
              <div className="fg_ps2">Forgot password?</div>
            </div>
            {ppy}
          </div>
        </div>
        <div className="slDlg">
          <div>
            {txt} {txt1}
          </div>
        </div>
        <div className="gta">
          <div className="gta_ttl">Get the app.</div>
          <div className="app_img">
            <img src={appStore} alt="appstore" className="gta_img" />
            <img src={playStore} alt="playstore" className="gta_img" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Cred;
