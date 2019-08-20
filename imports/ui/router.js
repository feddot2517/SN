import React from 'react';
import { Route } from 'react-router-dom';
import login from '../ui/containers/login'
import signup from '../ui/containers/singup'
import mainpage from '../ui/containers/mainpage'
import profile from '../ui/containers/profile'
import find from '../ui/containers/find'
import Feed from '../ui/containers/feed'
import upload from '../ui/containers/upload'
import uploadActivity from "./containers/uploadActivity";


const BaseRouter = () => (
    <div>
        <Route exact path='/' component={mainpage}/>
        <Route exact path='/login' component={login} />
        <Route exact path='/signup' component={signup}/>
        <Route exact path='/profile/:id' component={profile}/>
        <Route exact path='/find' component={find}/>
        <Route exact path='/find/:id' component={find}/>
        <Route exact path='/feed' component={Feed}/>
        <Route exact path='/upload' component={upload}/>
        <Route exact path='/activity' component={uploadActivity}/>
    </div>
);

export default BaseRouter;