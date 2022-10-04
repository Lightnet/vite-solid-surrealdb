

import { createSignal, onMount } from 'solid-js';

import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import InlineCode  from '@editorjs/inline-code';
//import SimpleImage  from '@editorjs/simple-image';
//import Embed from '@editorjs/embed';
import Marker from '@editorjs/marker';
import RawTool from '@editorjs/raw';
import CodeTool from '@editorjs/code';


export default function TextEditor(){

  const [editor, setEditor] = createSignal(null)
  const [editorID, setEditorID] = createSignal(crypto.randomUUID())

  onMount(()=>{
    const editor = new EditorJS({
      holder :editorID(),
      autofocus: true,
      placeholder: 'Write something here?',
      //readOnly: true,
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
      }
    });
    //editor.readOnly.toggle();
    setEditor(editor);
    console.log(editor)
  })

  async function clickSave(){
    console.log(await editor().save())
    let data = await editor().save();
    console.log(data)
    //console.log(JSON.stringify(data))
  }

  async function clickLoad(){
    let blocks = [{
      data:{text: "asdasdasd"},
      id: "6qbjgNULnz",
      type: "paragraph"
    }]

    editor().render({blocks:blocks})
  }

  return (<>
    <button onClick={clickLoad}> Load </button>
    <button onClick={clickSave}> Save </button>
    <div id={editorID()} style="background-color:white;">

    </div>
  </>)

}