import {useState} from "react";

import {Button, Col, Container, Form, InputGroup, Row} from "react-bootstrap";

import './styles.css'
import backgroundBooksImage from "../../assets/books_background.jpg";


export const Header = ({ setAppState }) => {
  const [enteredSearchQuery, setEnteredSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [sorting, setSorting] = useState('relevance');

  const searchForBooks = (event) => {
    event.preventDefault()
    console.log('searched for' + enteredSearchQuery + ' in ' + category + ' sorted by ' + sorting);
    setAppState('loading');
    new Promise(resolve => setTimeout(resolve, 1000)).then(() => {
      setAppState(Math.floor(Math.random() * 100))
    } );
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
                <Button as="input" type="submit" value="Search" variant="outline-light"size="lg"/>
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
                    category => <option value={ category.toLowerCase() }>{ category }</option>
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
                    sorting => <option value={ sorting.toLowerCase() }>{ sorting }</option>
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

