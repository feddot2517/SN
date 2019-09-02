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
import chat from "./containers/chat";
import messages from "./containers/messages";
import photos from "./containers/photos";
import changelog from "./containers/changelog";
import music from "./containers/music";
import uploadMusic from "./containers/uploadMusic";


const BaseRouter = () => (
    <div>
        <Route exact path='/' component={mainpage}/>
        <Route exact path='/login' component={login} />
        <Route exact path='/signup' component={signup}/>
        <Route exact path='/profile/:id' component={profile}/>
        <Route exact path='/find' component={find}/>
        <Route exact path='/find/:id' component={find}/>
        <Route exact path='/feed' component={Feed}/>
        <Route exact path='/messages' component={messages}/>
        <Route exact path='/upload' component={upload}/>
        <Route exact path='/upload/music' component={uploadMusic}/>
        <Route exact path='/activity' component={uploadActivity}/>
        <Route exact path='/dialog/:id' component={chat}/>
        <Route exact path='/photos/:id' component={photos}/>
        <Route exact path='/changelog' component={changelog}/>
        <Route exact path='/music' component={music}/>
    </div>
);

export default BaseRouter;