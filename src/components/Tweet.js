import React, { useState } from 'react';
import {db,storage } from 'fbase';
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { ref,deleteObject } from "firebase/storage";
import { async } from '@firebase/util';

function Tweet({tweetObj,isOwner}) {
    const [editing, setEditing] = useState(false);
    const [newTweet, setNewTweet] = useState(tweetObj.text);

    const onDeleteClick = async () => {
        const ok = window.confirm("삭제하시겠습니까?");
        //console.log(ok);
        if(ok) {
            //console.log(tweetObj.id);
            //const data = await db.doc(`tweets/${tweetObj.id}`)
            //const data = await deleteDoc(doc(db, "tweets", `/${tweetObj.id}`));
            //console.log(data);
            await deleteDoc(doc(db, "tweets", `/${tweetObj.id}`));
            if(tweetObj.attachmentUrl !== ""){
                const desertRef = ref(storage, tweetObj.attachmentUrl);
                await deleteObject(desertRef);
            }
        }
    };

    const toggleEditing = () => setEditing((prev) => !prev); //토글기능

    const onChange = e => {
        const {target: {value},} = e;
        setNewTweet(value);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        //console.log(tweetObj.id, newTweet);
        const newTweetRef = doc(db, "tweets", `/${tweetObj.id}`);
        await updateDoc( newTweetRef,{text: newTweet});
        setEditing(false);
    }
  return (
    <div>
        {editing ? (
            <>
                <form onSubmit={onSubmit}>
                    <input onChange={onChange} value={newTweet} required />
                    <input type="submit" value="Update Tweet" />
                </form>
                <button onClick={toggleEditing}>Cancel</button>
            </>
        ) : (
            <>
                <h4>{tweetObj.text}</h4>
                {tweetObj.attachmentUrl && (
                    <img src={tweetObj.attachmentUrl} width="50" height="50" />
                )}
                {isOwner && (
                    <>
                        
                        <button onClick={onDeleteClick}>Delete Tweet</button>
                        <button onClick={toggleEditing}>Edit Tweet</button>
                    </>
                    
                )}
            </>
        )}
    </div>
  )
}

export default Tweet