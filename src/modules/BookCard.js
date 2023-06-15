import { Card, Container, Placeholder, Ratio, Row, Spinner } from "react-bootstrap";
import bookPhoto from './book.png';
import {useState} from "react";
import {BookDetailed} from "./BookDetailed";

export function BookCard({isLoaded}) {
  const [isShowingDetailed, setIsShowingDetailed] = useState(false);
  const showDetailed = () => {
    setIsShowingDetailed(true);
  }
  return (
    <>
      {/*TODO: Add dynamic width*/}
      {isLoaded ? (
        <Card style={{ width: '94%' }} onClick={showDetailed}>
          <Card.Img variant="top" src={bookPhoto}/>
          <Card.Body>
            <Card.Link href="#" className="text-muted">Book Category</Card.Link>
            <Card.Title>Book Title</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Book Author</Card.Subtitle>
          </Card.Body>
        </Card>
      ) : (
        <Card style={{ width: '94%'}}>
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
      <BookDetailed
        isShown={isShowingDetailed}
        setShown={setIsShowingDetailed}
        bookPhoto={bookPhoto}
        name={'BookName'}
        categories={['category 1', 'category 2']}
        authors={['author 1', "author 2"]}
        description={'Sagkfj  aihjdf o aioudfhoaiufdsha ioauhdfsvoiuahsouiah aiuodfhoiau ujfhaaidsofhvu aiuhodfsvaf iuydsghffghg uyoidfo uiyGDHBO oiUDH iudhc IDUH Duios u \nHUH FOI HFIOI FHUHfuFYGU IDOSFYGVOIvugviovUV GSviuosv ygVSIOUYGsgiyusV'}

      />
    </>
  );
}
