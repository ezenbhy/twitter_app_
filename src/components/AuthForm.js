import { async } from '@firebase/util';
import React,{useState} from 'react';
import {authService} from 'fbase';
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,GoogleAuthProvider,GithubAuthProvider,signInWithPopup } from "firebase/auth";

function AuthForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAcount] = useState(true);//true회원가입, false로그인
    const [error, setError] = useState("");

    const onChange = e => {
        //console.log(e.target.name);
        const {target:{name,value}} = e;
        if(name === "email"){
          setEmail(value);
        }else if(name === "password"){
          setPassword(value);
        }
      }
    
      const onSubmit = async(e) => {
        e.preventDefault();
        try {
          let data;
          if(newAccount){
            //create newAccount
            data = await createUserWithEmailAndPassword(authService, email, password);
          }else{
            //log in
            data = await signInWithEmailAndPassword(authService, email, password);
          }
          //console.log(data);
        } catch (error) {
          //console.log(error);
          setError(error.message);
        }
      }

      const toggleAccount = () => setNewAcount( prev => !prev);
  return (
    <>
    <form onSubmit={onSubmit}>
        <input name="email" type="email" placeholder="Email" required
        value={email} onChange={onChange} />
        <input name="password" type="password" placeholder="Password" required
        value={password} onChange={onChange} />
        {/* <input type="submit" value="Log In" /> */}
        <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
        {error}
    </form>
    <span onClick={toggleAccount}>
        {newAccount ? "Sign In" : "Create Account"}
    </span>
    </>
  )
}

export default AuthForm