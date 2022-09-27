/*
  Project Name: vite-solid-surrealdb
  License: MIT
  Created by: Lightnet
*/

import { lazy } from 'solid-js';
//import { MetaProvider } from 'solid-meta';
//import { createApp } from 'solid-utils';
import { Router, Routes, Route } from '@solidjs/router';

import IndexMenus from "./IndexMenus.jsx";
import ThemeProvider from "./theme/ThemeProvider.jsx";
import NotifyProvider from "./notify/NotifyProvider.jsx"
import NotifyManager from './notify/NotifyManager.jsx';

//import AuthProvider from "./auth/surrealdb/AuthProvider";
//const SignIn = lazy(() => import('./auth/surrealdb/SignIn'))
//const SignUp = lazy(() => import('./auth/surrealdb/SignUp'))
//const SignOut = lazy(() => import('./auth/surrealdb/SignOut'))

import AuthProvider from "./auth/api/AuthProvider.jsx";
const SignIn = lazy(() => import('./auth/api/SignIn'))
const SignUp = lazy(() => import('./auth/api/SignUp'))
const SignOut = lazy(() => import('./auth/api/SignOut'))

const Home = lazy(() => import('../pages/index'))
const About = lazy(() => import('../pages/about'))
const TestLab = lazy(() => import('../pages/testlab'))
const ToDoList = lazy(() => import('../pages/todolist'))
const SurrealDB = lazy(() => import('../pages/surrealdb'))
const Account = lazy(() => import('../pages/account'))
const Blog = lazy(() => import('../pages/blog'))

//const HelloApp = () => {
//  return (<label></label>)
//};

const RouterApp = () => {
  return (
  <Router>
    <IndexMenus/>
    <Routes>
      <Route path="/" component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/blog" component={Blog}/>
      <Route path="/signin" component={SignIn}/>
      <Route path="/signup" component={SignUp}/>
      <Route path="/signout" component={SignOut}/>
      <Route path="/testlab" component={TestLab}/>
      <Route path="/todolist" component={ToDoList}/>
      <Route path="/surrealdb" component={SurrealDB}/>
      <Route path="/account" component={Account}/>
    </Routes>
  </Router>);
};

const RenderApp = () => {
  //<div>This site was made with Solid</div>
  return (<>
  <ThemeProvider>
    <NotifyProvider>
      <AuthProvider>
        <RouterApp/>
        <NotifyManager/>
      </AuthProvider>
    </NotifyProvider>
  </ThemeProvider>
</>);
};

export default RenderApp;