/*
  Project Name: solid-sandbox
  License: MIT
  Created by: Lightnet
*/

import "./styles.css";

import { 
 lazy
, onCleanup
} from 'solid-js';
import { MetaProvider } from 'solid-meta';
import { createApp } from 'solid-utils';
import { Router, useRoutes } from '@solidjs/router';
import ThemeProvider from "./components/theme/ThemeProvider";
import IndexMenus from "./components/IndexMenus";
//import Home from './pages/index.jsx';
import AuthProvider from "./components/auth/AuthProvider";

const routes = [
  {
    path: '/',
    component: lazy(() => import('./pages/index')),
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
  //<ThemeProvider>
  return (
    <ThemeProvider>
      <AuthProvider>
        <IndexMenus/>
        <Route />
      </AuthProvider>
    </ThemeProvider>
  );
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