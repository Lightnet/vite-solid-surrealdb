/*
  Project Name: vite-solid-surrealdb
  License: MIT
  Created by: Lightnet
*/

import { createSignal } from "solid-js"
import { useAuth } from "../auth/surrealdb/AuthProvider";
import TextEditor from "../texteditors/TextEditor";

export default function CreateBoard(props){

  const [boards, setBoards] = createSignal([]);
  const [boardID, setBoardID] = createSignal(null);
  const [content, setContent] = createSignal(null);

  const [,{clientDB}] = useAuth();
  const db = clientDB();

  function onChange(e){
    //console.log(e)
    let datastr = btoa(JSON.stringify(e.blocks));
    //console.log(datastr)
    setContent(datastr)
  }

  function clickCreate(){
    //console.log("CREATE")
    //console.log(content())
    db.query(`CREATE board SET content="${content()}";`)
  }

  return (<>
    <TextEditor onChange={onChange}/>
    <div>
      <label> Parent ID: </label>
      <input />
      <button onClick={clickCreate}> Create </button>
    </div>
  </>)
}