
export const bookStorage = {
  books : [],
  get(index) {
    return this.books.at(index);
  },
  push(value) {
    this.books.push(value);
  },
  clear() {
    while (typeof this.books.pop() !== 'undefined') {}
  },
}