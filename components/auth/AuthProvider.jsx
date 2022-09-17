/*
  Project Name: vite-solid-surrealdb
  License: MIT
  Created by: Lightnet
*/

import { createContext, createEffect, createSignal, useContext } from 'solid-js'


export const AuthContext = createContext();

export function useAuth(){return useContext(AuthContext);}

export default function AuthProvider(props){

  const [session, setSession] = createSignal(props.session || null);
  const [token, setToken] = createSignal(props.token || null);

  const value = [
      session,
      {
        token:token,
        setToken:setToken,
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
    console.log(token())
  })

  return (<AuthContext.Provider value={value}>
    {props.children}
  </AuthContext.Provider>)
}