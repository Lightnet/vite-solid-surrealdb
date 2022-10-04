/*
  Project Name: vite-solid-surrealdb
  License: MIT
  Created by: Lightnet
*/

import { 
  createMemo
} from 'solid-js';

import { Link, useLocation } from '@solidjs/router';
//import { Link, useLocation } from 'solid-app-router';
import ToggleTheme from './theme/ToggleTheme';

const IndexMenus = () => {
  
  const location = useLocation();
  //console.log(location)
  const pathname = createMemo(() => location.pathname);

  //for menu display
  let whitelist = [
    "/",
    "/about",
    "/blog",
    "/account",
    "/signin",
    "/signup",
    "/signout",
    "/testlab",
    "/surrealdb",
    "/todolist",
    "/forum",
  ];

  const displayMenu = createMemo(()=>{
    //console.log("FIND:",whitelist.find((item)=>{
      //return item === pathname()      
    //}))
    if(
      whitelist.find((item)=>{return item === pathname()})
      //true
    ){
      //console.log("FOUND")
      // <ToggleTheme /> //does not work here layer?
      return ( <div>
        <Link class="btnLink" href="/">Home</Link><span> | </span>
        <Link class="btnLink" href="/about">About</Link><span> | </span>
        <Link class="btnLink" href="/blog">Blog</Link><span> | </span>
        <Link class="btnLink" href="/account">Account</Link><span> | </span>
        <Link class="btnLink" href="/testlab">Test Lab</Link><span> | </span>
        <Link class="btnLink" href="/surrealdb">SurrealDB</Link><span> | </span>
        <Link class="btnLink" href="/todolist">To Do List</Link><span> | </span>
        <Link class="btnLink" href="/forum">Forum</Link><span> | </span>
        <ToggleTheme />
        </div>)
    }else{
      //console.log("NOT FOUND")
      return (<>
      </>)
    }
  })
  

  return (<>
  {displayMenu}
  </>)

}

export default IndexMenus;