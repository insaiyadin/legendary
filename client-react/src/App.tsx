import { Container } from "react-bootstrap";
import CreateMovie from "./components/create-movie";
import Movies from "./components/movies";

function App() {
  return (
    <Container>
      <CreateMovie />
      <Movies />
    </Container>
  );
}

export default App;
