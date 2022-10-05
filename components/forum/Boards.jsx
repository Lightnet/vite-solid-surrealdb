/*
  Project Name: vite-solid-surrealdb
  License: MIT
  Created by: Lightnet
*/

import { createSignal, For } from "solid-js"
import { useAuth } from "../auth/surrealdb/AuthProvider";
import CardBoard from "./CardBoard";

export default function Boards(props){

  const [boards, setBoards] = createSignal([]);

  const [,{clientDB}] = useAuth();
  const db = clientDB();

  async function getBoards(){
    try{
      let data = await db.query(`SELECT * FROM board;`)
      //console.log(data)
      if(data[0]?.result !=null && data[0]?.status=="OK"){
        setBoards(data[0].result)
      }
    }catch(e){
      console.log(e.message)
    }
  }

  getBoards()

  return (<>
    <label> Boards: </label>
    <For each={boards()}>
    {(item) => {
      //console.log(item)
      let content = item.content;
      if(content == null){
        return null;
      }
      if(content == 'null'){
        return null;
      }
      try{
        content= atob(content);
      }catch(e){
        content = "Error!";
      }
      
      //return <div key={item.id}>{content}</div>
      return <CardBoard content={content} />
    }}
    </For>
  </>)
}