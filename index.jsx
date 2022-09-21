/*
  Project Name: solid-sandbox
  License: MIT
  Created by: Lightnet
*/

import "./styles.css";

import { lazy } from 'solid-js';
//import { MetaProvider } from 'solid-meta';
//import { createApp } from 'solid-utils';
import { render } from "solid-js/web";
import { Router, Routes, Route } from '@solidjs/router';
import ThemeProvider from "./components/theme/ThemeProvider";
import IndexMenus from "./components/IndexMenus";

import AuthProvider from "./components/auth/AuthProvider";

const Home = lazy(() => import('./pages/index'))
const About = lazy(() => import('./pages/about'))
const SignIn = lazy(() => import('./components/auth/surrealdb/SignIn'))
const SignUp = lazy(() => import('./components/auth/surrealdb/SignUp'))
const SignOut = lazy(() => import('./components/auth/surrealdb/SignOut'))
const TestLab = lazy(() => import('./pages/testlab'))
const ToDoList = lazy(() => import('./pages/todolist'))
const SurrealDB = lazy(() => import('./pages/surrealdb'))
const Account = lazy(() => import('./pages/account'))

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
  //const Route = useRoutes(routes);
  //<IndexMenus/>
  //<div>This site was made with Solid</div>
  return (<>
  <ThemeProvider>
    <AuthProvider>
      <RouterApp/>
    </AuthProvider>
  </ThemeProvider>
</>);
};

//const dispose = createApp(App).use(MetaProvider).use(Router).mount('#app');
const dispose = render(()=>(<RenderApp/>),document.getElementById('app'))
//console.log(app)

if (import.meta.hot) { //< module.hot
  //console.log(import.meta.hot)
  import.meta.hot.accept() //< module.hot.accept()
  //import.meta.hot.dispose(dispose) //< module.hot.dispose(dispose)
  import.meta.hot.dispose(()=>{
    dispose()
  })
  console.log("Hot Reload...")
}

//onCleanup(()=>{
  //dispose();
//})

/*

*/