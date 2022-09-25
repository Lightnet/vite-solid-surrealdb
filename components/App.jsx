/*
  Project Name: vite-solid-surrealdb
  License: MIT
  Created by: Lightnet
*/

import { lazy } from 'solid-js';
//import { MetaProvider } from 'solid-meta';
//import { createApp } from 'solid-utils';
import { Router, Routes, Route } from '@solidjs/router';

import IndexMenus from "./IndexMenus";
import ThemeProvider from "./theme/ThemeProvider";
import AuthProvider from "./auth/surrealdb/AuthProvider";
import NotifyProvider from "./notify/NotifyProvider"
import NotifyManager from './notify/NotifyManager';

const Home = lazy(() => import('../pages/index'))
const About = lazy(() => import('../pages/about'))
const SignIn = lazy(() => import('./auth/surrealdb/SignIn'))
const SignUp = lazy(() => import('./auth/surrealdb/SignUp'))
const SignOut = lazy(() => import('./auth/surrealdb/SignOut'))
const TestLab = lazy(() => import('../pages/testlab'))
const ToDoList = lazy(() => import('../pages/todolist'))
const SurrealDB = lazy(() => import('../pages/surrealdb'))
const Account = lazy(() => import('../pages/account'))
const Blog = lazy(() => import('../pages/blog'))

const HelloApp = () => {
  return (<label></label>)
};

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