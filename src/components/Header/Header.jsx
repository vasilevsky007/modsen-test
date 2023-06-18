import {useState} from "react";

import {Button, Col, Container, Form, InputGroup, Row} from "react-bootstrap";

import './styles.css'
import backgroundBooksImage from "../../assets/books_background.jpg";


export const Header = ({ setAppState }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [sorting, setSorting] = useState('');

  const searchForBooks = (event) => {
    event.preventDefault()
    console.log('searched for' + searchQuery + ' in ' + category + ' sorted by ' + sorting);
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
        <Form className="search-form" onSubmit={searchForBooks}>
          <Row>
            <Col>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Enter the book name"
                  aria-label="Enter the book name"
                  aria-describedby="basic-addon2"
                  onChange={event => setSearchQuery(event.target.value)}
                />
                <Button as="input" type="submit" value="Search" variant="outline-light" id="button-addon2" size="lg"/>
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col xs="12" sm="auto">
              <Form.Label className="header-text selector-label">Categories</Form.Label>
            </Col>
            <Col>
              <Form.Select onChange={event => setCategory(event.target.value)} >
                <option value="all">All</option>
                <option value="art">Art</option>
                <option value="biography">Biography</option>
                <option value="computers">Computers</option>
                <option value="history">History</option>
                <option value="medical">Medical</option>
                <option value="poetry">Poetry</option>
              </Form.Select>
            </Col>
            <Col xs="12" sm="auto">
              <Form.Label className="header-text selector-label">Sorting by</Form.Label>
            </Col>
            <Col>
              <Form.Select onChange={event => setSorting(event.target.value)} >
                <option value="relevance">Relevance</option>
                <option value="newest">Newest</option>
              </Form.Select>
            </Col>
          </Row>
        </Form>

      </Container>


      {/*<img src={logo} className="App-logo" alt="logo" />*/}
      {/*<p>*/}
      {/*  Edit <code>src/App.jsx</code> and save to reload.*/}
      {/*</p>*/}
      {/*<Button>asdf123sfhsh</Button>*/}
      {/*<a*/}
      {/*  className="App-link"*/}
      {/*  href="https://reactjs.org"*/}
      {/*  target="_blank"*/}
      {/*  rel="noopener noreferrer"*/}
      {/*>*/}
      {/*  Learn React*/}
      {/*</a>*/}
    </header>
  );
}

