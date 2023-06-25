import bookImage from '../../assets/book.png'

class PlaceholderBook {
  constructor(data) {
    console.log("placeholder book constructor working with data: ", data);
    this.photo = bookImage;
    this.bookName = 'BookName';
    this.categories = ['category 1', 'category 2'];
    this.authors = ['author 1', "author 2"];
    this.bookDescription = 'Sagkfj  aihjdf o aioudfhoaiufdsha ioauhdfsvoiuahsouiah aiuodfhoiau ujfhaaidsofhvu aiuhodfsvaf iuydsghffghg uyoidfo uiyGDHBO oiUDH iudhc IDUH Duios u \nHUH FOI HFIOI FHUHfuFYGU IDOSFYGVOIvugviovUV GSviuosv ygVSIOUYGsgiyusV';
  }
}
class GoogleBook {
  constructor(data) {
    //TODO: implement constructor for googlebooks api
    console.log("google book constructor working with data: ", data);
  }
}
export class BookFactory {
  static bookTypes = {
    placeholder: PlaceholderBook,
    google: GoogleBook
  }

  numberOfBooksCreated = 0

  create(type, numberOfBooksInData, ...data) {
    const Book = BookFactory.bookTypes[type] || BookFactory.bookTypes.placeholder;
    this.numberOfBooksCreated++;
    return this.numberOfBooksCreated <= numberOfBooksInData ? new Book(data) : undefined;
  }
}