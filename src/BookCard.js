import {Card, Container, Placeholder, Ratio, Row, Spinner} from "react-bootstrap";
import bookPhoto from './book.png';

export function BookCard({isLoaded}) {
  return (
    <>
      {/*TODO: Add dynamic width*/}
      {isLoaded ? (
        <Card style={{ width: '25vw' }}>
          <Card.Img variant="top" src={bookPhoto}/>
          <Card.Body>
            <Card.Link href="#" className="text-muted">Book Category</Card.Link>
            <Card.Title>Book Title</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Book Author</Card.Subtitle>
          </Card.Body>
        </Card>
      ) : (
        <Card style={{ width: '25vw'}}>

          <Ratio aspectRatio={110} >
            <Container fluid={true}>
              <Row className="mt-5">
                <Spinner animation="border" variant="secondary" className="m-auto mt-5"/>
              </Row>
            </Container>
          </Ratio>
          <Card.Body>
            <Placeholder as={Card.Link} className="text-muted" animation="glow">
              <Placeholder xs={5} />
            </Placeholder>
            <Placeholder as={Card.Title} animation="glow">
              <Placeholder xs={6} />
            </Placeholder>
            <Placeholder as={Card.Subtitle} animation="glow">
              <Placeholder xs={4} /> {'  '}
              <Placeholder xs={5} />
            </Placeholder>
          </Card.Body>
        </Card>
      )}

    </>
  );
}
