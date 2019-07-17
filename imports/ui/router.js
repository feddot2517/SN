import React from 'react';
import { Route } from 'react-router-dom';
import login from '../ui/containers/login'
import signup from '../ui/containers/singup'
import mainpage from '../ui/containers/mainpage'


const BaseRouter = () => (
    <div>
        <Route exact path='/' component={mainpage}/>
        <Route exact path='/login' component={login} />
        <Route exact path='/signup' component={signup}/>
    </div>
);

export default BaseRouter;