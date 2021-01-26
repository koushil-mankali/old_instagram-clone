import { useState } from "react";

import Cred from "./components/Cred";
import Home from "./components/Home";


let App = () => {
  
  let credSS;
  let credSSval;
  if(localStorage.getItem('userName')){
    credSS = true;
    credSSval = localStorage.getItem('userName');
  }else{
    credSS =false;
  }

  let [cred, setCred] = useState({
    isLogin: false || credSS,
    userName: null || credSSval
  });

  let setcredentials = (val,usnm) =>{
    setCred({
      ...cred,
      isLogin: val,
      userName: usnm
    })
  }

  let Logout = () =>{
    setCred({...cred,isLogin:false});
  }

  let Login = () =>{
    setCred({...cred,isLogin:true});
  }

  let component;

  // if(!cred.isLogin){
  //   component = <Cred click={(val) => setcredentials(val)} isLogin={cred.isLogin} />;
  // }else{
  //   component = <Home />;
  // }

  if(!cred.isLogin){
    component = <Cred click={(val,usnm) => setcredentials(val,usnm)} isLogin={cred.isLogin} logIn={Login} />;
  }else{
    component = <Home logOut={Logout} userName={cred.userName}/>
  }

  return (
    <>
     {component}
    </>
  );
};

export default App;
