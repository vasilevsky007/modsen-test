import { Col, Container, Row } from "react-bootstrap";

import { BookCard } from "../BookCard/BookCard";

import {Book} from "../../services/Book/Book";


export const ResultsSection = ({ appState }) => {
  let content;

  // switch (appState) {
  //   case 'initial':
  //     content = (
  //       <section className="App-search-results">
  //
  //       </section>
  //     );
  //     break;
  //   case 'loading':
  //     content = (
  //       <section className="App-search-results">
  //
  //       </section>
  //     );
  //     break;
  // }
  let a= new Book();
  content = (
    <section className="App-search-results">
      <Container>
        <Row>
          <Col className='mb-3' xs={6} sm={3}>
            <BookCard isLoaded={false}/>
          </Col>
          <Col className='mb-3' xs={6} sm={3}>
            <BookCard isLoaded={false}/>
          </Col>
          <Col className='mb-3' xs={6} sm={3}>
            <BookCard isLoaded={true} thisBook={a}/>
          </Col>
          <Col className='mb-3' xs={6} sm={3}>
            <BookCard isLoaded={true} thisBook={a}/>
          </Col>


        </Row>
      </Container>
    </section>
  )
  return content;
}