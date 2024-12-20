import { createContext, useContext, useState } from 'react';

const ADD_MESSAGE_COLOR = '#3d84b8';
const REGULAR_MESSAGE_COLOR = '#2b2e4a';
const ERROR_MESSAGE_COLOR = '#fb3640';

const ScoreCardContext = createContext({
  messages: [],

  addCardMessage: () => {},
  addRegularMessage: () => {},
  addErrorMessage: () => {},
});

const makeMessage = (message, color) => {
  return { message, color };
};

const ScoreCardProvider = (props) => {
  const [messages, setMessages] = useState([]);

  const addCardMessage = (message) => {
    setMessages([makeMessage(message, ADD_MESSAGE_COLOR)]);
  };

  const addRegularMessage = (ms) => {
    console.log(ms)
    if (ms === 'Database cleared'){
      setMessages([makeMessage(ms, REGULAR_MESSAGE_COLOR)]);
    }else{
      const new_ms = ms.map(x => makeMessage(x.name+" "+x.subject+" "+x.score, REGULAR_MESSAGE_COLOR))
      setMessages(new_ms);
    }
    
  };

  const addErrorMessage = (message) => {
    setMessages([makeMessage(message, ERROR_MESSAGE_COLOR)]);
  };

  return (
    <ScoreCardContext.Provider
      value={{
        messages,
        addCardMessage,
        addRegularMessage,
        addErrorMessage,
      }}
      {...props}
    />
  );
};

function useScoreCard() {
  return useContext(ScoreCardContext);
}

export { ScoreCardProvider, useScoreCard };
