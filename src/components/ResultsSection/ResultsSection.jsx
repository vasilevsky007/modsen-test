import {Button, Col, Container, Row, Spinner} from "react-bootstrap";

import { BookCard } from "../BookCard/BookCard";

import { BookFactory } from "../../services/Book/Book";
import {useState} from "react";
import {PAGINATION_STEP} from "../../utils/constants/constants";
import {BookStorage} from "../../services/BookStorage/BookStorage";


export const ResultsSection = ({ appState, setAppState, requestFactory}) => {
  let content;
  let bookFactory = new BookFactory();


  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const loadMore = () =>{
    setIsLoadingMore(true);
    requestFactory.getLast()
      .paginationRequest()
      .then(
        (result) => {
          setAppState({ 
            state: appState.state, 
            bookData: result.bookData,
            numberOfBooksDisplayed: appState.numberOfBooksDisplayed + result.numberOfBooksLoaded
          });
        },
        (error) => {
          //TODO: display error message in UI
          console.log(error);
          setAppState({ state: "initial" })
        }
      )
      .finally(
        () => setIsLoadingMore(false)
      )
  }

  switch (appState.state) {
    case 'initial':
      content = (
        <section className="App-search-results">
        </section>
      );
      break;
    case 'loading':
      BookStorage.clear();
      for (let i = 0; i < appState.numberOfBooksDisplayed; i++) {
        BookStorage.push("");
      }
      content = (
        <section className="App-search-results">
          <Container>
            <Row>
              {
                BookStorage.books.map( (value, index) =>
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
      if (!isLoadingMore)  {
        console.log("adding new", appState.numberOfBooksDisplayed - PAGINATION_STEP, appState.numberOfBooksDisplayed);
        for (let i = appState.numberOfBooksDisplayed - PAGINATION_STEP; i < appState.numberOfBooksDisplayed; i++) {
          BookStorage.push(bookFactory.create("placeholder", +appState.state, appState.bookData));
        }
      }
      console.log("BookStorage: ", BookStorage.books);
      content = (
        <section className="App-search-results">
          <Container>
            <Row>
              {
                BookStorage.books.map( (thisCardBook, index) =>
                  <Col className='mb-3' xs={6} sm={4} lg={3} key={ "loaded_book_"+index }>
                    <BookCard isLoaded={true} thisBook={thisCardBook}/>
                  </Col>
                )
              }
            </Row>
            {
              appState.numberOfBooksDisplayed < +appState.state ?
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
                </Row> :
                <></>
            }
          </Container>

        </section>
      )
      break;
  }
  return content;
}