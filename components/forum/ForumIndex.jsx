/*
  Project Name: vite-solid-surrealdb
  License: MIT
  Created by: Lightnet
*/

import { createSignal } from "solid-js"
import Boards from "./Boards";
import CreateBoard from "./CreateBoard";

export default function ForumIndex(){

  const [boardID, setBoardID] = createSignal('');
  const [topicID, setTopicID] = createSignal('');

  return (<>
    <label>Forum Index</label>
    <div>
      <label>Menu</label>
    </div>
    <div>
      <label>Content</label>
      <Boards />
    </div>

    <div>
      
    </div>
  </>)
}
/*
<CreateBoard />

*/