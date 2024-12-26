import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";

export type Message = {
  msg: string;
  user: string;
};

export const ChatLog = ({
  messages,
  username,
  sendMessage,
}: {
  messages: Message[];
  username: string;
  sendMessage: (msg: string, username: string) => void;
}) => {
  const [msgValue, setMsgValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <Wrapper>
      <MessagesWrapper>
        {messages.map((message, i) => (
          <MessageCard
            current={message.user === username}
            key={`${message.msg}-${message.user}-${i}`}
          >
            <Username current={message.user === username}>
              {message.user}:
            </Username>
            {message.msg}
          </MessageCard>
        ))}
      </MessagesWrapper>

      <MessageInputWrapper>
        <input
          placeholder="Type message..."
          ref={inputRef}
          value={msgValue}
          onChange={(e) => setMsgValue(e.target.value)}
        />
        <SendButton
          onClick={() => {
            inputRef.current?.focus();
            sendMessage(msgValue, username);
            setMsgValue("");
          }}
          disabled={!msgValue}
        >
          SEND
        </SendButton>
      </MessageInputWrapper>
    </Wrapper>
  );
};

const MessagesWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  padding: 0 0.5rem;
  margin-top: 1rem;
  overflow: scroll;
  position: relative;
`;

const MessageCard = styled.div<{ current: boolean }>`
  display: inline-flex;
  padding: 0.2rem;

  ${({ current }) =>
    current &&
    css`
      justify-content: flex-end;
    `}
`;

const Username = styled.span<{ current: boolean }>`
  color: ${({ current }) => (current ? "red" : "white")};
  margin-right: 0.5rem;
`;

const MessageInputWrapper = styled.div`
  display: inline-grid;
  grid-template-columns: 4fr 1fr;
`;

const SendButton = styled.button``;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: calc(100% - 3rem);
`;
