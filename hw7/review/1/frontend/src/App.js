import './App.css';
import { useState, useEffect } from 'react';
import { message } from 'antd';

import SignIn from './containers/SignIn';
import ChatRoom from './containers/ChatRoom';

// const onEvent = (e) => {
//   const { type } = e;

//   switch (type) {
//     case 'CHAT': {
//       messages = e.data.messages;
//       break;
//     }
//     case 'MESSAGE': {
//       messages.push(e.data.message);
//       break;
//     }
//   }
// }

const server = new WebSocket('ws://localhost:8080');
server.onopen = () => console.log('Server connected.');
server.onmessage = (m) => {
  // onEvent(JSON.parse(m.data));
};
server.sendEvent = (e) => server.send(JSON.stringify(e));

const LOCAL_STORAGE_KEY = 'save-me';

const App = () => {
  const savedMe = localStorage.getItem(LOCAL_STORAGE_KEY);
  const [signedIn, setSignedIn] = useState(false);
  const [me, setMe] = useState(savedMe || "");

  const displayStatus = (payload) => {
    if (payload.msg) {
      const { type, msg } = payload;
      const content = { content: msg, duration: 1.5 };
      switch (type) {
        case 'success':
          message.success(content);
          break;
        case 'error':
        default:
          message.error(content);
      }
    }
  };

  // useEffect(() => {
  //   displayStatus(status)
  // }, [status]);

  useEffect(() => {
    if (signedIn) {
      localStorage.setItem(LOCAL_STORAGE_KEY, me);
    }
  }, [signedIn]);

  return (
    <div className="App">
      {signedIn ? (
        <ChatRoom me={me} displayStatus={displayStatus} server={server}/>
      ) : (
        <SignIn me={me} setMe={setMe} setSignedIn={setSignedIn} displayStatus={displayStatus}/>
      )}
    </div>
  );
};

export default App;
