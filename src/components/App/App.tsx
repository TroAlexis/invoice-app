import React from "react";
import "./App.module.scss";
import Heading from "../ui/Heading/Heading";
import Text from "../ui/Text/Text";
import Container from "../ui/Container/Container";

const App = (): JSX.Element => {
  return (
    <Container>
      <Heading level="h1">
        Hello fucking world!
      </Heading>

      <Text>Hello world!</Text>
    </Container>
  );
}

export default App;