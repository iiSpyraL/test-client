import { useEffect, useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { styled } from "styled-components";
import { ChatLog } from "./components/chat-log";

// const client = new W3CWebSocket("https://test-wss-bkic.onrender.com/10000");
const client = new W3CWebSocket("ws://127.0.0.1:8000");

function App() {
  // const [count, setCount] = useState(0);
  const [state, setState] = useState<{
    userName: string;
    isLoggedIn: boolean;
    messages: any[];
    searchVal: string;
    users: any[];
  }>({
    userName: "",
    isLoggedIn: false,
    messages: [],
    searchVal: "",
    users: [],
  });

  const [userInput, setUserInput] = useState("");

  const onButtonClick = (value: string) => {
    client.send(
      JSON.stringify({
        type: "message",
        msg: value,
        user: state.userName,
      })
    );
    setState({ ...state, searchVal: "" });
  };

  const updateCurrentUsers = (users: string[]) => {
    client.send(
      JSON.stringify({
        type: "users",
        users: users,
      })
    );
  };

  // useEffect(() => {
  client.onopen = () => {
    console.log("WebSocket Client Connected");
  };
  client.onmessage = (message) => {
    const dataFromServer = JSON.parse(message.data as string);
    console.log("got reply! ", dataFromServer);
    if (dataFromServer.type === "message") {
      setState({
        ...state,
        messages: [
          ...state.messages,
          {
            msg: dataFromServer.msg,
            user: dataFromServer.user,
          },
        ],
      });
    }

    if (dataFromServer.type === "users") {
      setState({ ...state, users: dataFromServer.users });
    }
  };
  // }, []);
  console.log(state.users);
  return (
    <div className="main" id="wrapper">
      {state.isLoggedIn ? (
        <div>
          <div className="title">
            {state.users.map((user) => (
              <div key={user}>{user}</div>
            ))}
          </div>

          <ChatLog messages={state.messages} username={state.userName} />

          <div className="bottom">
            <Search
              placeholder="input message and send"
              // enterButton="Send"
              value={state.searchVal}
              // size="large"
              onChange={(e) =>
                setState({ ...state, searchVal: e.target.value })
              }
            />
            <button onClick={() => onButtonClick(state.searchVal)} />
          </div>
        </div>
      ) : (
        <div style={{ padding: "200px 40px" }}>
          <Search
            placeholder="Enter Username"
            // enterButton="Login"
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button
            onClick={() => {
              setState({
                ...state,
                isLoggedIn: true,
                userName: userInput,
                users: [...state.users, userInput],
              });
              updateCurrentUsers([...state.users, userInput]);
            }}
          >
            Log in
          </button>
        </div>
      )}
    </div>
  );
}

export default App;

const Search = styled.input``;

const Card = styled.div`
  width: 300;
  margin: "16px 4px 0 4px";
  alignself: flex-end;
`;
