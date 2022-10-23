import React , {useEffect, useState} from 'react';
import {db,storage} from "fbase";
import { collection, addDoc, doc, getDocs , query,onSnapshot,orderBy} from "firebase/firestore";
import {  ref ,uploadString, getDownloadURL } from "firebase/storage";
import Tweet from 'components/Tweet';
import TweetFactory from 'components/TweetFactory';
import { v4 as uuidv4 } from 'uuid';


function Home({userObj}) {
  //console.log(userObj);
  
  const [tweets, setTweets] = useState([]);
  
/*
  const getTweets = async () => {
    const q = query(collection(db, "tweets"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //console.log(doc.id, " => ", doc.data());
      const tweetObject = {...doc.data(), id:doc.id }
      //setTweets(prev => [doc.data(), ...prev]); //새 트윗을 가장 먼저 보여준다.
      setTweets(prev => [tweetObject, ...prev]);
    });
  }
*/
  useEffect(() => {
   // getTweets();
    const q = query(collection(db, "tweets"), orderBy("createdAt", "desc"));
    const unsubscribe =  onSnapshot(q, (querySnapshot) => {
      const newArray =  [];
      querySnapshot.forEach((doc) => {
        newArray.push({...doc.data(), id:doc.id });
        //console.log(newArray); 
        });  
      setTweets(newArray);
    });
    
  },[])
  //console.log(tweets);
  

  return (
    <div className="container" >
      <TweetFactory  userObj={userObj}/>
      
      <div  style={{ marginTop: 30 }}>
        {tweets.map(tweet => (
          // <div key={tweet.id}>
          //   <h4>{tweet.text}</h4>
          // </div>
          <Tweet key={tweet.id} 
                 tweetObj={tweet}
                 isOwner={tweet.creatorId === userObj.uid}
                 />
        ))}
      </div>
    </div>
  )
}

export default Home