/* eslint-disable max-classes-per-file */
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

// STORE CLASS
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(book) {
    const bookTitle = book.querySelector('#title').innerText;
    const books = Store.getBooks();
    const filt = books.filter((book) => bookTitle === book.title);
    const filtIndex = books.indexOf(filt[0]);
    books.splice(filtIndex, 1);
    localStorage.setItem('books', JSON.stringify(books));
  }
}

class UI {
  static displayBooks() {
    const books = Store.getBooks();
    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const books = document.querySelector('.books');
    const newBook = document.createElement('div');
    newBook.insertAdjacentHTML('afterbegin', `
  <div class="bookDiv">
    <div class="bookTitleAuthor">
      <h4 id="title">"${book.title}"</h4>
      <p class="by">by</p>
      <h4 id="author">${book.author}</h4>
    </div>
    <button class="btnRemove">Remove</button>
  </div>
        `);
    newBook.classList.add('newBook');
    books.appendChild(newBook);
  }

  static deleteBook(el) {
    if (el.classList.contains('btnRemove')) {
      el.parentElement.parentElement.remove();
    }
  }

  static clearFields() {
    document.querySelector('.title').value = '';
    document.querySelector('.author').value = '';
  }
}

// EVENT TO DISPLAY BOOKS
document.addEventListener('DOMContentLoaded', UI.displayBooks);
// EVENT TO ADD A BOOK
document.querySelector('.bookForm').addEventListener('submit', (e) => {
  e.preventDefault();
  // get form values
  const titleInput = document.querySelector('.title').value;
  const authorInput = document.querySelector('.author').value;
  const book = new Book(titleInput, authorInput);
  // ADD BOOK TO LIST
  UI.addBookToList(book);
  // ADD BOOK TO STORE
  Store.addBook(book);
  // CLEAR FIELDS
  UI.clearFields();
});
// EVENT DELETE
document.querySelector('.books').addEventListener('click', (e) => {
  if (e.target.className === 'btnRemove') {
    const book = e.target.parentElement;
    Store.removeBook(book);
    UI.deleteBook(e.target);
  }
});