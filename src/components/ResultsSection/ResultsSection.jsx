import {Button, Col, Container, Row, Spinner} from "react-bootstrap";

import { BookCard } from "../BookCard/BookCard";

import { BookFactory } from "../../services/Book/Book";
import {useState} from "react";
import {PAGINATION_STEP} from "../../utils/constants/constants";
import {bookStorage} from "../../services/BookStorage/BookStorage";


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
            state: result.numberOfBooksFound,
            bookData: result.bookData,
            numberOfBooksDisplayed: appState.numberOfBooksDisplayed + result.numberOfBooksLoaded,
            lastNumberOfBooksLoaded: result.numberOfBooksLoaded
          });
        },
        (error) => {
          console.log(error);
          setAppState({ state: "error", error: error });
        }
      )
      .finally(
        () => setIsLoadingMore(false)
      )
  }

  switch (appState.state) {
    case 'initial':
    case 'error':
      content = (
        <section className="App-search-results">
        </section>
      );
      break;
    case 'loading':
      bookStorage.clear();
      for (let i = 0; i < appState.numberOfBooksDisplayed; i++) {
        bookStorage.push("");
      }
      content = (
        <section className="App-search-results">
          <Container>
            <Row>
              {
                bookStorage.books.map( (value, index) =>
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
        for (let i = 0; i < appState.lastNumberOfBooksLoaded; i++) {
          bookStorage.push(bookFactory.create("google", +appState.state, appState.bookData));
        }
        console.log("BookStorage: ", bookStorage.books);
      }

      content = (
        <section className="App-search-results">
          <Container>
            <Row>
              {
                bookStorage.books.map( (thisBook, index) =>
                  <Col className='mb-3' xs={6} sm={4} lg={3} key={ "loaded_book_"+index }>
                    <BookCard isLoaded={true} thisBook={thisBook}/>
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