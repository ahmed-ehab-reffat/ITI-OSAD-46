class Book {
  constructor(
    title,
    author,
    publisher,
    numofPages,
    numofChapters,
    numofCopies
  ) {
    this.title = title;
    this.author = author;
    this.publisher = publisher;
    this.numofPages = numofPages;
    this.numofChapters = numofChapters;
    this.numofCopies = numofCopies;
  }
}

class Box {
  constructor(height, width, length, material) {
    this.height = height;
    this.width = width;
    this.length = length;
    this.material = material;
    this.content = [];
  }

  get volume() {
    return this.height * this.width * this.length;
  }

  get numOfBooks() {
    return this.content.length;
  }

  addBook(book) {
    this.content.push(book);
  }

  deleteBook(title) {
    this.content = this.content.filter((book) => book.title !== title);
  }

  toString() {
    return (
      `Box Dimensions: ${this.height}x${this.width}x${this.length} (${this.material}). ` +
      `Currently storing ${this.numOfBooks} book(s).`
    );
  }

  valueOf() {
    return this.numOfBooks;
  }
}

const myBox = new Box(2, 3, 4, "Cupper");
const book1 = new Book("Title 1", "Author 1", "Publisher 1", 100, 10, 1000);
const book2 = new Book("Title 2", "Author 2", "Publisher 2", 200, 20, 2000);
const book3 = new Book("Title 3", "Author 3", "Publisher 3", 300, 30, 3000);

myBox.addBook(book1);
myBox.addBook(book2);
myBox.addBook(book3);

console.log(myBox.toString());

console.log(myBox.numOfBooks);
myBox.deleteBook("Title 2");
console.log(myBox.numOfBooks);

const myBox2 = new Box(3, 3, 4, "Cupper");
const book4 = new Book("Title 4", "Author 4", "Publisher 4", 400, 40, 4000);
const book5 = new Book("Title 5", "Author 5", "Publisher 5", 500, 50, 5000);
myBox2.addBook(book4);
myBox2.addBook(book5);

console.log(`Total books in all boxes: ${myBox + myBox2}`);
