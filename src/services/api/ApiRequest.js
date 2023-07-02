import {useRef} from "react";
import {GOOGLE_API_KEY, GOOGLE_REQUEST_BODY, PAGINATION_STEP} from "../../utils/constants/constants";

class SimulateRequest {
  numberOfBooksToLoad = 0;
  numberOfBooksLoaded = 0;
  numberOfBooksFound = 0;
  enteredSearchQuery = "";
  category = "";
  sorting = "";

  constructor(numberOfBooksToLoad, enteredSearchQuery, category, sorting ) {
    this.numberOfBooksToLoad = numberOfBooksToLoad ;
    this.enteredSearchQuery = enteredSearchQuery ;
    this.category = category ;
    this.sorting = sorting ;
  }
  initialRequest() {
    console.log('searched for' + this.enteredSearchQuery + ' in ' + this.category + ' sorted by ' + this.sorting);
    return new Promise((resolve) => {
      this.numberOfBooksFound = Math.floor(Math.random() * 100);
      setTimeout(() => resolve({ numberOfBooksFound: this.numberOfBooksFound, bookData: "simulate initialRequest data" }), 1000 );
    });
  }

  paginationRequest() {
    const paginationBooksNumber = this.numberOfBooksFound - this.numberOfBooksLoaded < PAGINATION_STEP ? this.numberOfBooksFound - this.numberOfBooksLoaded : PAGINATION_STEP;
    console.log('pagination for' + this.enteredSearchQuery + ' in category ' + this.category + ' sorted by ' + this.sorting + paginationBooksNumber + ' items from start index ' + this.numberOfBooksLoaded );
    this.numberOfBooksLoaded += paginationBooksNumber;
    return new Promise((resolve) => {
      setTimeout(() => resolve( { numberOfBooksLoaded: this.numberOfBooksLoaded, bookData: "simulate pagination request data"} ), 1000)
    })
  }
}

class GoogleApiRequest {
  numberOfBooksToLoad = 0;
  numberOfBooksLoaded = 0;
  numberOfBooksFound = 0;
  enteredSearchQuery = "";
  category = "";
  sorting = "";

  constructor(numberOfBooksToLoad, enteredSearchQuery, category, sorting ) {
    this.numberOfBooksToLoad = numberOfBooksToLoad ;
    this.enteredSearchQuery = enteredSearchQuery ;
    this.category = category ;
    this.sorting = sorting ;
  }

  initialRequest() {
    const subject = this.category === "all" ? "" : "+subject:" + this.category;
    const maxResults = "&maxResults=" + this.numberOfBooksToLoad;
    const orderBy  = "&orderBy=" + this.sorting;
    const formattedQuery = this.enteredSearchQuery.replace(" ", "+");
    return fetch(GOOGLE_REQUEST_BODY + formattedQuery + subject
      + maxResults + orderBy + GOOGLE_API_KEY).then(
        (response) => response.json(),
        () => {
          return new Promise((resolve , reject) => {
            reject(new Error("Невозможно установить соединение с сервером. Проверьте интернет подкючение и повторите повытку."))
          });
        }
      ).then(
        (json) => {
          return new Promise((resolve, reject) => {
            if (typeof json?.totalItems === 'number') {
              this.numberOfBooksFound = json?.totalItems;
              this.numberOfBooksLoaded = json?.totalItems < this.numberOfBooksToLoad ?
                json?.totalItems : this.numberOfBooksToLoad;
              resolve({
                numberOfBooksFound: json?.totalItems,
                bookData: json?.items ,
                numberOfBooksLoaded: this.numberOfBooksLoaded
              });
            } else {
              reject(Error("Ошибка при обработке ответа от Google Books API. Попоробуйте повторить запрос."));
            }
          });
        },
        (error) => {
          return new Promise((resolve, reject) => {
            reject(error);
          })
        }
      )
  }
  paginationRequest() {
    const subject = this.category === "all" ? "" : "+subject:" + this.category;
    const maxResults = "&maxResults=" + this.numberOfBooksToLoad;
    const startIndex = "&startIndex=" + this.numberOfBooksLoaded;
    const orderBy  = "&orderBy=" + this.sorting;
    const formattedQuery = this.enteredSearchQuery.replace(" ", "+");
    return fetch(GOOGLE_REQUEST_BODY + formattedQuery + subject
      + startIndex + maxResults + orderBy + GOOGLE_API_KEY).then(
      (response) => response.json(),
      () => {
        return new Promise((resolve , reject) => {
          reject(new Error("Невозможно установить соединение с сервером. Проверьте интернет подкючение и повторите повытку."))
        });
      }
    ).then(
      (json) => {
        return new Promise((resolve, reject) => {
          if (typeof json?.totalItems === 'number' && Array.isArray(json?.items)) {
            this.numberOfBooksFound = json?.totalItems;
            this.numberOfBooksLoaded = json?.totalItems < this.numberOfBooksToLoad ?
              json?.totalItems : this.numberOfBooksToLoad;
            resolve({
              numberOfBooksFound: json?.totalItems,
              bookData: json?.items,
              numberOfBooksLoaded: this.numberOfBooksLoaded
            });
          } else {
            reject(Error("Ошибка при обработке ответа от Google Books API. Попоробуйте повторить запрос."));
          }
        });
      },
      (error) => {
        return new Promise((resolve, reject) => {
          reject(error);
        })
      }
    )
  }
}

export class RequestFactory {
  static requestTypes = {
    simulate: SimulateRequest,
    google: GoogleApiRequest
  }
  _lastRequest = useRef(undefined);


  create(type, numberOfBooksToLoad, enteredSearchQuery, category, sorting) {
    const Request = RequestFactory.requestTypes[type] || RequestFactory.requestTypes.simulate;
    this._lastRequest.current = new Request(numberOfBooksToLoad, enteredSearchQuery, category, sorting);
    return this._lastRequest.current;
  }
  getLast() {
    return this._lastRequest.current;
  }
}