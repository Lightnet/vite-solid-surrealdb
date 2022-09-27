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
import { jwtUser } from '../../../libs/clientapi';

export const AuthContext = createContext();

export function useAuth(){return useContext(AuthContext);}

export default function AuthProvider(props){

  const [session, setSession] = createSignal(props.session || null);
  const [token, setToken] = createSignal(props.token || null);
  const [clientDB, setClientDB] = createSignal(props.clientDB || null);
  const [isLogin, setIsLogin] = createSignal(props.clientDB || null);
  const [user, setUser] = createSignal('Guest');
  const [userID, setUserID] = createSignal('');

  const value = [
    session,
    {
      user:user,
      setUser:setUser,
      userID:userID,
      setUserID:setUserID,
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
  createEffect(() => {
    //console.log(token())
    let strToken = token();
    try{
      if(strToken){
        let userData = jwtUser(strToken);
        //console.log(userData)
        setUser(userData.alias)
        setUserID(userData.aliasID)
        setIsLogin(true)
      }else{
        setIsLogin(false)
        setUser('Guest')
        setUserID('')
      }
    }catch(e){
      setIsLogin(false)
      setUser('Guest')
      setUserID('')
    }
  })

  return (<AuthContext.Provider value={value}>
    {props.children}
  </AuthContext.Provider>)
}