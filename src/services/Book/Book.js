import bookImage from '../../assets/book.jpg'

class PlaceholderBook {
  constructor(index, data) {
    console.log("placeholder book constructor working with data: ", data);
    this.photo = bookImage;
    this.bookName = 'BookName';
    this.categories = ['category 1', 'category 2'];
    this.authors = ['author 1', "author 2"];
    this.bookDescription = 'Sagkfj  aihjdf o aioudfhoaiufdsha ioauhdfsvoiuahsouiah aiuodfhoiau ujfhaaidsofhvu aiuhodfsvaf iuydsghffghg uyoidfo uiyGDHBO oiUDH iudhc IDUH Duios u \nHUH FOI HFIOI FHUHfuFYGU IDOSFYGVOIvugviovUV GSviuosv ygVSIOUYGsgiyusV';
  }
}
class GoogleBook {
  constructor(index, data) {
    let bookInfo;
    if (typeof data[index]?.volumeInfo === "undefined") {
      return undefined;
    } else {
      bookInfo = data[index]?.volumeInfo;
    }
    this.photo = typeof bookInfo?.imageLinks?.thumbnail === 'undefined' ? bookImage : bookInfo?.imageLinks?.thumbnail;
    this.bookName = bookInfo?.title;
    this.categories = bookInfo?.categories;
    this.authors = bookInfo?.authors;
    this.bookDescription = bookInfo?.description;
  }
}
export class BookFactory {
  static bookTypes = {
    placeholder: PlaceholderBook,
    google: GoogleBook
  }

  numberOfBooksCreated = 0

  create(type, numberOfBooksInData, data) {
    const Book = BookFactory.bookTypes[type] || BookFactory.bookTypes.placeholder;
    const result = this.numberOfBooksCreated < numberOfBooksInData ?
      new Book(this.numberOfBooksCreated, data) : undefined;
    this.numberOfBooksCreated++;
    return result;
  }
}