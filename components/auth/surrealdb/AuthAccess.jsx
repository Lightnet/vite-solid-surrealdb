/*
  Project Name: vite-solid-surrealdb
  License: MIT
  Created by: Lightnet
*/

//import { Link } from '@solidjs/router'
import { useAuth } from './AuthProvider.jsx';

export default function AuthAccess({children}) {

  const [,{isLogin}] = useAuth();

  return (<>
    {isLogin()?(<>
      {children}
    </>):(<>
      <label> Please Login! </label>
    </>)}
  </>)
}