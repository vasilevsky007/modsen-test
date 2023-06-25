import {Alert, Container, Spinner} from "react-bootstrap";

import './styles.css'

export const ProgressSection = ({ appState }) => {
  let content;
  switch (appState.state) {
    case 'initial':
      content =
        <section className="App-ProgressSection m-2">
          <Container>
            <Alert variant="dark">
              Please enter the search query
            </Alert>
          </Container>
        </section>;
      break;
      case 'loading':
      content =
        <section className="App-ProgressSection m-2">
          <Spinner/>
        </section>;
      break;
      default:
      content =
        <section className="App-ProgressSection m-2">
          <Container>
            <Alert variant="success">
              Found {appState.state} results
            </Alert>
          </Container>
        </section>;
      break;
  }
  return content;
}