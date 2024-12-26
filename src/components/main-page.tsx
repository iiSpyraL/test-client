import { useState } from "react";
import styled, { css } from "styled-components";
import { ChatLog, Message } from "./chat-log";

export const MainPage = ({
  username,
  users,
  messages,
  sendMessage,
  removeUser,
}: {
  username: string;
  users: string[];
  messages: Message[];
  sendMessage: (msg: string, username: string) => void;
  removeUser: (user: string) => void;
}) => {
  const [chatOpen, setChatOpen] = useState<boolean>(false);

  return (
    <Wrapper>
      <HeaderWrapper>
        <Button
          onClick={() => {
            localStorage.removeItem("userId");
            removeUser(username);
            window.location.reload();
          }}
        >
          Logout
        </Button>
        <Button onClick={() => setChatOpen(!chatOpen)}>
          {chatOpen ? "Back" : "Chat"}
        </Button>
      </HeaderWrapper>
      {chatOpen ? (
        <ChatLog
          messages={messages}
          username={username}
          sendMessage={sendMessage}
        />
      ) : (
        <Users>
          <h2>Users:</h2>
          {users.map((user) => (
            <User current={user === username} key={user}>
              {user}
            </User>
          ))}
        </Users>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Button = styled.button`
  color: aquamarine;
  height: 3rem;
`;

const HeaderWrapper = styled.div`
  display: inline-flex;
  justify-content: space-between;
`;

const Users = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: scroll;
`;

const User = styled.span<{ current: boolean }>`
  ${({ current }) =>
    current &&
    css`
      color: red;
    `}
`;
