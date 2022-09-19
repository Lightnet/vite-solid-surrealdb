/*
  Project Name: vite-solid-surrealdb
  License: MIT
  Created by: Lightnet
*/

import "./styles.css";
// https://github.com/vitejs/vite/discussions/2785
//import * as Buffer from 'buffer-esm'
//import { Buffer as BufferPolyfill } from 'buffer'
//window.Buffer = BufferPolyfill;

import { 
 lazy
, onCleanup
} from 'solid-js';
import { MetaProvider } from 'solid-meta';
import { createApp } from 'solid-utils';
import { Router, useRoutes } from '@solidjs/router';
//import ThemeProvider from "./components/theme/ThemeProvider";
import IndexMenus from "./components/IndexMenus";
//import Home from './pages/index.jsx';
import AuthProvider from "./components/auth/AuthProvider";
//import { AuthProvider } from "./components/auth/api/AuthProvider";

const routes = [
  {
    path: '/',
    component: lazy(() => import('./pages/index')),
    //component: Home,
  },
  {
    path: '/about',
    component: lazy(() => import('./pages/about')),
  },
  {
    path: '/signup',
    component: lazy(() => import('./components/auth/SignUp')),
  },
  {
    path: '/signin',
    component: lazy(() => import('./components/auth/SignIn')),
  },
  {
    path: '/signout',
    component: lazy(() => import('./components/auth/SignOut')),
  },
  {
    path: '/testlab',
    component: lazy(() => import('./pages/testlab')),
  },
];

const App = () => {
  const Route = useRoutes(routes);

  return (<>
  <AuthProvider>
    <IndexMenus/>
    <Route />
  </AuthProvider>
  </>);
};

const dispose = createApp(App).use(MetaProvider).use(Router).mount('#app');

if (import.meta.hot) { //< module.hot
  //console.log(import.meta.hot)
  import.meta.hot.accept() //< module.hot.accept()
  import.meta.hot.dispose(dispose) //< module.hot.dispose(dispose)
  console.log("Hot Reload...")
}

//onCleanup(()=>{
  //dispose();
//})

/*

*/