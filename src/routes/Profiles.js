import { authService,db } from 'fbase'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import Tweet from 'components/Tweet';
import { async } from '@firebase/util';
import { updateProfile } from "@firebase/auth";

function Profiles({userObj /*,refresher*/}) {
  console.log(userObj);
  const navigate = useNavigate();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  
  const onLogOutClick = () => {
    authService.signOut();
    navigate('/'); //홈으로 이동 즉 리다이렉트 기능이다.
  }

  const onChange = e => {
    const {target: {value}} =e;
    setNewDisplayName(value);
    
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (userObj.displayName != newDisplayName) {
      await updateProfile(userObj,{displayName:newDisplayName});
      //refresher();
    }
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Display name" 
          onChange={onChange} value={newDisplayName} />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
      
    </>
  )
}

export default Profiles