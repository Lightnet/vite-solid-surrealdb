/*
  Project Name: solid-sandbox
  License: MIT
  Created by: Lightnet

  Information: Keep it simple for reload SSR.

*/

import "./styles.css";
import * as Solid from 'solid-js';
console.log(Solid)
//import { MetaProvider } from 'solid-meta';
//import { createApp } from 'solid-utils';
import { render } from "solid-js/web";
import App from "./components/App";

//const dispose = createApp(App).use(MetaProvider).use(Router).mount('#app');
//const dispose = render(()=>(<RenderApp/>),document.getElementById('app'))
const dispose = render(()=>(<App/>),document.getElementById('app'))
//console.log(app)

if (import.meta.hot) { //< module.hot
  //console.log(import.meta.hot)
  import.meta.hot.accept() //< module.hot.accept()
  import.meta.hot.dispose(dispose) //< module.hot.dispose(dispose)
  //import.meta.hot.dispose(()=>{dispose()})
  //console.log("Hot Reload...")
}