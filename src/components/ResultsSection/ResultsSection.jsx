import {Button, Col, Container, Row, Spinner} from "react-bootstrap";

import { BookCard } from "../BookCard/BookCard";

import { BookFactory } from "../../services/Book/Book";
import { useState } from "react";


export const ResultsSection = ({ appState }) => {
  let content;
  let bookFactory = new BookFactory();
  let initialNumberOfCards;
  let booksShowing = [];
  switch (appState) {
    case 'initial':
      initialNumberOfCards = 0;
      break;
    case 'loading':
      initialNumberOfCards = 30;
      break;
    default:
      initialNumberOfCards = +appState < 30 ? appState : 30;
      break;
  }

  const [numberOfCardsShown, setNumberOfCardsShown] = useState(initialNumberOfCards);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const loadMore = () =>{
    const numberOfBooksGoingToLoad = +appState - numberOfCardsShown < 30 ? +appState - numberOfCardsShown : 30;
    console.log('loading ' + numberOfBooksGoingToLoad + ' more books from index ' + numberOfCardsShown );
    setIsLoadingMore(true);
    new Promise(resolve => setTimeout(resolve, 1000)).then(() => {
      booksShowing.push(bookFactory.create("placeholder", +appState))
      setNumberOfCardsShown(numberOfCardsShown + numberOfBooksGoingToLoad);
      setIsLoadingMore(false);
    } );
  }

  switch (appState) {
    case 'initial':
      content = (
        <section className="App-search-results">
        </section>
      );
      break;
    case 'loading':
      while ( typeof booksShowing.pop() !== 'undefined') {  }
      for (let i = 0; i < numberOfCardsShown; i++) {
        booksShowing.push("");
      }
      content = (
        <section className="App-search-results">
          <Container>
            <Row>
              {
                booksShowing.map( (value, index) =>
                  <Col className='mb-3' xs={6} sm={4} lg={3} key={ "loading_book_" + index }>
                    <BookCard isLoaded={false}/>
                  </Col>
                )
              }
            </Row>
          </Container>
        </section>
      );
      break;
    default:
      while ( typeof booksShowing.pop() !== 'undefined') {  }
      for (let i = 0; i < numberOfCardsShown; i++) {
        booksShowing.push(bookFactory.create("placeholder", +appState));
      }
      content = (
        <section className="App-search-results">
          <Container>
            <Row>
              {
                booksShowing.map( (thisCardBook, index) =>
                  <Col className='mb-3' xs={6} sm={4} lg={3} key={ "loaded_book_"+index }>
                    <BookCard isLoaded={true} thisBook={thisCardBook}/>
                  </Col>
                )
              }
            </Row>
            <Row>
              <Col className="d-flex justify-content-center">
                <Button
                  variant="outline-secondary"
                  disabled={isLoadingMore}
                  onClick={!isLoadingMore ? loadMore : null}
                  className="mb-3">
                  {
                    !isLoadingMore ? 'Load more' :
                      <>Loading <Spinner variant="secondary" size="sm"/></>
                  }

                </Button>
              </Col>
            </Row>
          </Container>

        </section>
      )
      break;
  }
  return content;
}