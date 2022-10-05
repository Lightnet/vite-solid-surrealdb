/*
  Project Name: vite-solid-surrealdb
  License: MIT
  Created by: Lightnet
*/

//import { createMemo, createSignal, For } from "solid-js"
//import { useAuth } from "../auth/surrealdb/AuthProvider";
//import TextEditor from "../texteditors/TextEditor";
import TextBoard from "./TextBoard";

export default function CardBoard(props){

  //const [boards, setBoards] = createSignal([]);

  return (<>
    <div>
      <label>Board:</label>
    </div>
    <TextBoard value={props.content} />
  </>)
}