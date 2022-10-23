import Router, {useEffect, useState} from "react"
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  //const [isLoggedIn,setIsLoggedIn] = useState(authService.currentUser);//처음에 null
  
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  //console.log(authService.currentUser);//currentUser는 현재 로그인한 사람 확인 함수
  
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged(user => {
      //console.log(user)
      if(user) {
        setIsLoggedIn(user);
        setUserObj(user);
        /*setUserObj(user{
          uid: user.uid,
          displayName: user.displayName,
          updateProfile: (args) => updateProfile(user,args),
        });*/
      }else{
        //setIsLoggedIn(false);
        setUserObj(false);
      }
      setInit(true);
    });
  },[])
/*
  const refresher = () => {
    //setUserObj(authService.currentUser);
    const user = authService.currentUser;
    setUserObj({
      uid: user.uid,
      displayName: user.displayName,
      updateProfile: (args) => updateProfile(user,args),
    })
  }
  */
  return (
    <>
    {init ? (
      <AppRouter /*refresher={refresher}*/ isLoggedIn={Boolean(userObj)} userObj={userObj} />
    ) : (
      "initializing..."
    )}
      
      
    </>
  );
}

export default App;
