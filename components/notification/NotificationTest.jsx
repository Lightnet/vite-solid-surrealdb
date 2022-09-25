import { createSignal } from "solid-js"

// https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API/Using_the_Notifications_API

export default function NotificationTest(){

  const [permission,setPermission] = createSignal(false);

  function clickCheck(){
    if (!Notification) {
      alert('Desktop notifications not available in your browser. Try Chromium.');
      return;
    }
    console.log(Notification.permission)
    if (Notification.permission !== 'granted'){
      Notification.requestPermission();
    };
  }

  function clickTest(){
    //const img = '/to-do-notifications/img/icon-128.png';
    const text = `HEY! Test!` + crypto.randomUUID();
    const notification = new Notification('To do list', {
      body: text
      //, icon: img 
      , tag:"test"
    });
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        // The tab has become visible so clear the now-stale Notification.
        notification.close();
      }
    });
  }

  return (<>
    <label> Notification Permission:   </label>
    <button onClick={clickCheck}> Notification Check </button>
    <button onClick={clickTest}> Notification Test 1 </button>
  </>)
}