import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import { MainPage } from "./components/main-page";
import { useClient } from "./hooks/use-client";
import styled from "styled-components";

function App() {
  const { messages, sendMessage, users, addUser, removeUser } = useClient();
  const userId = localStorage.getItem("userId");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!userId);
  const [loginError, setLoginError] = useState<string | null>();
  const [userInput, setUserInput] = useState("");

  return (
    <AppWrapper>
      {isLoggedIn && userId ? (
        <MainPage
          username={userId}
          users={users}
          messages={messages}
          sendMessage={sendMessage}
          removeUser={removeUser}
        />
      ) : (
        <LoginWrapper>
          <input
            placeholder="Enter Username"
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button
            onClick={() => {
              if (users.includes(userInput)) {
                setLoginError("Name already taken");
                return;
              }
              localStorage.setItem("userId", userInput);
              setIsLoggedIn(true);
              addUser(userInput);
            }}
          >
            Log in
          </button>
          {loginError && <span>{loginError}</span>}
        </LoginWrapper>
      )}
    </AppWrapper>
  );
}

export default App;

const AppWrapper = styled.div`
  width: 100%;
  height: -webkit-fill-available;
`;

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;
