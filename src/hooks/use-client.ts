import { useState } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { Message } from "../components/chat-log";

const client = new W3CWebSocket("https://test-wss-bkic.onrender.com/10000");
// const client = new W3CWebSocket("ws://127.0.0.1:8000");

export const useClient = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<string[]>([]);

  client.onopen = () => {
    console.log("Connected to server");
  };

  client.onmessage = (message) => {
    const dataFromServer = JSON.parse(message.data as string);
    console.log("got reply! ", dataFromServer);
    if (dataFromServer.type === "message") {
      setMessages([
        { msg: dataFromServer.msg, user: dataFromServer.user },
        ...messages,
      ]);
    }

    if (dataFromServer.type === "users") {
      setUsers(dataFromServer.users);
    }
  };

  const sendMessage = (msg: string, username: string) => {
    client.send(
      JSON.stringify({
        type: "message",
        msg,
        user: username,
      })
    );
  };

  const addUser = (user: string) => {
    client.send(
      JSON.stringify({
        type: "addUser",
        user: user,
      })
    );
  };

  const removeUser = (user: string) => {
    client.send(
      JSON.stringify({
        type: "removeUser",
        user: user,
      })
    );
  };

  return {
    messages,
    sendMessage,
    users,
    addUser,
    removeUser,
  };
};
