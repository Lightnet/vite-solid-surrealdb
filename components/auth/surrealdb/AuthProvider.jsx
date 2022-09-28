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
} from 'solid-js'
import SurrealDB from 'surrealdb.js'
import { jwtUser } from '../../../libs/clientapi';

export const AuthContext = createContext();

export function useAuth(){return useContext(AuthContext);}

export default function AuthProvider(props){

  const [session, setSession] = createSignal(props.session || null);
  const [token, setToken] = createSignal(props.token || null);
  const [clientDB, setClientDB] = createSignal(props.clientDB || null);
  const [isLogin, setIsLogin] = createSignal(props.isLogin || false);
  const [user, setUser] = createSignal('Guest');
  const [userID, setUserID] = createSignal('');

  const db = new SurrealDB('http://localhost:8000/rpc');
  db.use('test','test')
  setClientDB(db)

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
        //console.log(strToken)
        let userData = jwtUser(strToken);
        //console.log(userData)
        //setUser(userData.split(":")[0])
        setUserID(userData.id.split(":")[1]);
        setIsLogin(true);
        console.log("LOGIN TRUE?")
      }else{
        setIsLogin(false)
        setUser('Guest')
        setUserID('')
      }
    }catch(e){
      console.log(e)
      setIsLogin(false)
      setUser('Guest')
      setUserID('')
    }
  })

  return (<AuthContext.Provider value={value}>
    {props.children}
  </AuthContext.Provider>)
}