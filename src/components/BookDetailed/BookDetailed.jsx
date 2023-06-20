import { Button, Card, Col, Container, Image, Modal, Row } from "react-bootstrap";

export const BookDetailed = ({isShown, setShown, book}) => {
  return (
    <Modal
      show={isShown}
      onHide={() => setShown(false)}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton/>
      <Modal.Body>
        <Container>
          <Row>
            <Col xs = {12} sm = {6}>
              <Image src={book?.photo} fluid/>
            </Col>
            <Col xs = {12} sm = {6}>
              {
                book?.categories.map( category =>
                  <Button variant="link"  href="#" className="text-muted">{category}</Button>
                )
              }
              <Card.Title>{book?.bookName}</Card.Title>
              {
                book?.authors.map( author =>
                  <Card.Subtitle className="mb-2 text-muted">{author}</Card.Subtitle>
                )
              }
              <Card>
                <Card.Body>
                  {book?.bookDescription}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
}