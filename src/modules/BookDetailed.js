import {Card, Col, Container, Image, Modal, Row} from "react-bootstrap";

export const BookDetailed = ({isShown, setShown, categories, name, authors, description, bookPhoto }) => {
  const drawCategories = (categories) => {
    let result = [];
    for (const category of categories) {
      result.push(<Card.Link href="#" className="text-muted">{category + ' '}</Card.Link>);
    }
    return result;
  }
  const drawAuthors = (authors) => {
    let result = [];
    for (const author of authors) {
      result.push(<Card.Subtitle className="mb-2 text-muted">{author}</Card.Subtitle>)
    }
    return result;
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
              <Image src={bookPhoto} fluid/>
            </Col>
            <Col xs = {12} sm = {6}>
              {drawCategories(categories)}
              <Card.Title>{name}</Card.Title>
              {drawAuthors(authors)}
              <Card>
                <Card.Body>
                  {description}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
}