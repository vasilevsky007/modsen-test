import {useRef} from "react";
import {PAGINATION_STEP} from "../../utils/constants/constants";

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
    return new Promise((resolve, reject) => {
      this.numberOfBooksFound = Math.floor(Math.random() * 100);
      setTimeout(() => resolve({ numberOfBooksFound: this.numberOfBooksFound, bookData: "simulate initialRequest data" }), 1000 );
    });
  }

  paginationRequest() {
    const paginationBooksNumber = this.numberOfBooksFound - this.numberOfBooksLoaded < PAGINATION_STEP ? this.numberOfBooksFound - this.numberOfBooksLoaded : PAGINATION_STEP;
    console.log('pagination for' + this.enteredSearchQuery + ' in category ' + this.category + ' sorted by ' + this.sorting + paginationBooksNumber + ' items from start index ' + this.numberOfBooksLoaded );
    this.numberOfBooksLoaded += paginationBooksNumber;
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve( { numberOfBooksLoaded: this.numberOfBooksLoaded, bookData: "simulate pagination request data"} ), 1000)
    })
  }
}

class GoogleApiRequest {
  numberOfBooksToLoad = 0;
  numberOfBooksLoaded = 0;
  enteredSearchQuery = "";
  category = "";
  sorting = "";
  initialRequest(numberOfBooksToLoad, enteredSearchQuery, category, sorting ) {
    this.numberOfBooksToLoad = numberOfBooksToLoad;
    this.numberOfBooksLoaded = numberOfBooksToLoad;
    this.enteredSearchQuery = enteredSearchQuery;
    this.category = category;
    this.sorting = sorting;
    //TODO: implement google api fetch & decode json
    return fetch("some request to google api using given fields")
      .then(
        (response) => response.json(),
        () => {
          return new Promise((resolve , reject) => {
            reject(new Error("Невозможно установить соединение с сервером. Проверьте интернет подкючение и повторите повытку."))
          });
        }
      )
      .then(
        (json) => {
          return new Promise((resolve, reject) => {
            //trying to get needed data from json
            //if (ALL OK) {
            resolve({ numberOfBooksFound: "number of books found from google json",
              bookData: "some book data from googlebook json" });
            // else {
            reject(Error("Ошибка при обработке ответа от Google Books API. Попоробуйте повторит запрос."));
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