import bookImage from '../../assets/book.png'

class PlaceholderBook {
  constructor() {
    this.photo = bookImage;
    this.bookName = 'BookName';
    this.categories = ['category 1', 'category 2'];
    this.authors = ['author 1', "author 2"];
    this.bookDescription = 'Sagkfj  aihjdf o aioudfhoaiufdsha ioauhdfsvoiuahsouiah aiuodfhoiau ujfhaaidsofhvu aiuhodfsvaf iuydsghffghg uyoidfo uiyGDHBO oiUDH iudhc IDUH Duios u \nHUH FOI HFIOI FHUHfuFYGU IDOSFYGVOIvugviovUV GSviuosv ygVSIOUYGsgiyusV';
  }
}
class GoogleBook {
  constructor(info) {
    //TODO: implement constructor for googlebooks api
  }
}
export class BookFactory {
  static bookTypes = {
    placeholder: PlaceholderBook,
    google: GoogleBook
  }

  numberOfBooksCreated = 0

  create(type, numberOfBooksFound, ...info) {
    const Book = BookFactory.bookTypes[type] || BookFactory.bookTypes.placeholder;
    this.numberOfBooksCreated++;
    return this.numberOfBooksCreated <= numberOfBooksFound ? new Book(info) : undefined;
  }
}