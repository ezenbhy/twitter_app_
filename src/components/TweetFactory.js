import React,{useState} from 'react';
import {db,storage} from "fbase";
import { collection, addDoc, doc, getDocs , query,onSnapshot} from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import {  ref ,uploadString, getDownloadURL } from "firebase/storage";

function TweetFactory({userObj}) {
    const [tweet, setTweet] = useState("");
    const [attachment, setAttachment] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        let attachmentUrl = "";
        if(attachment !== ""){
            const storageRef  = ref(storage,`${userObj.uid}/${uuidv4()}`);
            const response = await uploadString(storageRef , attachment, "data_url");
            //console.log(response);
            attachmentUrl = await getDownloadURL(ref(storage, response.ref));
        }
        await addDoc(collection(db, "tweets"), {
          text: tweet,
          createdAt: Date.now(),
          creatorId: userObj.uid,
          attachmentUrl,
        });
        setTweet("");
        setAttachment("");
    
      }
    
      const onChange = e => {
        e.preventDefault();
        const {target: {value}} = e;
        setTweet(value);
      }
    
      const onFileChange = e => {
        //console.log(e.target.files);
        const {target: {files},} =e;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
          //console.log(finishedEvent);
          const {currentTarget:{result}} = finishedEvent;
          setAttachment(result);
          
        }
        reader.readAsDataURL(theFile);
      }
    
      const onClearAttachment = () => setAttachment("");
  return (

      <form onSubmit={onSubmit}>
        <input type="text" placeholder="What's on your mind"
          value={tweet} onChange={onChange} maxLength={120} />
        <input type="file" accept='image/*' onChange={onFileChange} />   
        <input type="submit" value="Tweet" />
        {attachment && (
          <div>
            <img src={attachment} width="50" height="50" />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
      </form>
      
  )
}

export default TweetFactory