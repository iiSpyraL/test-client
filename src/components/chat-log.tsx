import styled from "styled-components";

type Message = {
  msg: string;
  user: string;
};
export const ChatLog = ({
  messages,
  username,
}: {
  messages: Message[];
  username: string;
}) => {
  return (
    <Wrapper>
      {messages.map((message, i) => (
        <MessageCard key={`${message.msg}-${message.user}-${i}`}>
          <Username activeUser={message.user === username}>
            {message.user}:
          </Username>
          {message.msg}
        </MessageCard>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MessageCard = styled.div`
  display: inline-flex;
  padding: 0.2rem;
`;

const Username = styled.span<{ activeUser: boolean }>`
  color: ${({ activeUser }) => (activeUser ? "red" : "white")};
  margin-right: 0.5rem;
`;
