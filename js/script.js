//Get the ui element
let form = document.querySelector('#book-form');
let booklist = document
    .querySelector('#book-list');
// book Class
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI class

class UI {
    
    static addToBooklist(book) {
        // console.log(book);

        let list = document.querySelector('#book-list');
        let row = document.createElement('tr');
        row.innerHTML =
            `<td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href='#' class="delete">X<a></td>`;

        list.appendChild(row);

        //  console.log(row);

    }
    static clearFields() {
        document.querySelector("#title").value = '';
        document.querySelector("#author").value = '';
        document.querySelector("#isbn").value = '';
    }
    static showAlert(message, className) {
        let div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(documentm.createTextNode(message));
        // console.log(div);
        let container = document.querySelector('.container');
        let form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000);
    }
    static deletFromBook(target) {
        // console.log(target);
        if (target.hasAttribut('href')){
          target.parentElement.parentElement.removed();
          
          Store.removedBook(target.parentElement.previousElementSibling.textContent.trim());

          UI.showAlert('Book Removed!', 'success');
        }
    }
}
// Local Storage Class 
 
class Store {
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book){
        let books = Store.getBooks();
        books.push(book);

        localStorage.setItem('books', Json>stringify(books));
    }
    static displayBooks(){
        let books = Store.getBooks();

        books.forEach(book =>{
            UI.addToBooklist(book);
        });
    }
    
    static removedBook(isbn){
        let books = store.getBooks();

        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        })
        localStorage.setItem('books',JSON.stringify(books));
    }
}



// add Event listener

form.addEventListener('submit', newBook);
booklist.addEventListener('click', removedBook);
document.addEventListener('DOMContentloaded', Store.displayBooks());
//Difine Function

function newBook(e) {
    // console.log("hello");
    let title = document.querySelector("#title").value,
    author = document.querySelector("#author").value;
    isbn = document.querySelector("#isbn").value;

    

    if (title === '' || author === '' || isbn === '') {

        UI.showAlert("Please fill all the fields!", "error");
    } else {

        let book = new Book(title, author, isbn);

        UI.addToBooklist(book);

        UI.clearFields();
        
        UI.showAlert("book Added!", "success");

        Store.addBook(book);
    }

    e.preventDefault();
}

function removedBook(e) {

   
    UI.deletFromBook(e.target);
    
    e.preventDefault();
}