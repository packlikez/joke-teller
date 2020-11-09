import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useSpeechSynthesis } from "react-speech-kit";

import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";

import { getRandomJoke, closeToast } from "./store/joke";
import Toast from "./components/Toast";

function App() {
  const joke = useSelector((store) => store.joke);
  const dispatch = useDispatch();
  const { speak, cancel } = useSpeechSynthesis();

  useEffect(() => {
    speak({ text: joke.story });
  }, [joke.story]);

  const getMoreJoke = () => {
    cancel();
    dispatch(getRandomJoke());
  };

  return (
    <Wrapper>
      <Toast
        isOpen={joke.toast.isOpen}
        type={joke.toast.type}
        message={joke.toast.message}
        onClose={dispatch(closeToast())}
      />
      <Card>
        <CardLabel>Joke teller</CardLabel>

        <Button color="primary" variant="contained" onClick={getMoreJoke}>
          Tell me joke
          {joke.isLoading && <CircularProgress size="20px" color="secondary" />}
        </Button>

        <Joke>{joke.story}</Joke>
      </Card>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Card = styled.div`
  display: flex;
  padding: 16px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 16px;
  width: 100%;
  max-width: 600px;
`;

const CardLabel = styled.span`
  font-size: 70px;
  text-align: center;
`;

const Joke = styled.span`
  min-height: 200px;
`;

export default App;
