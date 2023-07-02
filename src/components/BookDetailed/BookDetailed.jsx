import {Button, Card, Col, Collapse, Container, Image, Modal, Ratio, Row, Spinner} from "react-bootstrap";
import './styles.css'
import {useState} from "react";
export const BookDetailed = ({isShown, setShown, book}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const onImageLoad = () => {
    setImageLoaded(true);
  }
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
              <Collapse in={imageLoaded}>
                <Image src={book?.photo} onLoad={onImageLoad} fluid/>
              </Collapse>
              <Collapse in={!imageLoaded}>
                <Ratio aspectRatio={125}>
                  <Container fluid={true} className="d-flex align-items-center justify-content-center">
                    <Spinner animation="border" variant="secondary"/>
                  </Container>
                </Ratio>
              </Collapse>

            </Col>
            <Col xs = {12} sm = {6}>
              {
                book?.categories?.map( category =>
                  <Button variant="link"  href="#" className="text-muted" key={category}>{category}</Button>
                )
              }
              <Card.Title>{book?.bookName}</Card.Title>
              {
                book?.authors?.map( author =>
                  <Card.Subtitle className="mb-2 text-muted" key={author}>{author}</Card.Subtitle>
                )
              }
              <Card>
                <Card.Body>
                  {typeof book?.bookDescription === 'undefined' ? "There is no description for this book..." : book?.bookDescription}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
}