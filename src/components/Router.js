import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Auth from 'routes/Auth';
import Home from 'routes/Home';
import Profiles from 'routes/Profiles';
import Navigation from './Navigation';


function AppRouter({isLoggedIn, userObj/*, refresher*/}) {
  
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
        {isLoggedIn && <Navigation userObj={userObj} />}
        <Routes>
            {/* <Route /> */}
            {isLoggedIn ? (
                <>
                    <Route path='/' element={<Home userObj={userObj}/>} />
                    <Route path='/profile' element={<Profiles userObj={userObj} /* refresher={refresher}*/ />} />
                </>

            ) : (
                <Route path='/' element={<Auth />} />
            )}
        </Routes>
    </BrowserRouter>
  )
}

export default AppRouter