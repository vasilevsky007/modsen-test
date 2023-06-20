import { Card, Container, Placeholder, Ratio, Row, Spinner } from "react-bootstrap";
import { useState } from "react";

import {BookDetailed} from "../BookDetailed/BookDetailed";

export function BookCard({isLoaded, thisBook}) {
  const [isShowingDetailed, setIsShowingDetailed] = useState(false);
  const showDetailed = () => {
    setIsShowingDetailed(true);
  }
  return (
    <>
      {isLoaded ? (
        <>
          <Card style={{ width: '100%'}} onClick={showDetailed}>
            <Card.Img variant="top" src={thisBook.photo}/>
            <Card.Body>
              <Card.Link href="#" className="text-muted">{thisBook.categories[0]}</Card.Link>
              <Card.Title>{thisBook.bookName}</Card.Title>
              {
                thisBook.authors.map(author =>
                  <Card.Subtitle className="mb-2 text-muted">{author}</Card.Subtitle>
                )
              }
            </Card.Body>
          </Card>
          <BookDetailed
            isShown={isShowingDetailed}
            setShown={setIsShowingDetailed}
            book={thisBook}
          />
        </>
      ) : (
        <Card style={{ width: '100%'}}>
          <Ratio aspectRatio={125}>
            <Container fluid={true} className="d-flex align-items-center justify-content-center">
              <Spinner animation="border" variant="secondary" className=""/>
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
