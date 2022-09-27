/*
  Project Name: vite-solid-surrealdb
  License: MIT
  Created by: Lightnet
*/

import { 
  createContext
, createEffect
, createSignal
, useContext
} from 'solid-js';

export const AuthContext = createContext();

export function useAuth(){return useContext(AuthContext);}

export default function AuthProvider(props){

  const [session, setSession] = createSignal(props.session || null);
  const [token, setToken] = createSignal(props.token || null);
  const [clientDB, setClientDB] = createSignal(props.clientDB || null);
  const [isLogin, setIsLogin] = createSignal(props.clientDB || null);

  const value = [
    session,
    {
      isLogin:isLogin,
      setIsLogin:setIsLogin,
      token:token,
      setToken:setToken,
      clientDB:clientDB,
      setClientDB:setClientDB,
      setSession: setSession,
      AssignSession(data) {
        setSession(data);
      },
      clearSession() {
        setSession(null);
      }
    }
  ];
  //watch data
  //createEffect(() => {    
    //console.log(token())
  //})

  return (<AuthContext.Provider value={value}>
    {props.children}
  </AuthContext.Provider>)
}