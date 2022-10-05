

import { createSignal, onMount } from 'solid-js';

import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import InlineCode  from '@editorjs/inline-code';
//import SimpleImage  from '@editorjs/simple-image';
//import Embed from '@editorjs/embed';
import Marker from '@editorjs/marker';
import RawTool from '@editorjs/raw';
import CodeTool from '@editorjs/code';


export default function TextBoard(props){

  const [editor, setEditor] = createSignal(null)
  const [readyOnly, setReadOnly] = createSignal(props?.readyonly || true)
  const [editorID, setEditorID] = createSignal(crypto.randomUUID())
  let ref;

  onMount(()=>{
    //console.log(ref)

    const _editor = new EditorJS({
      //holder :editorID(),
      holder : ref,
      //autofocus: true,
      placeholder: 'Write something here?',
      readOnly: readyOnly(),
      //inlineToolbar: false,
      
      tools: {
        header: Header,
        //image: SimpleImage,
        //embed: Embed,
        raw: RawTool,
        code: CodeTool,
        inlineCode: {
          class: InlineCode,
          shortcut: 'CMD+SHIFT+I',
        },
        Marker: {
          class: Marker,
          shortcut: 'CMD+SHIFT+M',
        },
      },
      onChange: async (api, event) => {
        //console.log('Now I know that Editor\'s content changed!', event)
        //console.log("api: ",api)
        try{
          let _edit = editor();
          //console.log(_edit)
          let data = await _edit.save();
          //console.log(data)
          if(typeof props?.onChange === 'function'){
            props.onChange(data);
          }
        }catch(e){
          //console.log("onChange???",e)
        }
      },
      onReady: () => { 
        let _edit = editor();
        if(props?.value){
          try{
            if(props.value == "null"){
              return;
            }
            //console.log("data:", props.value)
            let data = props.value
            data = JSON.parse(data)
            //console.log(data)
            //data = data.blocks;
            //editor().render({blocks:data})
            //let blocks = [{data:{text: "Hello World!"},id: "6qbjgNULnz",type: "paragraph"}]
            //_edit.render({blocks:blocks})
            _edit.render({blocks:data})
          }catch(e){
            console.log(e.message)
          } 
        }
      }
    });
    //editor.readOnly.toggle();
    setEditor(_editor);
    //console.log(_editor)

    //editor().render({blocks:blocks})
    
  })

  async function clickSave(){
    console.log(await editor().save())
    let data = await editor().save();
    console.log(data)
    //console.log(JSON.stringify(data))
  }

  async function clickLoad(){
    let blocks = [{
      data:{text: "Hello World!"},
      id: "6qbjgNULnz",
      type: "paragraph"
    }]

    editor().render({blocks:blocks})
  }

  return (<>
    <div ref={ref} id={editorID()} style="background-color:white;height:100px;">
    </div>
  </>)
}
/*
  <button onClick={clickLoad}> Load </button>
  <button onClick={clickSave}> Save </button>
*/