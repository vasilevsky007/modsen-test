import {useState} from "react";

import {Button, Col, Container, Form, InputGroup, Row} from "react-bootstrap";

import './styles.css'
import backgroundBooksImage from "../../assets/books_background.jpg";
import {PAGINATION_STEP} from "../../utils/constants/constants";
import {bookStorage} from "../../services/BookStorage/BookStorage";


export const Header = ({ setAppState, requestFactory }) => {
  const [enteredSearchQuery, setEnteredSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [sorting, setSorting] = useState('relevance');
  const searchForBooks = (event) => {
    event.preventDefault();
    setAppState({ state:'loading' });
    requestFactory.create("google", PAGINATION_STEP, enteredSearchQuery, category, sorting)
      .initialRequest()
      .then(
        (result) => {
          bookStorage.clear();
          let numberOfBooksDisplayed = result.numberOfBooksFound > PAGINATION_STEP ? PAGINATION_STEP : result.numberOfBooksFound;
          setAppState({
            state: result.numberOfBooksFound,
            bookData: result.bookData,
            numberOfBooksDisplayed: numberOfBooksDisplayed,
            lastNumberOfBooksLoaded: result.numberOfBooksLoaded
          });
        },
        (error) => {
          console.log(error);
          setAppState({ state: "error", error: error });
        }
      )
  }

  return (
    <header className="pb-3" style={{
      backgroundImage: `url(${backgroundBooksImage})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover'
    }}>
      <Container>
        <Row>
          <Col>
            <h1 className="header-text mt-5 mb-5">Search for books</h1>
          </Col>
        </Row>
        <Form className="search-form" onSubmit={ searchForBooks }>
          <Row>
            <Col>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Enter the book name"
                  aria-label="Enter the book name"
                  onChange={ event => setEnteredSearchQuery(event.target.value) }
                />
                <Button as="input" type="submit" value="Search" variant="outline-light" size="lg"/>
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col xs="12" sm="auto">
              <Form.Label className="header-text selector-label">Categories</Form.Label>
            </Col>
            <Col>
              <Form.Select onChange={event => setCategory(event.target.value)} >
                {
                  ["All", "Art", "Biography", "Computers", "History", "Medical", "Poetry"].map(
                    category =>
                      <option value={category.toLowerCase()} key={ category.toLowerCase() + '_category' }>
                        { category }
                      </option>
                  )
                }
              </Form.Select>
            </Col>
            <Col xs="12" sm="auto">
              <Form.Label className="header-text selector-label">Sorting by</Form.Label>
            </Col>
            <Col>
              <Form.Select onChange={event => setSorting(event.target.value)} >
                {
                  ["Relevance", "Newest"].map(
                    sorting =>
                      <option value={ sorting.toLowerCase() } key={ sorting.toLowerCase() + '_sorting' }>
                        { sorting }
                      </option>
                  )
                }
              </Form.Select>
            </Col>
          </Row>
        </Form>
      </Container>
    </header>
  );
}

