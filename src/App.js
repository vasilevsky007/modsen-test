import backgroundBooksImage from './books_background.jpg';
import './App.css';

import { useState } from 'react';

import { BookCard } from "./BookCard"

import {Button, Container, Col, Row, Form, InputGroup} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';


function App() {
  return (
    <div className="App">
      <header className="App-header pb-3" style={{ background: `url(${backgroundBooksImage})` }}>
        <Container>
          <Row>
            <Col>
              <h1 className="App-header-text mt-5 mb-5">Search for books</h1>
            </Col>
          </Row>
          <Form className="App-search-form">
            <Row>
              <Col>
                <InputGroup className="mb-3">
                  <Form.Control
                    size="lg"
                    placeholder="Enter the book name"
                    aria-label="Enter the book name"
                    aria-describedby="basic-addon2"
                  />
                  <Button as="input" type="submit" value="Search" variant="outline-secondary" id="button-addon2" size="lg"/>
                </InputGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="auto">
                <Form.Label>Categories</Form.Label>
              </Col>
              <Col>
                <Form.Select>
                  {/*TODO:add onChange*/}
                  <option value="all">All</option>
                  <option value="art">Art</option>
                  <option value="biography">Biography</option>
                  <option value="computers">Computers</option>
                  <option value="history">History</option>
                  <option value="medical">Medical</option>
                  <option value="poetry">Poetry</option>
                </Form.Select>
              </Col>
              <Col xs="auto">
                <Form.Label>Sorting by</Form.Label>
              </Col>
              <Col>
                <Form.Select>
                  {/*TODO:add onChange*/}
                  <option value="Relevance">Relevance</option>
                  <option value="newest">Newest</option>
                </Form.Select>
              </Col>
            </Row>
          </Form>

        </Container>


        {/*<img src={logo} className="App-logo" alt="logo" />*/}
        {/*<p>*/}
        {/*  Edit <code>src/App.js</code> and save to reload.*/}
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
      <section className="App-number-of-results m-2">
        Found 0 books
      </section>
      <section className="App-search-results">
        <Container>
          <Row>
            <Col>
              <BookCard isLoaded={false}/>
            </Col>
            <Col>
              <BookCard isLoaded={true}/>
            </Col>
          </Row>

        </Container>

      </section>
    </div>
  );
}

export default App;
