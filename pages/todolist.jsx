/*
  Project Name: vite-solid-surrealdb
  License: MIT
  Created by: Lightnet
*/

//import { Link } from '@solidjs/router'
import { useNavigate } from '@solidjs/router';
import { createEffect, createMemo, createSignal } from 'solid-js'
import { useAuth } from '../components/auth/surrealdb/AuthProvider';

export default function PageIndex() {

  const [task, setTask] = createSignal("text")
  const [tasks, setTasks] = createSignal([])

  const [editID, setEditID] = createSignal("")
  const [editTask, setEditTask] = createSignal("")

  const [,{token,clientDB}] = useAuth();

  const navigate = useNavigate();
  console.log(token())
  if(!token()){
    return navigate("/", { replace: true })
  }
  
  let dataToken = token().split(".")
  let user = JSON.parse(atob(dataToken[1]));
  console.log(user)

  const SurrealDB = clientDB();

  async function getTasks(){
    try{
      let data = await SurrealDB.query('SELECT * FROM todolist');
      console.log(data)
      if(data[0]?.result){
        setTasks(data[0].result)
      }
    }catch(e){
      console.log(e);
    }
  }

  async function AddTask(){
    try{
      console.log(user.id);
      //let result = await SurrealDB.query(`CREATE todolist SET content = "${task()}", user = '${user.id}'; `);
      let query = `CREATE todolist SET content = "${task()}";`;
      console.log(query)
      let result = await SurrealDB.query(query);
      console.log(result)
      console.log(result[0].result[0])
      console.log(result[0].result[0])
      if(result[0]?.result[0]){
        let rtask = result[0].result[0];
        setTasks(state=>[...state,rtask])
      }
      
    }catch(e){
      console.log(e)
    }
  }

  async function selectTaskID(id,_text){
    setEditID(id);
    setEditTask(_text)
  }

  async function clickUpdateTask(){
    console.log(editID())
    try{
      let result = await SurrealDB.query(`UPDATE ${editID()} SET content = "${editTask()}";`);
      console.log(result)
      
      if(result[0]?.result[0]){
        //let rtask = result[0].result[0];
        setTasks(state=>state.map(item=>{
          console.log(item)
          if(item.id == editID()){
            return {...item, content: editTask()}
          }
          return item;
        }))
      }
      setEditID("");
    }catch(e){
      console.log(e)
    }
  }

  async function deleteTask(id){
    console.log(id)
    try{
      let result = await SurrealDB.query(`DELETE ${id}`);
      console.log(result)
      setTasks(state=>state.filter(item=>item.id !== id))
    }catch(e){
      console.log(e)
    }
  }

  const taskList = createMemo(()=>{
    const items = tasks();

    return items.map(item=>{
      return (<div key={item.id}>
        {editID() == item.id ? (
          <>
            <input value={editTask()} onInput={(e)=>setEditTask(e.target.value)} />
            <button onClick={()=>clickUpdateTask()}> Update </button>
          </>
        ):(
          <>
          <label> {item.content} </label>
          <button onClick={()=>selectTaskID(item.id, item.content)}> Edit </button>
          </>
        )}
        
        <button onClick={()=>deleteTask(item.id)}> x </button>
      </div>)
    })
  })

  getTasks();

  return (
    <div>
      <label>Home</label><span> | </span>

      

      <input value={task()} onInput={(e)=>setTask(e.target.value)}/>
      <button onClick={AddTask}>Add</button>
      <button onClick={getTasks}>list</button>
      <div>
        {taskList}
      </div>
    </div>
  )
}