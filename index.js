//Classes

class Book {
    constructor(title, format) {
        this.title = title;
        this.format = format;
    }
}

class Genre {
    constructor(id, category) {
        this.id = id;
        this.category = category;
        this.books = [];
    } 

    addBook(book) {
        this.books.push(book);
    }

    deleteBook(book) {
        let index = this.books.indexOf(book);
        this.books.splice(index, 1);
    }
}

let genres = [];
let genreId = 0;

onClick("new-genre", () => {
    genres.push(new Genre(genreId++, getValue("new-genre-name")));
    drawDOM();
})

function onClick(id, action) {
    let element = document.getElementById(id);
    element.addEventListener("click", action);
    return element;
}

function getValue(id) {
    return document.getElementById(id).value;
}

function drawDOM() {
    let genreDiv = document.getElementById("genres");
    clearElement(genreDiv);
    for (genre of genres) {
        let table = createGenreTable(genre);
        let title = document.createElement("h2");
        title.innerHTML = genre.name;
        title.appendChild(createDeleteGenreButton(genre));
        genreDiv.appendChild(title);
        genreDiv.appendChild(table);
        for (book of genre.books) {
            createBookRow (genre, table, book);
        }
    }
}

function createBookRow (genre, table, book) {
    let row = table.insertRow(2);
    row.insertCell(0).innerHTML = book.title;
    row.insertCell(1).innerHTML = book.format;
    let actions = row.insertCell(2);
    actions.appendChild(createDeleteRowButton(genre, book));
}

function createDeleteRowButton(genre, book) {
    let btn = document.createElement("button");
    btn.className = "btn btn-primary";
    btn.innerHTML = "Delete";
    btn.onclick = () => {
        let index = genre.books.indexOf(book);
        genre.books.splice(index, 1);
        drawDOM();
    };
    return btn;
}

function createDeleteGenreButton(genre) {
    let btn = document.createElement("button");
    btn.className = "btn btn-primary";
    btn.innerHTML = "Delete Genre";
    btn.onclick = () => {
        let index = genres.indexOf(genre);
        genres.splice(index, 1);
        drawDOM(); 
    };
    return btn;
}

function createNewBookButton(genre) {
    let btn = document.createElement("button");
    btn.className = "btn btn-primary";
    btn.innerHTML = "Create";
    btn.onclick = () => {
        genre.books. push(new Book (getValue(`title-input-${genre.id}`), getValue(`format-input-${genre.id}`)));
        drawDOM();
    };
    return btn;
}

function createGenreTable(genre) {
let table = document.createElement("table");
table.setAttribute("class", "table table-dark table-striped");
let row = table.insertRow(0);
let titleColumn = document.createElement("th");
let formatColumn = document.createElement("th");
titleColumn.innerHTML = "Title";
formatColumn.innerHTML = "Format";
row.appendChild(titleColumn);
row.appendChild(formatColumn);
let formRow = table.insertRow(1);
let titleTh = document.createElement("th");
let formatTh = document.createElement("th");
let createTh = document.createElement("th");
let titleInput = document.createElement("input");
titleInput.setAttribute("id", `title-input-${genre.id}`);
titleInput.setAttribute("type", "text");
titleInput.setAttribute("class", "form-control");
let formatInput = document.createElement("input");
formatInput.setAttribute("id", `format-input-${genre.id}`);
formatInput.setAttribute("type", "text");
formatInput.setAttribute("class", "form-control");
let newBookButton = createNewBookButton(genre);
titleTh.appendChild(titleInput);
formatTh.appendChild(formatInput);
createTh.appendChild(newBookButton);
formRow.appendChild(titleTh);
formRow.appendChild(formatTh);
formRow.appendChild(createTh);
return table;
}

function clearElement(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}